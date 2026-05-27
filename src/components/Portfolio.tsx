import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="section" id="projetos">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Projetos e experiências · 06</span>
            </div>
            <h2>Projetos reais, soluções tangíveis.</h2>
          </div>
          <p className="lead">
            Cada projeto da BEANIC é construído em parceria — começa com
            diagnóstico, vira sistema, dashboard ou site, e segue evoluindo.
          </p>
        </div>

        <div className="proj-grid">
          {/* Case AMACOM */}
          <div className="proj">
            <div className="proj-cover">
              <div className="cover-label">Case em destaque</div>
              <div className="amacom-cover">
                <div className="ac-head">
                  <div className="ac-brand">AMACOM</div>
                  <div className="mono" style={{ color: 'var(--text-mute)' }}>// indústria</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '18px', lineHeight: '1.25', maxWidth: '80%' }}>
                    Engenharia industrial sob medida para operações que não param.
                  </div>
                </div>
                <div className="ac-body">
                  <div className="ac-k">
                    <div className="ac-l">Linha A</div>
                    <div className="ac-v">312/h</div>
                    <svg className="ac-s" viewBox="0 0 100 18" preserveAspectRatio="none">
                      <polyline points="0,14 20,12 40,10 60,6 80,8 100,4" fill="none" stroke="#2dd4bf" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="ac-k">
                    <div className="ac-l">Linha B</div>
                    <div className="ac-v">208/h</div>
                    <svg className="ac-s" viewBox="0 0 100 18" preserveAspectRatio="none">
                      <polyline points="0,10 20,14 40,8 60,10 80,6 100,8" fill="none" stroke="#2dd4bf" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="ac-k">
                    <div className="ac-l">Estoque</div>
                    <div className="ac-v">98,2%</div>
                    <svg className="ac-s" viewBox="0 0 100 18" preserveAspectRatio="none">
                      <polyline points="0,12 20,10 40,8 60,8 80,4 100,2" fill="none" stroke="#a8e065" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="ac-k">
                    <div className="ac-l">Refugo</div>
                    <div className="ac-v">1,2%</div>
                    <svg className="ac-s" viewBox="0 0 100 18" preserveAspectRatio="none">
                      <polyline points="0,4 20,6 40,5 60,8 80,10 100,12" fill="none" stroke="#a8e065" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="proj-info">
              <h4>AMACOM — Estruturação digital completa</h4>
              <p>Site institucional, sistemas internos para setores operacionais e organização de processos em um único projeto contínuo.</p>
              <div className="proj-tags">
                <span>Site institucional</span>
                <span>Sistemas internos</span>
                <span>Processos</span>
              </div>
            </div>
          </div>

          {/* Exp: +18% */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 20V10M10 20V4M16 20v-8M22 20V8" />
              </svg>
            </div>
            <div>
              <div className="stat">+18<span className="u">%</span></div>
              <div className="stat-l">Em visibilidade de vendas (média entre projetos)</div>
            </div>
            <p>Quando indicadores entram em painel — e saem da planilha — o time decide com base em dado, não em achismo.</p>
          </div>

          {/* Exp: -38% */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.7 1 6.3 2.7" />
                <path d="M17 4v5h5" />
              </svg>
            </div>
            <div>
              <div className="stat">−38<span className="u">%</span></div>
              <div className="stat-l">Tempo gasto em tarefas repetitivas</div>
            </div>
            <p>Automações de WhatsApp, formulários e relatórios devolvem horas por semana ao time operacional.</p>
          </div>

          {/* Exp: Sistemas internos */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
              </svg>
            </div>
            <div>
              <h4>Sistemas internos</h4>
              <p>Plataformas sob medida para vendas, OS, estoque e setores operacionais — desenhadas a partir do fluxo real.</p>
            </div>
            <div className="proj-tags">
              <span>Sistemas</span><span>Operação</span><span>Sob medida</span>
            </div>
          </div>

          {/* Exp: Sites institucionais */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" />
              </svg>
            </div>
            <div>
              <h4>Sites institucionais</h4>
              <p>Presença digital comercialmente forte, com narrativa clara e estrutura voltada a converter conversa qualificada.</p>
            </div>
            <div className="proj-tags">
              <span>Sites</span><span>Landing pages</span><span>Posicionamento</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
