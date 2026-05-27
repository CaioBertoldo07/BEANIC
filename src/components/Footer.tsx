import beanicLogo from '../assets/beanic-logo.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <img src={beanicLogo} alt="BEANIC" style={{ height: '40px' }} />
              <div className="brand-tag">
                <span className="brand-name">BEANIC</span>
              </div>
            </a>
            <p>
              Soluções digitais sob medida para indústrias que querem mais
              controle, eficiência e crescimento operacional.
            </p>
            <div className="socials" style={{ marginTop: '24px' }}>
              <a href="#" aria-label="LinkedIn">
                <svg className="i" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c.7-1.2 2.2-2.2 4-2.2 3 0 5 2 5 5.2V20h-4v-6c0-1.5-1-2.5-2.5-2.5S14 12.5 14 14v6h-4V8z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 21l1.7-4.5A8 8 0 1 1 8 19l-5 2z" />
                </svg>
              </a>
              <a href="#" aria-label="Email">
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 7 9-7" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Soluções</h5>
            <a href="#servicos">Sites institucionais</a>
            <a href="#servicos">Sistemas sob medida</a>
            <a href="#servicos">Dashboards gerenciais</a>
            <a href="#servicos">Automação de processos</a>
            <a href="#servicos">Integração setorial</a>
          </div>

          <div className="footer-col">
            <h5>Empresa</h5>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#portfolio">Portfólio</a>
            <a href="#processo">Processo</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="footer-col">
            <h5>Contato</h5>
            <a href="mailto:comercial@beanic.com.br">comercial@beanic.com.br</a>
            <a href="#">+55 (00) 0000-0000</a>
            <a href="#">WhatsApp comercial</a>
            <a href="#">Segunda — Sexta · 8h-18h</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 BEANIC · Soluções digitais para indústrias.</div>
          <div>CNPJ 00.000.000/0001-00 · Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  )
}
