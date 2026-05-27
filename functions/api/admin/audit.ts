// ============================================================================
// GET /api/admin/audit  — retorna últimas N ações admin (apenas admin)
// ============================================================================

import { type Env, jsonResponse, listAudit, requireAdmin } from '../_shared'

export const onRequestGet: PagesFunction<Env> = async ctx => {
  const auth = await requireAdmin(ctx.request, ctx.env)
  if (!auth.ok) return auth.res

  const url = new URL(ctx.request.url)
  const limitParam = url.searchParams.get('limit')
  const limit = Math.min(Math.max(parseInt(limitParam ?? '50', 10) || 50, 1), 200)

  const entries = await listAudit(ctx.env, limit)
  return jsonResponse({ total: entries.length, entries })
}
