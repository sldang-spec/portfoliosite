import NowPlaying from '../components/NowPlaying'
import Footer from '../components/Footer'
import './About.css'

export default function About() {
  return (
    <div className="about">
      <div className="about__content">

        {/* Top two-col: bio + listening */}
        <div className="about__top">
          <div className="about__bio">
            <div className="about__bio-block">
              <h3 className="about__section-label">What I'm up to today</h3>
              <p>
                I'm currently a student at USC's Iovine and Young Academy studying Arts,
                Technology, and the Business of Innovation with a focus on product design and an
                Augmented Reality Development Intern at Snap Inc. During the semester you
                could find me in the Creator Studio, making something silly for class.
              </p>
            </div>

            <div className="about__bio-block">
              <h3 className="about__section-label">What inspires me</h3>
              <p>
                Growing up in Southern California, I had the opportunity to be surrounded with
                different types of creative expression. Because of this my love for movies, music,
                fashion and video games all influence the products that I design. As a Teacher
                Assistant at my Community College I met people from all walks of life, giving me a
                unique perspective on who I might design for. Because of this empathy is at the
                forefront of my work, promoting an equitable user experience.
              </p>
            </div>

            <div className="about__bio-block">
              <h3 className="about__section-label">Whats Next</h3>
              <p>
                Digital mediums like web, mobile, and XR allow me to have the most impact
                through creating equitable user interfaces and experiences. Because of this, I'm
                looking for opportunities in these spaces to refine my craft.
              </p>
            </div>
          </div>

          <div className="about__listening">
            <NowPlaying />
          </div>
        </div>

        {/* What's for fun */}
        <div className="about__fun">
          <h2 className="about__fun-heading">What's for fun?</h2>

          <div className="about__fun-grid">
            {/* Gaming */}
            <div className="about__fun-card about__fun-card--gaming">
              <img src="/img/about/radiant.jpeg" alt="Valorant rank" className="about__gaming-rank-image" />
            </div>

            {/* Video */}
            <div className="about__fun-card about__fun-card--video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/1nih2b6KYy8"
                title="Valorant Montage"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Accounts */}
            <div className="about__fun-accounts">
              <a href="https://tracker.gg/valorant/profile/riot/shai%23hog/overview?platform=pc&playlist=competitive&season=9d85c932-4820-c060-09c3-668636d4df1b" target="_blank" rel="noreferrer" className="about__fun-account about__fun-account--main">
                <img src="/img/about/reyna.webp" alt="Main Account" className="about__account-left-icon" />
                <p className="about__account-label">Main Account</p>
                <img src="/img/about/Empress.webp" alt="Empress" className="about__account-right-icon" />
              </a>
              <a href="https://tracker.gg/valorant/profile/riot/hog%23swag/overview?platform=pc&playlist=competitive" target="_blank" rel="noreferrer" className="about__fun-account about__fun-account--alt">
                <img src="/img/about/raze.webp" alt="Second Account" className="about__account-left-icon" />
                <p className="about__account-label">Second Account</p>
                <img src="/img/about/Showstopper.webp" alt="Showstopper" className="about__account-right-icon" />
              </a>
              <p className="about__fun-accounts-copy">
                While I play a variety of games, Valorant has always appealed to me because of the mix of technical skill and teamwork to win, wrapped in an art style that I think is beautiful. I loved the game so much that I grinded to get to #460 in North America! Click above to see my current stats on both of the accounts that I play on and click the video to see the montage that I recorded and edited myself!
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="about__fun-bottom">
            <div className="about__fun-bottom-left">
              <div className="about__fun-bottom-images">
                <img src="/img/about/s2k1.jpeg" alt="S2000" className="about__fun-card about__fun-card--car-photo" />
                <img src="/img/about/s2k2.jpeg" alt="S2000" className="about__fun-card about__fun-card--car-photo" />
              </div>

              <p className="about__car-caption">
                Another fun past time I enjoy is driving while listening to music
                in my Honda S2000. Growing up I've always loved cars so
                when it was time to get my own of course I had to go with a
                JDM Legend. Also, I would be lying if I said watching 2 Fast 2
                Furious did not convince me to look for an S2000. Click below
                to learn more about the S2000's appearance in the movie.
              </p>

              <a href="https://fastandfurious.fandom.com/wiki/Suki" target="_blank" rel="noreferrer" className="about__explore-btn">
                <span>Explore More</span>
                <img src="/img/about/Suki.png" alt="" className="about__explore-btn-icon" />
              </a>
            </div>

            <img src="/img/about/s2k3.jpeg" alt="S2000" className="about__fun-card about__fun-card--car-photo-right" />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
