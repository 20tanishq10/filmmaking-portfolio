import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function ClapboardIntro() {
  const [takeNumber, setTakeNumber] = useState('00')
  
  useEffect(() => {
    // --- PART 1: The Initial Page Load Animation ---
    const loadTl = gsap.timeline()
    
    // The incredibly thin golden line draws outward from the center
    loadTl.fromTo('.clap-line', 
      { scaleX: 0, opacity: 0 }, 
      { scaleX: 1, opacity: 1, duration: 1.8, ease: 'expo.inOut' }
    )
    
    // The top cinematic numbers and text reveal subtly from beneath the line
    loadTl.fromTo('.clap-header-item', 
      { y: 15, opacity: 0, filter: 'blur(4px)' }, 
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.1, ease: 'power3.out' }, 
      '-=0.8'
    )

    // A rapid technical "Take" counter ticking up
    loadTl.to({}, { 
      duration: 1.2,
      ease: 'power1.inOut',
      onUpdate: function() {
        const val = Math.floor(this.progress() * 24) + 1 // Acts like a 24fps film counter!
        setTakeNumber(String(val).padStart(2, '0'))
      }
    }, '-=1.2')


    // --- PART 2: The Action Scroll "Clap" Animation ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.clapboard-section',
        start: 'top top',
        end: '+=70%', // Snappier scrub length
        scrub: 1,
        pin: true,
      }
    })

    // As user scrolls, the line violently snaps vertically to simulate the slate clapping,
    // while the entire typographic block expands and violently blurs.
    tl.to('.clap-line', { scaleY: 40, opacity: 0, duration: 0.2, ease: 'power4.in' })
      .to('.clap-content-block', { scale: 1.15, opacity: 0, filter: 'blur(30px)', duration: 0.3, ease: 'power2.in' }, '<')
    
    // The pitch black background curtain smoothly dissolves to reveal the website
    tl.to('.clapboard-bg', { 
      opacity: 0, 
      filter: 'blur(10px)',
      duration: 0.8, 
      ease: 'sine.inOut' 
    }, '+=0.1')
    
  }, [])

  return (
    <section className="clapboard-section relative h-screen w-full flex items-center justify-center pointer-events-none z-[100] overflow-hidden">
      {/* Absolute solid black background that fades away */}
      <div className="clapboard-bg absolute inset-0 bg-[#040404]" />

      {/* Hyper-minimalist Typographical Slate */}
      <div className="clap-content-block relative z-10 flex flex-col items-center justify-center w-full px-6">
        
        {/* Top Meta Info */}
        <div className="flex items-center gap-6 mb-8 overflow-hidden py-2 px-4">
          <span className="clap-header-item font-mono text-film-gold text-[10px] md:text-xs tracking-[0.6em] uppercase">
            Scene: 101
          </span>
          <span className="clap-header-item w-1.5 h-1.5 rounded-full bg-film-gold/60 glow-dot" />
          <span className="clap-header-item font-mono text-film-gold text-[10px] md:text-xs tracking-[0.6em] uppercase">
            Take: {takeNumber}
          </span>
        </div>
        
        {/* The Golden Strike Line */}
        <div className="clap-line w-full max-w-sm md:max-w-lg h-[1px] bg-film-gold/90 shadow-[0_0_24px_rgba(201,168,76,0.8)]" />

        {/* Bottom Instruction & Current Project */}
        <div className="clap-header-item mt-12 flex flex-col items-center">
          <div className="mb-6 px-4 py-1.5 border border-film-gold/20 rounded-full bg-film-gold/5 backdrop-blur-sm flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
             <span className="font-mono text-film-gold/80 text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                Currently Developing: <span className="text-film-cream tracking-widest ml-1 opacity-90">Untitled Feature</span>
             </span>
          </div>
          <div className="font-mono text-film-muted/30 text-[9px] md:text-[10px] tracking-[0.4em] uppercase animate-pulse">
            Scroll to strike
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-film-muted/30 to-transparent mt-4" />
        </div>

      </div>
    </section>
  )
}
