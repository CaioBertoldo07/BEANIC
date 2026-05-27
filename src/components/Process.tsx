import { useEffect, useRef } from 'react'
import './Process.css'

const steps = [
  { n: '01 · Discovery', title: 'Diagnóstico', desc: 'Mapeamos sua operação atual, fluxos, gargalos e o que já funciona. Saímos com um retrato claro.' },
  { n: '02 · Strategy', title: 'Planejamento', desc: 'Definimos escopo, indicadores de sucesso e um roadmap com entregas em etapas curtas.' },
  { n: '03 · Build', title: 'Desenvolvimento', desc: 'Construímos em ciclos curtos, com você acompanhando. Sem surpresa no fim do projeto.' },
  { n: '04 · Rollout', title: 'Implantação', desc: 'Treinamento por setor, migração de dados e acompanhamento real da adoção pelo seu time.' },
  { n: '05 · Evolve', title: 'Evolução', desc: 'Squad dedicada para ajustes, novos módulos e otimizações conforme o negócio cresce.' },
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
    <section className="section" id="processo">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Como trabalhamos · 04</span>
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
                <div className="n">{step.n}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
