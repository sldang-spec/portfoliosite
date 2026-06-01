import CaseStudyLayout from '../../components/CaseStudyLayout'
import './XRMural.css'

export default function XRMural() {
  return (
    <CaseStudyLayout
      hero={{ src: '/img/homecase/xrmural.webp', video: false }}
      title="Augmented Reality Mural"
      type="Extending the Physical world by AR"
      brief="Our mission was to create an extended reality component for the mural, pictured above, at the Iovine and Young Hall. The mural is a reflection of the members of my Cohort with the theme of space. The mural would be seen by visitors and we'd have the experience to be interactive and include an opportunity for visitors to leave a note. The experience would be created for both iOS/visionOS and visionOS."
      meta={[
        { label: 'Timeline', items: ['November – December 2026'] },
        { label: 'Disciplines', items: ['AR Development & Integration', '3D Modeling', 'Spatial UI/UX Design'] },
        { label: 'Responsibilities', items: ['Creative Brainstorming', '3D Modeling', 'User Interface', 'Prototyping'] },
        { label: 'Team', items: ['Laura Jun', 'Anjali Zalani', 'Reem Khan'] },
        { label: 'Tools', items: ['Reality Kit', 'Blender', 'XCode', 'Figma'] },
      ]}
    >
      <div className="xrmural__layout">
        <div className="xrmural__left">
          <video src="/img/xrmural/avpscav.mp4" autoPlay muted loop playsInline className="xrmural__video-horizontal" />
          <p className="cs__caption">
            The contributions to the project would be the 3D modeling of the objects that would pop out of the wall (Rocket, Star, Heart, and Train), the User Interface for the Experience, and the User Journey of the Experience.
          </p>
        </div>

        <div className="xrmural__right">
          <video src="/img/xrmural/ioSDemo.mp4" autoPlay muted loop playsInline className="xrmural__video-vertical" />
          <p className="cs__caption">
            Here is a video of the iOS version of the experience.
          </p>
        </div>
      </div>
    </CaseStudyLayout>
  )
}
