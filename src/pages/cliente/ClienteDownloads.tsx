import { useState } from 'react'
import './ClienteDownloads.css'

// Hardcoded — quando o pacote real ficar pronto, isso vem de uma API/CMS
const versaoAtual = {
  numero: '1.0.0',
  data: '2026-05-26',
  arquivos: [
    {
      nome: 'beanic-erp-1.0.0.zip',
      tamanho: '42.3 MB',
      tipo: 'Pacote completo (docker-compose + Dockerfile + scripts)',
      checksum: 'sha256:8f1c8a2e9b7d4c3a1f0e8b6d9c4a7e2f1d8c5b9a3e7c1f4d2a8b6e9c3f1d7a4e',
      url: '#',
    },
    {
      nome: 'beanic-amacom-2026.lic',
      tamanho: '2 KB',
      tipo: 'Licença assinada digitalmente — específica pra sua empresa',
      checksum: 'sha256:3a1f0e8b6d9c4a7e2f1d8c5b9a3e7c1f4d2a8b6e9c3f1d7a4e8f1c8a2e9b7d4c',
      url: '#',
    },
    {
      nome: 'install.sh',
      tamanho: '8 KB',
      tipo: 'Instalador interativo (Linux/macOS)',
      checksum: 'sha256:1d8c5b9a3e7c1f4d2a8b6e9c3f1d7a4e8f1c8a2e9b7d4c3a1f0e8b6d9c4a7e2f',
      url: '#',
    },
  ],
}

const versoesAntigas = [
  // Vazio por enquanto — futuras versões aparecem aqui
]

export default function ClienteDownloads() {
  return (
    <div>
      <div className="cliente-page-head">
        <div className="mono">Downloads</div>
        <h1>Baixar o sistema</h1>
        <p className="cliente-page-lead">
          Pacote self-host com docker-compose pronto, sua licença assinada digitalmente e o
          instalador interativo. Antes de instalar, confira os requisitos do servidor na{' '}
          <a className="cliente-page-link" href="/cliente/docs">documentação</a>.
        </p>
      </div>

      <section className="cliente-downloads-current panel">
        <div className="cliente-downloads-version-head">
          <div>
            <div className="mono">Versão mais recente</div>
            <div className="cliente-version-num-lg">v{versaoAtual.numero}</div>
            <div className="cliente-version-date mono">Lançada em {fmtDate(versaoAtual.data)}</div>
          </div>
          <div className="cliente-version-tag">
            <span className="cliente-version-dot" />
            Última versão
          </div>
        </div>

        <div className="cliente-downloads-list">
          {versaoAtual.arquivos.map(arq => (
            <DownloadCard key={arq.nome} arquivo={arq} />
          ))}
        </div>
      </section>

      <section className="cliente-downloads-old">
        <h2>Versões anteriores</h2>
        {versoesAntigas.length === 0 ? (
          <div className="panel cliente-empty">
            <p>Nenhuma versão anterior disponível. Esta é a primeira release.</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}

interface ArquivoProps {
  arquivo: {
    nome: string
    tamanho: string
    tipo: string
    checksum: string
    url: string
  }
}

function DownloadCard({ arquivo }: ArquivoProps) {
  const [copied, setCopied] = useState(false)

  const copyChecksum = async () => {
    try {
      await navigator.clipboard.writeText(arquivo.checksum)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard indisponível */
    }
  }

  return (
    <article className="cliente-download-card">
      <div className="cliente-download-info">
        <div className="cliente-download-name">{arquivo.nome}</div>
        <div className="cliente-download-tipo">{arquivo.tipo}</div>
        <div className="cliente-download-meta">
          <span className="mono">{arquivo.tamanho}</span>
          <button
            type="button"
            className="cliente-checksum"
            onClick={copyChecksum}
            title="Clique pra copiar o checksum"
          >
            <span className="cliente-checksum-label mono">sha256</span>
            <span className="cliente-checksum-value">{arquivo.checksum.slice(7, 23)}…</span>
            <span className="cliente-checksum-action">{copied ? '✓ copiado' : 'copiar'}</span>
          </button>
        </div>
      </div>
      <a href={arquivo.url} className="btn btn-primary cliente-download-btn">
        Baixar
        <span className="btn-arrow" />
      </a>
    </article>
  )
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
