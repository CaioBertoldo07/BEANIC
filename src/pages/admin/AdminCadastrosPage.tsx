import { useEffect, useState } from 'react'
import './AdminCadastrosPage.css'

interface CnpjInfo {
  razaoSocial: string
  nomeFantasia: string | null
  municipio: string
  uf: string
  cnae: string
  situacao: string
}

interface Cadastro {
  email: string
  nome: string
  empresa: string
  cnpj: string
  telefone: string
  origem: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  approvedAt?: string
  rejectedAt?: string
  cnpjInfo?: CnpjInfo | null
}

type Filter = 'pending' | 'approved' | 'rejected' | 'all'

interface ApiResponse {
  total: number
  cadastros: Cadastro[]
  stats: { pending: number; approved: number; rejected: number }
}

export default function AdminCadastrosPage() {
  const [filter, setFilter] = useState<Filter>('pending')
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [actioning, setActioning] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchData = async (f: Filter = filter) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/cadastros?status=${f}`)
      if (!res.ok) throw new Error('Falha ao carregar')
      setData(await res.json())
    } catch (err) {
      setToast({ type: 'err', msg: (err as Error).message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchData(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const action = async (
    endpoint: 'aprovar' | 'rejeitar' | 'desbloquear',
    email: string,
    confirmMsg?: string,
  ) => {
    if (confirmMsg && !confirm(confirmMsg)) return
    setActioning(`${endpoint}:${email}`)
    try {
      const res = await fetch(`/api/admin/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const body = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(body.message)
      setToast({ type: 'ok', msg: body.message })
      await fetchData(filter)
    } catch (err) {
      setToast({ type: 'err', msg: (err as Error).message })
    } finally {
      setActioning(null)
      setTimeout(() => setToast(null), 4000)
    }
  }

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <div className="mono">Cadastros</div>
          <h1>Solicitações de acesso</h1>
        </div>
        {data && (
          <div className="admin-stats">
            <Stat label="Pending" value={data.stats.pending} active={filter === 'pending'} status="pending" />
            <Stat label="Aprovados" value={data.stats.approved} active={filter === 'approved'} status="approved" />
            <Stat label="Rejeitados" value={data.stats.rejected} active={filter === 'rejected'} status="rejected" />
          </div>
        )}
      </header>

      <div className="admin-filters">
        <FilterBtn current={filter} value="pending" onClick={setFilter}>
          Pendentes
          {data && <span className="admin-filter-count">{data.stats.pending}</span>}
        </FilterBtn>
        <FilterBtn current={filter} value="approved" onClick={setFilter}>
          Aprovados
        </FilterBtn>
        <FilterBtn current={filter} value="rejected" onClick={setFilter}>
          Rejeitados
        </FilterBtn>
        <FilterBtn current={filter} value="all" onClick={setFilter}>
          Todos
        </FilterBtn>
      </div>

      {loading && <div className="admin-loading">Carregando...</div>}

      {!loading && data && data.cadastros.length === 0 && (
        <div className="panel admin-empty">
          <p>Nenhum cadastro nesta categoria.</p>
        </div>
      )}

      {!loading && data && data.cadastros.length > 0 && (
        <div className="admin-list">
          {data.cadastros.map(c => (
            <CadastroCard
              key={c.email}
              cadastro={c}
              expanded={expanded === c.email}
              onExpand={() => setExpanded(expanded === c.email ? null : c.email)}
              onAction={action}
              actioning={actioning}
            />
          ))}
        </div>
      )}

      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>{toast.msg}</span>
          <button onClick={() => setToast(null)}>×</button>
        </div>
      )}
    </div>
  )
}

