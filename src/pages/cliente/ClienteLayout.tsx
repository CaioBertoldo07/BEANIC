import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import beanicLogo from '../../assets/beanic-logo.png'
import './ClienteLayout.css'

const navItems = [
  { to: '/cliente', label: 'Dashboard', icon: '◧', end: true },
  { to: '/cliente/downloads', label: 'Downloads', icon: '↓' },
  { to: '/cliente/docs', label: 'Documentação', icon: '☰' },
  { to: '/cliente/conta', label: 'Conta', icon: '○' },
]

export default function ClienteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  // Email do cliente vem do header `Cf-Access-Authenticated-User-Email` que
  // a Cloudflare Access injeta. No client-side a gente lê do cookie JWT:
  const clienteEmail = readCfAccessEmail() ?? 'cliente@empresa.com.br'

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
            <div className="cliente-user-avatar">{clienteEmail[0]?.toUpperCase() ?? '?'}</div>
            <div className="cliente-user-text">
              <div className="cliente-user-email">{clienteEmail}</div>
              <div className="cliente-user-status mono">Sessão ativa</div>
            </div>
          </div>
        </header>

        <main className="cliente-content">
          <Outlet context={{ clienteEmail }} />
        </main>
      </div>
    </div>
  )
}

// Lê o e-mail do JWT do Cloudflare Access (cookie CF_Authorization).
// É só pra exibição — a autenticação real acontece NA BORDA pela CF antes
// dessa página carregar. Se o cookie não existir, fallback pra placeholder.
function readCfAccessEmail(): string | null {
  try {
    const cookies = document.cookie.split(';')
    const cfCookie = cookies.find(c => c.trim().startsWith('CF_Authorization='))
    if (!cfCookie) return null
    const jwt = cfCookie.split('=')[1]?.trim()
    if (!jwt) return null
    const payload = jwt.split('.')[1]
    if (!payload) return null
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded.email ?? null
  } catch {
    return null
  }
}
