import { useEffect, useRef } from 'react'
import './Benefits.css'

interface BenefitItem {
  count: number
  unit: string
  label: string
  desc: string
}

const benefits: BenefitItem[] = [
  { count: 42, unit: '%', label: 'Mais organização', desc: 'Processos saem da cabeça das pessoas e entram em sistemas auditáveis por setor.' },
  { count: 38, unit: '%', label: 'Redução de retrabalho', desc: 'Padronização e automação reduzem o ciclo de correções e perdas de produção.' },
  { count: 3, unit: '×', label: 'Controle de processos', desc: 'Mais visibilidade do que acontece em cada setor: produção, estoque, qualidade.' },
  { count: 100, unit: '%', label: 'Visão gerencial clara', desc: 'Indicadores em tempo real para tomada de decisão executiva consolidada.' },
]

function animateCounter(el: HTMLElement, target: number) {
  const span = el.querySelector('span:first-child') as HTMLElement
  if (!span) return
  const dur = 1400
  const t0 = performance.now()
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur)
    const e = 1 - Math.pow(1 - p, 3)
    span.textContent = String(Math.round(target * e))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function Benefits() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const count = parseFloat(el.dataset['count'] ?? '0')
            animateCounter(el, count)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )

    const counters = gridRef.current?.querySelectorAll('[data-count]') ?? []
    counters.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section ben">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              <span className="mono">Resultados / 05</span>
            </div>
            <h2>O que sua operação ganha ao digitalizar com a BEANIC.</h2>
          </div>
          <p className="lead">
            Ganhos mensuráveis nos primeiros ciclos, sem promessas genéricas de
            transformação digital.
          </p>
        </div>

        <div className="ben-grid" ref={gridRef}>
          {benefits.map((b) => (
            <div key={b.label} className="bcell">
              <div className="num" data-count={b.count}>
                <span>0</span>
                <span className="u">{b.unit}</span>
              </div>
              <div>
                <div className="l">{b.label}</div>
                <div className="desc">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
