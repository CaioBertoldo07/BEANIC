import './Trust.css'

const sectors = ['Produção', 'Estoque', 'RH', 'Financeiro', 'Logística', 'Manutenção', 'Gestão']

export default function Trust() {
  return (
    <section className="trust">
      <div className="container trust-wrap">
        <div className="trust-label">Construído para setores</div>
        <div className="trust-sectors">
          {sectors.map((s) => (
            <div key={s}>{s}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
