import { useEffect, useRef } from 'react'
import './Process.css'

type Step = {
  n: string
  title: string
  desc: string
  icon: JSX.Element
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Mapeamento',
    desc: 'Reunião kickoff e conversa direta com quem opera o dia a dia. Entregamos um documento de diagnóstico com fluxo atual, gargalos identificados e oportunidades, mais reunião de fechamento alinhando o que vai entrar no escopo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Planejamento',
    desc: 'Escopo detalhado, indicadores de sucesso, roadmap em entregas curtas, prazo total e orçamento fechado. Você revisa e aprova tudo antes de qualquer linha de código sair daqui.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Desenvolvimento',
    desc: 'Construímos em sprints curtos. No fim de cada ciclo, você revisa o que ficou pronto em ambiente de homologação. Ajustes entram no próximo ciclo. Sem caixa-preta, sem entrega big bang no fim.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 6l-4 12" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Implantação',
    desc: 'Migração dos dados, treinamento por setor e acompanhamento da adoção real. Não desaparecemos depois do go-live: 30 dias de garantia inclusos pra ajustes finos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M4.5 16.5l3 3M14 4l6 6-9 9-6-6 9-9zM9 19l-5 2 2-5" />
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Evolução',
    desc: 'Squad dedicada para ajustes, novos módulos e otimizações conforme o negócio cresce. Modelo de mensalidade opcional: você ativa quando precisar, sem trava de contrato longo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
  },
]

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackRef.current?.classList.add('lit')
          }
        })
      },
      { threshold: 0.3 }
    )
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section process-section" id="processo">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Como trabalhamos · 03</span>
            </div>
            <h2>Um método claro, com entregas mensuráveis em cada etapa.</h2>
          </div>
          <p className="lead">
            Você sempre sabe onde o projeto está, o que vem agora e qual o próximo
            ganho operacional. Sem caixa-preta, sem promessa genérica de
            transformação digital.
          </p>
        </div>

        <div className="proc">
          <div className="proc-grid" ref={trackRef}>
            {steps.map((step) => (
              <div key={step.n} className="pstep">
                <div className="pstep-icon" aria-hidden="true">{step.icon}</div>
                <div className="n">{step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="process-foot">
          <a href="#contato" className="process-cta">
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
