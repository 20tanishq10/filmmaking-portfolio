import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function FilmBorders() {
  const [timecode, setTimecode] = useState("01:00:00:00")

  useEffect(() => {
    // Subtle parallax for the hyper-minimalist edge hashes
    gsap.to('.technical-track', {
      yPercent: -15, 
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          // Convert scroll progress (0-1) into an exact cinematic timecode!
          // We scroll through roughly 3 minutes of "film" over the entire site length.
          const frames = Math.floor(self.progress * (3 * 60 * 24))
          const f = String(frames % 24).padStart(2, '0')
          const s = String(Math.floor(frames / 24) % 60).padStart(2, '0')
          const m = String(Math.floor(frames / (24 * 60)) % 60).padStart(2, '0')
          setTimecode(`01:${m}:${s}:${f}`)
        }
      }
    })
  }, [])

  return (
    <>
      <div 
        className="fixed left-0 top-0 bottom-0 w-8 md:w-16 border-r backdrop-blur-md z-[60] pointer-events-none flex flex-col justify-between items-center py-12"
        style={{ borderColor: 'var(--color-gray)', backgroundColor: 'transparent' }}
      >
        {/* Technical Hash Marks (16mm style) */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
           <div className="technical-track absolute top-0 w-full h-[500%] flex flex-col justify-evenly items-center">
             {Array.from({ length: 120 }).map((_, i) => (
                <div key={i} className="w-1.5 h-[1px] bg-film-gold/50" />
             ))}
           </div>
        </div>

        {/* Left HUD: Recording & Camera Specs */}
        <div className="relative z-10 flex flex-col items-center gap-12 text-film-gold">
          {/* Animated REC status */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]" />
            <span 
              className="font-mono text-[8px] md:text-[10px] tracking-widest opacity-80"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              REC
            </span>
          </div>
          
          <div className="w-px h-16 bg-gradient-to-b from-film-gold/30 to-transparent" />
          
          {/* Technical Specs */}
          <div className="flex flex-col gap-12">
            <span 
              className="font-mono text-[8px] md:text-[10px] tracking-widest opacity-40"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              ISO 800
            </span>
            <span 
              className="font-mono text-[8px] md:text-[10px] tracking-widest opacity-40"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              5600K
            </span>
            <span 
              className="font-mono text-[8px] md:text-[10px] tracking-widest opacity-40"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              T/2.8
            </span>
          </div>
        </div>
      </div>

      <div 
        className="fixed right-0 top-0 bottom-0 w-8 md:w-16 border-l backdrop-blur-md z-[60] pointer-events-none flex flex-col justify-between items-center py-12"
        style={{ borderColor: 'var(--color-gray)', backgroundColor: 'transparent' }}
      >
        {/* Technical Hash Marks */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
           <div className="technical-track absolute top-0 w-full h-[500%] flex flex-col justify-evenly items-center">
             {Array.from({ length: 120 }).map((_, i) => (
                <div key={i} className="w-1.5 h-[1px] bg-film-gold/50" />
             ))}
           </div>
        </div>
        
        {/* Right HUD: Dynamic Master Timecode */}
        <div className="relative z-10 flex flex-col justify-end h-full">
          <div 
            className="font-mono text-[10px] md:text-xs text-film-gold tracking-[0.3em] font-medium opacity-90 transition-all duration-75"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
          >
            {timecode}
          </div>
          
          <div className="w-px h-24 bg-gradient-to-t from-film-gold/30 to-transparent mt-8 mx-auto" />
        </div>
      </div>
    </>
  )
}
