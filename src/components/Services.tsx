import './Services.css'

export default function Services() {
  return (
    <section className="section pillars-section" id="pilares">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">A solução · 02</span>
            </div>
            <h2>
              Quatro pilares que resolvem dores concretas e formam{' '}
              <span className="g">a camada digital</span> pra escalar sem improviso.
            </h2>
          </div>
          <p className="lead">
            Operação, vitrine comercial, automação e dados. Cada pilar entra onde a
            sua empresa hoje opera no improviso — e devolve estrutura mensurável.
          </p>
        </div>

        <div className="pillars">
          {/* Pillar 1: Sistemas */}
          <div className="pillar" id="pilar-operacao">
            <div className="pnum">01 · Operação</div>
            <h3>Sistemas sob medida</h3>
            <p>
              Planilhas, WhatsApp e anotações avulsas não escalam. Quando a
              operação cresce, o controle some. Desenvolvemos sistemas internos
              modelados a partir do seu fluxo real: controle de vendas, estoque,
              produção e clientes em uma única fonte de verdade, sem forçar seu
              negócio dentro de um ERP genérico.
            </p>
            <div className="feats">
              <span>Controle de vendas</span>
              <span>Estoque e produção</span>
              <span>Clientes e pedidos</span>
              <span>Financeiro</span>
              <span>Setores internos</span>
              <span>Fluxos operacionais</span>
            </div>
            <div className="pillar-viz">
              <div className="v-app">
                <div className="v-app-bar">
                  <div className="v-app-dot" />
                  <div className="v-app-dot" />
                  <div className="v-app-dot" />
                  <div className="v-app-crumb">app · vendas</div>
                </div>
                <div className="v-app-grid">
                  <div className="v-app-side">
                    <div className="v-app-side-it on" />
                    <div className="v-app-side-it" />
                    <div className="v-app-side-it" />
                    <div className="v-app-side-it" />
                  </div>
                  <div className="v-app-main">
                    <div className="v-app-row hi">
                      <span className="v-app-status ok" />
                      <span className="v-app-cell w-40" />
                      <span className="v-app-cell w-20" />
                      <span className="v-app-cell w-15" />
                    </div>
                    <div className="v-app-row">
                      <span className="v-app-status pending" />
                      <span className="v-app-cell w-50" />
                      <span className="v-app-cell w-15" />
                      <span className="v-app-cell w-10" />
                    </div>
                    <div className="v-app-row">
                      <span className="v-app-status ok" />
                      <span className="v-app-cell w-30" />
                      <span className="v-app-cell w-25" />
                      <span className="v-app-cell w-20" />
                    </div>
                    <div className="v-app-row hi">
                      <span className="v-app-status ok" />
                      <span className="v-app-cell w-45" />
                      <span className="v-app-cell w-15" />
                      <span className="v-app-cell w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pillar-outcome">
              <span className="lbl">→ Resultado</span>
              Substitui o caos das planilhas por uma fonte de verdade única.
            </div>
            <a href="#contato" className="pillar-cta">
              <span>Quero isso no meu negócio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Pillar 2: Vitrine comercial */}
          <div className="pillar" id="pilar-sites">
            <div className="pnum">02 · Vitrine comercial</div>
            <h3>Sites que vendem, não só apresentam</h3>
            <p>
              Um site amador tira credibilidade antes da primeira conversa.
              Construímos sites institucionais com argumentação clara e estrutura
              de conversão — não só vitrine, mas máquina de captação que
              transforma visita anônima em orçamento qualificado.
            </p>
            <div className="feats">
              <span>Captação de orçamento</span>
              <span>Landing pages</span>
              <span>Argumento comercial</span>
              <span>Posicionamento de marca</span>
              <span>Páginas de serviço</span>
              <span>Performance e SEO</span>
            </div>
            <div className="pillar-viz">
              <div className="v-site">
                <div className="v-site-chrome">
                  <span /><span /><span />
                  <div className="v-site-url">beanic.com.br</div>
                </div>
                <div className="v-site-body">
                  <div className="v-site-nav">
                    <div className="v-site-logo" />
                    <div className="v-site-nav-it" />
                    <div className="v-site-nav-it" />
                    <div className="v-site-nav-it" />
                    <div className="v-site-nav-cta" />
                  </div>
                  <div className="v-site-hero">
                    <div className="v-site-h1" />
                    <div className="v-site-h1 short" />
                    <div className="v-site-p" />
                    <div className="v-site-cta">
                      <div className="v-site-btn primary" />
                      <div className="v-site-btn" />
                    </div>
                  </div>
                  <div className="v-site-cards">
                    <div className="v-site-card" />
                    <div className="v-site-card" />
                    <div className="v-site-card" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pillar-outcome">
              <span className="lbl">→ Resultado</span>
              Visita anônima vira conversa qualificada antes do primeiro contato.
            </div>
            <a href="#contato" className="pillar-cta">
              <span>Quero isso no meu negócio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Pillar 3: Automações */}
          <div className="pillar" id="pilar-automacao">
            <div className="pnum">03 · Automação</div>
            <h3>Automações</h3>
            <p>
              Tempo gasto em tarefas repetitivas é tempo perdido em decisão e
              crescimento. Substituímos confirmações, cobranças, alertas e relatórios
              manuais por fluxos automáticos auditáveis, integrados com WhatsApp,
              formulários e CRM, sem o operador no meio.
            </p>
            <div className="feats">
              <span>Integrações</span>
              <span>WhatsApp</span>
              <span>Relatórios automáticos</span>
              <span>Alertas</span>
              <span>Formulários</span>
              <span>CRM</span>
            </div>
            <div className="pillar-viz">
              <div className="v-auto">
                <div className="n">
                  <div className="b">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16v6H4zM4 14h16v6H4z" />
                    </svg>
                  </div>
                  <div className="l">Form</div>
                </div>
                <div className="auto-sep" />
                <div className="n">
                  <div className="b">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                    </svg>
                  </div>
                  <div className="l">Trigger</div>
                </div>
                <div className="auto-sep" />
                <div className="n">
                  <div className="b lim">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" /><path d="M3 21l3-3" />
                    </svg>
                  </div>
                  <div className="l">WhatsApp</div>
                </div>
                <div className="auto-sep" />
                <div className="n">
                  <div className="b">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3 8-8" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="l">Salvo</div>
                </div>
              </div>
            </div>
            <div className="pillar-outcome">
              <span className="lbl">→ Resultado</span>
              Libera horas de operação manual a cada semana, sem perder rastro.
            </div>
            <a href="#contato" className="pillar-cta">
              <span>Quero isso no meu negócio</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Pillar 4: Dashboards */}
          <div className="pillar" id="pilar-dados">
            <div className="pnum">04 · Dados</div>
            <h3>Dashboards e gestão de dados</h3>
            <p>
              Decisões tomadas no achismo têm custo. Consolidamos indicadores de
              vendas, operação e financeiro em painéis visuais que revelam o que
              está acontecendo no seu negócio: o que está funcionando, o que
              travou e o que precisa de atenção agora.
            </p>
            <div className="feats">
              <span>Indicadores</span>
              <span>Relatórios</span>
              <span>Painéis gerenciais</span>
              <span>Desempenho</span>
              <span>Visualização de dados</span>
              <span>Apoio à decisão</span>
            </div>
            <div className="pillar-viz">
              <div className="v-dash">
                <svg viewBox="0 0 200 90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="d1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,70 L20,60 L40,64 L60,48 L80,52 L100,32 L120,40 L140,28 L160,30 L180,18 L200,22 L200,90 L0,90 Z"
                    fill="url(#d1)" />
                  <path d="M0,70 L20,60 L40,64 L60,48 L80,52 L100,32 L120,40 L140,28 L160,30 L180,18 L200,22"
                    stroke="#2dd4bf" strokeWidth="2" fill="none" />
                </svg>
                <div className="bars">
                  <i style={{ height: '35%' }} />
                  <i style={{ height: '48%' }} />
                  <i className="lit" style={{ height: '62%' }} />
                  <i style={{ height: '50%' }} />
                  <i className="lit" style={{ height: '72%' }} />
                  <i className="lim" style={{ height: '88%' }} />
                </div>
              </div>
            </div>
            <div className="pillar-outcome">
              <span className="lbl">→ Resultado</span>
              Decisões em tempo real, baseadas em dado e não em achismo.
            </div>
            <a href="#contato" className="pillar-cta">
              <span>Quero isso no meu negócio</span>
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
