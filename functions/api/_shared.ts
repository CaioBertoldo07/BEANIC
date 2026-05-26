// ============================================================================
// Tipos compartilhados + helpers entre as functions do portal Beanic
// ============================================================================

// Bindings injetados pelo Cloudflare Pages (configurados em wrangler.toml).
export interface Env {
  // KV: armazena cadastros e tokens de aprovação
  BEANIC_CLIENTES: KVNamespace
  // Resend (e-mails transacionais)
  RESEND_API_KEY: string
  // E-mail que recebe notificações de novo cadastro
  ADMIN_EMAIL: string
  // De: dos e-mails que enviamos. Tem que ser de domínio verificado no Resend.
  MAIL_FROM: string
  // Domínio base do site (pra montar URLs de aprovação)
  SITE_URL: string
  // CF Access API — pra adicionar e-mail aprovado na policy automaticamente
  CF_ACCOUNT_ID: string
  CF_API_TOKEN: string
  CF_ACCESS_APP_UID: string
  CF_ACCESS_POLICY_UID: string
}

export interface ClienteRegistro {
  email: string
  nome: string
  empresa: string
  cnpj: string
  telefone: string
  origem: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  approvedAt?: string
  rejectedAt?: string
  approvalToken?: string
  // Snapshot da BrasilAPI no momento do cadastro (opcional — pode ser null
  // se BrasilAPI estava fora). Mostra razão social, município, CNAE pro admin.
  cnpjInfo?: {
    razaoSocial: string
    nomeFantasia: string | null
    municipio: string
    uf: string
    cnae: string
    situacao: string
  } | null
}

export interface ApprovalToken {
  email: string
  action: 'aprovar' | 'rejeitar'
  expiresAt: number
}

// ── CF Access (validar admin no servidor) ───────────────────────────────────

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

// ── Cloudflare Access ───────────────────────────────────────────────────────

// Adiciona um e-mail no grupo "Approved emails" da policy de Access.
// Pra que isto funcione, a policy precisa ter sido criada com a regra "Email"
// (não "Email Domain") e o include é uma lista que vamos atualizar via API.
export async function addEmailToAccessPolicy(env: Env, email: string): Promise<void> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/access/apps/${env.CF_ACCESS_APP_UID}/policies/${env.CF_ACCESS_POLICY_UID}`

  // 1. Pegar a policy atual
  const getRes = await fetch(url, {
    headers: { Authorization: `Bearer ${env.CF_API_TOKEN}` },
  })
  if (!getRes.ok) {
    throw new Error(`CF Access GET ${getRes.status}`)
  }
  const data = (await getRes.json()) as {
    result: { include: Array<{ email?: { email: string } }>; [k: string]: unknown }
  }
  const policy = data.result

  // 2. Adicionar e-mail no include (sem duplicar)
  const existingEmails = policy.include
    .filter(rule => rule.email)
    .map(rule => rule.email!.email)
  if (existingEmails.includes(email)) return

  policy.include = [...policy.include, { email: { email } }]

  // 3. PUT pra atualizar
  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(policy),
  })
  if (!putRes.ok) {
    const body = await putRes.text()
    throw new Error(`CF Access PUT ${putRes.status}: ${body}`)
  }
}

// ── HTML responses ──────────────────────────────────────────────────────────

export function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// ── Tokens ──────────────────────────────────────────────────────────────────

export function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

// ── BrasilAPI (validação CNPJ) ──────────────────────────────────────────────

export interface BrasilApiCnpj {
  cnpj: string
  razao_social: string
  nome_fantasia: string | null
  uf: string
  municipio: string
  bairro: string | null
  logradouro: string | null
  numero: string | null
  cep: string | null
  email: string | null
  ddd_telefone_1: string | null
  cnae_fiscal: number
  cnae_fiscal_descricao: string
  data_inicio_atividade: string
  descricao_situacao_cadastral: string
}

// Consulta CNPJ na BrasilAPI. Retorna null se não encontrado, throws em erros
// de rede. Timeout de 4s pra não pendurar a request.
export async function fetchCnpj(cnpj: string): Promise<BrasilApiCnpj | null> {
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`, {
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`BrasilAPI ${res.status}`)
    return (await res.json()) as BrasilApiCnpj
  } catch (err) {
    clearTimeout(timeout)
    if ((err as Error).name === 'AbortError') {
      throw new Error('Timeout consultando BrasilAPI')
    }
    throw err
  }
}

// ── Validação ───────────────────────────────────────────────────────────────

export function validateRegistro(body: unknown): { ok: true; data: Omit<ClienteRegistro, 'status' | 'createdAt' | 'approvalToken'> } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Payload inválido' }
  const b = body as Record<string, unknown>

  const req = ['nome', 'empresa', 'cnpj', 'email', 'telefone']
  for (const k of req) {
    if (typeof b[k] !== 'string' || !(b[k] as string).trim()) {
      return { ok: false, error: `Campo "${k}" obrigatório` }
    }
  }

  const email = (b.email as string).trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'E-mail inválido' }
  }

  const cnpjDigits = (b.cnpj as string).replace(/\D/g, '')
  if (cnpjDigits.length !== 14) {
    return { ok: false, error: 'CNPJ deve ter 14 dígitos' }
  }

  return {
    ok: true,
    data: {
      nome: (b.nome as string).trim(),
      empresa: (b.empresa as string).trim(),
      cnpj: b.cnpj as string,
      email,
      telefone: b.telefone as string,
      origem: typeof b.origem === 'string' ? b.origem : '',
    },
  }
}
