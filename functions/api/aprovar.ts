// ============================================================================
// GET /api/aprovar?token=xxx
//
// Aberto pelo admin clicando no botão "Aprovar" no e-mail. Atualiza o status
// pra 'approved', adiciona o e-mail na policy do Cloudflare Access (assim ele
// passa a poder logar via OTP) e notifica o cliente.
// ============================================================================

import {
  type Env,
  type ClienteRegistro,
  type ApprovalToken,
  sendEmail,
  addEmailToAccessPolicy,
  htmlResponse,
} from './_shared'

export const onRequestGet: PagesFunction<Env> = async ctx => {
  const url = new URL(ctx.request.url)
  const token = url.searchParams.get('token')
  if (!token) return htmlResponse(errorPage('Token ausente.'), 400)

  const tokenRaw = await ctx.env.BEANIC_CLIENTES.get(`token:${token}`)
  if (!tokenRaw) {
    return htmlResponse(errorPage('Token inválido ou expirado.'), 404)
  }
  const tokenData = JSON.parse(tokenRaw) as ApprovalToken
  if (tokenData.expiresAt < Date.now()) {
    return htmlResponse(errorPage('Token expirado.'), 410)
  }

  const clienteRaw = await ctx.env.BEANIC_CLIENTES.get(`cliente:${tokenData.email}`)
  if (!clienteRaw) {
    return htmlResponse(errorPage('Cadastro não encontrado (pode ter expirado).'), 404)
  }
  const cliente = JSON.parse(clienteRaw) as ClienteRegistro

  if (cliente.status === 'approved') {
    return htmlResponse(infoPage('Já aprovado', `O cadastro de <strong>${cliente.empresa}</strong> já foi aprovado anteriormente.`))
  }

  // 1. Adiciona no Cloudflare Access — falha aqui aborta TUDO (cliente
  //    aprovado no KV mas sem acesso na borda fica em estado inconsistente).
  try {
    await addEmailToAccessPolicy(ctx.env, cliente.email)
  } catch (err) {
    console.error('Falha ao adicionar no CF Access:', err)
    return htmlResponse(
      errorPage(
        `Erro ao liberar acesso no Cloudflare Access para <code>${escape(cliente.email)}</code>.`,
        (err as Error).message,
      ),
      500,
    )
  }

  // 2. Atualiza KV
  cliente.status = 'approved'
  cliente.approvedAt = new Date().toISOString()
  cliente.approvalToken = undefined
  await ctx.env.BEANIC_CLIENTES.put(`cliente:${cliente.email}`, JSON.stringify(cliente))
  await ctx.env.BEANIC_CLIENTES.delete(`token:${token}`)

  // 3. Avisa o cliente
  await sendEmail(ctx.env, {
    to: cliente.email,
    subject: 'Beanic — Acesso liberado',
    html: clienteApprovedHtml({
      nome: cliente.nome,
      empresa: cliente.empresa,
      siteUrl: ctx.env.SITE_URL,
    }),
  }).catch(err => console.warn('Falha ao notificar cliente:', err))

  return htmlResponse(
    infoPage(
      'Acesso aprovado',
      `<strong>${cliente.empresa}</strong> agora pode entrar no portal e baixar o sistema. Notificação enviada pra <code>${cliente.email}</code>.`,
    ),
  )
}

// ── Templates HTML (retorno do GET — admin vê no browser) ───────────────────

function infoPage(titulo: string, msg: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${titulo} — Beanic</title></head>
<body style="font-family:'Inter',Arial,sans-serif;background:#050d18;color:#e8eef6;min-height:100vh;margin:0;display:grid;place-items:center;padding:40px;">
  <div style="max-width:480px;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:36px;text-align:center;">
    <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:50%;background:rgba(74,222,128,0.15);color:#4ade80;display:grid;place-items:center;font-size:28px;">✓</div>
    <h1 style="font-size:24px;margin:0 0 12px;font-weight:600;">${titulo}</h1>
    <p style="color:#9aa9bc;line-height:1.6;margin:0;">${msg}</p>
  </div>
</body></html>`
}

function errorPage(msg: string, detail?: string): string {
  const detailHtml = detail
    ? `<div style="margin-top:18px;text-align:left;background:rgba(5,13,24,0.65);border:1px solid rgba(150,180,210,0.12);border-radius:10px;padding:14px;color:#dbeafe;font-size:12px;line-height:1.5;word-break:break-word;"><strong style="display:block;color:#9aa9bc;margin-bottom:6px;">Detalhe técnico</strong>${escape(detail)}</div>`
    : ''

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Erro — Beanic</title></head>
<body style="font-family:'Inter',Arial,sans-serif;background:#050d18;color:#e8eef6;min-height:100vh;margin:0;display:grid;place-items:center;padding:40px;">
  <div style="max-width:480px;background:#0d1c2d;border:1px solid rgba(248,113,113,0.20);border-radius:14px;padding:36px;text-align:center;">
    <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:50%;background:rgba(248,113,113,0.15);color:#f87171;display:grid;place-items:center;font-size:28px;">!</div>
    <h1 style="font-size:24px;margin:0 0 12px;font-weight:600;">Não foi possível processar</h1>
    <p style="color:#9aa9bc;line-height:1.6;margin:0;">${msg}</p>
    ${detailHtml}
  </div>
</body></html>`
}

function clienteApprovedHtml(p: { nome: string; empresa: string; siteUrl: string }): string {
  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#050d18;color:#e8eef6;padding:32px;margin:0;">
  <div style="max-width:520px;margin:0 auto;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:32px;">
    <div style="font-size:11px;color:#2bb4e5;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">Acesso aprovado</div>
    <h1 style="font-size:24px;margin:0 0 14px;font-weight:600;font-family:'Sora',sans-serif;">Bem-vindo à Beanic 🎉</h1>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.65;margin:0 0 16px;">Olá <strong>${escape(p.nome.split(' ')[0] || p.nome)}</strong>,</p>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.65;margin:0 0 24px;">Seu cadastro foi aprovado. A <strong>${escape(p.empresa)}</strong> já pode entrar no portal pra baixar o sistema, conferir a licença e acessar a documentação.</p>
    <a href="${escape(p.siteUrl)}/cliente" style="display:inline-block;background:#2bb4e5;color:#04121d;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;">Entrar no portal →</a>
    <p style="color:#6c7c91;font-size:12px;line-height:1.6;margin-top:24px;">Login é via OTP — você digita seu e-mail no portal, recebe um código de 6 dígitos e entra. Sem senha pra decorar.</p>
  </div>
</body></html>`
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
