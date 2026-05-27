import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="section" id="projetos">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Onde estamos agora · 05</span>
            </div>
            <h2>Experiências que estão construindo a BEANIC.</h2>
          </div>
          <p className="lead">
            Somos uma empresa nova e não vamos inventar cases ou números que
            ainda não existem. O que mostramos aqui é o que está em andamento,
            com transparência sobre o estágio real de cada entrega.
          </p>
        </div>

        <div className="proj-grid">
          {/* Case AMACOM */}
          <div className="proj">
            <div className="proj-cover">
              <div className="cover-label">Projeto em andamento</div>
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
                <div className="ac-status">
                  <div className="status-item done">
                    <span className="status-dot" />
                    Site institucional entregue
                  </div>
                  <div className="status-item active">
                    <span className="status-dot pulse-dot" />
                    Sistemas internos em desenvolvimento
                  </div>
                  <div className="status-item pending">
                    <span className="status-dot" />
                    Dashboards operacionais · em planejamento
                  </div>
                </div>
              </div>
            </div>
            <div className="proj-info">
              <h4>AMACOM · Estruturação digital completa</h4>
              <p>
                Site institucional construído e no ar. Sistemas internos para setores
                operacionais em desenvolvimento ativo, modelados a partir do fluxo
                real da operação.
              </p>
              <div className="proj-tags">
                <span>Site institucional</span>
                <span>Sistemas internos</span>
                <span>Em andamento</span>
              </div>
            </div>
          </div>

          {/* Proof of process: Diagnóstico */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <div>
              <h4>Diagnóstico antes de código</h4>
              <p>
                Todo projeto começa mapeando o fluxo real da operação. Nada entra
                em desenvolvimento sem ser validado com quem trabalha no dia a dia.
              </p>
            </div>
            <div className="proj-tags">
              <span>Processo</span><span>Sem surpresa</span>
            </div>
          </div>

          {/* Proof of process: Ciclos curtos */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.7 1 6.3 2.7" />
                <path d="M17 4v5h5" />
              </svg>
            </div>
            <div>
              <h4>Entregas em ciclos curtos</h4>
              <p>
                Desenvolvemos em etapas visíveis, com revisão constante. Você
                acompanha o progresso e valida cada entrega antes de avançar.
              </p>
            </div>
            <div className="proj-tags">
              <span>Transparência</span><span>Sem caixa-preta</span>
            </div>
          </div>

          {/* Proof of process: Implantação */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
              </svg>
            </div>
            <div>
              <h4>Implantação acompanhada</h4>
              <p>
                Sistema entregue com treinamento por setor e acompanhamento da
                adoção real. Não entregamos e somimos.
              </p>
            </div>
            <div className="proj-tags">
              <span>Treinamento</span><span>Suporte</span>
            </div>
          </div>

          {/* Proof of process: Evolução */}
          <div className="exp">
            <div className="exp-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" />
              </svg>
            </div>
            <div>
              <h4>Documentação e evolução</h4>
              <p>
                Código documentado, arquitetura clara e roadmap definido para que
                o sistema cresça junto com o negócio, sem refazer do zero.
              </p>
            </div>
            <div className="proj-tags">
              <span>Escalável</span><span>Documentado</span>
            </div>
          </div>
        </div>

        {/*
          === SEÇÃO FUTURA: Quem está por trás da BEANIC ===
          Descomentar quando houver informações reais para apresentar
          (fotos, nomes, histórico verificável).

          <div className="team-section" id="time">
            <div className="section-head" style={{ marginTop: '96px' }}>
              <div>
                <div className="eyebrow">
                  <span className="ix" />
                  <span className="mono">Time · 06</span>
                </div>
                <h2>Quem está por trás da BEANIC.</h2>
              </div>
              <p className="lead">
                Pessoas reais com histórico real em tecnologia e operação de negócios.
              </p>
            </div>
            // cards de equipe aqui
          </div>
        */}
      </div>
    </section>
  )
}
