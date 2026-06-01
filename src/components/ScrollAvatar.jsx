import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollAvatar.css'

export default function ScrollAvatar() {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current

    gsap.set(el, { xPercent: -50, yPercent: -50 })

    const anim = gsap.to(el, {
      width: 44,
      height: 44,
      top: 20,
      left: '5vw',
      xPercent: 0,
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          if (self.progress > 0.9) {
            el.classList.add('scroll-avatar--clickable')
          } else {
            el.classList.remove('scroll-avatar--clickable')
          }
        },
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={ref} className="scroll-avatar" onClick={handleClick}>
      <img src="/img/avatar.png" alt="Steven" />
    </div>
  )
}
