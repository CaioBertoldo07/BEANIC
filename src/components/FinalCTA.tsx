import './FinalCTA.css'

export default function FinalCTA() {
  return (
    <section className="cta-final" id="contato">
      <div className="container">
        <div className="cta-card">
          <div className="cta-grid-overlay" />
          <div className="cta-inner">
            <div>
              <div className="eyebrow">
                <span className="dot" />
                <span className="mono">Próximo passo</span>
              </div>
              <h2>
                Sua indústria está pronta para evoluir com{' '}
                <b>soluções digitais sob medida?</b>
              </h2>
              <p style={{ marginTop: '20px', maxWidth: '560px', fontSize: '16px' }}>
                Conversa direta com nosso time técnico. Sem comercial
                intermediário, sem proposta genérica — começamos entendendo o
                seu processo.
              </p>
            </div>
            <div className="cta-side">
              <a
                href="#"
                className="btn btn-primary"
                style={{ justifyContent: 'center', padding: '18px 28px', fontSize: '15px' }}
              >
                Solicitar uma conversa
                <span className="btn-arrow" />
              </a>
              <a
                href="#"
                className="btn btn-ghost"
                style={{ justifyContent: 'center', padding: '18px 28px', fontSize: '15px' }}
              >
                WhatsApp direto
              </a>
              <div className="cta-meta" style={{ marginTop: '8px' }}>
                Resposta em até 1 dia útil
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
