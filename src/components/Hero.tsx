import { useEffect, useRef } from 'react'
import './Hero.css'

interface StatItem {
  count: number
  unit: string
  label: string
}

const stats: StatItem[] = [
  { count: 12, unit: '+', label: 'Setores integrados' },
  { count: 98, unit: '%', label: 'Sob medida' },
  { count: 24, unit: '/7', label: 'Operação monitorada' },
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

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)

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

    const counters = statsRef.current?.querySelectorAll('[data-count]') ?? []
    counters.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">
            <span className="dot" />
            <span className="mono">Soluções digitais para indústrias</span>
          </div>
          <h1>
            Transformamos processos industriais em{' '}
            <span className="accent">soluções digitais</span> sob medida.
          </h1>
          <p className="sub">
            Sites institucionais, sistemas internos, dashboards gerenciais e
            automações para indústrias que querem mais controle, eficiência e
            crescimento operacional real.
          </p>
          <div className="hero-actions">
            <a href="#contato" className="btn btn-primary">
              Falar com a BEANIC
              <span className="btn-arrow" />
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              Ver portfólio
            </a>
          </div>
          <div className="hero-stats" ref={statsRef}>
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="n" data-count={s.count}>
                  <span>0</span>
                  <span className="unit">{s.unit}</span>
                </div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard composition */}
        <div className="hero-comp">
          <div className="panel dash">
            <div className="dash-head">
              <div className="dash-dots">
                <i /><i /><i />
              </div>
              <div className="dash-path">beanic / dashboards / produção.tsx</div>
              <div className="mono" style={{ color: 'var(--text-mute)' }}>LIVE</div>
            </div>
            <div className="dash-grid">
              <div className="kpi">
                <div className="k">OEE</div>
                <div className="v">87,4%</div>
                <div className="d">▲ 3,2 pts</div>
              </div>
              <div className="kpi">
                <div className="k">Produção</div>
                <div className="v">12.480</div>
                <div className="d">▲ 8,1%</div>
              </div>
              <div className="kpi">
                <div className="k">Refugo</div>
                <div className="v">1,2%</div>
                <div className="d">▼ 0,4 pts</div>
              </div>
            </div>
            <div className="chart">
              <div className="chart-head">
                <div className="t">Produção × Meta — Últimos 14 dias</div>
                <div className="legend">
                  <span>
                    <i style={{ background: 'var(--cyan)' }} />
                    Produção
                  </span>
                  <span>
                    <i style={{ background: 'rgba(150,180,210,0.3)' }} />
                    Meta
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 400 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2bb4e5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2bb4e5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g stroke="rgba(150,180,210,0.08)">
                  <line x1="0" y1="30" x2="400" y2="30" />
                  <line x1="0" y1="65" x2="400" y2="65" />
                  <line x1="0" y1="100" x2="400" y2="100" />
                </g>
                <path
                  d="M0,70 L30,72 L60,60 L90,68 L120,50 L150,55 L180,45 L210,52 L240,40 L270,46 L300,32 L330,38 L360,28 L400,30"
                  stroke="rgba(150,180,210,0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  fill="none"
                />
                <path
                  d="M0,90 L30,80 L60,88 L90,72 L120,76 L150,60 L180,68 L210,48 L240,58 L270,40 L300,50 L330,30 L360,42 L400,26"
                  stroke="#2bb4e5"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0,90 L30,80 L60,88 L90,72 L120,76 L150,60 L180,68 L210,48 L240,58 L270,40 L300,50 L330,30 L360,42 L400,26 L400,130 L0,130 Z"
                  fill="url(#g1)"
                />
                <g fill="#2bb4e5">
                  <circle cx="240" cy="58" r="2.5" />
                  <circle cx="300" cy="50" r="2.5" />
                  <circle cx="360" cy="42" r="2.5" />
                  <circle cx="400" cy="26" r="3" />
                </g>
              </svg>
            </div>
          </div>

          <div className="float-card fc-1">
            <div className="row">
              <div className="ic">
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <div>
                <div className="label">Estoque</div>
                <div className="val">98,2% acurácia</div>
              </div>
            </div>
          </div>

          <div className="float-card fc-2">
            <div className="row">
              <div className="ic">
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v16h16" />
                  <path d="M8 16l4-6 4 3 4-8" />
                </svg>
              </div>
              <div>
                <div className="label">Automação ativa</div>
                <div className="val">42 rotinas/dia</div>
              </div>
            </div>
          </div>

          <div className="float-card fc-3">
            <div className="row">
              <div className="ic">
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <div className="label">Tempo médio</div>
                <div className="val">−38% retrabalho</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
