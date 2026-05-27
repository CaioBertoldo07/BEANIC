import beanicLogo from '../assets/beanic-logo.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <img src={beanicLogo} alt="BEANIC" />
            </a>
            <div className="sig">Tecnologia para organizar e escalar negócios</div>
            <p>
              Sistemas, sites institucionais, dashboards e automações para empresas
              que precisam organizar processos, vender melhor e tomar decisões com
              mais controle.
            </p>
            <div className="socials">
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c.7-1.2 2.2-2.2 4-2.2 3 0 5 2 5 5.2V20h-4v-6c0-1.5-1-2.5-2.5-2.5S14 12.5 14 14v6h-4V8z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 21l1.7-4.5A8 8 0 1 1 8 19l-5 2z" />
                </svg>
              </a>
              <a href="#" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Pilares</h5>
            <a href="#pilares">Sistemas sob medida</a>
            <a href="#pilares">Sites e presença digital</a>
            <a href="#pilares">Automações</a>
            <a href="#pilares">Dashboards</a>
          </div>

          <div className="footer-col">
            <h5>Empresa</h5>
            <a href="#publico">Para quem é</a>
            <a href="#problemas">Problemas que resolvemos</a>
            <a href="#processo">Como trabalhamos</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#projetos">Projetos</a>
          </div>

          <div className="footer-col">
            <h5>Contato</h5>
            <a href="mailto:contato@beanic.com.br">contato@beanic.com.br</a>
            <a href="#">WhatsApp comercial</a>
            <a href="#">Segunda a Sexta · 8h-18h</a>
            <a href="#contato">Solicitar diagnóstico</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 BEANIC · Tecnologia para organizar e escalar negócios.</div>
          <div>Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  )
}
