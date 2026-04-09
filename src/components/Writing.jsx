import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ScriptShelf from './ScriptShelf'

const TYPEWRITER_TEXT = `"Every film begins as a sentence.
A single, impossible sentence
that refuses to stay still."`

function useTypewriter(text, trigger) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    if (!trigger) return
    indexRef.current = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(interval)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [trigger, text])

  return displayed
}

export default function Writing() {
  const sectionRef = useRef(null)
  const bgTextRef = useRef(null)
  const quoteRef = useRef(null)
  const [typewriterActive, setTypewriterActive] = useState(false)
  const displayed = useTypewriter(TYPEWRITER_TEXT, typewriterActive)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypewriterActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Background ghost text — slowest layer (deepest)
    gsap.to(bgTextRef.current, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Quote block — mid-speed layer
    gsap.fromTo(
      quoteRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    )
  }, [])

  return (
    <>
      <section ref={sectionRef} id="writing" className="relative py-32 px-6 md:px-16 max-w-7xl mx-auto overflow-hidden">
        {/* Deep parallax ghost text */}
        <div
          ref={bgTextRef}
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 font-serif text-[14vw] text-film-cream opacity-[0.02] uppercase tracking-widest select-none pointer-events-none whitespace-nowrap"
        >
          Writing
        </div>

        <div className="scroll-reveal mb-16">
          <p className="font-mono text-film-gold text-xs tracking-[0.4em] uppercase mb-3">02 — Writing</p>
          <h2 className="font-serif text-4xl md:text-5xl text-film-cream">The Page Before the Frame</h2>
          <div className="mt-4 w-12 h-px bg-film-gold" />
        </div>

        {/* Typewriter quote — mid parallax layer */}
        <div ref={quoteRef} className="mb-20 max-w-2xl opacity-0">
          <div className="font-mono text-film-muted text-base md:text-lg leading-relaxed italic whitespace-pre-line">
            {displayed}
            <span className="cursor-line" />
          </div>
        </div>
      </section>

      {/* Bookshelf lives just below the writing intro */}
      <ScriptShelf />
    </>
  )
}
