import './Services.css'

const services = [
  {
    num: '01 / Presença digital',
    title: 'Sites institucionais',
    desc: 'Sites pensados para indústrias: posicionamento estratégico, narrativa técnica e estrutura que converte buyer industrial em conversa qualificada.',
    feats: ['Arquitetura comercial', 'Páginas de produto e linha', 'Integração com CRM e ERP'],
    size: 'big',
    icon: (
      <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 14h4" />
      </svg>
    ),
  },
  {
    num: '02 / Software interno',
    title: 'Sistemas sob medida',
    desc: 'Sistemas internos construídos sobre o fluxo real da fábrica — estoque, OS, qualidade, manutenção, expedição.',
    feats: ['Modelagem orientada ao processo', 'Permissões por setor'],
    size: 'med',
    icon: (
      <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Dashboards gerenciais',
    desc: 'Indicadores de produção, finanças e operação consolidados em uma única visão executiva.',
    feats: [],
    size: '',
    icon: (
      <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Automação de processos',
    desc: 'Substituímos planilhas, e-mails e rotinas manuais por fluxos automáticos auditáveis.',
    feats: [],
    size: '',
    icon: (
      <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Integração setorial',
    desc: 'Produção, RH, financeiro e estoque conversando em tempo real — uma única fonte de verdade.',
    feats: [],
    size: '',
    icon: (
      <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 7h6v6H4zM14 11h6v6h-6zM10 10l4 4" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              <span className="mono">Serviços / 01</span>
            </div>
            <h2>Cinco frentes para digitalizar sua operação industrial.</h2>
          </div>
          <p className="lead">
            Da presença digital ao chão de fábrica conectado. Cada solução é
            desenhada a partir do fluxo real da sua indústria, não de templates.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.num} className={`svc${svc.size ? ' ' + svc.size : ''}`}>
              <div>
                <div className="num">{svc.num}</div>
                <div className="ic" style={{ marginTop: '18px' }}>
                  {svc.icon}
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </div>
              {svc.feats.length > 0 && (
                <div className="feats">
                  {svc.feats.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
