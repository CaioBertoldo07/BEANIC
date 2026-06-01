import './FinalCTA.css'

const MAIL_SUBJECT = encodeURIComponent('Quero organizar minha operação')
const WA_TEXT = encodeURIComponent('Olá, quero conversar sobre organizar a minha operação.')

export default function FinalCTA() {
  return (
    <section className="cta-final" id="contato">
      <div className="container">
        <div className="cta-card">
          <div className="cta-inner">
            <div>
              <div className="eyebrow cta-eyebrow">
                <span className="ix" />
                <span className="mono">Próximo passo · 06</span>
              </div>
              <h2>
                Vamos <b>organizar</b> e <span className="g">escalar</span> seu negócio
                com tecnologia.
              </h2>
              <p className="cta-lead">
                Conversa direta com nosso time. Sem comercial intermediário, sem proposta
                genérica. Começamos entendendo o seu negócio antes de qualquer escopo.
              </p>
              <div className="cta-trust">
                <span className="cta-trust-dot" aria-hidden="true" />
                1 ERP entregue · cliente ativo no Polo Industrial de Manaus
              </div>
            </div>

            <div className="cta-side">
              <a
                href={`mailto:comercial@beanic.com.br?subject=${MAIL_SUBJECT}`}
                className="btn btn-primary cta-primary"
              >
                Quero organizar minha operação
                <span className="btn-arrow" />
              </a>
              <a
                href={`https://wa.me/559200000000?text=${WA_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wa"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 21l1.7-4.5A8 8 0 1 1 8 19l-5 2z" />
                </svg>
                Falar no WhatsApp
              </a>

              <div className="cta-meta">
                <div className="cta-sla">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  Resposta em até 1 dia útil
                </div>
                <div className="cta-meta-sub">Conversa sem compromisso</div>
              </div>

              <a href="#processo" className="cta-secondary-link">
                Ver como o processo funciona
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
