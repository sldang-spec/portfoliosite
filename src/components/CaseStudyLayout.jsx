import Footer from './Footer'
import './CaseStudyLayout.css'

export default function CaseStudyLayout({ hero, title, type, brief, meta, children }) {
  return (
    <div className="cs">
      <div className="cs__hero">
        {hero.video ? (
          <video src={hero.src} autoPlay muted loop playsInline className="cs__hero-media" />
        ) : (
          <img src={hero.src} alt={title} className="cs__hero-media" />
        )}
      </div>

      <div className="cs__body">
        <div className="cs__intro">
          <h1 className="cs__title">{title}</h1>
          <p className="cs__type">{type}</p>
        </div>

        <div className="cs__section">
          <h2 className="cs__section-label">Project Brief</h2>
          <p className="cs__brief">{brief}</p>
        </div>

        <div className="cs__meta">
          {meta.map((col) => (
            <div key={col.label} className="cs__meta-col">
              <p className="cs__meta-label">{col.label}</p>
              <ul className="cs__meta-list">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cs__sections">
          {children}
        </div>
      </div>

      <Footer showBack />
    </div>
  )
}
