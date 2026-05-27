// ============================================================================
// POST /api/auth/verificar-codigo
//
// Recebe { email, codigo }. Confere contra otp:<email> no KV. Se bater, cria
// sessão no KV (sessao:<token>) e devolve cookie HttpOnly Secure SameSite=Lax.
// ============================================================================

import {
  type Env,
  SESSION_TTL_SECONDS,
  generateToken,
  jsonResponse,
  normalizarEmail,
  setSessionCookie,
} from '../_shared'

export const onRequestPost: PagesFunction<Env> = async ctx => {
  let payload: unknown
  try {
    payload = await ctx.request.json()
  } catch {
    return jsonResponse({ message: 'JSON inválido' }, 400)
  }

  const body = (payload ?? {}) as { email?: unknown; codigo?: unknown }
  const email = normalizarEmail(body.email)
  const codigo = typeof body.codigo === 'string' ? body.codigo.trim() : ''

  if (!email) return jsonResponse({ message: 'E-mail inválido' }, 400)
  if (!/^\d{6}$/.test(codigo)) return jsonResponse({ message: 'Código inválido' }, 400)

  const armazenado = await ctx.env.BEANIC_CLIENTES.get(`otp:${email}`)
  if (!armazenado || armazenado !== codigo) {
    return jsonResponse({ message: 'Código incorreto ou expirado' }, 401)
  }

  const usuarioRaw = await ctx.env.BEANIC_CLIENTES.get(`usuario:${email}`)
  if (!usuarioRaw) {
    // Usuário foi revogado entre solicitar e verificar — improvável mas trata.
    return jsonResponse({ message: 'Conta não encontrada' }, 404)
  }

  // Invalida o OTP após uso (single-use).
  await ctx.env.BEANIC_CLIENTES.delete(`otp:${email}`)

  const token = generateToken()
  await ctx.env.BEANIC_CLIENTES.put(`sessao:${token}`, email, {
    expirationTtl: SESSION_TTL_SECONDS,
  })

  return jsonResponse({ message: 'Autenticado' }, 200, {
    'Set-Cookie': setSessionCookie(token),
  })
}
