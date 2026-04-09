import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function FilmStripLoader() {
  const containerRef = useRef(null)
  const [takeNumber, setTakeNumber] = useState('00')
  
  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    
    let ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '' 
        }
      })

      // Highly kinetic typing/drawing sequence for the minimalist clapboard
      loadTl.fromTo('.clap-line', 
        { scaleX: 0, opacity: 0 }, 
        { scaleX: 1, opacity: 1, duration: 1.8, ease: 'expo.inOut' }
      )
      
      loadTl.fromTo('.clap-header-item', 
        { y: 15, opacity: 0, filter: 'blur(4px)' }, 
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.1, ease: 'power3.out' }, 
        '-=0.8'
      )

      loadTl.to({}, { 
        duration: 1.2,
        ease: 'power1.inOut',
        onUpdate: function() {
          const val = Math.floor(this.progress() * 24) + 1 
          setTakeNumber(String(val).padStart(2, '0'))
        }
      }, '-=1.2')


      // --- PART 2: The Action Scroll "Clap" Animation ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=70%', 
          scrub: 1,
          pin: true,
        }
      })

      tl.to('.clap-line', { scaleY: 40, opacity: 0, duration: 0.2, ease: 'power4.in' })
        .to('.clap-content-block', { scale: 1.15, opacity: 0, filter: 'blur(30px)', duration: 0.3, ease: 'power2.in' }, '<')
      
      tl.to(containerRef.current, { 
        opacity: 0, 
        duration: 0.8, 
        ease: 'sine.inOut' 
      }, '+=0.1')
      
    }, containerRef) 

    return () => {
      document.body.style.overflow = ''
      ctx.revert() 
    }
  }, [])

  // Note z-[50], so that FilmBorders (z-[60]) sits physically ON TOP framing the site even while this loads!
  return (
    <section ref={containerRef} className="film-loader-section relative h-screen w-full flex items-center justify-center pointer-events-none z-[50]" style={{ backgroundColor: 'var(--color-black)' }}>

      {/* Hyper-minimalist Typographical Slate & Slugline */}
      <div className="clap-content-block relative z-10 flex flex-col items-center justify-center w-full px-6 gap-6">

        <div className="clap-header-item font-mono text-film-cream tracking-[0.2em] md:tracking-[0.4em] uppercase text-xs md:text-sm text-center flex items-center justify-center gap-4">
          <span className="opacity-60 mode-ext-int"></span>
          <span>WRITER'S ROOM</span>
          <span className="opacity-60 mode-day-night"></span>
        </div>
        
        {/* The Golden Strike Line */}
        <div className="clap-line w-full max-w-sm md:max-w-xl h-[1px] bg-film-gold shadow-[0_0_24px_rgba(201,168,76,0.9)] my-6" />

        {/* Bottom Slate Info */}
        <div className="flex items-center gap-8 px-4">
          <div className="flex flex-col items-center">
            <span className="clap-header-item font-mono text-film-muted text-[8px] md:text-[10px] tracking-[0.4em] uppercase mb-1">Scene</span>
            <span className="clap-header-item font-serif text-film-gold text-lg md:text-2xl tracking-widest">101</span>
          </div>
          
          <div className="clap-header-item w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]" />
          
          <div className="flex flex-col items-center">
            <span className="clap-header-item font-mono text-film-muted text-[8px] md:text-[10px] tracking-[0.4em] uppercase mb-1">Take</span>
            <span className="clap-header-item font-serif text-film-gold text-lg md:text-2xl tracking-widest">{takeNumber}</span>
          </div>
        </div>

        {/* Bottom Instruction */}
        <div className="clap-header-item mt-12 flex flex-col items-center opacity-0">
          <div className="font-mono text-film-muted/50 text-[9px] md:text-[10px] tracking-[0.4em] uppercase animate-pulse">
            Scroll to Roll Camera
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-film-muted/30 to-transparent mt-4" />
        </div>

      </div>
    </section>
  )
}
