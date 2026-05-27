// ============================================================================
// /api/admin/usuarios  — CRUD de usuários do portal (apenas admin)
//
// GET     → lista todos os usuários
// POST    → cria um usuário { email, nome, empresa }
// DELETE  → revoga acesso ?email=<email> (apaga usuário + sessões ativas)
// ============================================================================

import {
  type Env,
  type Usuario,
  jsonResponse,
  normalizarEmail,
  requireAdmin,
  sendEmail,
} from '../_shared'

// ── GET ─────────────────────────────────────────────────────────────────────

export const onRequestGet: PagesFunction<Env> = async ctx => {
  const auth = requireAdmin(ctx.request, ctx.env)
  if (!auth.ok) return auth.res

  const list = await ctx.env.BEANIC_CLIENTES.list({ prefix: 'usuario:' })
  const usuarios: Usuario[] = []
  for (const key of list.keys) {
    const raw = await ctx.env.BEANIC_CLIENTES.get(key.name)
    if (!raw) continue
    try {
      usuarios.push(JSON.parse(raw) as Usuario)
    } catch {
      // pula entradas corrompidas
    }
  }

  usuarios.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return jsonResponse({ total: usuarios.length, usuarios })
}

// ── POST ────────────────────────────────────────────────────────────────────

export const onRequestPost: PagesFunction<Env> = async ctx => {
  const auth = requireAdmin(ctx.request, ctx.env)
  if (!auth.ok) return auth.res

  let payload: unknown
  try {
    payload = await ctx.request.json()
  } catch {
    return jsonResponse({ message: 'JSON inválido' }, 400)
  }

  const body = (payload ?? {}) as { email?: unknown; nome?: unknown; empresa?: unknown }
  const email = normalizarEmail(body.email)
  const nome = typeof body.nome === 'string' ? body.nome.trim() : ''
  const empresa = typeof body.empresa === 'string' ? body.empresa.trim() : ''

  if (!email) return jsonResponse({ message: 'E-mail inválido' }, 400)
  if (!nome) return jsonResponse({ message: 'Nome obrigatório' }, 400)
  if (!empresa) return jsonResponse({ message: 'Empresa obrigatória' }, 400)

  const existente = await ctx.env.BEANIC_CLIENTES.get(`usuario:${email}`)
  if (existente) return jsonResponse({ message: 'Já existe usuário com este e-mail' }, 409)

  const usuario: Usuario = {
    email,
    nome,
    empresa,
    createdAt: new Date().toISOString(),
    createdBy: auth.email,
  }

  await ctx.env.BEANIC_CLIENTES.put(`usuario:${email}`, JSON.stringify(usuario))

  // Avisa o usuário que ele já pode entrar — falha silenciosa pra não derrubar
  // a criação se o Resend estiver fora.
  await sendEmail(ctx.env, {
    to: email,
    subject: 'Beanic — Seu acesso ao portal foi criado',
    html: boasVindasHtml({ nome, empresa, siteUrl: ctx.env.SITE_URL }),
  }).catch(err => {
    console.warn('Falha ao enviar e-mail de boas-vindas:', err)
  })

  return jsonResponse({ message: 'Usuário criado', usuario })
}

// ── DELETE ──────────────────────────────────────────────────────────────────

export const onRequestDelete: PagesFunction<Env> = async ctx => {
  const auth = requireAdmin(ctx.request, ctx.env)
  if (!auth.ok) return auth.res

  const url = new URL(ctx.request.url)
  const email = normalizarEmail(url.searchParams.get('email'))
  if (!email) return jsonResponse({ message: 'E-mail inválido' }, 400)

  const existente = await ctx.env.BEANIC_CLIENTES.get(`usuario:${email}`)
  if (!existente) return jsonResponse({ message: 'Usuário não encontrado' }, 404)

  // Apaga o usuário + qualquer OTP pendente. Sessões ativas ficam órfãs e
  // são rejeitadas no próximo /api/auth/me (porque usuario:<email> não existe).
  await ctx.env.BEANIC_CLIENTES.delete(`usuario:${email}`)
  await ctx.env.BEANIC_CLIENTES.delete(`otp:${email}`)

  return jsonResponse({ message: 'Usuário revogado' })
}

// ── Templates ───────────────────────────────────────────────────────────────

function boasVindasHtml(p: { nome: string; empresa: string; siteUrl: string }): string {
  const primeiroNome = p.nome.split(' ')[0] || p.nome
  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#050d18;color:#e8eef6;padding:32px;margin:0;">
  <div style="max-width:520px;margin:0 auto;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:32px;">
    <div style="font-size:11px;color:#2bb4e5;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">Acesso liberado</div>
    <h1 style="font-size:22px;margin:0 0 12px;font-weight:600;font-family:'Sora',sans-serif;">Bem-vindo ao portal Beanic</h1>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 16px;">Olá <strong>${escape(primeiroNome)}</strong>,</p>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 16px;">Seu acesso ao portal Beanic foi liberado para a <strong>${escape(p.empresa)}</strong>. Você pode entrar a qualquer momento.</p>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 24px;">Para entrar, acesse a Área do Usuário com este e-mail. Você receberá um código de 6 dígitos para confirmar o acesso.</p>
    <div style="text-align:center;margin-bottom:24px;">
      <a href="${p.siteUrl}/login" style="display:inline-block;background:#2bb4e5;color:#04121d;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;">Entrar no portal</a>
    </div>
    <p style="color:#6c7c91;font-size:11px;margin-top:24px;border-top:1px solid rgba(150,180,210,0.10);padding-top:16px;">Beanic — Soluções industriais</p>
  </div>
</body></html>`
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
