import './FinalCTA.css'

export default function FinalCTA() {
  return (
    <section className="cta-final" id="contato">
      <div className="container">
        <div className="cta-card">
          <div className="cta-inner">
            <div>
              <div className="pill" style={{ marginBottom: '24px' }}>
                <span className="dot" />
                Próximo passo
              </div>
              <h2>
                Vamos <b>organizar</b> e <span className="g">escalar</span> seu negócio
                com tecnologia.
              </h2>
              <p style={{ marginTop: '22px', maxWidth: '540px', fontSize: '16px' }}>
                Conversa direta com nosso time. Sem comercial intermediário, sem proposta
                genérica — começamos entendendo o seu negócio antes de qualquer escopo.
              </p>
            </div>
            <div className="cta-side">
              <a href="#" className="btn btn-primary" style={{ padding: '18px 28px', fontSize: '15px' }}>
                Solicitar diagnóstico
                <span className="btn-arrow" />
              </a>
              <a href="#" className="wa">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21l1.7-4.5A8 8 0 1 1 8 19l-5 2z" />
                </svg>
                Falar no WhatsApp
              </a>
              <div className="cta-meta">Resposta em até 1 dia útil · diagnóstico sem custo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