function FilterBtn({
  current,
  value,
  onClick,
  children,
}: {
  current: Filter
  value: Filter
  onClick: (v: Filter) => void
  children: React.ReactNode
}) {
  return (
    <button
      className={`admin-filter ${current === value ? 'active' : ''}`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  )
}

function Stat({
  label,
  value,
  active,
  status,
}: {
  label: string
  value: number
  active: boolean
  status: 'pending' | 'approved' | 'rejected'
}) {
  return (
    <div className={`admin-stat admin-stat-${status} ${active ? 'active' : ''}`}>
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label mono">{label}</div>
    </div>
  )
}

interface CadastroCardProps {
  cadastro: Cadastro
  expanded: boolean
  onExpand: () => void
  onAction: (action: 'aprovar' | 'rejeitar' | 'desbloquear', email: string, confirmMsg?: string) => void
  actioning: string | null
}

function CadastroCard({ cadastro: c, expanded, onExpand, onAction, actioning }: CadastroCardProps) {
  const isLoadingAction = (action: string) => actioning === `${action}:${c.email}`

  return (
    <article className={`admin-card admin-card-${c.status}`}>
      <button className="admin-card-summary" onClick={onExpand}>
        <div className="admin-card-empresa">
          <div className="admin-card-empresa-nome">{c.empresa}</div>
          <div className="admin-card-empresa-meta">
            <span className="mono">{c.cnpj}</span>
            {c.cnpjInfo && (
              <span className="admin-card-cnpj-info">
                · {c.cnpjInfo.municipio}/{c.cnpjInfo.uf}
              </span>
            )}
          </div>
        </div>
        <div className="admin-card-contact">
          <div>{c.nome}</div>
          <div className="admin-card-email">{c.email}</div>
        </div>
        <div className="admin-card-status-cell">
          <span className={`admin-card-badge admin-card-badge-${c.status}`}>
            {c.status === 'pending' && 'Pendente'}
            {c.status === 'approved' && 'Aprovado'}
            {c.status === 'rejected' && 'Rejeitado'}
          </span>
          <span className="admin-card-date mono">{fmtDateTime(c.createdAt)}</span>
        </div>
        <div className="admin-card-toggle">{expanded ? '▴' : '▾'}</div>
      </button>

      {expanded && (
        <div className="admin-card-detail">
          <div className="admin-detail-grid">
            <Detail label="Razão social" value={c.cnpjInfo?.razaoSocial ?? '—'} />
            <Detail label="Nome fantasia" value={c.cnpjInfo?.nomeFantasia ?? '—'} />
            <Detail label="CNAE" value={c.cnpjInfo?.cnae ?? '—'} />
            <Detail label="Situação" value={c.cnpjInfo?.situacao ?? '—'} />
            <Detail label="Telefone" value={c.telefone} />
            <Detail label="Origem" value={c.origem || '—'} />
            <Detail label="Criado em" value={fmtDateTime(c.createdAt)} />
            {c.approvedAt && <Detail label="Aprovado em" value={fmtDateTime(c.approvedAt)} />}
            {c.rejectedAt && <Detail label="Rejeitado em" value={fmtDateTime(c.rejectedAt)} />}
          </div>

          <div className="admin-card-actions">
            {c.status === 'pending' && (
              <>
                <button
                  className="btn btn-primary admin-btn-sm"
                  disabled={isLoadingAction('aprovar')}
                  onClick={() => onAction('aprovar', c.email)}
                >
                  {isLoadingAction('aprovar') ? 'Aprovando...' : '✓ Aprovar'}
                </button>
                <button
                  className="btn btn-ghost admin-btn-sm admin-btn-danger"
                  disabled={isLoadingAction('rejeitar')}
                  onClick={() =>
                    onAction('rejeitar', c.email, `Rejeitar ${c.empresa}? Eles serão bloqueados de cadastrar de novo.`)
                  }
                >
                  Rejeitar
                </button>
              </>
            )}
            {c.status === 'rejected' && (
              <button
                className="btn btn-ghost admin-btn-sm"
                disabled={isLoadingAction('desbloquear')}
                onClick={() =>
                  onAction('desbloquear', c.email, `Desbloquear ${c.empresa}? Eles poderão se cadastrar novamente.`)
                }
              >
                {isLoadingAction('desbloquear') ? 'Desbloqueando...' : 'Desbloquear (permitir novo cadastro)'}
              </button>
            )}
            {c.status === 'approved' && (
              <>
                <button
                  className="btn btn-ghost admin-btn-sm"
                  disabled={isLoadingAction('aprovar')}
                  onClick={() => onAction('aprovar', c.email)}
                >
                  {isLoadingAction('aprovar') ? 'Sincronizando...' : 'Sincronizar Access'}
                </button>
                <span className="admin-approved-msg mono">
                  ✓ Aprovado no cadastro
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="admin-detail-row">
      <span className="admin-detail-label mono">{label}</span>
      <span className="admin-detail-value">{value}</span>
    </div>
  )
}

function fmtDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}
