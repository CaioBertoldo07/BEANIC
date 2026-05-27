import './Problems.css'

const problems = [
  {
    title: 'Excesso de planilhas',
    desc: 'Vinte abas, três versões diferentes, ninguém sabe qual é a oficial.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" />
      </svg>
    ),
  },
  {
    title: 'Processos manuais',
    desc: 'Rotinas que dependem da memória do operador e param quando ele falta.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 8v4M12 16h.01" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Retrabalho constante',
    desc: 'A mesma informação digitada três vezes em três sistemas diferentes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12a9 9 0 1 0 9-9" /><path d="M3 4v5h5" />
      </svg>
    ),
  },
  {
    title: 'Falta de indicadores',
    desc: 'Você sente que o negócio cresceu, mas não consegue provar com número.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" />
      </svg>
    ),
  },
  {
    title: 'Informações espalhadas',
    desc: 'Dado importante vive em WhatsApp, e-mail, papel e na cabeça do dono.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Sem visão de vendas',
    desc: 'Difícil enxergar o que está performando, o que travou e o que precisa atenção.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Presença digital fraca',
    desc: 'Site amador, redes desatualizadas, sem narrativa comercial profissional.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" />
      </svg>
    ),
  },
  {
    title: 'Pouca automação',
    desc: 'Tarefas repetitivas consumindo o tempo de quem deveria estar decidindo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12c5 5 13 5 18 0M3 12c5-5 13-5 18 0" />
      </svg>
    ),
  },
]

export default function Problems() {
  return (
    <section className="section" id="problemas">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Problemas que resolvemos · 01</span>
            </div>
            <h2>Você se identifica com pelo menos três destes pontos?</h2>
          </div>
          <p className="lead">
            São as dores que vemos repetidas em quase todo negócio que chega até a
            BEANIC. Não são casos isolados, são sintomas de uma operação que
            cresceu sem estrutura.
          </p>
        </div>

        <div className="prob-grid">
          <div className="prob-list">
            {problems.map((p) => (
              <div key={p.title} className="prob">
                <div className="ic">{p.icon}</div>
                <div>
                  <h5>{p.title}</h5>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="prob-aside">
            <div className="quote">
              Quando o negócio cresce em <em>improviso</em>, cada nova venda{' '}
              <em className="g">aumenta a confusão</em> em vez de aumentar o controle.
            </div>
            <div className="smalltag">O que ouvimos antes de cada diagnóstico</div>
            <div className="prob-after">
              <div className="lbl">→ O que a BEANIC entrega</div>
              <div className="body">
                Uma camada digital sob medida que organiza a operação, automatiza o
                repetitivo e devolve visibilidade real do negócio.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
