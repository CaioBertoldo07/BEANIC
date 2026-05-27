// ============================================================================
// POST /api/auth/solicitar-codigo
//
// Recebe { email }. Se existe usuário cadastrado pra esse e-mail, gera um
// código OTP de 6 dígitos, salva no KV com TTL de 10min e envia por e-mail.
//
// Resposta é genérica de propósito — nunca revela se o e-mail existe ou não,
// pra evitar enumeração de usuários. UI mostra a mesma tela em ambos os casos.
// ============================================================================

import {
  type Env,
  OTP_TTL_SECONDS,
  gerarCodigoOtp,
  jsonResponse,
  normalizarEmail,
  sendEmail,
} from '../_shared'

export const onRequestPost: PagesFunction<Env> = async ctx => {
  let payload: unknown
  try {
    payload = await ctx.request.json()
  } catch {
    return jsonResponse({ message: 'JSON inválido' }, 400)
  }

  const email = normalizarEmail((payload as { email?: unknown })?.email)
  if (!email) return jsonResponse({ message: 'E-mail inválido' }, 400)

  const usuarioRaw = await ctx.env.BEANIC_CLIENTES.get(`usuario:${email}`)

  // Só envia o código se o usuário existe — mas a resposta é sempre 200
  // genérica pra não denunciar quais e-mails têm conta.
  if (usuarioRaw) {
    const codigo = gerarCodigoOtp()
    await ctx.env.BEANIC_CLIENTES.put(`otp:${email}`, codigo, {
      expirationTtl: OTP_TTL_SECONDS,
    })

    await sendEmail(ctx.env, {
      to: email,
      subject: `Beanic — Código de acesso: ${codigo}`,
      html: otpEmailHtml(codigo),
    }).catch(err => {
      console.warn('Falha ao enviar OTP:', err)
    })
  }

  return jsonResponse({ message: 'Se o e-mail estiver cadastrado, um código foi enviado.' })
}

function otpEmailHtml(codigo: string): string {
  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#050d18;color:#e8eef6;padding:32px;margin:0;">
  <div style="max-width:480px;margin:0 auto;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:32px;">
    <div style="font-size:11px;color:#2bb4e5;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">Código de acesso</div>
    <h1 style="font-size:22px;margin:0 0 16px;font-weight:600;font-family:'Sora',sans-serif;">Seu código Beanic</h1>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 20px;">Use o código abaixo pra entrar no portal:</p>
    <div style="background:#04121d;border:1px solid rgba(43,180,229,0.3);border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;">
      <span style="font-family:monospace;font-size:32px;letter-spacing:0.3em;color:#5ed0f5;font-weight:600;">${codigo}</span>
    </div>
    <p style="color:#9aa9bc;font-size:13px;line-height:1.6;margin:0;">O código expira em 10 minutos. Se você não solicitou este acesso, ignore este e-mail.</p>
    <p style="color:#6c7c91;font-size:11px;margin-top:24px;border-top:1px solid rgba(150,180,210,0.10);padding-top:16px;">Beanic — Soluções industriais</p>
  </div>
</body></html>`
}
