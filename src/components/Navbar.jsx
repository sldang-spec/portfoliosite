import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import './Navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isAbout = pathname === '/about'
  const isCaseStudy = pathname.startsWith('/work/')
  const [worksActive, setWorksActive] = useState(false)
  const [aboutActive, setAboutActive] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  const workLinkRef = useRef(null)
  const aboutLinkRef = useRef(null)
  const pillRef = useRef(null)

  // Initialize pill on mount
  useEffect(() => {
    const pill = pillRef.current
    if (pill) {
      gsap.set(pill, { opacity: 0 })
    }
  }, [])

  // "work" activates when on case study pages or when scrolled past works section on home
  // "about" activates when on the about page
  useEffect(() => {
    if (isCaseStudy) {
      setWorksActive(true)
      setAboutActive(false)
    } else if (isAbout) {
      setAboutActive(true)
      setWorksActive(false)
    } else {
      setWorksActive(false)
      setAboutActive(false)
    }
  }, [pathname, isCaseStudy, isAbout])

  // On home page: track scroll to highlight "work" when works section is in view
  useEffect(() => {
    if (!isHome) return

    const onScroll = () => {
      const worksSection = document.getElementById('works')
      if (!worksSection) return

      const rect = worksSection.getBoundingClientRect()
      // Activate when works section top is above navbar (scrolled past it)
      setWorksActive(rect.top < 100)
    }

    onScroll() // check on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Animate pill to hovered or active link
  useEffect(() => {
    const pill = pillRef.current
    if (!pill) return

    let targetLink = null
    if (hoveredLink === 'work') {
      targetLink = workLinkRef.current
    } else if (hoveredLink === 'about') {
      targetLink = aboutLinkRef.current
    } else if (worksActive) {
      targetLink = workLinkRef.current
    } else if (aboutActive) {
      targetLink = aboutLinkRef.current
    }

    // On home page: hide pill if no hover and not at works section
    const shouldHidePill = isHome && !hoveredLink && !worksActive

    if (targetLink && !shouldHidePill) {
      const rect = targetLink.getBoundingClientRect()
      const parentRect = targetLink.parentElement.getBoundingClientRect()
      const x = rect.left - parentRect.left
      const y = rect.top - parentRect.top

      gsap.to(pill, {
        opacity: 1,
        x,
        y,
        width: rect.width,
        height: rect.height,
        duration: 0.35,
        ease: 'power2.out',
      })
    } else if (shouldHidePill) {
      gsap.to(pill, { opacity: 0, duration: 0.35, ease: 'power2.out' })
    }
  }, [hoveredLink, worksActive, aboutActive, isHome])

  // Per-frame hit-test: check the background color behind nav links and determine
  // if white or black text is more legible based on luminance.
  useEffect(() => {
    let raf = null

    const getLuminance = (r, g, b) => {
      // Calculate relative luminance per WCAG
      const [rs, gs, bs] = [r, g, b].map(x => {
        x = x / 255
        return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const getBackgroundColor = (element) => {
      let el = element
      while (el) {
        const style = window.getComputedStyle(el)
        const bgColor = style.backgroundColor
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          const match = bgColor.match(/\d+/g)
          if (match && match.length >= 3) {
            return { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) }
          }
        }
        el = el.parentElement
      }
      return { r: 255, g: 255, b: 255 } // default to white
    }

    const check = () => {
      const navBar = document.querySelector('.navbar')
      if (!navBar) { setIsDark(false); return }

      const rect = navBar.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const els = document.elementsFromPoint(cx, cy)

      // Find the background element (skip navbar itself)
      let bgColor = { r: 255, g: 255, b: 255 }
      for (let el of els) {
        if (el.closest('.navbar')) continue

        // Check if element is a video or image (likely dark)
        if (el.tagName === 'VIDEO' || el.tagName === 'IMG') {
          bgColor = { r: 0, g: 0, b: 0 } // Videos/images are usually dark
          break
        }

        bgColor = getBackgroundColor(el)
        if (bgColor.r !== 255 || bgColor.g !== 255 || bgColor.b !== 255) {
          break
        }
      }

      const lum = getLuminance(bgColor.r, bgColor.g, bgColor.b)
      // If luminance is less than 0.5, background is dark, use white text
      setIsDark(lum < 0.5)
    }

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(check)
    }

    check()  // run once on mount / route change
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', check)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  function handleWork(e) {
    if (isHome) {
      e.preventDefault()
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Apply dark-bg class for accessibility — "about" link changes color based on background
  // Only prevent it when "work" is active (which needs to always be white)
  const shouldApplyDarkBg = isDark && !worksActive

  return (
    <nav className={`navbar ${isHome ? 'navbar--home' : 'navbar--inner'} ${shouldApplyDarkBg ? 'navbar--dark-bg' : ''}`}>
      {!isHome && (
        <Link to="/" className="navbar__logo">
          <img src="/img/avatar.png" alt="Steven" />
        </Link>
      )}
      <div className="navbar__links">
        <div className="navbar__pill-container">
          <div ref={pillRef} className="navbar__pill" />
        </div>
        <Link
          ref={workLinkRef}
          to="/#works"
          onClick={handleWork}
          className={`navbar__link ${hoveredLink === 'work' || (!hoveredLink && worksActive) ? 'navbar__link--has-pill' : ''}`}
          onMouseEnter={() => setHoveredLink('work')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <span className="navbar__text">work</span>
        </Link>
        <Link
          ref={aboutLinkRef}
          to="/about"
          className={`navbar__link ${hoveredLink === 'about' || (!hoveredLink && aboutActive) ? 'navbar__link--has-pill' : ''}`}
          onMouseEnter={() => setHoveredLink('about')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <span className="navbar__text">about</span>
        </Link>
        <a href="mailto:sldang@usc.edu" className="navbar__cta">contact me</a>
      </div>
    </nav>
  )
}
