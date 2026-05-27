import './Services.css'

export default function Services() {
  return (
    <section className="section" id="pilares">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Pilares · 01</span>
            </div>
            <h2>Quatro frentes que conectam tecnologia ao seu negócio.</h2>
          </div>
          <p className="lead">
            Cada pilar resolve um pedaço diferente da operação. Combinados, formam
            uma camada digital sólida — capaz de organizar processos, automatizar
            rotinas e revelar dados que apoiam decisão.
          </p>
        </div>

        <div className="pillars">
          {/* Pillar 1: Sistemas */}
          <div className="pillar">
            <div className="pnum">01 · Operação</div>
            <h3>Sistemas sob medida</h3>
            <p>
              Plataformas internas modeladas a partir do seu fluxo real — não de
              um ERP genérico que não cabe. Controle de vendas, estoque, produção,
              clientes, financeiro e setores integrados em uma única fonte de verdade.
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
              <div className="v-system">
                <div className="col">
                  <div className="head" /><div className="row hi" /><div className="row" />
                  <div className="row hi" /><div className="row" />
                </div>
                <div className="col">
                  <div className="head" /><div className="row" /><div className="row hi" />
                  <div className="row hi" /><div className="row" />
                </div>
                <div className="col">
                  <div className="head" /><div className="row hi" /><div className="row" />
                  <div className="row" /><div className="row hi" />
                </div>
                <div className="col">
                  <div className="head" /><div className="row" /><div className="row hi" />
                  <div className="row" /><div className="row" />
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Sites */}
          <div className="pillar">
            <div className="pnum">02 · Presença digital</div>
            <h3>Sites e presença digital</h3>
            <p>
              Sites institucionais, landing pages e portfólios construídos para
              gerar conversa qualificada. Estrutura comercial clara, narrativa do
              seu negócio e captação de orçamento integrada ao seu fluxo.
            </p>
            <div className="feats">
              <span>Sites institucionais</span>
              <span>Landing pages</span>
              <span>Portfólios</span>
              <span>Páginas de serviços</span>
              <span>Catálogos</span>
              <span>Captação de orçamento</span>
            </div>
            <div className="pillar-viz">
              <div className="v-sites">
                <div className="b">
                  <div className="bar t" /><div className="bar s" /><div className="bar" />
                  <div className="bar s2" /><div className="bar" />
                </div>
                <div className="b-r">
                  <div className="tile"><span className="tag-code">// hero</span></div>
                  <div className="tile"><span className="tag-code">// CTA</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Automações */}
          <div className="pillar">
            <div className="pnum">03 · Automação</div>
            <h3>Automações</h3>
            <p>
              Substituímos planilhas, e-mails e rotinas manuais por fluxos
              automáticos auditáveis. WhatsApp, formulários, CRM, relatórios e
              alertas — tudo conversando em tempo real, sem o operador no meio.
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
          </div>

          {/* Pillar 4: Dashboards */}
          <div className="pillar">
            <div className="pnum">04 · Dados</div>
            <h3>Dashboards e gestão de dados</h3>
            <p>
              Indicadores, painéis gerenciais e visualização de dados que sustentam
              decisão executiva. Você sai do achismo e passa a olhar para o seu
              negócio com clareza — em tempo real.
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
          </div>
        </div>
      </div>
    </section>
  )
}
