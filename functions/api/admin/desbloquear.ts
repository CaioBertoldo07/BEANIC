// ============================================================================
// POST /api/admin/desbloquear
// body: { email: string }
//
// Remove e-mail + CNPJ da blocklist. Cliente rejeitado pode tentar de novo
// se o admin mudar de ideia. Não restaura o cadastro antigo — usuário precisa
// fazer um novo /registrar.
// ============================================================================

import { type Env, type ClienteRegistro, jsonResponse, requireAdmin } from '../_shared'

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

  // Pega o CNPJ do cadastro antigo (se ainda existir) pra também desbloquear
  let cnpjDigits: string | null = null
  const raw = await ctx.env.BEANIC_CLIENTES.get(`cliente:${email}`)
  if (raw) {
    const cliente = JSON.parse(raw) as ClienteRegistro
    cnpjDigits = cliente.cnpj.replace(/\D/g, '')
  }

  await Promise.all([
    ctx.env.BEANIC_CLIENTES.delete(`blocklist:email:${email}`),
    cnpjDigits ? ctx.env.BEANIC_CLIENTES.delete(`blocklist:cnpj:${cnpjDigits}`) : Promise.resolve(),
  ])

  return jsonResponse({ message: 'Desbloqueado. Cliente pode se registrar novamente.' })
}
