import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <div className="pill">
            <span className="dot" />
            Tecnologia para organizar e escalar negócios
          </div>
          <h1 style={{ marginTop: '24px' }}>
            Transformamos processos manuais em{' '}
            <b>sistemas, sites, dashboards e automações</b> para empresas que
            querem <span className="g">crescer com controle</span>.
          </h1>
          <p className="sub">
            Desenvolvemos soluções digitais sob medida para empresas que precisam
            sair do improviso — organizar processos, automatizar rotinas, vender
            com mais consistência e tomar decisões com dados reais.
          </p>
          <div className="hero-actions">
            <a href="#contato" className="btn btn-primary">
              Solicitar diagnóstico
              <span className="btn-arrow" />
            </a>
            <a href="#contato" className="btn btn-ghost">
              Falar sobre meu projeto
            </a>
          </div>
          <div className="hero-meta">
            <span>Solução sob medida para o seu fluxo real</span>
            <span>Sem ERP genérico, sem template forçado</span>
          </div>
        </div>

        {/* App window composition */}
        <div className="hero-comp">
          <div className="panel app">
            <div className="app-head">
              <div className="app-dots">
                <i /><i /><i />
              </div>
              <div className="crumb">app.beanic / vendas / painel</div>
              <div className="tag">● ao vivo</div>
            </div>
            <div className="app-body">
              <div className="app-side">
                <div className="group">Operação</div>
                <div className="it on">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  Painel
                </div>
                <div className="it">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7h18M3 12h18M3 17h12" />
                  </svg>
                  Vendas
                  <span className="badge">12</span>
                </div>
                <div className="it">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 7L9 19l-5-5" />
                  </svg>
                  Tarefas
                </div>
                <div className="it">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 11l2 2 4-4" />
                  </svg>
                  Clientes
                </div>
                <div className="group">Gestão</div>
                <div className="it">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" />
                  </svg>
                  Relatórios
                </div>
              </div>
              <div className="app-main">
                <div className="app-title">
                  <div>
                    <h4>Visão geral · Operação</h4>
                    <div className="sub-label">Atualizado há 2 min</div>
                  </div>
                  <div className="mono" style={{ color: 'var(--text-mute)' }}>7 DIAS</div>
                </div>
                <div className="app-kpis">
                  <div className="kpi">
                    <div className="k">Vendas</div>
                    <div className="v">R$ 184k</div>
                    <div className="d up">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5-5 5 5M10 19V7" />
                      </svg>
                      +18%
                    </div>
                  </div>
                  <div className="kpi">
                    <div className="k">Pedidos</div>
                    <div className="v">312</div>
                    <div className="d up">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5-5 5 5M10 19V7" />
                      </svg>
                      +9%
                    </div>
                  </div>
                  <div className="kpi">
                    <div className="k">Ticket</div>
                    <div className="v">R$ 590</div>
                    <div className="d up">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5-5 5 5M10 19V7" />
                      </svg>
                      +4%
                    </div>
                  </div>
                </div>
                <div className="app-chart">
                  <div className="chart-head">
                    <div className="t">Faturamento × Meta</div>
                    <div className="legend">
                      <span><i style={{ background: 'var(--teal)' }} />Faturamento</span>
                      <span><i style={{ background: 'var(--lime)' }} />Meta</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 400 124" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="rgba(180,200,225,0.06)">
                      <line x1="0" y1="30" x2="400" y2="30" />
                      <line x1="0" y1="60" x2="400" y2="60" />
                      <line x1="0" y1="90" x2="400" y2="90" />
                    </g>
                    <path d="M0,75 L40,72 L80,60 L120,68 L160,52 L200,58 L240,42 L280,48 L320,32 L360,38 L400,22"
                      stroke="#a8e065" strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
                    <path d="M0,86 L40,76 L80,82 L120,66 L160,72 L200,52 L240,60 L280,42 L320,50 L360,28 L400,30"
                      stroke="#2dd4bf" strokeWidth="2.2" fill="none" />
                    <path d="M0,86 L40,76 L80,82 L120,66 L160,72 L200,52 L240,60 L280,42 L320,50 L360,28 L400,30 L400,124 L0,124 Z"
                      fill="url(#hg1)" />
                    <g fill="#2dd4bf">
                      <circle cx="280" cy="42" r="2.5" />
                      <circle cx="320" cy="50" r="2.5" />
                      <circle cx="360" cy="28" r="2.5" />
                      <circle cx="400" cy="30" r="3" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card: Automação */}
          <div className="float-card fc-automation">
            <div className="row">
              <div className="ic">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.7 1 6.3 2.7" />
                  <path d="M17 4v5h5" />
                </svg>
              </div>
              <div>
                <div className="lbl">Automação</div>
                <div className="val">28 rotinas/dia</div>
              </div>
            </div>
          </div>

          {/* Floating card: Crescimento */}
          <div className="float-card fc-growth">
            <div className="row">
              <div className="ic g">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
                </svg>
              </div>
              <div>
                <div className="lbl">Crescimento</div>
                <div className="val">+34% em 90 dias</div>
              </div>
            </div>
          </div>

          {/* Floating card: Flow */}
          <div className="float-card fc-flow">
            <div className="row-flow">
              <div className="step">
                <div className="b">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M4 4h16v6H4zM4 14h16v6H4z" />
                  </svg>
                </div>
                Formulário
              </div>
              <div className="sep" />
              <div className="step">
                <div className="b">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" /><path d="M3 21l3-3" />
                  </svg>
                </div>
                WhatsApp
              </div>
              <div className="sep" />
              <div className="step">
                <div className="b">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M4 20V10M10 20V4M16 20v-8" />
                  </svg>
                </div>
                Painel
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
