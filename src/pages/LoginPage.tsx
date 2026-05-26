import { useState } from 'react'
import { Link } from 'react-router-dom'
import beanicLogo from '../assets/beanic-logo.png'
import './LoginPage.css'

export default function LoginPage() {
  const [redirecting, setRedirecting] = useState(false)

  const handleEnter = () => {
    setRedirecting(true)
    window.location.href = '/cliente'
  }

  return (
    <div className="login-shell">
      <div className="login-card panel">
        <Link to="/" className="login-brand">
          <img src={beanicLogo} alt="BEANIC" />
        </Link>

        <div className="login-head">
          <div className="mono login-label">Portal do cliente</div>
          <h1>Acesse seu portal</h1>
          <p>
            Digite seu e-mail corporativo para receber o código de acesso.
            Sem senha, sem complicação.
          </p>
        </div>

        <div className="login-action">
          <button
            className="btn btn-primary login-btn"
            onClick={handleEnter}
            disabled={redirecting}
          >
            {redirecting ? 'Redirecionando...' : 'Entrar com e-mail'}
            {!redirecting && <span className="btn-arrow" />}
          </button>
        </div>

        <div className="login-info">
          <div className="login-info-item">
            <span className="login-info-icon">&#9993;</span>
            <span>Você receberá um código de acesso no seu e-mail corporativo</span>
          </div>
          <div className="login-info-item">
            <span className="login-info-icon">&#128274;</span>
            <span>Acesso restrito a clientes com cadastro aprovado pela BEANIC</span>
          </div>
        </div>

        <div className="login-foot">
          Ainda não tem acesso?{' '}
          <Link to="/registrar" className="login-link">
            Solicitar cadastro
          </Link>
        </div>
      </div>
    </div>
  )
          }
