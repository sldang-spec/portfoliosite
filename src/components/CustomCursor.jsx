import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CustomCursor.css'

gsap.registerPlugin(ScrollTrigger)

function shouldExpand(target) {
  if (!target) return false
  if (target.closest('.wcard__link, .wcard, .misc-card')) return false
  if (target.classList.contains('navbar__cta')) return false
  return true
}

export default function CustomCursor() {
  const circleRef = useRef()
  const { pathname } = useLocation()

  // Sync current pathname into a ref so the long-lived effect can read it
  const pathnameRef = useRef(pathname)
  useEffect(() => { pathnameRef.current = pathname }, [pathname])

  // Hide dot on about page and case study pages; restore on home page only
  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return
    const isAbout = pathname === '/about'
    const isCaseStudy = pathname.startsWith('/work/')
    const shouldHide = isAbout || isCaseStudy
    document.body.classList.toggle('cursor-about', shouldHide)
    gsap.to(circle, { opacity: shouldHide ? 0 : 1, duration: 0.25 })
    return () => document.body.classList.remove('cursor-about')
  }, [pathname])

  useEffect(() => {
    const circle = circleRef.current
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cx = mouseX, cy = mouseY
    let isHovering = false, hoveredEl = null
    let scrollProgress = 0
    let prevInScrollMode = false
    let atNav = false
    let scrollStartCx = null   // dot position at the moment scroll mode begins
    let scrollStartCy = null

    gsap.set(circle, { xPercent: -50, yPercent: -50, x: cx, y: cy })

    const st = ScrollTrigger.create({
      trigger: '#works',
      start: 'top 85%',
      end: 'top 10%',
      scrub: 1.2,
      onUpdate: self => { scrollProgress = self.progress },
    })

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      const p = scrollProgress
      const isAbout = pathnameRef.current === '/about'
      const isCaseStudy = pathnameRef.current.startsWith('/work/')
      // Never enter scroll mode on the about page or case study pages
      const inScrollMode = p > 0.005 && pathnameRef.current !== '/about' && !isCaseStudy

      // Entering scroll mode: snapshot dot position so mouse is cut out
      if (inScrollMode && !prevInScrollMode) {
        scrollStartCx = cx
        scrollStartCy = cy
      }

      // Leaving scroll mode: clear snapshot and reset dot
      if (!inScrollMode && prevInScrollMode) {
        scrollStartCx = null
        scrollStartCy = null
        isHovering = false
        hoveredEl = null
        const shouldHide = isAbout || isCaseStudy
        gsap.to(circle, { width: 18, height: 18, borderRadius: '50%', opacity: shouldHide ? 0 : 1, duration: 0.45, ease: 'power3.out' })
        document.body.classList.remove('cursor-system')
        if (atNav) {
          atNav = false
          window.dispatchEvent(new CustomEvent('cursor-at-nav', { detail: { active: false } }))
        }
      }
      prevInScrollMode = inScrollMode

      // Position — purely scroll-driven when active, mouse-driven otherwise
      // Don't move cursor on case study pages unless hovering a nav link
      if (inScrollMode && scrollStartCx !== null) {
        const navWork = document.querySelector('.navbar__link')
        if (navWork) {
          const rect = navWork.getBoundingClientRect()
          const nx = rect.left + rect.width  / 2
          const ny = rect.top  + rect.height / 2
          cx = scrollStartCx + (nx - scrollStartCx) * p
          cy = scrollStartCy + (ny - scrollStartCy) * p
        }
      } else if (!inScrollMode && !isCaseStudy) {
        if (isHovering && hoveredEl) {
          const rect = hoveredEl.getBoundingClientRect()
          cx += (rect.left + rect.width  / 2 - cx) * 0.18
          cy += (rect.top  + rect.height / 2 - cy) * 0.18
        } else {
          cx += (mouseX - cx) * 0.1
          cy += (mouseY - cy) * 0.1
        }
      } else if (!inScrollMode && isCaseStudy && isHovering && hoveredEl) {
        // On case study pages, only move cursor when hovering over nav links
        const rect = hoveredEl.getBoundingClientRect()
        cx += (rect.left + rect.width  / 2 - cx) * 0.18
        cy += (rect.top  + rect.height / 2 - cy) * 0.18
      }

      gsap.set(circle, { x: cx, y: cy })

      if (inScrollMode) {
        const navWork = document.querySelector('.navbar__link')
        if (navWork) {
          const rect  = navWork.getBoundingClientRect()
          const targW = rect.width  + 8
          const targH = Math.max(rect.height + 8, 34)
          gsap.set(circle, {
            width:        18 + (targW - 18) * p,
            height:       18 + (targH - 18) * p,
            borderRadius: '100px',
            opacity:      1,
          })
        }
        // Restore system cursor the instant the dot starts moving
        document.body.classList.add('cursor-system')
      }

      // Fire nav-active event once dot has fully arrived
      const nowAtNav = inScrollMode && p > 0.95
      if (nowAtNav !== atNav) {
        atNav = nowAtNav
        window.dispatchEvent(new CustomEvent('cursor-at-nav', { detail: { active: nowAtNav } }))
      }

      // Hard enforcement: on case study pages, always hide the dot
      if (isCaseStudy) {
        gsap.set(circle, { opacity: 0 })
      } else if (isAbout && !isHovering) {
        // On about page: keep dot invisible unless hovering a nav link
        gsap.set(circle, { opacity: 0 })
      }
    }
    gsap.ticker.add(tick)

    // ── Hover in ──
    const onOver = (e) => {
      if (scrollProgress > 0.005) return
      const target = e.target.closest('a, button, [role="button"]')
      if (!target || target.contains(e.relatedTarget) || target === hoveredEl || !shouldExpand(target)) return

      const isAbout = pathnameRef.current === '/about'
      const isCaseStudy = pathnameRef.current.startsWith('/work/')
      const isNavLink = target.classList.contains('navbar__link')

      // On about page and case study pages, only expand for nav links
      if ((isAbout || isCaseStudy) && !isNavLink) return

      isHovering = true
      hoveredEl = target
      const rect = target.getBoundingClientRect()
      gsap.to(circle, {
        width:        rect.width + 8,
        height:       Math.max(rect.height + 8, 34),
        borderRadius: '100px',
        opacity:      1,
        duration:     0.35,
        ease:         'power3.out',
      })
    }

    // ── Hover out ──
    const onOut = (e) => {
      if (scrollProgress > 0.005) return
      const target = e.target.closest('a, button, [role="button"]')
      if (!target || target.contains(e.relatedTarget) || target !== hoveredEl) return
      isHovering = false
      hoveredEl = null
      const isAbout = pathnameRef.current === '/about'
      const isCaseStudy = pathnameRef.current.startsWith('/work/')
      const shouldHide = isAbout || isCaseStudy
      gsap.to(circle, {
        width:        18,
        height:       18,
        borderRadius: '50%',
        opacity:      shouldHide ? 0 : 1,
        duration:     0.38,
        ease:         'power3.out',
      })
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      st.kill()
      document.body.classList.remove('cursor-system')
    }
  }, [])

  return <div ref={circleRef} className="custom-cursor" />
}
