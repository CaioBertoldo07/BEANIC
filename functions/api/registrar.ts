// ============================================================================
// POST /api/registrar
//
// Recebe cadastro do form público, salva no KV como pending, dispara e-mail
// pro admin com link de aprovação e e-mail de confirmação pro cliente.
// ============================================================================

import {
  type Env,
  type ClienteRegistro,
  type ApprovalToken,
  validateRegistro,
  sendEmail,
  generateToken,
  jsonResponse,
  fetchCnpj,
} from './_shared'

export const onRequestPost: PagesFunction<Env> = async ctx => {
  let payload: unknown
  try {
    payload = await ctx.request.json()
  } catch {
    return jsonResponse({ message: 'JSON inválido' }, 400)
  }

  const v = validateRegistro(payload)
  if (!v.ok) return jsonResponse({ message: v.error }, 400)

  const { email, nome, empresa, cnpj, telefone, origem } = v.data
  const cnpjDigits = cnpj.replace(/\D/g, '')

  // Blocklist: e-mail OU CNPJ já rejeitados não podem registrar de novo.
  // Storage permanente (sem TTL) — só admin desbloqueia via /admin/desbloquear.
  const [emailBloqueado, cnpjBloqueado] = await Promise.all([
    ctx.env.BEANIC_CLIENTES.get(`blocklist:email:${email}`),
    ctx.env.BEANIC_CLIENTES.get(`blocklist:cnpj:${cnpjDigits}`),
  ])
  if (emailBloqueado || cnpjBloqueado) {
    // Resposta genérica — não revelar que foi rejeitado especificamente.
    return jsonResponse(
      { message: 'Não foi possível processar este cadastro. Entre em contato pelo e-mail comercial@beanic.com.br.' },
      403,
    )
  }

  // Valida CNPJ na BrasilAPI (rejeita se não existir na Receita).
  // Falha de rede/timeout NÃO derruba o cadastro — fail-open, admin
  // valida manualmente. Mas CNPJ explicitamente não encontrado bloqueia.
  let cnpjInfo: Awaited<ReturnType<typeof fetchCnpj>> = null
  try {
    cnpjInfo = await fetchCnpj(cnpj)
    if (cnpjInfo === null) {
      return jsonResponse(
        { message: 'CNPJ não encontrado na Receita Federal. Verifique se digitou corretamente.' },
        400,
      )
    }
  } catch (err) {
    console.warn('BrasilAPI indisponível, prosseguindo sem validação:', err)
  }

  // Idempotência: se já existe cadastro pra esse e-mail, retorna ok
  // sem reprocessar (evita spam de notificação pro admin).
  const existing = await ctx.env.BEANIC_CLIENTES.get(`cliente:${email}`)
  if (existing) {
    return jsonResponse({ message: 'Cadastro já recebido', existing: true })
  }

  // Cria token de aprovação (1 token serve pra aprovar OU rejeitar — a action
  // vai no link). 7 dias de validade.
  const approvalToken = generateToken()
  const tokenData: ApprovalToken = {
    email,
    action: 'aprovar', // checagem real é por path /aprovar vs /rejeitar
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }

  const cliente: ClienteRegistro = {
    email,
    nome,
    empresa,
    cnpj,
    telefone,
    origem,
    status: 'pending',
    createdAt: new Date().toISOString(),
    approvalToken,
    cnpjInfo: cnpjInfo
      ? {
          razaoSocial: cnpjInfo.razao_social,
          nomeFantasia: cnpjInfo.nome_fantasia,
          municipio: cnpjInfo.municipio,
          uf: cnpjInfo.uf,
          cnae: cnpjInfo.cnae_fiscal_descricao,
          situacao: cnpjInfo.descricao_situacao_cadastral,
        }
      : null,
  }

  // Salva com TTL de 90 dias — cadastros pending velhos somem sozinhos
  await ctx.env.BEANIC_CLIENTES.put(`cliente:${email}`, JSON.stringify(cliente), {
    expirationTtl: 90 * 24 * 60 * 60,
  })
  await ctx.env.BEANIC_CLIENTES.put(`token:${approvalToken}`, JSON.stringify(tokenData), {
    expirationTtl: 7 * 24 * 60 * 60,
  })

  // E-mail pro admin com botões de aprovar/rejeitar
  const aprovarUrl = `${ctx.env.SITE_URL}/api/aprovar?token=${approvalToken}`
  const rejeitarUrl = `${ctx.env.SITE_URL}/api/rejeitar?token=${approvalToken}`

  await sendEmail(ctx.env, {
    to: ctx.env.ADMIN_EMAIL,
    subject: `[Beanic] Novo cadastro: ${empresa}`,
    html: adminEmailHtml({ nome, empresa, cnpj, email, telefone, origem, aprovarUrl, rejeitarUrl }),
  })

  // E-mail de confirmação pro cliente
  await sendEmail(ctx.env, {
    to: email,
    subject: 'Beanic — Cadastro recebido',
    html: clienteEmailHtml({ nome, empresa }),
  }).catch(err => {
    // Falha em e-mail pro cliente não derruba a request (admin já foi notificado).
    console.warn('Falha ao enviar e-mail pro cliente:', err)
  })

  return jsonResponse({ message: 'Cadastro recebido' })
}

