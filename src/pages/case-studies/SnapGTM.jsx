import { useRef, useState } from 'react'
import CaseStudyLayout from '../../components/CaseStudyLayout'
import './SnapGTM.css'

const timeline = [
  {
    num: 1,
    title: 'Research & Insights',
    description: 'We started by understanding the Nintendo audience and their connection to AR experiences. Through user research and competitive analysis, we identified key opportunities for Snap Spectacles integration.',
    img: '/img/snap/snap-timeline1.webp',
  },
  {
    num: 2,
    title: 'Strategy Development',
    description: 'Our team developed a comprehensive Go-To-Market strategy targeting North American markets. We created touchpoint strategies across multiple Nintendo franchises and experiences.',
    img: '/img/snap/snap-timeline2.webp',
  },
  {
    num: 3,
    title: 'Campaign Execution',
    description: 'We executed three major partnerships: Nintendo Switch, Animal Crossing, and Pokémon GO. Each campaign leveraged unique AR experiences tailored to the franchise audiences.',
    img: '/img/snap/snap-timeline3.webp',
  },
  {
    num: 4,
    title: 'Results & Impact',
    description: 'The integrated campaigns reached millions of users globally, creating engaging AR experiences that strengthened the connection between Snap Spectacles and gaming.',
    img: '/img/snap/snap-timeline4.webp',
  },
]

export default function SnapGTM() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const trackRef = useRef(null)
  const detailsRef = useRef(null)

  const handleNext = () => {
    if (trackRef.current) {
      const slideWidth = trackRef.current.offsetWidth
      trackRef.current.scrollBy({
        left: slideWidth,
        behavior: 'smooth'
      })

      if (currentSlide < timeline.length) {
        setCurrentSlide(currentSlide + 1)
      }
    }
  }

  return (
    <CaseStudyLayout
      hero={{ src: '/img/homecase/snap copy.webp', video: false }}
      title="Snap Spectacles x Nintendo GTM Strategy"
      type="AR Product Design and Release Strategy"
      brief="Our mission was to design a multi-phase, in-person experiential campaign to launch Snap Spectacles as the first true, shared, midweight, real-world AR platform. Some objectives were to differentiate the Spectacles from other AR platforms like the Meta AI Glasses and the Apple Vision Pro and build excitement and understanding on arrival."
      meta={[
        { label: 'Timeline', items: ['February 2026'] },
        { label: 'Disciplines', items: ['Campaign Strategy', 'Art Direction', 'Brand Strategy', 'User Experience Design'] },
        { label: 'Responsibilities', items: ['UX Research', 'Graphic Design', 'Prototyping'] },
        { label: 'Team', items: ['Halas Graden', 'AJ Ward', 'David Landis', 'Amelia Mannion'] },
        { label: 'Tools', items: ['Flora AI', 'Figma'] },
      ]}
    >
      {/* Research Section */}
      <div>
        <h2 className="snap__section-heading">Research</h2>
        <p className="snap__section-text">
          Before strategizing our campaign we decided to look at previous successful rollouts for product which directed us to the release of Marty Supreme. We saw that exclusivity and multiple touch points were utilized in the campaign which influenced our interactive events surrounding the release of the Spectacles and the release itself, which would have the Spectacles release like a sneaker drop as opposed to a release of technology, utilizing exclusivity to generate desire for the products.
        </p>
      </div>

      {/* Video section */}
      <div className="snap__video-section">
        <video src="/img/snap/snap-intro.mp4" controls playsInline className="snap__video" />
      </div>

      {/* Research image - standalone */}
      <div className="snap__full-image">
        <img src="/img/snap/snap-cs.webp" alt="Research Overview" />
      </div>

      {/* Experiential Event Section */}
      <div className="snap__experiential-section">
        <h2 className="snap__section-heading">Experiential Event</h2>
        <p className="snap__section-text">
          We wanted to collaborate with Nintendo because of the opportunity to gamify the release, identifying the fanbase of Nintendo would enjoy seeing their favorite games in the real world through Augmented reality. We aimed to have each experience coincide with a real world event to make each event relevant to what is currently going in pop culture.
        </p>
      </div>

      {/* Partnership Image */}
      <div className="snap__full-image">
        <img src="/img/snap/snap-kickoff.webp" alt="Snap Spectacles and Nintendo Partnership" />
      </div>

      <p className="snap__section-text">
        Our first stop is Universal Studios Hollywood at Super Mario World. To begin experiential advertising could be seen throughout LA where highlighting the event. At the park, visitors can expect to play a Super Mario Coin Hunt around the world, collecting coins to redeem real life merch., or play a Mario Party Jamboree style game, competing against other visitors.
      </p>

      {/* Main content images and videos */}
      <div className="snap__content-block">
        <img src="/img/snap/snap-mario.webp" alt="Nintendo Switch Partnership" />
      </div>

      <div className="snap__demo-section">
        <h3 className="snap__demo-title">Demo of Mario coin collection</h3>
        <video src="/img/snap/snap-mario-demo.mp4" controls playsInline className="snap__demo-video" />
      </div>

      <p className="snap__section-text">
        Next we would go to the Colosseum in Rome to compete with other Pokémon Trainers. Taking inspiration from the Pokémon Colosseum game, we would have players battle each other in the colosseum to have a grandiose event where trainers would remember this experience every time they would play a Pokémon game in the future.
      </p>

      <div className="snap__content-block">
        <img src="/img/snap/snap-pokemon.webp" alt="Pokémon GO Partnership" />
      </div>

      <p className="snap__section-text">
        Finally we would stop in Kyoto, Japan at the Fushimi Inari Shrine with the cast of Animal Crossing. This event takes place during the Moon Cake festival where visitors would be able to release lanterns and eat mooncakes with their loved ones and Animal Crossing Characters.
      </p>

      <div className="snap__content-block">
        <img src="/img/snap/snap-animalcrossing.webp" alt="Animal Crossing Partnership" />
      </div>

      <p className="snap__section-text">
        Below is the timeline of all of the events and release of the Spectacles. We wanted to utilize a release where the Spectacles would trickle out instead of releasing all at once, we aimed to create exclusivity as the Marty Supreme did with the release with their Track Jackets.
      </p>

      {/* Timeline section */}
      <div className="snap__timeline-section">
        <h2 className="snap__timeline-title">Project Timeline</h2>

        <div className="snap__timeline-carousel">
          <div className="snap__timeline-track" ref={trackRef}>
            {timeline.map((item) => (
              <div key={item.num} className={`snap__timeline-slide ${currentSlide === item.num ? 'active' : ''}`}>
                <img src={item.img} alt={item.title} className="snap__timeline-slide-img" />
              </div>
            ))}
          </div>

          <div className="snap__timeline-nav">
            <span className="snap__timeline-scroll-hint">scroll</span>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  )
}
