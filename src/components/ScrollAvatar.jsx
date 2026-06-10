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

      // Reset to original position before creating new animation
      gsap.set(el, {
        width: 'clamp(180px, 40vw, 380px)',
        height: 'clamp(180px, 40vw, 380px)',
        top: '50vh',
        left: '25vw',
        xPercent: -50,
        yPercent: -50,
        clearProps: 'none'
      })

      if (isMobile) {
        // On mobile, hide the avatar (CSS handles display: none)
        return
      }

      const anim = gsap.to(el, {
        width: '40px',
        height: '40px',
        top: '26px',
        left: '28px',
        xPercent: 0,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.9) {
              el.classList.add('scroll-avatar--clickable')
            } else {
              el.classList.remove('scroll-avatar--clickable')
            }
          },
        },
      })

      animRef.current = anim
    }

    createAnimation()

    // On non-home pages, always make avatar clickable
    if (!isHome) {
      el.classList.add('scroll-avatar--clickable')
    }

    const handleResize = () => {
      // Recreate animation on resize with new viewport
      createAnimation()
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animRef.current) {
        animRef.current.scrollTrigger?.kill()
        animRef.current.kill()
      }
    }
  }, [isHome])

  function handleClick() {
    navigate('/')
  }

  return (
    <div ref={ref} className="scroll-avatar" onClick={handleClick}>
      <img src="/img/avatar.png" alt="Steven" />
    </div>
  )
}
