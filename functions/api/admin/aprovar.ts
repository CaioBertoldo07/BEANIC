// ============================================================================
// POST /api/admin/aprovar
// body: { email: string }
//
// Versão "dashboard" do aprovar — diferente de /api/aprovar que usa token de
// e-mail. Aqui o admin já está autenticado via CF Access; pega o email do
// body e faz o mesmo trabalho:
//   - adiciona no CF Access
//   - atualiza KV
//   - notifica o cliente
// ============================================================================

import {
  type Env,
  type ClienteRegistro,
  jsonResponse,
  requireAdmin,
  addEmailToAccessPolicy,
  sendEmail,
} from '../_shared'

export const onRequestPost: PagesFunction<Env> = async ctx => {
  const auth = requireAdmin(ctx.request, ctx.env)
  if (!auth.ok) return auth.res

  let body: { email?: string }
  try {
    body = await ctx.request.json()
  } catch {
    return jsonResponse({ message: 'JSON inválido' }, 400)
  }
  const email = (body.email ?? '').trim().toLowerCase()
  if (!email) return jsonResponse({ message: 'E-mail obrigatório' }, 400)

  const raw = await ctx.env.BEANIC_CLIENTES.get(`cliente:${email}`)
  if (!raw) return jsonResponse({ message: 'Cadastro não encontrado' }, 404)
  const cliente = JSON.parse(raw) as ClienteRegistro

  try {
    await addEmailToAccessPolicy(ctx.env, cliente.email)
  } catch (err) {
    console.error('CF Access falhou:', err)
    return jsonResponse(
      { message: `Erro ao liberar no Cloudflare Access: ${(err as Error).message}` },
      500,
    )
  }

  if (cliente.status === 'approved') {
    return jsonResponse({ message: 'Acesso sincronizado no Cloudflare Access', cliente })
  }

  cliente.status = 'approved'
  cliente.approvedAt = new Date().toISOString()
  cliente.approvalToken = undefined
  await ctx.env.BEANIC_CLIENTES.put(`cliente:${cliente.email}`, JSON.stringify(cliente))

  // Notifica o cliente
  await sendEmail(ctx.env, {
    to: cliente.email,
    subject: 'Beanic — Acesso liberado',
    html: notifyClientHtml(cliente, ctx.env.SITE_URL),
  }).catch(err => console.warn('Falha notificar cliente:', err))

  return jsonResponse({ message: 'Aprovado', cliente })
}

function notifyClientHtml(c: ClienteRegistro, siteUrl: string): string {
  const firstName = c.nome.split(' ')[0] || c.nome
  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#050d18;color:#e8eef6;padding:32px;margin:0;">
  <div style="max-width:520px;margin:0 auto;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:32px;">
    <div style="font-size:11px;color:#2bb4e5;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">Acesso aprovado</div>
    <h1 style="font-size:24px;margin:0 0 14px;font-weight:600;font-family:'Sora',sans-serif;">Bem-vindo à Beanic 🎉</h1>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.65;margin:0 0 16px;">Olá <strong>${escape(firstName)}</strong>,</p>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.65;margin:0 0 24px;">Seu cadastro foi aprovado. A <strong>${escape(c.empresa)}</strong> já pode entrar no portal pra baixar o sistema.</p>
    <a href="${siteUrl}/cliente" style="display:inline-block;background:#2bb4e5;color:#04121d;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;">Entrar no portal →</a>
  </div>
</body></html>`
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
