import './Differentials.css'

type Item = {
  n: string
  title: string
  desc: string
  proof: string
  icon: JSX.Element
}

const items: Item[] = [
  {
    n: '01',
    title: 'Sob medida, de verdade',
    desc: 'Modelamos o sistema a partir do seu fluxo real. Sem template forçado, sem adaptar seu negócio a um software de prateleira.',
    proof: 'Nenhum projeto começa antes do mapeamento da operação com quem trabalha nela.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Mapeamento antes do código',
    desc: 'Cada feature nasce de um gargalo identificado na operação real. Não construímos o que parece bonito — construímos o que resolve.',
    proof: 'Documento de diagnóstico entregue antes da primeira linha escrita.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Falamos com quem opera',
    desc: 'Sentamos com almoxarife, operador, financeiro — não só com a diretoria. Daí nasce um sistema que o time usa de fato, não que enche tela e abandonam em 3 meses.',
    proof: 'Telas validadas com a operação antes de virar código.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="8" cy="9" r="3" />
        <circle cx="16" cy="9" r="3" />
        <path d="M3 20v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1M13 20v-1a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v1" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Impacto antes do stack',
    desc: 'Se a feature não reduz retrabalho, não acelera decisão ou não devolve controle, ela não entra. Tecnologia é meio, não fim.',
    proof: 'Cada entrega é avaliada pelo ganho operacional que produz.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Atendimento direto',
    desc: 'Você fala com quem está construindo. Sem comercial intermediário, sem PMO entre você e a solução, sem help desk de roteiro.',
    proof: 'Resposta em até 1 dia útil pelo WhatsApp comercial.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 21l1.7-4.5A8 8 0 1 1 8 19l-5 2z" />
      </svg>
    ),
  },
  {
    n: '06',
    title: 'Clareza do início ao fim',
    desc: 'Escopo, prazo e orçamento fechados antes do código. Ambiente de homologação visível a cada sprint. Você nunca pergunta "onde está o projeto?".',
    proof: 'Revisão acompanhada no fim de cada ciclo de desenvolvimento.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
]

export default function Differentials() {
  return (
    <section className="section differentials-section" id="diferenciais">
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
            Cada item abaixo tem uma âncora concreta no jeito como trabalhamos —
            não é promessa de marketing.
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
              <div className="diff-proof">
                <span className="diff-proof-mark" aria-hidden="true">→</span>
                {item.proof}
              </div>
            </div>
          ))}
        </div>

        <div className="differentials-foot">
          <a href="#contato" className="differentials-cta">
            <span>Quero organizar minha operação</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
