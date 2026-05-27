import './Audiences.css'

const audiences = [
  {
    title: 'Indústrias',
    desc: 'Operações com produção, estoque, qualidade e manutenção que precisam sair da planilha.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9v.01M13 9v.01M9 13v.01M13 13v.01M9 17v.01M13 17v.01" />
      </svg>
    ),
  },
  {
    title: 'Comércios',
    desc: 'Lojas físicas e online com vendas, estoque e clientes em controles improvisados.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l1-4h16l1 4M3 9v11h18V9M3 9h18M9 13h6" />
      </svg>
    ),
  },
  {
    title: 'Prestadores de serviço',
    desc: 'Times técnicos, ateliês e estúdios com orçamento, OS e agenda no WhatsApp.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="9" r="4" />
        <path d="M17 11a4 4 0 0 0 0-8M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
  },
  {
    title: 'Empresas em crescimento',
    desc: 'Negócios saindo da fase improvisada e precisando de processo, dado e controle.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: 'Pequenos negócios',
    desc: 'Donos que fazem tudo — vendas, atendimento, gestão — e precisam liberar tempo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16v4H4zM4 13h10v8H4zM18 13h2v8h-2z" />
      </svg>
    ),
  },
  {
    title: 'Marcas sem presença digital',
    desc: 'Empresas sólidas que precisam de site institucional e narrativa comercial à altura.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" /><path d="M8 14h8" />
      </svg>
    ),
  },
  {
    title: 'Times que vivem em planilhas',
    desc: 'Operação que cresceu no Excel e Google Sheets — e já não escala mais.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" />
      </svg>
    ),
  },
  {
    title: 'Operações com WhatsApp central',
    desc: 'Negócios que dependem do app para vender, atender e cobrar — e precisam de estrutura.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
]

export default function Audiences() {
  return (
    <section className="section" id="publico" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Para quem · 02</span>
            </div>
            <h2>Negócios diferentes, uma mesma necessidade: organizar para crescer.</h2>
          </div>
          <p className="lead">
            Atendemos empresas que cresceram em planilhas e WhatsApp e agora
            precisam estruturar a operação. Não importa o porte — importa o estágio.
          </p>
        </div>
        <div className="aud-grid">
          {audiences.map((a) => (
            <div key={a.title} className="aud">
              <div className="ic">{a.icon}</div>
              <div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