// ── Templates HTML ──────────────────────────────────────────────────────────

function adminEmailHtml(p: {
  nome: string
  empresa: string
  cnpj: string
  email: string
  telefone: string
  origem: string
  aprovarUrl: string
  rejeitarUrl: string
}): string {
  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#050d18;color:#e8eef6;padding:32px;margin:0;">
  <div style="max-width:560px;margin:0 auto;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:32px;">
    <div style="font-size:11px;color:#2bb4e5;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;">Novo cadastro</div>
    <h1 style="font-size:22px;margin:0 0 6px;font-weight:600;">${escape(p.empresa)}</h1>
    <p style="color:#9aa9bc;margin:0 0 24px;font-size:14px;">Cadastro aguardando sua aprovação.</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px;">
      <tr><td style="color:#6c7c91;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);">Nome</td><td style="text-align:right;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);">${escape(p.nome)}</td></tr>
      <tr><td style="color:#6c7c91;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);">E-mail</td><td style="text-align:right;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);"><a href="mailto:${escape(p.email)}" style="color:#5ed0f5;">${escape(p.email)}</a></td></tr>
      <tr><td style="color:#6c7c91;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);">Telefone</td><td style="text-align:right;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);">${escape(p.telefone)}</td></tr>
      <tr><td style="color:#6c7c91;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);">CNPJ</td><td style="text-align:right;padding:8px 0;border-bottom:1px solid rgba(150,180,210,0.06);font-family:monospace;">${escape(p.cnpj)}</td></tr>
      <tr><td style="color:#6c7c91;padding:8px 0;">Origem</td><td style="text-align:right;padding:8px 0;">${escape(p.origem || '—')}</td></tr>
    </table>

    <div style="display:flex;gap:10px;">
      <a href="${p.aprovarUrl}" style="display:inline-block;background:#2bb4e5;color:#04121d;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;">✓ Aprovar acesso</a>
      <a href="${p.rejeitarUrl}" style="display:inline-block;border:1px solid rgba(150,180,210,0.18);color:#e8eef6;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px;margin-left:8px;">Rejeitar</a>
    </div>

    <p style="color:#6c7c91;margin-top:24px;font-size:11px;">Links válidos por 7 dias. Cadastros não aprovados expiram em 90 dias.</p>
  </div>
</body></html>`
}

function clienteEmailHtml(p: { nome: string; empresa: string }): string {
  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#050d18;color:#e8eef6;padding:32px;margin:0;">
  <div style="max-width:520px;margin:0 auto;background:#0d1c2d;border:1px solid rgba(150,180,210,0.10);border-radius:14px;padding:32px;">
    <h1 style="font-size:22px;margin:0 0 12px;font-weight:600;font-family:'Sora',sans-serif;">Recebemos seu cadastro</h1>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 16px;">Olá <strong>${escape(p.nome.split(' ')[0] || p.nome)}</strong>,</p>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 16px;">Recebemos o cadastro da <strong>${escape(p.empresa)}</strong> no portal Beanic. Nosso time vai analisar em até 1 dia útil.</p>
    <p style="color:#9aa9bc;font-size:14px;line-height:1.6;margin:0 0 24px;">Você vai receber outro e-mail assim que seu acesso for liberado, com link pra entrar no portal e baixar o sistema.</p>
    <p style="color:#6c7c91;font-size:12px;margin-top:32px;border-top:1px solid rgba(150,180,210,0.10);padding-top:16px;">Beanic — Soluções industriais</p>
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
