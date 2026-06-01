import CaseStudyLayout from '../../components/CaseStudyLayout'

export default function DID() {
  return (
    <CaseStudyLayout
      hero={{ src: '/img/did/did1.webp', video: false }}
      title="Descent Into Darkness"
      type="Extended Reality Experience Branding"
      brief="Our mission was to create a narrative-driven campaign which would be a speculative concept for a game or interactive experience for the VR company Dreamscape. As Art Director, the focus was on visual cohesion and momentum: leading critiques, organizing meetings, managing deadlines, and channeling feedback from the professor into clear direction for the team. Within the campaign, a primary contribution was the LUCIFER poster and its accompanying Instagram campaign, establishing a darker visual identity that aligned with the narrative tone of the VR experience"
      meta={[
        { label: 'Timeline', items: ['May - June 2024'] },
        { label: 'Disciplines', items: ['Art Direction', 'Graphic Design', 'Project Management'] },
        { label: 'Responsibilities', items: ['Graphic Design', 'Project Management'] },
        { label: 'Team', items: ['Jade', 'Joshua', 'Matthew', 'Orlando', 'Eunice'] },
        { label: 'Tools', items: ['Adobe Suite', 'Figma'] },
      ]}
    >
      <div className="cs__image-full">
        <img src="/img/did/did2.webp" alt="DID 2" />
      </div>

      <div className="cs__image-full">
        <img src="/img/did/did3.webp" alt="DID 3" />
      </div>

      <div className="cs__image-full">
        <img src="/img/did/did4.webp" alt="DID 4" />
      </div>

      <div className="cs__image-grid cs__image-grid--2">
        {[5,6,7,8,9,10].map((n) => (
          <img key={n} src={`/img/did/did${n}.webp`} alt={`DID ${n}`} />
        ))}
      </div>
    </CaseStudyLayout>
  )
}
