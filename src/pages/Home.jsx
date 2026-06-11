import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollAvatar from '../components/ScrollAvatar'
import Footer from '../components/Footer'
import './Home.css'

const xrProjects = [
  {
    num: '01', id: 'snap-gtm',
    title: 'Snapchat × Nintendo GTM Strategy',
    role: 'Product Designer',
    thumb: '/img/homecase/snap copy.webp',
    path: '/work/snap-gtm',
    lightText: true,
    objectFit: 'cover',
    badge: { src: '/img/homecase/snapchat-logo-snapchat-icon-transparent-free-png.png', bg: '#FFFC00', round: true },
  },
  {
    num: '02', id: 'xr-mural',
    title: 'AR Mural',
    role: 'Product Designer',
    thumb: '/img/homecase/xrmural.webp',
    path: '/work/xr-mural',
    lightText: false,
    objectFit: 'contain',
    cardBg: '#ffffff',
    badge: { src: '/img/homecase/apple logo.png', bg: 'transparent', round: false },
  },
  {
    num: '03', id: 'clash-xr',
    title: 'ClashXR',
    role: 'Product Designer',
    thumb: '/img/homecase/clashxr copy.webp',
    path: '/work/clash-xr',
    lightText: true,
    objectFit: 'cover',
    badge: { src: '/img/homecase/Supercell-logo.svg.png', bg: 'rgba(255,255,255,0.15)', round: false },
  },
]

const brandingProjects = [
  {
    num: '01', id: 'nike-fc',
    title: 'Nike Community Engagement',
    role: 'Art Director',
    thumb: '/img/homecase/Crowd Expansion (1).webp',
    path: '/work/nike-fc',
    lightText: true,
    objectFit: 'cover',
    badge: { src: '/img/homecase/Nike_logo.png', bg: 'transparent', round: false, wide: true },
  },
  {
    num: '02', id: 'did',
    title: 'Dreamscape Branding Campaign',
    role: 'Art Director',
    thumb: '/img/homecase/did.webp',
    path: '/work/did',
    lightText: true,
    objectFit: 'cover',
    badge: { src: '/img/homecase/dreamscape.png', bg: 'transparent', round: false, wide: true },
  },
]

const miscLeft = [
  { id: 'litespots', isVideo: true, src: '/img/homecase/litespots.mp4', title: 'Litespots', role: 'Designer', size: 'small' },
  { id: 'atall',     isVideo: true, src: '/img/homecase/atall.mp4',     title: 'At All',    role: 'Designer', size: 'small' },
  { id: 'nature', thumb: '/img/homecase/NatureExchange.jpeg', title: 'Kidspace Museum Nature Exchange', role: 'Fabricator', size: 'large' },
]

const miscRight = [
  { id: 'minecraft', thumb: '/img/homecase/minecraft.jpeg', title: '5 Foot Minecraft Torch Lamp', role: 'Industrial Designer', size: 'tall' },
  { id: 'bronco',    thumb: '/img/homecase/Bronco.jpeg',    title: 'Bronco Tire Bag',              role: 'Designer / Researcher', size: 'medium' },
]

function WorkCard({ p }) {
  const cls = `wcard ${p.lightText ? 'wcard--light' : 'wcard--dark'}`
  return (
    <Link to={p.path} className="wcard__link">
      <div className={cls} style={{ background: p.cardBg || 'transparent' }} data-wcard>
        <img
          src={p.thumb}
          alt={p.title}
          className="wcard__img"
          style={{ objectFit: p.objectFit || 'cover' }}
          loading="lazy"
          decoding="async"
        />
        <div className="wcard__top">
          <span className="wcard__num">{p.num} | {p.title}</span>
          {p.badge && (
            <div
              className={`wcard__badge ${p.badge.round ? 'wcard__badge--round' : ''} ${p.badge.wide ? 'wcard__badge--wide' : ''}`}
              style={{ background: p.badge.bg }}
            >
              <img src={p.badge.src} alt="" />
            </div>
          )}
          {p.badgeText && <span className="wcard__badge-text">{p.badgeText}</span>}
        </div>
        <div className="wcard__bottom">
          <span className="wcard__role">{p.role}</span>
        </div>
      </div>
    </Link>
  )
}

