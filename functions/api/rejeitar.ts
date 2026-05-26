// ============================================================================
// GET /api/rejeitar?token=xxx
//
// Marca o cadastro como rejected. NÃO toca em Cloudflare Access (não adiciona
// o e-mail). Opcionalmente envia e-mail "obrigado pelo interesse" — comentado
// por padrão pra evitar spam pra concorrente/scraper.
// ============================================================================

import { type Env, type ClienteRegistro, type ApprovalToken, htmlResponse } from './_shared'

export const onRequestGet: PagesFunction<Env> = async ctx => {
  const url = new URL(ctx.request.url)
  const token = url.searchParams.get('token')
  if (!token) return htmlResponse(errorPage('Token ausente.'), 400)

  const tokenRaw = await ctx.env.BEANIC_CLIENTES.get(`token:${token}`)
  if (!tokenRaw) return htmlResponse(errorPage('Token inválido ou expirado.'), 404)
  const tokenData = JSON.parse(tokenRaw) as ApprovalToken
  if (tokenData.expiresAt < Date.now()) {
    return htmlResponse(errorPage('Token expirado.'), 410)
  }

  const clienteRaw = await ctx.env.BEANIC_CLIENTES.get(`cliente:${tokenData.email}`)
  if (!clienteRaw) return htmlResponse(errorPage('Cadastro não encontrado.'), 404)
  const cliente = JSON.parse(clienteRaw) as ClienteRegistro

  if (cliente.status === 'rejected') {
    return htmlResponse(infoPage('Já rejeitado', `O cadastro de <strong>${cliente.empresa}</strong> já havia sido rejeitado.`))
  }

  cliente.status = 'rejected'
  cliente.rejectedAt = new Date().toISOString()
  cliente.approvalToken = undefined
  await ctx.env.BEANIC_CLIENTES.put(`cliente:${cliente.email}`, JSON.stringify(cliente))
  await ctx.env.BEANIC_CLIENTES.delete(`token:${token}`)

  return htmlResponse(
    infoPage(
      'Cadastro rejeitado',
      `<strong>${cliente.empresa}</strong> (${cliente.email}) marcado como rejeitado. Nenhum e-mail foi enviado pro solicitante.`,
    ),
  )
}

function infoPage(titulo: string, msg: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${titulo} — Beanic</title></head>
<body style="font-family:'Inter',Arial,sans-serif;background:#050d18;color:#e8eef6;min-height:100vh;margin:0;display:grid;place-items:center;padding:40px;">
  <div style="max-width:480px;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:36px;text-align:center;">
    <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:50%;background:rgba(150,180,210,0.08);color:#9aa9bc;display:grid;place-items:center;font-size:28px;">×</div>
    <h1 style="font-size:24px;margin:0 0 12px;font-weight:600;">${titulo}</h1>
    <p style="color:#9aa9bc;line-height:1.6;margin:0;">${msg}</p>
  </div>
</body></html>`
}

function errorPage(msg: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Erro — Beanic</title></head>
<body style="font-family:'Inter',Arial,sans-serif;background:#050d18;color:#e8eef6;min-height:100vh;margin:0;display:grid;place-items:center;padding:40px;">
  <div style="max-width:480px;background:#0d1c2d;border:1px solid rgba(248,113,113,0.20);border-radius:14px;padding:36px;text-align:center;">
    <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:50%;background:rgba(248,113,113,0.15);color:#f87171;display:grid;place-items:center;font-size:28px;">!</div>
    <h1 style="font-size:24px;margin:0 0 12px;font-weight:600;">Não foi possível processar</h1>
    <p style="color:#9aa9bc;line-height:1.6;margin:0;">${msg}</p>
  </div>
</body></html>`
}
