import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              <span className="mono">Portfólio / 03 — Case em destaque</span>
            </div>
            <h2>AMACOM — estruturação digital de uma operação industrial completa.</h2>
          </div>
          <p className="lead">
            Da presença institucional à digitalização de setores internos — o
            trabalho com a AMACOM mostra o que a BEANIC entrega quando atua ponta
            a ponta.
          </p>
        </div>

        <div className="case">
          <div className="case-info">
            <div>
              <div className="case-logo">AMACOM</div>
              <h3>
                Site institucional, sistemas internos e organização de processos
                em um único projeto contínuo.
              </h3>
              <div className="case-bullets">
                <div>Site institucional reposicionando a marca como referência industrial</div>
                <div>Estruturação da presença digital e narrativa comercial técnica</div>
                <div>Desenvolvimento de sistemas para setores internos de produção e estoque</div>
                <div>Organização e padronização de processos operacionais</div>
              </div>
            </div>
            <div className="case-meta">
              <div><div className="k">Setor</div><div className="v">Indústria</div></div>
              <div><div className="k">Escopo</div><div className="v">Site + Sistemas</div></div>
              <div><div className="k">Relação</div><div className="v">Contínua</div></div>
            </div>
          </div>

          <div className="case-visual">
            <div className="browser">
              <div className="browser-bar">
                <div className="dots"><i /><i /><i /></div>
                <div className="url">https://amacom.ind.br/</div>
                <div style={{ width: '46px' }} />
              </div>
              <div className="browser-body">
                <div className="amacom-hero">
                  <div>
                    <div className="ah-meta" style={{ marginBottom: '8px', color: 'var(--cyan)' }}>
                      // indústria
                    </div>
                    <div className="ah-title">
                      Engenharia industrial sob medida para operações que não param.
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="ah-meta">Desde</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '22px', marginTop: '2px' }}>
                      1998
                    </div>
                  </div>
                </div>

                <div className="amacom-cards">
                  <div className="ac">
                    <div className="h">Linha A</div>
                    <div className="v">312/h</div>
                    <svg className="s" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <polyline points="0,18 15,14 30,16 45,10 60,12 75,6 100,8" fill="none" stroke="#2bb4e5" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="ac">
                    <div className="h">Linha B</div>
                    <div className="v">208/h</div>
                    <svg className="s" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <polyline points="0,12 15,16 30,10 45,14 60,8 75,12 100,6" fill="none" stroke="#2bb4e5" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="ac">
                    <div className="h">Estoque</div>
                    <div className="v">98,2%</div>
                    <svg className="s" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <polyline points="0,16 15,14 30,12 45,12 60,10 75,8 100,4" fill="none" stroke="#2bb4e5" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--line)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: 'var(--text-mute)',
                }}>
                  <span>Produção · Qualidade · Estoque · Manutenção</span>
                  <span style={{ color: 'var(--cyan)' }}>ver dashboard →</span>
                </div>
              </div>
            </div>

            <div className="case-thumb">
              <div className="lbl">Sistema interno · OS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '18px' }}>128</div>
                <div style={{ fontSize: '10px', color: 'var(--cyan)' }}>ordens / hoje</div>
              </div>
              <div className="vol" style={{ marginTop: '10px' }}>
                <i style={{ height: '30%' }} /><i style={{ height: '55%' }} /><i style={{ height: '40%' }} />
                <i style={{ height: '70%' }} /><i className="x" style={{ height: '90%' }} /><i style={{ height: '60%' }} />
                <i style={{ height: '48%' }} /><i style={{ height: '75%' }} /><i style={{ height: '64%' }} />
                <i style={{ height: '82%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="case-mini">
          <div className="mc">
            <div>
              <div className="mc-tag">Dashboard / Produção</div>
              <h4>Visão executiva em tempo real</h4>
              <p>OEE, refugo e takt time consolidados por linha — substituindo planilhas semanais.</p>
            </div>
            <div className="stripe">visão<br />industrial</div>
          </div>
          <div className="mc">
            <div>
              <div className="mc-tag">Automação / Estoque</div>
              <h4>Movimentação sem retrabalho</h4>
              <p>Entrada, transferência e baixa automatizadas com auditoria por etiqueta e operador.</p>
            </div>
            <div className="stripe">fluxo<br />operacional</div>
          </div>
        </div>
      </div>
    </section>
  )
}