function MiscCard({ item, className }) {
  const videoRef = useRef(null)
  const emojiRef = useRef(null)

  // Only play videos while they're actually in view — saves CPU/battery
  // and guarantees unmuted audio can never leak from an offscreen card.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
          video.muted = true
          if (emojiRef.current) emojiRef.current.textContent = '🔇'
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handleEnter = () => {
    if (videoRef.current) videoRef.current.muted = false
    if (emojiRef.current) emojiRef.current.textContent = '🔊'
  }

  const handleLeave = () => {
    if (videoRef.current) videoRef.current.muted = true
    if (emojiRef.current) emojiRef.current.textContent = '🔇'
  }

  return (
    <div
      className={`misc-card ${className}`}
      data-misc
      onMouseEnter={item.isVideo ? handleEnter : undefined}
      onMouseLeave={item.isVideo ? handleLeave : undefined}
    >
      {item.isVideo
        ? <video ref={videoRef} src={item.src} autoPlay muted loop playsInline preload="metadata" className="misc-card__media" />
        : <img src={item.thumb} alt={item.title} className="misc-card__media" loading="lazy" decoding="async" />
      }
      <div className="misc-card__overlay" />
      {item.isVideo && (
        <span ref={emojiRef} className="misc-card__sound">🔇</span>
      )}
      <div className="misc-card__info">
        <p className="misc-card__title">{item.title}</p>
        <p className="misc-card__role">{item.role}</p>
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    const cards = gsap.utils.toArray('[data-wcard]')
    const miscCards = gsap.utils.toArray('[data-misc]')

    // Set initial hidden state before any paint
    gsap.set(cards, {
      opacity: 0.5,
      scale: 0.6,
      rotateX: 15,
      transformPerspective: 1200,
    })
    gsap.set(miscCards, {
      opacity: 0.5,
      scale: 0.85,
      rotateX: 8,
      transformPerspective: 800,
    })

    const tweens = cards.map((card) =>
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    )

    const miscTweens = miscCards.map((card) =>
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    )

    // Recalculate trigger positions after layout is fully settled
    ScrollTrigger.refresh()

    return () => {
      ;[...tweens, ...miscTweens].forEach((t) => t.scrollTrigger?.kill())
    }
  }, [])

  return (
    <>
      <ScrollAvatar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__heading">Hi, I'm Steven!</h1>
          <p className="hero__sub">
            A designer creating <strong>physical</strong> and <strong>digital</strong> experiences
            at USC's Iovine and Young Academy and Snap Inc.
          </p>
        </div>
      </section>

      {/* ── Mobile Hero (shown only on mobile) ── */}
      <section className="hero-mobile">
        <div className="hero-mobile__container">
          <div className="hero-mobile__blob" />
          <img src="/img/avatar.png" alt="Steven" className="hero-mobile__avatar" />
        </div>
        <h1 className="hero-mobile__heading">Hi, I'm Steven!</h1>
        <p className="hero-mobile__sub">
          A designer creating <strong>physical</strong> and <strong>digital</strong> experiences
          at USC's Iovine and Young Academy and Snap Inc.
        </p>
        <p className="hero-mobile__cta">For the full experience<br />view on desktop</p>
      </section>

      {/* ── Works ── */}
      <section id="works" className="home-works">
        <div className="home-works__inner">

          {/* XR */}
          <div className="home-works__section">
            <h2 className="home-works__section-label">Selected XR Work</h2>
            <div className="home-works__stack">
              {xrProjects.map(p => <WorkCard key={p.id} p={p} />)}
            </div>
          </div>

          {/* Branding */}
          <div className="home-works__section">
            <h2 className="home-works__section-label">Selected Branding Work</h2>
            <div className="home-works__stack">
              {brandingProjects.map(p => <WorkCard key={p.id} p={p} />)}
            </div>
          </div>

          {/* Misc */}
          <div className="home-works__section">
            <h2 className="home-works__section-label">Miscellaneous Work</h2>
            <div className="misc-grid">
              <div className="misc-col misc-col--left">
                <MiscCard item={miscLeft[0]} className="misc-card--small" />
                <MiscCard item={miscLeft[1]} className="misc-card--small" />
                <MiscCard item={miscLeft[2]} className="misc-card--large" />
              </div>
              <div className="misc-col misc-col--right">
                <MiscCard item={miscRight[0]} className="misc-card--tall" />
                <MiscCard item={miscRight[1]} className="misc-card--medium" />
              </div>
            </div>
          </div>

        </div>

        <Footer />
      </section>
    </>
  )
}
