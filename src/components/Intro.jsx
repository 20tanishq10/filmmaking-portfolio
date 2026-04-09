import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Intro() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const lineRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Cinematic letterbox bars
    tl.fromTo(
      '.letterbox-top',
      { scaleY: 1 },
      { scaleY: 0, duration: 1.4, ease: 'power4.inOut', transformOrigin: 'top' }
    )
      .fromTo(
        '.letterbox-bottom',
        { scaleY: 1 },
        { scaleY: 0, duration: 1.4, ease: 'power4.inOut', transformOrigin: 'bottom' },
        '<'
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )

    // Parallax on scroll
    gsap.to('.intro-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

      // Fade out intro content on scroll removed so it stays fully visible naturally
    }, [])

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic letterbox bars */}
      <div className="letterbox-top absolute top-0 left-0 right-0 h-[12vh] transition-colors duration-500 z-20 origin-top" style={{ backgroundColor: 'var(--color-black)' }} />
      <div className="letterbox-bottom absolute bottom-0 left-0 right-0 h-[12vh] transition-colors duration-500 z-20 origin-bottom" style={{ backgroundColor: 'var(--color-black)' }} />

      {/* Background — dark gradient simulating a film frame */}
      <div className="intro-bg absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-colors duration-500" 
          style={{ background: 'linear-gradient(to bottom, var(--color-black), var(--color-black-transparent), var(--color-black))' }} 
        />
        {/* Vignette */}
        <div 
          className="absolute inset-0 transition-colors duration-500" 
          style={{ background: 'radial-gradient(ellipse at center, var(--color-black-transparent) 40%, var(--color-black) 100%)' }} 
        />
      </div>

      {/* Content */}
      <div className="intro-content relative z-10 text-center px-6">
        <div
          ref={lineRef}
          className="mx-auto mb-6 h-px bg-film-gold origin-left"
          style={{ width: '80px' }}
        />
        <p className="font-mono text-film-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-4">
          <span className="mode-ext-int"></span>
          <span className="w-8 h-px bg-film-gold/50"></span>
          <span className="mode-day-night"></span>
        </p>
        <h1
          ref={titleRef}
          className="font-serif text-4xl md:text-6xl lg:text-8xl text-film-cream tracking-widest uppercase mb-6"
        >
          Tanishq Gupta
        </h1>
        <p
          ref={subtitleRef}
          className="font-mono text-film-muted text-sm md:text-base tracking-[0.4em] uppercase mb-6"
        >
          Filmmaker &nbsp;·&nbsp; Writer &nbsp;·&nbsp; Documentarian
        </p>
        <p className="font-sans text-film-cream/80 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed mb-8">
          A visionary creator shaping raw emotion into cinematic reality.
        </p>
        
        {/* Socials */}
        <div className="flex gap-6 justify-center items-center">
          <a href="https://www.instagram.com/_tanshq__/" target="_blank" rel="noopener noreferrer" className="font-mono text-film-gold text-xs tracking-widest uppercase hover:text-film-cream transition-colors">
            [ IG ]
          </a>
          <div className="w-px h-3 bg-film-muted/30" />
          <a href="mailto:20tanishq10@gmail.com" className="font-mono text-film-gold text-xs tracking-widest uppercase hover:text-film-cream transition-colors">
            [ EMAIL ]
          </a>
          <div className="w-px h-3 bg-film-muted/30" />
          <a href="https://www.linkedin.com/in/20tanishq10/" target="_blank" rel="noopener noreferrer" className="font-mono text-film-gold text-xs tracking-widest uppercase hover:text-film-cream transition-colors">
            [ IN ]
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-film-muted text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-film-gold to-transparent animate-pulse" />
      </div>
    </section>
  )
}
