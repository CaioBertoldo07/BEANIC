// ============================================================================
// GET /api/auth/me
//
// Lê cookie de sessão e devolve o usuário logado, ou 401 se não houver sessão.
// ============================================================================

import { type Env, getSessao, jsonResponse } from '../_shared'

export const onRequestGet: PagesFunction<Env> = async ctx => {
  const usuario = await getSessao(ctx.request, ctx.env)
  if (!usuario) return jsonResponse({ message: 'Não autenticado' }, 401)
  return jsonResponse({ usuario })
}
