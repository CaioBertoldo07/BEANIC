import './Differentials.css'

const items = [
  {
    n: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Sob medida, de verdade',
    desc: 'Modelamos o sistema a partir do seu fluxo real. Sem template forçado, sem adaptar seu negócio a um software.',
  },
  {
    n: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
      </svg>
    ),
    title: 'Foco em organização e crescimento',
    desc: 'Cada feature responde a uma dor concreta de operação. Nada entra só para ficar bonito na tela.',
  },
  {
    n: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" />
        <path d="M9 6h6a3 3 0 0 1 3 3v6" />
      </svg>
    ),
    title: 'Tecnologia ↔ operação',
    desc: 'Conversamos com quem está no chão da operação, não só com a diretoria. Daí nasce um software que o time usa.',
  },
  {
    n: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
    title: 'Visão prática de negócio',
    desc: 'Olhamos antes para o impacto na operação, depois para o stack. Tecnologia é meio, não fim.',
  },
  {
    n: '05',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21l1.7-4.5A8 8 0 1 1 8 19l-5 2z" />
      </svg>
    ),
    title: 'Atendimento próximo',
    desc: 'Você fala direto com quem está construindo. Sem comercial intermediário, sem PMO entre você e a solução.',
  },
  {
    n: '06',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Clareza do início ao fim',
    desc: 'Escopo, prazo, orçamento e progresso visíveis em cada etapa. Você nunca fica adivinhando onde o projeto está.',
  },
]

export default function Differentials() {
  return (
    <section className="section" id="diferenciais">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Diferenciais · 04</span>
            </div>
            <h2>Por que a BEANIC é uma escolha estratégica, não só técnica.</h2>
          </div>
          <p className="lead">
            Não somos uma agência genérica nem uma software house de prateleira.
            Somos um time de tecnologia aplicada a negócio.
          </p>
        </div>

        <div className="diff-grid">
          {items.map((item) => (
            <div key={item.n} className="diff">
              <div className="diff-head">
                <div className="ic">{item.icon}</div>
                <div className="n">{item.n}</div>
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
