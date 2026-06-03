import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import './Works.css'

const sections = [
  {
    title: 'Selected XR Work',
    projects: [
      {
        id: 'xr-mural',
        title: '01 | AR Mural',
        subtitle: 'Augmented Reality Installation',
        thumb: '/img/homecase/xrmural.webp',
        path: '/work/xr-mural',
        tags: ['AR', 'UX', '3D Modeling'],
      },
      {
        id: 'clash-xr',
        title: '02 | ClashXR',
        subtitle: 'Extended Reality Survival Game',
        thumb: '/img/homecase/clashxr copy.webp',
        path: '/work/clash-xr',
        tags: ['XR', 'Game Design', 'UI'],
      },
      {
        id: 'snap-gtm',
        title: '03 | Snapchat x Nintendo GTM Strategy',
        subtitle: 'Go-To-Market Strategy',
        thumb: '/img/snap/snap-cover.webp',
        path: '/work/snap-gtm',
        tags: ['Strategy', 'Marketing', 'UX'],
      },
    ],
  },
  {
    title: 'Selected Branding Work',
    projects: [
      {
        id: 'nike-fc',
        title: '01 | Nike Community Engagement',
        subtitle: 'Social Branding Work',
        thumb: '/img/eafc/eafchero.webp',
        path: '/work/nike-fc',
        tags: ['Branding', 'Social Media', 'Motion'],
      },
      {
        id: 'did',
        title: '02 | Dreamscape Branding Campaign',
        subtitle: 'Social Branding Work',
        thumb: '/img/did/did1.webp',
        path: '/work/did',
        tags: ['Branding', 'Campaign', 'Poster'],
      },
    ],
  },
]

export default function Works() {
  return (
    <div className="works">
      <div className="works__avatar">
        <img src="/img/avatar.png" alt="Steven" />
      </div>

      <div className="works__content">
        {sections.map((section) => (
          <section key={section.title} className="works__section">
            <h2 className="works__section-title">{section.title}</h2>
            <div className="works__grid">
              {section.projects.map((project) => (
                <Link
                  key={project.id}
                  to={project.path}
                  className="works__card"
                >
                  <div className="works__card-img-wrap">
                    <img
                      src={project.thumb}
                      alt={project.title}
                      className="works__card-img"
                    />
                    <div className="works__card-overlay">
                      <div className="works__card-tags">
                        {project.tags.map((t) => (
                          <span key={t} className="works__tag">{t}</span>
                        ))}
                      </div>
                      <div className="works__card-info">
                        <h3 className="works__card-title">{project.title}</h3>
                        <p className="works__card-sub">{project.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="works__footer-wrap">
        <Footer />
      </div>
    </div>
  )
}
