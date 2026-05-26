import './ClienteConta.css'

const empresa = {
  razaoSocial: 'AMACOM Indústria LTDA',
  cnpj: '00.000.000/0001-00',
  inscricaoEstadual: '00.000.000-0',
  responsavel: 'Diretor de TI',
  cidade: 'Manaus / AM',
  endereco: 'Polo Industrial de Manaus',
}

const contrato = {
  inicio: '2026-05-26',
  validade: '2027-05-26',
  plano: 'Self-host Premium',
  usuariosLimite: 50,
  usuariosAtivos: 12,
}

const canaisSuporte = [
  {
    canal: 'E-mail',
    valor: 'suporte@beanic.com.br',
    desc: 'Resposta em até 24h em dias úteis',
    href: 'mailto:suporte@beanic.com.br',
    icon: '✉',
  },
  {
    canal: 'WhatsApp',
    valor: '+55 (92) 0000-0000',
    desc: 'Chat direto em horário comercial',
    href: 'https://wa.me/559200000000',
    icon: '☎',
  },
  {
    canal: 'Ticket técnico',
    valor: 'Abrir chamado',
    desc: 'Pra incidentes em produção',
    href: 'mailto:suporte@beanic.com.br?subject=%5BURGENTE%5D%20Incidente%20em%20produ%C3%A7%C3%A3o',
    icon: '◉',
  },
]

export default function ClienteConta() {
  return (
    <div>
      <div className="cliente-page-head">
        <div className="mono">Conta e suporte</div>
        <h1>Dados da empresa</h1>
        <p className="cliente-page-lead">
          Informações de cadastro, contrato vigente e canais de contato com nosso time de
          suporte técnico.
        </p>
      </div>

      <div className="cliente-conta-grid">
        <section className="panel cliente-conta-section">
          <h2>Empresa</h2>
          <DataRow label="Razão social" value={empresa.razaoSocial} />
          <DataRow label="CNPJ" value={empresa.cnpj} />
          <DataRow label="Inscrição estadual" value={empresa.inscricaoEstadual} />
          <DataRow label="Responsável" value={empresa.responsavel} />
          <DataRow label="Localização" value={empresa.cidade} />
          <DataRow label="Endereço" value={empresa.endereco} />
          <div className="cliente-conta-foot">
            <a href="mailto:suporte@beanic.com.br?subject=Atualiza%C3%A7%C3%A3o%20de%20cadastro" className="cliente-card-link">
              Solicitar alteração →
            </a>
          </div>
        </section>

        <section className="panel cliente-conta-section">
          <h2>Contrato</h2>
          <DataRow label="Plano" value={contrato.plano} />
          <DataRow label="Início" value={fmtDate(contrato.inicio)} />
          <DataRow label="Validade" value={fmtDate(contrato.validade)} highlight />
          <DataRow
            label="Usuários"
            value={`${contrato.usuariosAtivos} / ${contrato.usuariosLimite}`}
          />
          <div className="cliente-conta-progress">
            <div
              className="cliente-conta-progress-fill"
              style={{ width: `${(contrato.usuariosAtivos / contrato.usuariosLimite) * 100}%` }}
            />
          </div>
          <div className="cliente-conta-foot">
            <a href="mailto:comercial@beanic.com.br?subject=Renova%C3%A7%C3%A3o%20de%20contrato" className="cliente-card-link">
              Renovar contrato →
            </a>
          </div>
        </section>
      </div>

      <section className="cliente-suporte">
        <h2>Canais de suporte</h2>
        <div className="cliente-suporte-grid">
          {canaisSuporte.map(c => (
            <a key={c.canal} href={c.href} className="panel cliente-suporte-card" target={c.canal === 'WhatsApp' ? '_blank' : undefined} rel="noreferrer">
              <div className="cliente-suporte-icon">{c.icon}</div>
              <div className="cliente-suporte-canal mono">{c.canal}</div>
              <div className="cliente-suporte-valor">{c.valor}</div>
              <div className="cliente-suporte-desc">{c.desc}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

function DataRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="cliente-data-row">
      <span className="cliente-data-label mono">{label}</span>
      <span className={`cliente-data-value ${highlight ? 'highlight' : ''}`}>{value}</span>
    </div>
  )
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
