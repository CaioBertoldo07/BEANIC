import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import beanicLogo from '../../assets/beanic-logo.png'
import './ClienteLayout.css'

const navItems = [
  { to: '/cliente', label: 'Dashboard', icon: '◧', end: true },
  { to: '/cliente/downloads', label: 'Downloads', icon: '↓' },
  { to: '/cliente/docs', label: 'Documentação', icon: '☰' },
  { to: '/cliente/conta', label: 'Conta', icon: '○' },
]

interface Usuario {
  email: string
  nome: string
  empresa: string
}

export default function ClienteLayout() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          if (!cancelled) navigate('/login', { replace: true })
          return
        }
        const body = (await res.json()) as { usuario: Usuario }
        if (!cancelled) setUsuario(body.usuario)
      } catch {
        if (!cancelled) navigate('/login', { replace: true })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [navigate])

  const sair = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      navigate('/login', { replace: true })
    }
  }

  if (loading || !usuario) {
    return (
      <div className="cliente-shell">
        <div className="cliente-loading">Carregando portal...</div>
      </div>
    )
  }

  return (
    <div className="cliente-shell">
      <aside className={`cliente-sidebar ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" className="cliente-brand" onClick={() => setMobileOpen(false)}>
          <img src={beanicLogo} alt="BEANIC" />
        </Link>

        <div className="cliente-eyebrow mono">Portal do cliente</div>

        <nav className="cliente-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `cliente-link ${isActive ? 'active' : ''}`}
            >
              <span className="cliente-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="cliente-sidebar-foot">
          <Link to="/" className="cliente-back" onClick={() => setMobileOpen(false)}>
            ← Voltar pro site
          </Link>
        </div>
      </aside>

      <div className="cliente-main">
        <header className="cliente-topbar">
          <button
            className="cliente-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
          <div className="cliente-topbar-user">
            <div className="cliente-user-avatar">{usuario.nome[0]?.toUpperCase() ?? '?'}</div>
            <div className="cliente-user-text">
              <div className="cliente-user-email">{usuario.email}</div>
              <div className="cliente-user-status mono">{usuario.empresa}</div>
            </div>
            <button className="cliente-logout mono" onClick={sair}>
              Sair
            </button>
          </div>
        </header>

        <main className="cliente-content">
          <Outlet context={{ usuario }} />
        </main>
      </div>
    </div>
  )
}
