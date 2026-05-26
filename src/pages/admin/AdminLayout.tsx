import { Link, Outlet } from 'react-router-dom'
import beanicLogo from '../../assets/beanic-logo.png'
import './AdminLayout.css'

export default function AdminLayout() {
  // Email do admin via cookie JWT do Cloudflare Access
  const adminEmail = readCfAccessEmail() ?? 'admin@beanic.com.br'

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <Link to="/" className="admin-brand">
            <img src={beanicLogo} alt="BEANIC" />
          </Link>
          <span className="admin-badge mono">Admin</span>
        </div>
        <div className="admin-topbar-right">
          <div className="admin-user">
            <span className="admin-user-email">{adminEmail}</span>
            <span className="admin-user-status mono">sessão ativa</span>
          </div>
          <a href="/cdn-cgi/access/logout" className="admin-logout mono">
            Sair
          </a>
        </div>
      </header>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

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
