import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import beanicLogo from '../assets/beanic-logo.png'
import './LoginPage.css'

type Step = 'email' | 'codigo'

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const solicitarCodigo = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/solicitar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string }
        throw new Error(body.message || 'Falha ao solicitar código')
      }
      setStep('codigo')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const verificarCodigo = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), codigo: codigo.trim() }),
      })
      const body = (await res.json().catch(() => ({}))) as { message?: string }
      if (!res.ok) throw new Error(body.message || 'Código incorreto')
      navigate('/cliente')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card panel">
        <Link to="/" className="login-brand">
          <img src={beanicLogo} alt="BEANIC" />
        </Link>

        <div className="login-head">
          <div className="mono login-label">Área do usuário</div>
          <h1>{step === 'email' ? 'Acesse seu portal' : 'Digite o código'}</h1>
          <p>
            {step === 'email'
              ? 'Informe seu e-mail corporativo. Vamos enviar um código de 6 dígitos para confirmar o acesso.'
              : `Enviamos um código de 6 dígitos para ${email}. O código expira em 10 minutos.`}
          </p>
        </div>

        {step === 'email' ? (
          <form className="login-form" onSubmit={solicitarCodigo}>
            <label className="login-field">
              <span className="login-field-label mono">E-mail</span>
              <input
                type="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="voce@empresa.com.br"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="login-input"
              />
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="btn btn-primary login-btn" disabled={loading || !email.trim()}>
              {loading ? 'Enviando...' : 'Receber código'}
              {!loading && <span className="btn-arrow" />}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={verificarCodigo}>
            <label className="login-field">
              <span className="login-field-label mono">Código de 6 dígitos</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                autoFocus
                autoComplete="one-time-code"
                placeholder="000000"
                value={codigo}
                onChange={e => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="login-input login-input-otp"
              />
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="btn btn-primary login-btn" disabled={loading || codigo.length !== 6}>
              {loading ? 'Verificando...' : 'Entrar'}
              {!loading && <span className="btn-arrow" />}
            </button>

            <button
              type="button"
              className="login-back"
              onClick={() => {
                setStep('email')
                setCodigo('')
                setError(null)
              }}
            >
              ← Usar outro e-mail
            </button>
          </form>
        )}

        <div className="login-info">
          <div className="login-info-item">
            <span className="login-info-icon">&#9993;</span>
            <span>O código chega no e-mail cadastrado pela BEANIC. Verifique a caixa de spam se não aparecer.</span>
          </div>
          <div className="login-info-item">
            <span className="login-info-icon">&#128274;</span>
            <span>Acesso restrito a contas criadas pela equipe Beanic.</span>
          </div>
        </div>

        <div className="login-foot">
          Ainda não tem conta? Fale com a Beanic em{' '}
          <a href="mailto:comercial@beanic.com.br" className="login-link">comercial@beanic.com.br</a>
        </div>
      </div>
    </div>
  )
}
