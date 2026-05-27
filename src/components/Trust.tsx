import './Trust.css'

const sectors = [
  {
    label: 'Indústrias',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9v.01M13 9v.01M9 13v.01M13 13v.01M9 17v.01M13 17v.01" />
      </svg>
    ),
  },
  {
    label: 'Comércios',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l1-4h16l1 4M3 9v11h18V9M3 9h18M9 13h6" />
      </svg>
    ),
  },
  {
    label: 'Prestadores de serviço',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="9" r="4" />
        <path d="M17 11a4 4 0 0 0 0-8M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M17 21v-2c0-1.5-.6-2.8-1.6-3.7" />
      </svg>
    ),
  },
  {
    label: 'Empresas em crescimento',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    label: 'Pequenos negócios',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.2 4.2l4.2 4.2M15.6 15.6l4.2 4.2M1 12h6M17 12h6M4.2 19.8l4.2-4.2M15.6 8.4l4.2-4.2" />
      </svg>
    ),
  },
]

export default function Trust() {
  return (
    <section className="strip">
      <div className="container strip-wrap">
        <div className="strip-label">Atendemos</div>
        <div className="strip-items">
          {sectors.map((s) => (
            <div key={s.label}>
              {s.icon}
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
