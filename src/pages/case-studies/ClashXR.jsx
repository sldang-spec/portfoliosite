import CaseStudyLayout from '../../components/CaseStudyLayout'

export default function ClashXR() {
  return (
    <CaseStudyLayout
      hero={{ src: '/img/homecase/clashxr copy.webp', video: false }}
      title="Clash XR"
      type="Extended Reality Survival Game"
      brief="As a part of a Supercell Hackathon, we were tasked with making a game, utilizing AI tools. My team wanted to pursue something involving XR because of the capabilities and novelties that it would be able to offer. Some of the inspirations for the product was Super Hot, Beat Saber, and of course the Supercell IP."
      meta={[
        { label: 'Timeline', items: ['24 Hours'] },
        { label: 'Disciplines', items: ['XR Design', '3D Rigging', '3D Modeling', 'User Interface Design'] },
        { label: 'Responsibilities', items: ['User Interface Development', '3D Modeling', '3D Rigging'] },
        { label: 'Team', items: ['Ethan Wu', 'Reem Khan'] },
        { label: 'Tools', items: ['Blender', 'Unity', 'Meta SDK', 'Hexagen'] },
      ]}
    >
      <div className="cs__image-full">
        <video src="/img/clashxr/clashxrdemo.mp4" autoPlay muted loop playsInline />
      </div>
      <p className="cs__caption">
        On display is the final product. Players use an X-Bow (Meta Quest Controllers) to shoot non-stop, Supercell-inspired enemy hordes, including the Witch and Skeletons, in a physically engaging environment.
      </p>
      <p className="cs__caption">
        My contributions would be the modeling of the 3D assets as well as the rigging of 3D assets if they needed to move. Not pictured was the UI that wasn't able to make into the game. The UI would consist of a directory that would allow users different options and other prospective levels that they would be able to play.
      </p>
    </CaseStudyLayout>
  )
}
