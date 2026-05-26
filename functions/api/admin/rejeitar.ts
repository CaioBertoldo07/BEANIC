// ============================================================================
// POST /api/admin/rejeitar
// body: { email: string }
//
// Marca cadastro como rejected E adiciona email+CNPJ na blocklist permanente.
// O usuário tenta registrar de novo? Bloqueado em /api/registrar.
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

  const raw = await ctx.env.BEANIC_CLIENTES.get(`cliente:${email}`)
  if (!raw) return jsonResponse({ message: 'Cadastro não encontrado' }, 404)
  const cliente = JSON.parse(raw) as ClienteRegistro

  cliente.status = 'rejected'
  cliente.rejectedAt = new Date().toISOString()
  cliente.approvalToken = undefined

  const cnpjDigits = cliente.cnpj.replace(/\D/g, '')
  const rejectMeta = JSON.stringify({
    rejectedAt: cliente.rejectedAt,
    rejectedBy: auth.email,
    empresa: cliente.empresa,
  })

  // Atualiza cadastro + entra na blocklist permanente (sem TTL)
  await Promise.all([
    ctx.env.BEANIC_CLIENTES.put(`cliente:${cliente.email}`, JSON.stringify(cliente)),
    ctx.env.BEANIC_CLIENTES.put(`blocklist:email:${cliente.email}`, rejectMeta),
    ctx.env.BEANIC_CLIENTES.put(`blocklist:cnpj:${cnpjDigits}`, rejectMeta),
  ])

  return jsonResponse({ message: 'Rejeitado e bloqueado', cliente })
}
