// ============================================================================
// Tipos compartilhados + helpers entre as functions do portal Beanic
// ============================================================================

// Bindings injetados pelo Cloudflare Pages (configurados em wrangler.toml).
export interface Env {
  // KV: armazena usuários, códigos OTP, sessões do portal e audit log
  BEANIC_CLIENTES: KVNamespace
  // Resend (e-mails transacionais)
  RESEND_API_KEY: string
  // E-mail do admin — único e-mail aceito como admin pelo backend
  ADMIN_EMAIL: string
  // De: dos e-mails que enviamos. Tem que ser de domínio verificado no Resend.
  MAIL_FROM: string
  // Domínio base do site
  SITE_URL: string
  // CF Access — necessárias pra validar o JWT no servidor.
  // TEAM_DOMAIN: ex `beanic.cloudflareaccess.com` (SEM https://)
  // AUD: Application Audience tag, único por Access Application
  CF_ACCESS_TEAM_DOMAIN: string
  CF_ACCESS_AUD: string
}

// ── Modelo de dados ─────────────────────────────────────────────────────────

export interface Usuario {
  email: string
  nome: string
  empresa: string
  createdAt: string
  createdBy: string // e-mail do admin que criou
}

export interface AuditEntry {
  id: string
  timestamp: string
  acao: 'criar' | 'revogar'
  alvo: string // e-mail do usuário afetado
  executor: string // e-mail do admin
  ip: string
  userAgent: string
}

// Nome do cookie de sessão do portal (cliente). Admin continua usando o
// cookie próprio do Cloudflare Access (CF_Authorization).
export const SESSION_COOKIE = 'beanic_session'
export const CF_ACCESS_COOKIE = 'CF_Authorization'
// 7 dias em segundos
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60
// 10 minutos em segundos
export const OTP_TTL_SECONDS = 10 * 60
// Audit log: 1 ano de retenção
export const AUDIT_TTL_SECONDS = 365 * 24 * 60 * 60

// ── Cloudflare Access JWT verification ──────────────────────────────────────
// Em vez de confiar cegamente no header Cf-Access-Authenticated-User-Email
// (que poderia ser forjado se a request chegasse no origin por fora do edge),
// validamos a assinatura RS256 do cookie CF_Authorization contra as JWKs
// publicadas pelo team em /cdn-cgi/access/certs.

type JwkKey = JsonWebKey & { kid?: string; alg?: string; use?: string }
type JwksCache = { keys: JwkKey[]; expiresAt: number }
let jwksCache: JwksCache | null = null
const JWKS_TTL_MS = 60 * 60 * 1000 // 1h em memória do isolate

async function fetchJwks(teamDomain: string): Promise<JwkKey[]> {
  if (jwksCache && jwksCache.expiresAt > Date.now()) return jwksCache.keys
  const url = `https://${teamDomain}/cdn-cgi/access/certs`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`JWKS fetch ${res.status}`)
  const body = (await res.json()) as { keys: JwkKey[] }
  jwksCache = { keys: body.keys, expiresAt: Date.now() + JWKS_TTL_MS }
  return body.keys
}

function base64UrlDecode(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4))
  const b64 = (input + pad).replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function base64UrlDecodeToString(input: string): string {
  return new TextDecoder().decode(base64UrlDecode(input))
}

interface AccessJwtPayload {
  email?: string
  iss?: string
  aud?: string | string[]
  exp?: number
  iat?: number
}

// Verifica o JWT do CF Access e retorna o payload. Throw em qualquer erro.
export async function verifyAccessJwt(token: string, env: Env): Promise<AccessJwtPayload> {
  if (!env.CF_ACCESS_TEAM_DOMAIN || !env.CF_ACCESS_AUD) {
    throw new Error('CF_ACCESS_TEAM_DOMAIN e CF_ACCESS_AUD precisam estar configurados')
  }

  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('JWT malformado')
  const [headerB64, payloadB64, signatureB64] = parts

  const header = JSON.parse(base64UrlDecodeToString(headerB64)) as { kid?: string; alg?: string }
  if (header.alg !== 'RS256') throw new Error(`Algoritmo inesperado: ${header.alg}`)
  if (!header.kid) throw new Error('JWT sem kid')

  const jwks = await fetchJwks(env.CF_ACCESS_TEAM_DOMAIN)
  const jwk = jwks.find(k => k.kid === header.kid)
  if (!jwk) throw new Error(`Chave ${header.kid} não encontrada nas JWKs`)

  const key = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  )

  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
  const signature = base64UrlDecode(signatureB64)
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, data)
  if (!ok) throw new Error('Assinatura inválida')

  const payload = JSON.parse(base64UrlDecodeToString(payloadB64)) as AccessJwtPayload

  // Valida claims
  const now = Math.floor(Date.now() / 1000)
  if (!payload.exp || payload.exp < now) throw new Error('JWT expirado')

  const expectedIss = `https://${env.CF_ACCESS_TEAM_DOMAIN}`
  if (payload.iss !== expectedIss) throw new Error(`iss inesperado: ${payload.iss}`)

  const audList = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
  if (!audList.includes(env.CF_ACCESS_AUD)) throw new Error('aud não bate com CF_ACCESS_AUD')

  if (!payload.email) throw new Error('JWT sem e-mail')

  return payload
}

