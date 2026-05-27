// ============================================================================
// Tipos compartilhados + helpers entre as functions do portal Beanic
// ============================================================================

// Bindings injetados pelo Cloudflare Pages (configurados em wrangler.toml).
export interface Env {
  // KV: armazena usuários, códigos OTP e sessões do portal
  BEANIC_CLIENTES: KVNamespace
  // Resend (e-mails transacionais)
  RESEND_API_KEY: string
  // E-mail do admin — usado pra checar quem pode acessar /admin via CF Access
  ADMIN_EMAIL: string
  // De: dos e-mails que enviamos. Tem que ser de domínio verificado no Resend.
  MAIL_FROM: string
  // Domínio base do site
  SITE_URL: string
}

// ── Modelo de dados ─────────────────────────────────────────────────────────

export interface Usuario {
  email: string
  nome: string
  empresa: string
  createdAt: string
  createdBy: string // e-mail do admin que criou
}

// Nome do cookie de sessão do portal (cliente). Admin continua usando o
// cookie próprio do Cloudflare Access (CF_Authorization).
export const SESSION_COOKIE = 'beanic_session'
// 7 dias em segundos
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60
// 10 minutos em segundos
export const OTP_TTL_SECONDS = 10 * 60

// ── Cloudflare Access (validar admin no servidor) ───────────────────────────

// Em rotas protegidas, CF Access injeta o header com o e-mail autenticado.
// Confiar SÓ se a request veio pela borda da CF (no Pages Functions, sim).
export function getAuthEmail(request: Request): string | null {
  return request.headers.get('Cf-Access-Authenticated-User-Email')
}

// Bloqueia se quem chamou não é admin. Em produção CF Access JÁ filtra na
// borda — esta é defesa em profundidade caso o path /api/admin/* não esteja
// numa policy de Access (configuração faltando).
export function requireAdmin(request: Request, env: Env): { ok: true; email: string } | { ok: false; res: Response } {
  const email = getAuthEmail(request)
  if (!email) {
    return {
      ok: false,
      res: jsonResponse({ message: 'Não autenticado. Esta rota deve estar protegida por Cloudflare Access.' }, 401),
    }
  }
  if (email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) {
    return { ok: false, res: jsonResponse({ message: 'Apenas o admin pode executar esta ação.' }, 403) }
  }
  return { ok: true, email }
}

// ── Sessão do portal (cookie próprio) ───────────────────────────────────────

// Lê o cookie de sessão e devolve o usuário, ou null se sessão inválida/expirada.
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
