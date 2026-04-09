import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Narration lines that fade in as the user scrolls — like subtitles
 * or a documentary voiceover appearing on screen.
 */
const lines = [
  { id: 'n1', text: 'Every frame is a decision.', section: '#films' },
  { id: 'n2', text: 'The story begins before the camera rolls.', section: '#writing' },
  { id: 'n3', text: 'Truth is found in the spaces between cuts.', section: '#documentary' },
]

export default function Narration() {
  const refs = useRef([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const trigger = document.querySelector(lines[i].section)
      if (!trigger) return

      // Single, flawless toggle action for when section is in center of viewport
      gsap.fromTo(
        el,
        { opacity: 0, y: 16, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    })
  }, [])

  return (
    <>
      {lines.map((line, i) => (
        <div
          key={line.id}
          ref={(el) => (refs.current[i] = el)}
          aria-hidden="true"
          className="fixed left-1/2 -translate-x-1/2 bottom-16 z-[9996] pointer-events-none opacity-0 text-center px-6"
        >
          <p className="font-serif italic text-film-cream/60 text-base md:text-lg tracking-wide">
            {line.text}
          </p>
          <div className="mt-2 mx-auto w-6 h-px bg-film-gold/30" />
        </div>
      ))}
    </>
  )
}
