// ============================================================================
// POST /api/auth/logout
//
// Apaga sessão do KV e limpa o cookie.
// ============================================================================

import {
  type Env,
  SESSION_COOKIE,
  clearSessionCookie,
  jsonResponse,
} from '../_shared'

export const onRequestPost: PagesFunction<Env> = async ctx => {
  const cookie = ctx.request.headers.get('Cookie') ?? ''
  const match = cookie.split(';').map(p => p.trim()).find(p => p.startsWith(`${SESSION_COOKIE}=`))
  const token = match?.split('=').slice(1).join('=')

  if (token) {
    await ctx.env.BEANIC_CLIENTES.delete(`sessao:${token}`)
  }

  return jsonResponse({ message: 'Sessão encerrada' }, 200, {
    'Set-Cookie': clearSessionCookie(),
  })
}
