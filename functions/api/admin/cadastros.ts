// ============================================================================
// GET /api/admin/cadastros?status=pending|approved|rejected|all
//
// Lista todos os cadastros do KV. Protegido por CF Access (admin only).
// Retorna ordenado por createdAt desc (mais recente primeiro).
// ============================================================================

import { type Env, type ClienteRegistro, jsonResponse, requireAdmin } from '../_shared'

export const onRequestGet: PagesFunction<Env> = async ctx => {
  const auth = requireAdmin(ctx.request, ctx.env)
  if (!auth.ok) return auth.res

  const url = new URL(ctx.request.url)
  const statusFilter = url.searchParams.get('status') ?? 'all'

  // Lista todas as chaves cliente:* (sem prefix, lista vazio mesmo no KV).
  // Pageable se passar de 1000 entries — por enquanto cabe.
  const list = await ctx.env.BEANIC_CLIENTES.list({ prefix: 'cliente:' })

  const cadastros: ClienteRegistro[] = []
  for (const key of list.keys) {
    const raw = await ctx.env.BEANIC_CLIENTES.get(key.name)
    if (raw) {
      try {
        cadastros.push(JSON.parse(raw))
      } catch {
        /* entrada corrompida, ignora */
      }
    }
  }

  // Filtro por status
  const filtered =
    statusFilter === 'all'
      ? cadastros
      : cadastros.filter(c => c.status === statusFilter)

  // Ordena: pending primeiro (precisa de ação), depois desc por createdAt
  filtered.sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1
    if (b.status === 'pending' && a.status !== 'pending') return 1
    return b.createdAt.localeCompare(a.createdAt)
  })

  // Remove approvalToken antes de devolver pro client (não precisa lá)
  const safe = filtered.map(({ approvalToken: _t, ...c }) => c)

  return jsonResponse({
    total: safe.length,
    cadastros: safe,
    stats: {
      pending: cadastros.filter(c => c.status === 'pending').length,
      approved: cadastros.filter(c => c.status === 'approved').length,
      rejected: cadastros.filter(c => c.status === 'rejected').length,
    },
  })
}
