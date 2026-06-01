import { Link } from 'react-router-dom'
import beanicLogo from '../assets/beanic-logo.png'
import Footer from '../components/Footer'
import './PrivacidadePage.css'

const ULTIMA_ATUALIZACAO = '01 de junho de 2026'

const sections = [
  { id: 'quem-somos', label: '1. Quem somos' },
  { id: 'dados-coletados', label: '2. Dados que coletamos' },
  { id: 'finalidade', label: '3. Por que coletamos (base legal)' },
  { id: 'armazenamento', label: '4. Onde e por quanto tempo armazenamos' },
  { id: 'compartilhamento', label: '5. Compartilhamento com terceiros' },
  { id: 'direitos', label: '6. Seus direitos como titular' },
  { id: 'cookies', label: '7. Cookies e tecnologias similares' },
  { id: 'seguranca', label: '8. Segurança da informação' },
  { id: 'encarregado', label: '9. Encarregado (DPO)' },
  { id: 'alteracoes', label: '10. Alterações nesta política' },
  { id: 'reclamacao', label: '11. Reclamação à ANPD' },
]

export default function PrivacidadePage() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <div className="container">
          <Link to="/" className="privacy-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Voltar para a home
          </Link>
          <Link to="/" className="privacy-brand">
            <img src={beanicLogo} alt="BEANIC" />
          </Link>
        </div>
      </header>

      <main className="privacy-main">
        <div className="container privacy-container">
          <div className="privacy-head">
            <div className="eyebrow">
              <span className="ix" />
              <span className="mono">Documento legal</span>
            </div>
            <h1>Política de Privacidade</h1>
            <p className="privacy-lead">
              Esta política descreve como a BEANIC coleta, usa e protege os dados
              pessoais de visitantes, clientes e usuários do nosso portal, em
              conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
            </p>
            <div className="privacy-meta">
              <span className="mono">Última atualização: {ULTIMA_ATUALIZACAO}</span>
            </div>
          </div>

          <nav className="privacy-toc" aria-label="Sumário">
            <div className="privacy-toc-label mono">Sumário</div>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="privacy-body">
            <section id="quem-somos">
              <h2>1. Quem somos</h2>
              <p>
                A <strong>BEANIC</strong> é uma empresa de tecnologia que desenvolve
                sistemas internos, sites institucionais, dashboards gerenciais e
                automações sob medida para empresas que querem organizar e escalar
                suas operações.
              </p>
              <p>
                Esta política se aplica ao site <strong>beanic.com.br</strong>,
                aos subdomínios operados pela BEANIC (incluindo portais de clientes
                como <strong>amacom.beanic.com.br</strong>) e a qualquer comunicação
                comercial originada por nós.
              </p>
              <p>
                Para qualquer dúvida sobre esta política ou sobre o tratamento dos
                seus dados, fale conosco em{' '}
                <a href="mailto:comercial@beanic.com.br">comercial@beanic.com.br</a>.
              </p>
            </section>

            <section id="dados-coletados">
              <h2>2. Dados que coletamos</h2>
              <p>Coletamos apenas o mínimo necessário pra cada finalidade:</p>

              <h3>2.1 Navegação no site público</h3>
              <ul>
                <li>Dados anônimos de acesso (IP, navegador, sistema operacional, páginas visitadas) processados pela Cloudflare como parte da infraestrutura de entrega.</li>
                <li>
                  <strong>Não usamos</strong> Google Analytics, Meta Pixel ou
                  qualquer outra ferramenta de rastreamento publicitário.
                </li>
              </ul>

              <h3>2.2 Contato comercial</h3>
              <ul>
                <li>E-mail, nome e mensagem que você nos envia voluntariamente por <code>mailto:</code>, WhatsApp ou formulário.</li>
              </ul>

              <h3>2.3 Portal do cliente (acesso autenticado)</h3>
              <ul>
                <li>E-mail corporativo cadastrado pela equipe da BEANIC para acesso ao portal.</li>
                <li>Código OTP (one-time password) gerado para autenticação, com validade curta.</li>
                <li>Registros de acesso (IP, data/hora, ação realizada) para fins de auditoria e segurança.</li>
                <li>Dados de contrato, licença e versão do sistema utilizada por você.</li>
              </ul>
            </section>

            <section id="finalidade">
              <h2>3. Por que coletamos (base legal)</h2>
              <p>
                Conforme o Art. 7º da LGPD, tratamos dados pessoais com as seguintes
                bases legais:
              </p>
              <ul>
                <li>
                  <strong>Execução de contrato</strong> (Art. 7º, V): operação do
                  portal do cliente, entrega de licenças, suporte técnico e
                  cumprimento dos serviços contratados.
                </li>
                <li>
                  <strong>Legítimo interesse</strong> (Art. 7º, IX): segurança da
                  informação, prevenção de fraudes, auditoria interna e melhoria
                  contínua dos nossos serviços.
                </li>
                <li>
                  <strong>Consentimento</strong> (Art. 7º, I): quando você nos
                  envia uma mensagem comercial voluntariamente.
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal</strong> (Art. 7º, II):
                  guarda de registros fiscais e contratuais conforme legislação
                  aplicável.
                </li>
              </ul>
            </section>

            <section id="armazenamento">
              <h2>4. Onde e por quanto tempo armazenamos</h2>

              <h3>4.1 Infraestrutura</h3>
              <ul>
                <li>
                  <strong>Cloudflare</strong> (KV, Pages, Access) — entrega do site,
                  armazenamento de credenciais cifradas e logs de acesso.
                </li>
                <li>
                  <strong>Resend</strong> — envio transacional do código OTP por
                  e-mail.
                </li>
              </ul>
              <p>
                Esses fornecedores atuam como operadores de dados sob nossa
                instrução e têm suas próprias políticas de privacidade públicas.
              </p>

              <h3>4.2 Retenção</h3>
              <ul>
                <li>Logs de acesso ao portal: 90 dias.</li>
                <li>Dados de cliente ativo: pelo período do contrato vigente.</li>
                <li>Dados após encerramento de contrato: até 5 anos, para cumprimento de obrigações fiscais e legais (Art. 16, LGPD).</li>
                <li>Mensagens de contato comercial: até 2 anos ou até solicitação de exclusão, o que ocorrer primeiro.</li>
              </ul>
            </section>

            <section id="compartilhamento">
              <h2>5. Compartilhamento com terceiros</h2>
              <p>
                <strong>Não vendemos seus dados.</strong> Não compartilhamos seus
                dados para fins de marketing de terceiros. Não fazemos cessão a
                parceiros comerciais.
              </p>
              <p>Compartilhamos dados apenas com:</p>
              <ul>
                <li>Subprocessadores listados na seção 4.1 (Cloudflare, Resend), nos limites estritamente necessários para a operação do serviço.</li>
                <li>Autoridades públicas, quando exigido por ordem judicial ou obrigação legal.</li>
              </ul>
            </section>

            <section id="direitos">
              <h2>6. Seus direitos como titular</h2>
              <p>
                Conforme o Art. 18 da LGPD, você pode exercer a qualquer momento os
                seguintes direitos sobre os seus dados pessoais:
              </p>
              <ul>
                <li>Confirmação da existência de tratamento;</li>
                <li>Acesso aos seus dados;</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade;</li>
                <li>Portabilidade dos dados a outro fornecedor;</li>
                <li>Eliminação dos dados pessoais tratados com base no seu consentimento;</li>
                <li>Informação sobre entidades públicas e privadas com as quais compartilhamos seus dados;</li>
                <li>Revogação do consentimento.</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, envie um e-mail para{' '}
                <a href="mailto:comercial@beanic.com.br">comercial@beanic.com.br</a>{' '}
                com o assunto <code>LGPD — exercício de direito</code>. Respondemos
                em até 15 dias.
              </p>
            </section>

            <section id="cookies">
              <h2>7. Cookies e tecnologias similares</h2>
              <p>Usamos apenas cookies estritamente necessários:</p>
              <ul>
                <li>
                  <strong>Cookie de sessão</strong> do portal autenticado, para
                  manter você logado entre páginas. Expira ao fechar o navegador
                  ou após período de inatividade.
                </li>
                <li>
                  <strong>Cookie do Cloudflare Access</strong> (<code>CF_Authorization</code>),
                  necessário para autenticação no painel administrativo.
                </li>
              </ul>
              <p>
                <strong>Não utilizamos</strong> cookies de analytics, publicidade,
                rastreamento entre sites ou de redes sociais.
              </p>
            </section>

            <section id="seguranca">
              <h2>8. Segurança da informação</h2>
              <p>
                Aplicamos medidas técnicas e administrativas para proteger seus
                dados, incluindo:
              </p>
              <ul>
                <li>HTTPS obrigatório em todo o tráfego (HSTS habilitado).</li>
                <li>Autenticação via OTP por e-mail (sem senhas estáticas).</li>
                <li>Acesso ao painel administrativo via Cloudflare Access com validação de JWT.</li>
                <li>Audit log de operações sensíveis no portal.</li>
                <li>Cabeçalhos de segurança configurados (CSP, X-Frame-Options, Permissions-Policy, Cross-Origin Resource Policy).</li>
                <li>Mínimo privilégio: só damos acesso ao que cada perfil precisa.</li>
              </ul>
              <p>
                Em caso de incidente de segurança que possa afetar você, comunicaremos
                no prazo legal previsto pela LGPD.
              </p>
            </section>

            <section id="encarregado">
              <h2>9. Encarregado (DPO)</h2>
              <p>
                O canal oficial da BEANIC para tratativas relacionadas à proteção
                de dados é:
              </p>
              <ul>
                <li><strong>E-mail:</strong> <a href="mailto:comercial@beanic.com.br">comercial@beanic.com.br</a></li>
                <li><strong>Assunto:</strong> <code>LGPD — [seu assunto]</code></li>
              </ul>
            </section>

            <section id="alteracoes">
              <h2>10. Alterações nesta política</h2>
              <p>
                Esta política pode ser atualizada quando houver mudança nos serviços,
                na infraestrutura ou na legislação aplicável. A data da última
                atualização fica registrada no topo desta página.
              </p>
              <p>
                Alterações materiais (que afetem o tratamento dos seus dados) serão
                comunicadas por e-mail aos clientes ativos com pelo menos 15 dias
                de antecedência.
              </p>
            </section>

            <section id="reclamacao">
              <h2>11. Reclamação à ANPD</h2>
              <p>
                Caso entenda que seus direitos não foram atendidos, você pode
                apresentar reclamação à Autoridade Nacional de Proteção de Dados
                (ANPD):
              </p>
              <ul>
                <li>
                  Site:{' '}
                  <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
                    www.gov.br/anpd
                  </a>
                </li>
              </ul>
            </section>
          </article>

          <div className="privacy-foot">
            <Link to="/" className="privacy-back-bottom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Voltar para a home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
