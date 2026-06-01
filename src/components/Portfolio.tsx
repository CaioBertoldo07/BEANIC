import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="section portfolio-section" id="projetos">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Onde estamos agora · 05</span>
            </div>
            <h2>Empresa nova. Projetos reais, em andamento.</h2>
          </div>
          <p className="lead">
            Em vez de cases inflados, mostramos o que está em construção agora —
            com transparência sobre o estágio de cada entrega.
          </p>
        </div>

        <div className="proj">
          <div className="proj-preview">
            {/* TODO: substituir por screenshot real de amacom.beanic.com.br quando disponível */}
            <div className="proj-mock">
              <div className="proj-mock-chrome">
                <span /><span /><span />
                <div className="proj-mock-url">amacom.beanic.com.br</div>
              </div>
              <div className="proj-mock-body">
                <div className="proj-mock-nav">
                  <div className="proj-mock-logo">AMACOM</div>
                  <div className="proj-mock-nav-it" />
                  <div className="proj-mock-nav-it" />
                  <div className="proj-mock-nav-it" />
                  <div className="proj-mock-nav-cta" />
                </div>
                <div className="proj-mock-hero">
                  <div className="proj-mock-eyebrow" />
                  <div className="proj-mock-h1" />
                  <div className="proj-mock-h1 short" />
                  <div className="proj-mock-p" />
                  <div className="proj-mock-p w70" />
                  <div className="proj-mock-cta-row">
                    <div className="proj-mock-btn primary" />
                    <div className="proj-mock-btn" />
                  </div>
                </div>
                <div className="proj-mock-cards">
                  <div className="proj-mock-card" />
                  <div className="proj-mock-card" />
                  <div className="proj-mock-card" />
                </div>
              </div>
            </div>
          </div>

          <div className="proj-info">
            <div className="proj-tag-status">Projeto em andamento</div>
            <h3>AMACOM · Estruturação digital completa</h3>
            <p>
              Site institucional no ar e sistema ERP completo entregue. ERP cobre
              estoque, compras, produção, manutenção, qualidade, RH/DP e demais
              áreas operacionais, modelado a partir do fluxo real da fábrica.
            </p>

            <div className="proj-status">
              <div className="status-item done">
                <span className="status-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Site institucional entregue
              </div>
              <div className="status-item done">
                <span className="status-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Sistema ERP completo entregue
              </div>
              <div className="status-item pending">
                <span className="status-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4" />
                  </svg>
                </span>
                Dashboards executivos em planejamento
              </div>
            </div>

            <div className="proj-actions">
              <a
                href="https://amacom.beanic.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="proj-link primary"
              >
                <span>Ver site</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <div className="proj-tags">
                <span>Site institucional</span>
                <span>ERP completo</span>
                <span>Multimódulos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="proj-next">
          <div className="proj-next-text">
            <div className="proj-next-mono">Próximos projetos · 2026</div>
            <div className="proj-next-msg">
              Novos cases chegando ao longo do ano.{' '}
              <span className="dim">Acompanhe pelas redes ou converse com a gente.</span>
            </div>
          </div>
          <div className="proj-next-actions">
            <a
              href="https://www.instagram.com/beanic.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="proj-next-ig"
              aria-label="Instagram da BEANIC (@beanic.co)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>@beanic.co</span>
            </a>
            <a href="#contato" className="proj-next-cta">
              <span>Quero ser o próximo case</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
