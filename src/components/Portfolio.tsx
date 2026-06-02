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
            <h2>Projetos reais, entregues e em evolução</h2>
          </div>
          <p className="lead">
            Em vez de cases inflados, mostramos entregas reais: sites publicados,
            sistemas em uso e projetos que continuam evoluindo junto com cada negócio.
          </p>
        </div>

        <div className="proj">
          <div className="proj-preview">
            <div className="proj-mock">
              <div className="proj-mock-chrome">
                <span /><span /><span />
                <div className="proj-mock-url">amacom.beanic.com.br/app</div>
              </div>
              <img
                src="/amacom-erp.png"
                alt="Dashboard do sistema ERP da AMACOM: setores Almoxarifado, Compras, Produção, Engenharia, Qualidade, Manutenção, SESMT, Administração e Recursos Humanos."
                className="proj-mock-img"
                loading="lazy"
              />
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

        <div className="proj proj--dm">
          <div className="proj-preview">
            <div className="proj-previews">
              <div className="proj-preview-item">
                <div className="proj-preview-item-img">
                  <img
                    src="/doces-maloca-site.png"
                    alt="Landing page da Doces da Maloca: página comercial de apresentação dos produtos e pedidos pelo WhatsApp."
                    loading="lazy"
                  />
                </div>
                <div className="proj-preview-label">Landing page comercial</div>
              </div>
              <div className="proj-preview-item">
                <div className="proj-preview-item-img">
                  <img
                    src="/doces-maloca-sistema.png"
                    alt="Sistema interno de gestão da Doces da Maloca: painel de controle personalizado em uso na operação."
                    loading="lazy"
                  />
                </div>
                <div className="proj-preview-label">Sistema interno de gestão</div>
              </div>
            </div>
          </div>

          <div className="proj-info">
            <div className="proj-tag-status">Entregue · Em uso</div>
            <h3>Doces da Maloca</h3>
            <p>
              Landing page comercial desenvolvida para apresentar os produtos, fortalecer a
              presença digital da marca e facilitar pedidos pelo WhatsApp. Além do site, a BEANIC
              também desenvolveu um sistema interno de gestão sob medida, atualmente em uso há
              mais de 3 meses na operação da empresa.
            </p>

            <div className="proj-status">
              <div className="status-item done">
                <span className="status-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Landing page publicada
              </div>
              <div className="status-item done">
                <span className="status-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Sistema interno em uso há mais de 3 meses
              </div>
            </div>

            <div className="proj-actions">
              <a
                href="https://docesdamaloca.beanic.com.br/"
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
                <span>Landing page publicada</span>
                <span>Sistema interno em uso</span>
                <span>Gestão de pedidos</span>
                <span>Presença digital</span>
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
