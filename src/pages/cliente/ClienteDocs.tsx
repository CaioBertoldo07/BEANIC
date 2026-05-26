import { useState } from 'react'
import './ClienteDocs.css'

const docSections = [
  {
    id: 'instalacao',
    titulo: 'Instalação',
    items: [
      { titulo: 'Requisitos do servidor', desc: 'Hardware, SO, Docker, rede. Antes de baixar.' },
      { titulo: 'Passo a passo com docker-compose', desc: 'Subir o sistema em 15 minutos.' },
      { titulo: 'Configurar variáveis de ambiente', desc: 'JWT secrets, DATABASE_URL, e-mail, WhatsApp.' },
      { titulo: 'Importar dados legados', desc: 'Excel, Firebase, ERP anterior.' },
    ],
  },
  {
    id: 'operacao',
    titulo: 'Operação diária',
    items: [
      { titulo: 'Primeiro login + cadastro inicial', desc: 'Empresa, admin, itens base.' },
      { titulo: 'Backup automático e restore', desc: 'pg_dump diário + backup off-site.' },
      { titulo: 'Atualizações de versão', desc: 'docker compose pull + migrate.' },
      { titulo: 'Monitoramento e logs', desc: 'Onde ver o que tá acontecendo.' },
    ],
  },
  {
    id: 'troubleshooting',
    titulo: 'Troubleshooting',
    items: [
      { titulo: 'Container não sobe', desc: 'Porta ocupada, permissão, OOM.' },
      { titulo: 'Erro de conexão com Postgres', desc: 'DATABASE_URL, network, healthcheck.' },
      { titulo: 'Licença não aceita', desc: 'CNPJ divergente, validade, assinatura.' },
      { titulo: 'Performance lenta', desc: 'Índices, cache, hardware.' },
    ],
  },
]

const changelog = [
  {
    versao: '1.0.0',
    data: '2026-05-26',
    tipo: 'major',
    notas: [
      'Release inicial do Beanic ERP',
      'Módulos completos: Estoque, Compras, Produção (PCP/MES), Manutenção (PCM), Qualidade, Engenharia/BOM, SESMT, RH/DP',
      'Compliance fiscal SUFRAMA: PIN-e, internamento, PPB',
      'Auditoria estruturada em todos os fluxos críticos',
      'PWA instalável em desktop e mobile',
      'Backup automático local + off-site (Cloudflare R2)',
    ],
  },
]

export default function ClienteDocs() {
  const [activeTab, setActiveTab] = useState<'docs' | 'changelog'>('docs')

  return (
    <div>
      <div className="cliente-page-head">
        <div className="mono">Documentação</div>
        <h1>Guia técnico e versões</h1>
        <p className="cliente-page-lead">
          Tudo que sua equipe de TI precisa pra instalar, operar e diagnosticar o sistema.
          Documentação completa fica em <a className="cliente-page-link" href="https://docs.beanic.com.br" target="_blank" rel="noreferrer">docs.beanic.com.br</a> (em breve).
        </p>
      </div>

      <div className="cliente-tabs">
        <button
          className={`cliente-tab ${activeTab === 'docs' ? 'active' : ''}`}
          onClick={() => setActiveTab('docs')}
        >
          Guias técnicos
        </button>
        <button
          className={`cliente-tab ${activeTab === 'changelog' ? 'active' : ''}`}
          onClick={() => setActiveTab('changelog')}
        >
          Changelog
        </button>
      </div>

      {activeTab === 'docs' && (
        <div className="cliente-docs-sections">
          {docSections.map(sec => (
            <section key={sec.id} className="panel cliente-docs-section">
              <h2>{sec.titulo}</h2>
              <ul className="cliente-docs-items">
                {sec.items.map(item => (
                  <li key={item.titulo}>
                    <a href="#" className="cliente-docs-item">
                      <span className="cliente-docs-item-title">{item.titulo}</span>
                      <span className="cliente-docs-item-desc">{item.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {activeTab === 'changelog' && (
        <div className="cliente-changelog">
          {changelog.map(release => (
            <article key={release.versao} className="panel cliente-release">
              <div className="cliente-release-head">
                <div>
                  <div className="cliente-release-version">v{release.versao}</div>
                  <div className="cliente-release-date mono">{fmtDate(release.data)}</div>
                </div>
                <span className={`cliente-release-badge cliente-release-${release.tipo}`}>
                  {release.tipo === 'major' && 'Major'}
                  {release.tipo === 'minor' && 'Minor'}
                  {release.tipo === 'patch' && 'Patch'}
                </span>
              </div>
              <ul className="cliente-release-notas">
                {release.notas.map(nota => (
                  <li key={nota}>
                    <span className="cliente-bullet">▸</span> {nota}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}
