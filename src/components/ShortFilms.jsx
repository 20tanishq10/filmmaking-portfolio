import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'

/**
 * Replace youtubeId with your actual YouTube video IDs.
 * e.g. for https://youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: 'dQw4w9WgXcQ'
 */
const films = [
  {
    id: 1,
    title: 'Kainchi',
    year: '2024',
    duration: '14 min',
    genre: 'Drama',
    description: 'What starts as a harmless prank spirals into something far bigger than anyone ever imagined… Meet Kainchi - a witty, street smart tailor.',
    color: '#1a0808',
    youtubeId: 'jH8pdCJBQH0',
    thumb: 'https://img.youtube.com/vi/jH8pdCJBQH0/maxresdefault.jpg',
  },
  {
    id: 2,
    title: 'Man Manch',
    year: '2024',
    duration: '12 min',
    genre: 'Drama',
    description: 'Raghu, a small-town theatre artist, lives and breathes his role as Lord Ram in the local Ram-leela.',
    color: '#0d0d1f',
    youtubeId: '9b-dV63mHBo',
    thumb: 'https://img.youtube.com/vi/9b-dV63mHBo/maxresdefault.jpg',
  },
  {
    id: 3,
    title: 'Kasak',
    year: '2023',
    duration: '10 min',
    genre: 'Drama',
    description: 'When life stacks the odds, it forces choices no one should have to make. Anni’s story dives deep into this harsh reality.',
    color: '#081a08',
    youtubeId: 'ph4vPrZoBrE',
    thumb: 'https://img.youtube.com/vi/ph4vPrZoBrE/maxresdefault.jpg',
  },
  {
    id: 4,
    title: 'Saanjh',
    year: '2023',
    duration: '15 min',
    genre: 'Drama / Romance',
    description: 'A young man is now a broken shell of his former self, haunted by the tragic loss of his girlfriend who drowned in a river.',
    color: '#1a0818',
    youtubeId: '70Gpk0TvJkI',
    thumb: 'https://img.youtube.com/vi/70Gpk0TvJkI/maxresdefault.jpg',
  },
  {
    id: 5,
    title: 'Till the end',
    year: '2024',
    duration: '8 min',
    genre: 'Romance',
    description: 'A boy in love seems to be in a dilemma about what to give his girlfriend for her birthday.',
    color: '#1a1908',
    youtubeId: 'TDsFAJrsZoo',
    thumb: 'https://img.youtube.com/vi/TDsFAJrsZoo/maxresdefault.jpg',
  },
  {
    id: 6,
    title: 'Pehchaan',
    year: '2023',
    duration: '12 min',
    genre: 'Drama',
    description: '"I put my heart and soul into the work, and have lost my mind in the process." ~ Vincent Van Gogh. When an artist fails to find a sense of his own identity.',
    color: '#080d1a',
    youtubeId: 'GvoVxxQgxs8',
    thumb: 'https://img.youtube.com/vi/GvoVxxQgxs8/maxresdefault.jpg',
  },
  {
    id: 7,
    title: 'Samman',
    year: '2022',
    duration: '11 min',
    genre: 'Drama',
    description: 'Echoes of the past reverberate into the modern world. Discover a magical link between generations, where honor spans time.',
    color: '#2a0808',
    youtubeId: 'PeskPCHajUw',
    thumb: 'https://img.youtube.com/vi/PeskPCHajUw/maxresdefault.jpg',
  },
  {
    id: 8,
    title: 'Ghar',
    year: '2022',
    duration: '9 min',
    genre: 'Family Drama',
    description: 'Ghar is a story very universal yet very close to our hearts. This is a story about parenthood, neglect and love.',
    color: '#081a2a',
    youtubeId: 'MdIhvHsl_Ho',
    thumb: 'https://img.youtube.com/vi/MdIhvHsl_Ho/maxresdefault.jpg',
  }
]

