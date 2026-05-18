import { useEffect, useRef } from 'react'
import './Process.css'

const steps = [
  { n: '01 — Discovery', title: 'Diagnóstico', desc: 'Mapeamos o fluxo atual no chão de fábrica e os gargalos reais por setor.' },
  { n: '02 — Strategy', title: 'Planejamento', desc: 'Definimos escopo, indicadores de sucesso e roadmap por entregáveis.' },
  { n: '03 — Design', title: 'Prototipação', desc: 'Telas e fluxos validados com a operação antes de qualquer código.' },
  { n: '04 — Build', title: 'Desenvolvimento', desc: 'Construção modular, com entregas incrementais e revisões semanais.' },
  { n: '05 — Rollout', title: 'Implantação', desc: 'Treinamento por setor e acompanhamento da curva de adoção real.' },
  { n: '06 — Evolve', title: 'Evolução contínua', desc: 'Squad dedicada para evolução, novos módulos e otimização operacional.' },
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
              <span className="dot" />
              <span className="mono">Processo / 04</span>
            </div>
            <h2>Como trabalhamos — do diagnóstico à evolução contínua.</h2>
          </div>
          <p className="lead">
            Um método estruturado, com entregas claras em cada etapa. Você sempre
            sabe onde o projeto está, o que vem agora e qual o próximo ganho
            operacional.
          </p>
        </div>

        <div className="process-wrap">
          <div className="process-track" ref={trackRef}>
            {steps.map((step) => (
              <div key={step.n} className="pstep">
                <div className="pn">{step.n}</div>
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
