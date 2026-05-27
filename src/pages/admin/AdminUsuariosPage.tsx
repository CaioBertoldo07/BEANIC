import { useEffect, useState, type FormEvent } from 'react'
import './AdminUsuariosPage.css'

interface Usuario {
  email: string
  nome: string
  empresa: string
  createdAt: string
  createdBy: string
}

interface ApiResponse {
  total: number
  usuarios: Usuario[]
}

export default function AdminUsuariosPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [revoking, setRevoking] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)

  // Form
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [empresa, setEmpresa] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/usuarios')
      if (!res.ok) throw new Error('Falha ao carregar')
      setData((await res.json()) as ApiResponse)
    } catch (err) {
      setToast({ type: 'err', msg: (err as Error).message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [])

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const criar = async (e: FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      const res = await fetch('/api/admin/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          nome: nome.trim(),
          empresa: empresa.trim(),
        }),
      })
      const body = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(body.message)
      showToast('ok', body.message)
      setEmail('')
      setNome('')
      setEmpresa('')
      await fetchData()
    } catch (err) {
      showToast('err', (err as Error).message)
    } finally {
      setCreating(false)
    }
  }

  const revogar = async (alvo: Usuario) => {
    if (!confirm(`Revogar acesso de ${alvo.empresa} (${alvo.email})? Sessões ativas serão invalidadas.`)) return
    setRevoking(alvo.email)
    try {
      const res = await fetch(`/api/admin/usuarios?email=${encodeURIComponent(alvo.email)}`, {
        method: 'DELETE',
      })
      const body = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(body.message)
      showToast('ok', body.message)
      await fetchData()
    } catch (err) {
      showToast('err', (err as Error).message)
    } finally {
      setRevoking(null)
    }
  }

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <div className="mono">Usuários</div>
          <h1>Contas do portal</h1>
        </div>
        {data && (
          <div className="admin-stats">
            <div className="admin-stat admin-stat-approved active">
              <div className="admin-stat-value">{data.total}</div>
              <div className="admin-stat-label mono">Ativos</div>
            </div>
          </div>
        )}
      </header>

      <section className="usuarios-novo panel">
        <div className="usuarios-novo-head">
          <div className="mono">Nova conta</div>
          <h2>Criar acesso ao portal</h2>
          <p>O usuário receberá um e-mail de boas-vindas e poderá entrar pelo /login com código OTP.</p>
        </div>

        <form onSubmit={criar} className="usuarios-form">
          <label className="usuarios-field">
            <span className="usuarios-field-label mono">Nome completo</span>
            <input
              type="text"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="usuarios-input"
              placeholder="Maria Silva"
            />
          </label>
          <label className="usuarios-field">
            <span className="usuarios-field-label mono">Empresa</span>
            <input
              type="text"
              required
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              className="usuarios-input"
              placeholder="Indústria Acme Ltda"
            />
          </label>
          <label className="usuarios-field usuarios-field-wide">
            <span className="usuarios-field-label mono">E-mail corporativo</span>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="usuarios-input"
              placeholder="maria@acme.com.br"
            />
          </label>
          <button type="submit" className="btn btn-primary usuarios-submit" disabled={creating}>
            {creating ? 'Criando...' : 'Criar conta'}
            {!creating && <span className="btn-arrow" />}
          </button>
        </form>
      </section>

      <section className="usuarios-lista">
        <div className="usuarios-lista-head">
          <h2>Contas ativas</h2>
        </div>

        {loading && <div className="admin-loading">Carregando...</div>}

        {!loading && data && data.usuarios.length === 0 && (
          <div className="panel admin-empty">
            <p>Nenhum usuário cadastrado ainda. Use o formulário acima.</p>
          </div>
        )}

        {!loading && data && data.usuarios.length > 0 && (
          <div className="usuarios-cards">
            {data.usuarios.map(u => (
              <article key={u.email} className="usuarios-card">
                <div className="usuarios-card-empresa">
                  <div className="usuarios-card-empresa-nome">{u.empresa}</div>
                  <div className="usuarios-card-contato">
                    {u.nome} <span className="usuarios-card-sep">·</span> <span className="usuarios-card-email">{u.email}</span>
                  </div>
                </div>
                <div className="usuarios-card-meta">
                  <span className="mono">criado {fmtDate(u.createdAt)}</span>
                  <span className="mono usuarios-card-by">por {u.createdBy}</span>
                </div>
                <button
                  className="btn btn-ghost admin-btn-sm admin-btn-danger"
                  disabled={revoking === u.email}
                  onClick={() => revogar(u)}
                >
                  {revoking === u.email ? 'Revogando...' : 'Revogar acesso'}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>{toast.msg}</span>
          <button onClick={() => setToast(null)}>×</button>
        </div>
      )}
    </div>
  )
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}