/** Full-screen YouTube lightbox */
function Lightbox({ film, onClose }) {
  const overlayRef = useRef(null)
  const boxRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.fromTo(boxRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' })

    const onKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose })
    gsap.to(boxRef.current, { scale: 0.94, opacity: 0, duration: 0.3 })
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12"
    >
      {/* Background layer decoupled from opacity math for bright/dark mode safety */}
      <div 
        className="absolute inset-0 opacity-95 transition-colors duration-500 cursor-pointer" 
        style={{ backgroundColor: 'var(--color-black)' }} 
        onClick={handleClose}
      />
      
      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[8vh] bg-film-black" />
      <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-film-black" />

      <div ref={boxRef} className="relative w-full max-w-5xl">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 font-mono text-film-muted text-xs tracking-widest uppercase hover:text-film-cream transition-colors"
          aria-label="Close"
        >
          [ ESC ] Close
        </button>

        {/* 16:9 iframe */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Film meta below player */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-film-cream text-xl">{film.title}</h3>
            <p className="font-mono text-film-muted text-xs tracking-widest mt-1 uppercase">
              {film.genre} · {film.duration} · {film.year}
            </p>
          </div>
          <p className="font-sans text-film-muted text-sm font-light max-w-sm text-right hidden md:block">
            {film.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

function FilmCard({ film }) {
  const cardRef = useRef(null)
  const [open, setOpen] = useState(false)

  // Parallax depth: card bg shifts slightly on mouse move
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    gsap.to(cardRef.current.querySelector('.card-bg'), {
      x: x,
      y: y,
      duration: 0.6,
      ease: 'power2.out',
    })
    gsap.to(cardRef.current.querySelector('.card-content'), {
      x: -x * 0.3,
      y: -y * 0.3,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current.querySelectorAll('.card-bg, .card-content'), {
      x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)',
    })
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
    gsap.to(cardRef.current.querySelector('.film-info'), { y: 20, opacity: 0, duration: 0.3 })
    gsap.to(cardRef.current.querySelector('.film-overlay'), { opacity: 0, duration: 0.3 })
  }

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { scale: 1.02, duration: 0.4, ease: 'power2.out' })
    gsap.to(cardRef.current.querySelector('.film-info'), { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
    gsap.to(cardRef.current.querySelector('.film-overlay'), { opacity: 1, duration: 0.4 })
  }

  return (
    <>
      <div
        ref={cardRef}
        className="video-card relative cursor-pointer overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Watch ${film.title}`}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
      >
        {/* Background layer — moves on mouse (parallax depth) */}
        <div
          className="card-bg absolute inset-[-8px]"
          style={{
            background: film.color,
            backgroundImage: `url(${film.thumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark tint so text is always readable */}
        <div className="absolute inset-0 bg-film-black/50" />

        {/* Scan lines */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Play button — foreground parallax layer */}
        <div className="card-content absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-film-gold/50 flex items-center justify-center backdrop-blur-sm bg-film-black/20 transition-transform">
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[13px] border-l-film-gold ml-1" />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="film-overlay absolute inset-0 bg-film-black/60 backdrop-blur-sm opacity-0" />

        {/* Film info on hover */}
        <div className="film-info absolute bottom-0 left-0 right-0 p-5 opacity-0 translate-y-5">
          <p className="font-mono text-film-gold text-[10px] tracking-widest uppercase mb-1">
            {film.genre} · {film.duration} · {film.year}
          </p>
          <h3 className="font-serif text-film-cream text-xl mb-1">{film.title}</h3>
          <p className="font-sans text-film-muted/80 text-xs font-light leading-relaxed">{film.description}</p>
        </div>

        {/* Corner marks */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-film-gold/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-film-gold/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-film-gold/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-film-gold/40" />
      </div>

      {open && <Lightbox film={film} onClose={() => setOpen(false)} />}
    </>
  )
}

function ArchiveOverlay({ films, onClose }) {
  const overlayRef  = useRef(null)
  const headerRef   = useRef(null)
  const gridRef     = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.classList.add('overlay-open')

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power3.out' })
      .fromTo(headerRef.current,  { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo(gridRef.current.querySelectorAll('.vault-card'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.2'
      )

    const onKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.classList.remove('overlay-open')
    }
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.35, onComplete: () => {
        document.body.style.overflow = ''
        document.body.classList.remove('overlay-open')
        onClose()
      }
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9900] flex flex-col overflow-hidden"
      style={{ background: 'var(--color-black)' }}
    >
      {/* Subtle scan-line texture over entire vault */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)',
          backgroundSize: '100% 4px',
        }} />

      {/* ── Top bar — film strip header ── */}
      <div ref={headerRef} className="relative z-10 flex-shrink-0 border-b border-white/5"
        style={{ background: 'var(--color-dark)' }}>

        {/* Sprocket holes strip */}
        <div className="flex items-center gap-3 px-6 py-2 border-b border-white/[0.04] overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-3 h-4 rounded-sm border border-white/10 flex-shrink-0" />
          ))}
        </div>

        {/* Header content */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center gap-6">
            {/* REC dot */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_6px_rgba(220,38,38,0.8)]" />
              <span className="font-mono text-[9px] text-red-500/70 tracking-widest uppercase">Rec</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div>
              <p className="font-mono text-film-gold text-[9px] tracking-[0.4em] uppercase">Complete Archives</p>
              <h2 className="font-serif text-film-cream text-xl md:text-2xl tracking-wide mt-0.5">The Vault</h2>
            </div>
          </div>

          {/* Right: frame count + close */}
          <div className="flex items-center gap-6">
            <span className="font-mono text-film-muted text-[9px] tracking-widest hidden md:block">
              {films.length} TITLES
            </span>
            <div className="w-px h-4 bg-white/10 hidden md:block" />
            <button
              onClick={handleClose}
              className="font-mono text-[10px] tracking-[0.3em] uppercase border border-white/15 px-3 py-1.5 text-film-muted hover:text-film-cream hover:border-film-gold/40 transition-all duration-300"
              aria-label="Close vault"
            >
              [ ESC ]
            </button>
          </div>
        </div>

        {/* Bottom sprocket strip */}
        <div className="flex items-center gap-3 px-6 py-2 border-t border-white/[0.04] overflow-hidden"
          style={{ background: 'var(--color-dark)' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-3 h-4 rounded-sm border border-white/10 flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* ── Scrollable grid ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-12 py-10"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto pb-16">
          {films.map((film, idx) => (
            <div key={film.id} className="vault-card group relative opacity-0">
              {/* Frame number — top left corner */}
              <div className="absolute -top-3 left-2 z-10 font-mono text-[8px] text-film-gold/50 tracking-widest">
                {String(idx + 1).padStart(3, '0')}
              </div>

              {/* Film frame wrapper — corner marks + aspect ratio border */}
              <div className="relative border border-white/[0.07] group-hover:border-film-gold/25 transition-colors duration-400"
                style={{ background: 'var(--color-gray)' }}>

                <FilmCard film={film} />

                {/* Timecode overlay — bottom of frame */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex justify-between items-center z-10"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                  <span className="font-mono text-[7px] text-white/30 tracking-widest">
                    {film.year}:{String(idx + 1).padStart(2,'0')}:00
                  </span>
                  <span className="font-mono text-[7px] text-film-gold/40 tracking-widest uppercase">
                    {film.duration}
                  </span>
                </div>
              </div>

              {/* Film title below frame */}
              <div className="mt-2.5 px-0.5 flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif text-film-cream text-sm leading-tight group-hover:text-film-gold transition-colors duration-300">
                    {film.title}
                  </h4>
                  <p className="font-mono text-film-muted/60 text-[9px] mt-0.5 tracking-wider uppercase">
                    {film.genre}
                  </p>
                </div>
                <span className="font-mono text-film-muted/30 text-[8px] flex-shrink-0 mt-0.5">{film.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom film strip */}
      <div className="relative z-10 flex-shrink-0 border-t border-white/5 py-2 overflow-hidden"
        style={{ background: 'var(--color-dark)' }}>
        <div className="flex items-center gap-3 px-6">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-3 h-4 rounded-sm border border-white/10 flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ShortFilms() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const bgTextRef = useRef(null)
  const [archiveOpen, setArchiveOpen] = useState(false)

  useEffect(() => {
    // Removed the opacity: 0 stagger load on cards to ensure they are always reliably visible 
    // without relying on precise ScrollTrigger hitboxes which can skip during fast scrolling.

    // Parallax: large background text drifts up slower than content
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

    // Section heading parallax — strictly movement, no opacity drops
    gsap.fromTo(
      headingRef.current,
      { y: 40 },
      {
        y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="short-films" className="relative min-h-screen py-24 w-full overflow-hidden z-10">
      
      {/* Restored Cinematic Vertical Watermark Ghost Text */}
      <div 
        ref={bgTextRef}
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-4 md:left-12 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span
          className="font-serif text-6xl md:text-8xl text-film-cream opacity-[0.03] uppercase tracking-[0.4em] whitespace-nowrap transition-colors duration-500"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Visions
        </span>
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-16 max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-16">
          <p className="font-mono text-film-gold text-xs tracking-[0.4em] uppercase mb-3">01 — Short Films</p>
          <h2 className="font-serif text-4xl md:text-5xl text-film-cream transition-colors duration-500">Stories in Motion</h2>
          <div className="mt-4 w-12 h-px bg-film-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.slice(0, 3).map((film, i) => (
            <div key={film.id} className="film-card-wrapper transition-transform duration-500">
              <FilmCard film={film} />
              <div className="mt-3 flex justify-between items-center px-1">
                <span className="font-serif text-film-cream text-lg transition-colors duration-500">{film.title}</span>
                <span className="font-mono text-film-muted text-xs transition-colors duration-500">{film.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center scroll-reveal">
          <button
            onClick={() => setArchiveOpen(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs tracking-[0.2em] text-film-cream uppercase transition-all duration-500 hover:text-film-gold overflow-hidden"
          >
            <span className="relative z-10">View Full Archive</span>
            <span className="relative z-10 ml-3 transition-transform duration-300 group-hover:translate-x-2">→</span>
            <div className="absolute inset-0 border border-film-cream/20 group-hover:border-film-gold/50 transition-colors duration-500 rounded-sm" />
            <div className="absolute inset-0 bg-transparent dark:group-hover:bg-film-gold/5 transition-colors duration-500 rounded-sm backdrop-blur-sm" />
          </button>
        </div>
      </div>

      {/* Full-Screen Archive Overlay */}
      {archiveOpen && <ArchiveOverlay films={films} onClose={() => setArchiveOpen(false)} />}
    </section>
  )
}
