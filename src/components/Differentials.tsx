import './Differentials.css'

const items = [
  {
    n: '01',
    title: 'Foco exclusivo em indústrias',
    desc: 'Falamos a linguagem do PCP, da qualidade e da manutenção — não traduzimos templates de e-commerce para o seu galpão.',
  },
  {
    n: '02',
    title: 'Construído sob medida, do zero',
    desc: 'Sem ERP genérico forçado a caber. Modelamos a partir do processo real que sua operação roda hoje.',
  },
  {
    n: '03',
    title: 'Visão de operação, não só de tela',
    desc: 'Antes de prototipar, andamos pelo fluxo. Cada feature responde a um gargalo concreto que medimos.',
  },
  {
    n: '04',
    title: 'Design + tecnologia + gestão',
    desc: 'Time integrado de produto, engenharia e operação — entrega que conecta interface, dado e decisão.',
  },
  {
    n: '05',
    title: 'Sistemas pensados para resultado',
    desc: 'Implantação acompanhada por indicadores. Você vê o impacto em retrabalho, OEE e ciclo desde o primeiro mês.',
  },
]

const nodes = [
  { label: 'Produção', style: { top: '90px', left: '36px' }, delay: 0 },
  { label: 'Estoque', style: { top: '160px', left: '200px' }, delay: 0.3 },
  { label: 'Qualidade', style: { top: '120px', right: '30px' }, delay: 0.6 },
  { label: 'Manutenção', style: { top: '260px', left: '80px' }, delay: 0.9 },
  { label: 'RH', style: { top: '310px', right: '60px' }, delay: 1.2 },
  { label: 'Financeiro', style: { bottom: '80px', left: '140px' }, delay: 1.5 },
]

export default function Differentials() {
  return (
    <section className="section diff" id="diferenciais">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              <span className="mono">Diferenciais / 02</span>
            </div>
            <h2>Não somos uma agência. Somos engenharia digital para indústrias.</h2>
          </div>
          <p className="lead">
            Cada projeto começa entendendo o chão de fábrica — o fluxo da peça,
            o fluxo do documento, o fluxo da decisão. Daí nasce o software.
          </p>
        </div>

        <div className="diff-grid">
          <div className="diff-list">
            {items.map((item) => (
              <div key={item.n} className="diff-item">
                <div className="n">{item.n}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="diff-visual">
            <div className="mono" style={{ position: 'relative', zIndex: 2 }}>
              // arquitetura.modular
            </div>
            <div style={{ position: 'relative', zIndex: 2, marginTop: '8px', fontSize: '13px', color: 'var(--text-mute)' }}>
              setores integrados em tempo real
            </div>

            <div className="nodes">
              {nodes.map((node) => (
                <div key={node.label} className="node" style={node.style as React.CSSProperties}>
                  <span className="pulse" style={{ animationDelay: `${node.delay}s` }} />
                  {node.label}
                </div>
              ))}
              <div
                className="node"
                style={{
                  bottom: '36px',
                  right: '36px',
                  background: 'var(--cyan)',
                  color: '#04121d',
                  borderColor: 'var(--cyan)',
                }}
              >
                <strong style={{ fontFamily: "'Sora',sans-serif" }}>Dashboard gerencial</strong>
              </div>
            </div>

            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              preserveAspectRatio="none"
            >
              <g stroke="rgba(43,180,229,0.35)" strokeWidth="1" fill="none" strokeDasharray="3 4">
                <path d="M120,110 C 200,160 220,170 240,180" />
                <path d="M260,180 C 320,170 360,160 400,140" />
                <path d="M130,280 C 220,260 300,250 380,260" />
                <path d="M240,180 C 280,240 320,300 380,330" />
                <path d="M260,280 C 320,320 360,360 410,400" />
                <path d="M220,400 C 300,410 360,420 420,440" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