// Bloqueia se quem chamou não é admin. Validamos o JWT (defesa em profundidade)
// e cruzamos com ADMIN_EMAIL. Se o cookie nem existe → 401.
export async function requireAdmin(
  request: Request,
  env: Env,
): Promise<{ ok: true; email: string } | { ok: false; res: Response }> {
  const token = readCookie(request, CF_ACCESS_COOKIE)
  if (!token) {
    return {
      ok: false,
      res: jsonResponse({ message: 'Não autenticado. Esta rota deve estar protegida por Cloudflare Access.' }, 401),
    }
  }

  let payload: AccessJwtPayload
  try {
    payload = await verifyAccessJwt(token, env)
  } catch (err) {
    console.warn('JWT do CF Access inválido:', (err as Error).message)
    return { ok: false, res: jsonResponse({ message: 'Sessão de admin inválida ou expirada.' }, 401) }
  }

  const email = (payload.email ?? '').toLowerCase()
  if (email !== env.ADMIN_EMAIL.toLowerCase()) {
    return { ok: false, res: jsonResponse({ message: 'Apenas o admin pode executar esta ação.' }, 403) }
  }
  return { ok: true, email }
}

// ── Sessão do portal (cookie próprio do cliente) ────────────────────────────

export async function getSessao(request: Request, env: Env): Promise<Usuario | null> {
  const token = readCookie(request, SESSION_COOKIE)
  if (!token) return null
  const email = await env.BEANIC_CLIENTES.get(`sessao:${token}`)
  if (!email) return null
  const raw = await env.BEANIC_CLIENTES.get(`usuario:${email}`)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Usuario
  } catch {
    return null
  }
}

export function setSessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie')
  if (!header) return null
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return v.join('=')
  }
  return null
}

// ── Audit log ───────────────────────────────────────────────────────────────
// Cada entrada vira `audit:<reverse-ts>:<id>` no KV. reverse-ts ordena mais
// novo primeiro no list(). TTL de 1 ano — registros antigos somem sozinhos.

const MAX_TS = Number.MAX_SAFE_INTEGER

export async function logAudit(
  env: Env,
  request: Request,
  params: { acao: AuditEntry['acao']; alvo: string; executor: string },
): Promise<void> {
  const now = Date.now()
  const id = generateToken().slice(0, 12)
  const reverseTs = String(MAX_TS - now).padStart(16, '0')
  const entry: AuditEntry = {
    id,
    timestamp: new Date(now).toISOString(),
    acao: params.acao,
    alvo: params.alvo,
    executor: params.executor,
    ip: request.headers.get('CF-Connecting-IP') || 'unknown',
    userAgent: (request.headers.get('User-Agent') || '').slice(0, 200),
  }
  await env.BEANIC_CLIENTES.put(`audit:${reverseTs}:${id}`, JSON.stringify(entry), {
    expirationTtl: AUDIT_TTL_SECONDS,
  })
}

export async function listAudit(env: Env, limit = 50): Promise<AuditEntry[]> {
  const list = await env.BEANIC_CLIENTES.list({ prefix: 'audit:', limit })
  const entries: AuditEntry[] = []
  for (const key of list.keys) {
    const raw = await env.BEANIC_CLIENTES.get(key.name)
    if (!raw) continue
    try {
      entries.push(JSON.parse(raw) as AuditEntry)
    } catch {
      // pula entradas corrompidas
    }
  }
  return entries
}

// ── Resend ──────────────────────────────────────────────────────────────────

export async function sendEmail(
  env: Env,
  params: { to: string; subject: string; html: string },
): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend ${res.status}: ${body}`)
  }
}

// ── HTML/JSON responses ─────────────────────────────────────────────────────

export function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

// ── Tokens ──────────────────────────────────────────────────────────────────

export function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

// Gera código numérico de 6 dígitos pra OTP de login.
export function gerarCodigoOtp(): string {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  const n = ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0
  return String(n % 1_000_000).padStart(6, '0')
}

// ── Validação ───────────────────────────────────────────────────────────────

export function normalizarEmail(input: unknown): string | null {
  if (typeof input !== 'string') return null
  const email = input.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}
