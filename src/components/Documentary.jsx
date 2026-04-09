import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const docs = [
  {
    title: 'Anushruti Academy',
    year: '2024',
    runtime: 'Documentary',
    synopsis:
      'What does a school sound like when it is built on silence? Over a year, this documentary quietly observes life inside a school for deaf students—capturing classes, conversations, and the delicate rhythms of communication.',
    awards: ['IIT Roorkee'],
    stills: [
      '/media__1775686943276.jpg',
      '/media__1775686933122.jpg',
      '/media__1775686964945.jpg'
    ],
    youtubeId: 'vpOK0r0jlWs',
  }
]

const behindScenes = [
  { label: 'Locations scouted', value: '47' },
  { label: 'Hours of footage', value: '340+' },
  { label: 'Countries filmed', value: '9' },
  { label: 'Years in the field', value: '6' },
]

export default function Documentary() {
  const sectionRef = useRef(null)
  const bgTextRef = useRef(null)

  useEffect(() => {
    // Parallax background text
    gsap.to(bgTextRef.current, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    // Horizontal scroll feel for doc cards
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.doc-card'),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      }
    )

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.stat-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="documentaries" className="relative py-32 w-full bg-film-black overflow-hidden transition-colors duration-500">
      
      {/* Restored Cinematic Vertical Watermark Ghost Text */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-4 md:right-12 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span 
          className="font-serif text-6xl md:text-8xl text-film-cream opacity-[0.03] uppercase tracking-[0.4em] whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          Reality
        </span>
      </div>

      {/* Section label */}
      <div className="scroll-reveal mb-16 relative z-10 px-6 md:px-16 max-w-7xl mx-auto">
        <p className="font-mono text-film-gold text-xs tracking-[0.4em] uppercase mb-3">03 — Documentary</p>
        <h2 className="font-serif text-4xl md:text-5xl text-film-cream transition-colors duration-500">Truth in the Frame</h2>
        <div className="mt-4 w-12 h-px bg-film-gold" />
      </div>

      {/* Documentary cards */}
      <div className="space-y-16 mb-24 relative z-10 px-6 md:px-16 max-w-[1400px] mx-auto">
        {docs.map((doc, i) => (
          <div key={i} className="doc-card opacity-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Stills mosaic */}
            <div className={`grid grid-cols-3 gap-1 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              {doc.stills.map((color, j) => (
                <div
                  key={j}
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: j === 0 ? '1/1.4' : '1/1',
                    background: color.startsWith('#') ? color : `url('${color}') center/cover no-repeat`,
                    gridRow: j === 0 ? 'span 2' : 'span 1',
                  }}
                >
                  {/* Scan lines */}
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
                      backgroundSize: '100% 4px',
                    }}
                  />
                  {/* Corner marks */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-film-gold/30" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-film-gold/30" />
                </div>
              ))}
            </div>

            {/* Info */}
            <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-film-gold/50 text-xs">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-mono text-film-muted text-xs tracking-widest uppercase transition-colors duration-500">{doc.runtime}</span>
                <span className="font-mono text-film-muted text-xs transition-colors duration-500">{doc.year}</span>
              </div>
              <h3 className="font-serif text-film-cream text-3xl md:text-4xl mb-4 italic transition-colors duration-500">{doc.title}</h3>
              <p className="font-sans text-film-muted text-sm font-light leading-relaxed mb-6 transition-colors duration-500">{doc.synopsis}</p>
              <div className="flex flex-wrap gap-2">
                {doc.awards.map((award, j) => (
                  <span
                    key={j}
                    className="font-mono text-[9px] uppercase tracking-widest px-3 py-1 border border-film-gold/30 text-film-gold rounded-sm transition-colors duration-500"
                  >
                    {award}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Behind the scenes stats */}
      <div className="stats-row border-t border-white/5 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {behindScenes.map((stat, i) => (
          <div key={i} className="stat-item opacity-0 text-center">
            <p className="font-serif text-film-cream text-4xl md:text-5xl mb-2">{stat.value}</p>
            <p className="font-mono text-film-muted text-xs tracking-widest uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-24 text-center">
        <div className="w-px h-12 bg-gradient-to-b from-film-gold to-transparent mx-auto mb-6" />
        <p className="font-mono text-film-muted text-xs tracking-[0.4em] uppercase">
          Available for collaboration &nbsp;·&nbsp;{' '}
          <a href="mailto:20tanishq10@gmail.com" className="text-film-gold hover:text-film-cream transition-colors">
            20tanishq10@gmail.com
          </a>
        </p>
      </div>
    </section>
  )
}
