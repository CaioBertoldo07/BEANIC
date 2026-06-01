import './Problems.css'

type Problem = {
  title: string
  desc: string
  pillar: { label: string; href: string }
  icon: JSX.Element
}

const problems: Problem[] = [
  {
    title: 'Excesso de planilhas',
    desc: 'Vinte abas, três versões diferentes, ninguém sabe qual é a oficial.',
    pillar: { label: 'Sistema sob medida', href: '#pilar-operacao' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="6" y="3" width="14" height="14" rx="1.5" />
        <rect x="3" y="7" width="14" height="14" rx="1.5" />
        <path d="M3 12h14M8 7v14" />
      </svg>
    ),
  },
  {
    title: 'Informações espalhadas',
    desc: 'Dado importante vive em WhatsApp, e-mail, papel e na cabeça do dono.',
    pillar: { label: 'Sistema sob medida', href: '#pilar-operacao' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: 'Retrabalho constante',
    desc: 'A mesma informação digitada três vezes em três sistemas diferentes.',
    pillar: { label: 'Sistema sob medida', href: '#pilar-operacao' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 15-6.7" />
        <path d="M3 4v5h5" />
        <path d="M21 12a9 9 0 0 1-15 6.7" />
        <path d="M21 20v-5h-5" />
      </svg>
    ),
  },
  {
    title: 'Processos manuais',
    desc: 'Rotinas que dependem da memória do operador e param quando ele falta.',
    pillar: { label: 'Automações', href: '#pilar-automacao' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-1a6 6 0 0 1 12 0v1" />
        <circle cx="18" cy="13" r="2.4" />
        <path d="M18 10.6v-1.2M18 16.6v-1.2M15.6 13h-1.2M22.4 13h-1.2" />
      </svg>
    ),
  },
  {
    title: 'Pouca automação',
    desc: 'Tarefas repetitivas consumindo o tempo de quem deveria estar decidindo.',
    pillar: { label: 'Automações', href: '#pilar-automacao' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="6" height="6" rx="1" />
        <rect x="15" y="14" width="6" height="6" rx="1" />
        <path d="M9 7h3a3 3 0 0 1 3 3v4" />
        <path d="M12 11l3 3 3-3" />
      </svg>
    ),
  },
  {
    title: 'Falta de indicadores',
    desc: 'Você sente que o negócio cresceu, mas não consegue provar com número.',
    pillar: { label: 'Dashboards', href: '#pilar-dados' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 21V8M9 21V13M15 21V10" />
        <path d="M21 21V5" strokeDasharray="2 2" />
        <circle cx="21" cy="3" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Sem visão de vendas',
    desc: 'Difícil enxergar o que está performando, o que travou e o que precisa atenção.',
    pillar: { label: 'Dashboards', href: '#pilar-dados' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M4 4l16 16" />
      </svg>
    ),
  },
  {
    title: 'Presença digital fraca',
    desc: 'Site amador, redes desatualizadas, sem narrativa comercial profissional.',
    pillar: { label: 'Sites institucionais', href: '#pilar-sites' },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M3 9h18" strokeDasharray="2 2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

export default function Problems() {
  return (
    <section className="section prob-section" id="problemas">
      <div className="container">
        <div className="section-head prob-head">
          <div>
            <div className="eyebrow prob-eyebrow">
              <span className="ix" />
              <span className="mono">Problemas que resolvemos · 01</span>
            </div>
            <h2>Você reconhece algum desses problemas no seu negócio?</h2>
          </div>
          <p className="lead">
            São as dores que vemos repetidas em quase todo negócio que chega até a
            BEANIC. Não são casos isolados, são sintomas de uma operação que
            cresceu sem estrutura.
          </p>
        </div>

        <div className="prob-list">
          {problems.map((p) => (
            <a key={p.title} href={p.pillar.href} className="prob">
              <div className="ic">{p.icon}</div>
              <div className="prob-body">
                <h5>{p.title}</h5>
                <p>{p.desc}</p>
              </div>
              <div className="prob-link">
                <span>Como resolvemos</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="prob-quote-band">
          <div className="quote">
            Quando o negócio cresce em <em>improviso</em>, cada nova venda{' '}
            <em className="g">aumenta a confusão</em> em vez de aumentar o controle.
          </div>
          <div className="smalltag">O que ouvimos antes de cada diagnóstico</div>
        </div>

        <div className="prob-after">
          <div className="lbl">→ O que a BEANIC entrega</div>
          <div className="body">
            Uma camada digital sob medida que organiza a operação, automatiza o
            repetitivo e devolve visibilidade real do negócio.
          </div>
          <a href="#contato" className="prob-cta">
            <span>Se reconheceu algum desses pontos? Solicitar diagnóstico gratuito</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
