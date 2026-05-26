import { Link } from 'react-router-dom'
import './ClienteDashboard.css'

// Placeholder hardcoded — vai conectar com backend de licenciamento depois
const licenca = {
  status: 'ativa' as 'ativa' | 'expirando' | 'expirada',
  empresa: 'AMACOM Indústria',
  cnpj: '00.000.000/0001-00',
  validade: '2027-05-26',
  diasRestantes: 365,
  plano: 'Self-host Premium',
  versao: '1.0.0',
}

const ultimaVersao = {
  numero: '1.0.0',
  data: '2026-05-26',
  destaques: ['Release inicial', 'Módulo de PCP completo', 'Auditoria estruturada'],
}

export default function ClienteDashboard() {
  return (
    <div className="cliente-dashboard">
      <div className="cliente-page-head">
        <div>
          <div className="mono">Bem-vindo</div>
          <h1>Olá, {licenca.empresa}</h1>
          <p className="cliente-page-lead">
            Aqui você baixa o sistema, acessa documentação e gerencia sua conta. Esta área é
            privada e só você e usuários autorizados da {licenca.empresa} acessam.
          </p>
        </div>
      </div>

      <div className="cliente-cards">
        <article className="panel cliente-card cliente-card-license">
          <div className="cliente-card-head">
            <div className="mono">Sua licença</div>
            <span className={`cliente-license-badge cliente-license-${licenca.status}`}>
              {licenca.status === 'ativa' && 'Ativa'}
              {licenca.status === 'expirando' && 'Expirando'}
              {licenca.status === 'expirada' && 'Expirada'}
            </span>
          </div>
          <div className="cliente-license-grid">
            <Field label="Plano" value={licenca.plano} />
            <Field label="Versão" value={`v${licenca.versao}`} />
            <Field label="CNPJ" value={licenca.cnpj} />
            <Field label="Válida até" value={fmtDate(licenca.validade)} highlight />
          </div>
          <div className="cliente-license-foot">
            <span className="mono">{licenca.diasRestantes} dias restantes</span>
            <Link to="/cliente/conta" className="cliente-card-link">
              Gerenciar licença →
            </Link>
          </div>
        </article>

        <article className="panel cliente-card">
          <div className="cliente-card-head">
            <div className="mono">Última versão disponível</div>
          </div>
          <div className="cliente-version">
            <div className="cliente-version-num">v{ultimaVersao.numero}</div>
            <div className="cliente-version-date mono">{fmtDate(ultimaVersao.data)}</div>
          </div>
          <ul className="cliente-version-highlights">
            {ultimaVersao.destaques.map(d => (
              <li key={d}>
                <span className="cliente-bullet">▸</span> {d}
              </li>
            ))}
          </ul>
          <div className="cliente-license-foot">
            <Link to="/cliente/downloads" className="btn btn-primary cliente-btn-sm">
              Baixar agora
              <span className="btn-arrow" />
            </Link>
            <Link to="/cliente/docs" className="cliente-card-link">
              Ver changelog →
            </Link>
          </div>
        </article>

        <article className="panel cliente-card">
          <div className="cliente-card-head">
            <div className="mono">Atalhos rápidos</div>
          </div>
          <div className="cliente-shortcuts">
            <Shortcut to="/cliente/downloads" icon="↓" title="Downloads" desc="Pacote self-host + licença" />
            <Shortcut to="/cliente/docs" icon="☰" title="Documentação" desc="Guia de instalação + FAQ" />
            <Shortcut to="/cliente/conta" icon="○" title="Conta" desc="Dados + suporte técnico" />
          </div>
        </article>
      </div>
    </div>
  )
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="cliente-field">
      <span className="cliente-field-label mono">{label}</span>
      <span className={`cliente-field-value ${highlight ? 'highlight' : ''}`}>{value}</span>
    </div>
  )
}

function Shortcut({ to, icon, title, desc }: { to: string; icon: string; title: string; desc: string }) {
  return (
    <Link to={to} className="cliente-shortcut">
      <div className="cliente-shortcut-icon">{icon}</div>
      <div>
        <div className="cliente-shortcut-title">{title}</div>
        <div className="cliente-shortcut-desc">{desc}</div>
      </div>
    </Link>
  )
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
