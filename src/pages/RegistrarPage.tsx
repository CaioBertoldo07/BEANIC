import { useState } from 'react'
import { Link } from 'react-router-dom'
import beanicLogo from '../assets/beanic-logo.png'
import './RegistrarPage.css'

interface FormState {
  nome: string
  empresa: string
  cnpj: string
  email: string
  telefone: string
  origem: string
}

const ORIGEM_OPCOES = [
  '',
  'Indicação',
  'Google / busca',
  'LinkedIn',
  'Evento / feira',
  'Cliente atual',
  'Outro',
]

export default function RegistrarPage() {
  const [form, setForm] = useState<FormState>({
    nome: '',
    empresa: '',
    cnpj: '',
    email: '',
    telefone: '',
    origem: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [cnpjLookup, setCnpjLookup] = useState<'idle' | 'loading' | 'ok' | 'notfound'>('idle')

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  // Auto-fill da empresa ao terminar de digitar CNPJ. BrasilAPI é público,
  // CORS liberado — chamada direta do browser. Não bloqueia submit; se
  // falhar, o backend valida de novo.
  const lookupCnpj = async (cnpj: string) => {
    const digits = cnpj.replace(/\D/g, '')
    if (digits.length !== 14) {
      setCnpjLookup('idle')
      return
    }
    setCnpjLookup('loading')
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`)
      if (res.status === 404) {
        setCnpjLookup('notfound')
        return
      }
      if (!res.ok) {
        setCnpjLookup('idle')
        return
      }
      const data = (await res.json()) as { razao_social: string; nome_fantasia: string | null }
      setCnpjLookup('ok')
      // Só preenche se o campo empresa ainda está vazio (não atropela
      // o que usuário pode ter digitado primeiro).
      setForm(prev =>
        prev.empresa.trim()
          ? prev
          : { ...prev, empresa: data.nome_fantasia || data.razao_social },
      )
    } catch {
      setCnpjLookup('idle')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { message?: string }).message ?? 'Falha ao enviar cadastro')
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="registrar-shell">
        <div className="registrar-card panel">
          <Link to="/" className="registrar-brand">
            <img src={beanicLogo} alt="BEANIC" />
          </Link>
          <div className="registrar-success">
            <div className="registrar-success-icon">✓</div>
            <h1>Cadastro recebido</h1>
            <p>
              Obrigado, <strong>{form.nome.split(' ')[0]}</strong>! Recebemos o cadastro da{' '}
              <strong>{form.empresa}</strong> e nosso time vai analisar em até 1 dia útil.
            </p>
            <p>
              Você receberá um e-mail em <strong>{form.email}</strong> assim que o acesso
              for liberado.
            </p>
            <Link to="/" className="btn btn-ghost registrar-back">
              Voltar pra home
              <span className="btn-arrow" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="registrar-shell">
      <div className="registrar-card panel">
        <Link to="/" className="registrar-brand">
          <img src={beanicLogo} alt="BEANIC" />
        </Link>

        <div className="registrar-head">
          <div className="mono">Solicitar acesso</div>
          <h1>Cadastro de cliente</h1>
          <p>
            Preencha os dados da sua empresa. Após análise (até 1 dia útil), liberamos seu
            acesso ao portal de download do sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="registrar-form">
          <Field
            label="Nome completo"
            value={form.nome}
            onChange={v => update('nome', v)}
            required
            autoComplete="name"
          />
          <div className="registrar-row">
            <Field
              label="Empresa"
              value={form.empresa}
              onChange={v => update('empresa', v)}
              required
              autoComplete="organization"
              hint={cnpjLookup === 'ok' ? '✓ Preenchido pela Receita' : undefined}
            />
            <Field
              label="CNPJ"
              value={form.cnpj}
              onChange={v => {
                update('cnpj', maskCnpj(v))
                setCnpjLookup('idle')
              }}
              onBlur={() => lookupCnpj(form.cnpj)}
              placeholder="00.000.000/0001-00"
              required
              hint={
                cnpjLookup === 'loading'
                  ? 'Consultando Receita...'
                  : cnpjLookup === 'notfound'
                    ? '⚠ Não encontrado na Receita'
                    : undefined
              }
              hintError={cnpjLookup === 'notfound'}
            />
          </div>
          <div className="registrar-row">
            <Field
              label="E-mail corporativo"
              type="email"
              value={form.email}
              onChange={v => update('email', v.toLowerCase().trim())}
              required
              autoComplete="email"
            />
            <Field
              label="Telefone / WhatsApp"
              value={form.telefone}
              onChange={v => update('telefone', maskPhone(v))}
              placeholder="(92) 99999-9999"
              required
              autoComplete="tel"
            />
          </div>

          <label className="registrar-field">
            <span className="registrar-field-label mono">Como nos conheceu? (opcional)</span>
            <select
              value={form.origem}
              onChange={e => update('origem', e.target.value)}
              className="registrar-select"
            >
              {ORIGEM_OPCOES.map(o => (
                <option key={o} value={o}>
                  {o || 'Selecione...'}
                </option>
              ))}
            </select>
          </label>

          {error && <div className="registrar-error">{error}</div>}

          <button type="submit" className="btn btn-primary registrar-submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar cadastro'}
            {!loading && <span className="btn-arrow" />}
          </button>

          <p className="registrar-disclaimer">
            Ao enviar, você concorda em receber comunicações sobre o status do cadastro.
            Não compartilhamos seus dados com terceiros.
          </p>
        </form>

        <div className="registrar-foot">
          Já tem acesso? <Link to="/cliente" className="registrar-link">Entrar no portal</Link>
        </div>
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  hint?: string
  hintError?: boolean
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  hint,
  hintError,
}: FieldProps) {
  return (
    <label className="registrar-field">
      <span className="registrar-field-label mono">{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="registrar-input"
      />
      {hint && (
        <span className={`registrar-field-hint ${hintError ? 'error' : ''}`}>{hint}</span>
      )}
    </label>
  )
}

function maskCnpj(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
