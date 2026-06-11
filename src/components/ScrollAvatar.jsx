import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollAvatar.css'

export default function ScrollAvatar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const ref = useRef()
  const animRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const createAnimation = () => {
      // Kill previous animation if exists
      if (animRef.current) {
        animRef.current.scrollTrigger?.kill()
        animRef.current.kill()
      }

      // Don't animate on mobile
      const isMobile = window.innerWidth <= 768

      const startWidth = Math.min(380, Math.max(180, window.innerWidth * 0.4))
      const startHeight = startWidth

      gsap.set(el, {
        width: startWidth,
        height: startHeight,
        top: '50vh',
        left: '25vw',
        xPercent: -50,
        yPercent: -50,
      })

      if (isMobile) {
        return
      }

      const anim = gsap.to(el, {
        width: 40,
        height: 40,
        top: 26,
        left: 28,
        xPercent: 0,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      animRef.current = anim
    }

    createAnimation()

    if (!isHome) {
      el.classList.add('scroll-avatar--clickable')
    }

    const handleScroll = () => {
      if (!isHome) return
      if (window.scrollY > 50) {
        el.classList.add('scroll-avatar--clickable')
      } else {
        el.classList.remove('scroll-avatar--clickable')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Debounced — rebuilding the GSAP tween on every resize event causes
    // visible thrash mid-drag; once at the end is all that's needed.
    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        createAnimation()
        ScrollTrigger.refresh()
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (animRef.current) {
        animRef.current.scrollTrigger?.kill()
        animRef.current.kill()
      }
    }
  }, [isHome])

  function handleClick() {
    if (isHome) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    } else {
      navigate('/')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      ref={ref}
      className="scroll-avatar"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={isHome ? 'Scroll back to top' : 'Go to home page'}
    >
      <img src="/img/avatar.png" alt="Steven" />
    </div>
  )
}
