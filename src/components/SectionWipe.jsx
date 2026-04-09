import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Cinematic black wipe panels that sit between sections.
 * As you scroll into a new section, a black bar sweeps across
 * like a film cut — then retracts to reveal the next scene.
 */
export default function SectionWipe({ triggerId, direction = 'left' }) {
  const wipeRef = useRef(null)

  useEffect(() => {
    const trigger = document.querySelector(triggerId)
    if (!trigger || !wipeRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 90%',
        end: 'top 20%',
        scrub: 0.8,
      },
    })

    const origin = direction === 'left' ? 'left center' : 'right center'
    const exitOrigin = direction === 'left' ? 'right center' : 'left center'

    tl.fromTo(
      wipeRef.current,
      { scaleX: 0, transformOrigin: origin },
      { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }
    ).to(wipeRef.current, {
      scaleX: 0,
      transformOrigin: exitOrigin,
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }, [triggerId, direction])

  return (
    <div
      ref={wipeRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        zIndex: 9990,
        pointerEvents: 'none',
        scaleX: 0,
        transformOrigin: direction === 'left' ? 'left center' : 'right center',
      }}
    />
  )
}
