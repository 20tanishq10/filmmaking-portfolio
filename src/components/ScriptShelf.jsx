import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scripts = [
  { id: 1, title: "Aa Bail Mujhe Maar", type: 'Feature Script', genre: 'Dark Comedy', year: '2024', pages: 120, status: 'Draft', color: '#1a1a2e', spineColor: '#0f3460', logline: 'A satirical dark comedy exploring the consequences of inviting trouble.', fileUrl: '/scripts/Aa Bail Mujhe Maar.pdf', useDirectEmbed: true },
  { id: 2, title: "Chor Kaun", type: 'Feature Script', genre: 'Mystery / Thriller', year: '2024', pages: 115, status: 'Draft', color: '#16213e', spineColor: '#e94560', logline: 'A gripping whodunit that challenges the very nature of guilt.', fileUrl: '/scripts/Chor Kaun.pdf', useDirectEmbed: true },
  { id: 3, title: "Deja-vu", type: 'Feature Script', genre: 'Sci-Fi Drama', year: '2024', pages: 110, status: 'Draft', color: '#2a0944', spineColor: '#3fa796', logline: 'A character-driven sci-fi blending memory and reality into an endless loop.', fileUrl: '/scripts/Deja-vu.pdf', useDirectEmbed: true },
  { id: 4, title: "Ebb and Flow", type: 'Feature Script', genre: 'Drama', year: '2024', pages: 105, status: 'Draft', color: '#111111', spineColor: '#fec260', logline: 'An emotional journey tracking the steady tides of human connection.', fileUrl: '/scripts/Ebb and Flow.pdf', useDirectEmbed: true },
  { id: 5, title: "Kasak", type: 'Short Script', genre: 'Emotional Drama', year: '2024', pages: 15, status: 'Draft', color: '#002B5B', spineColor: '#EA5455', logline: 'A poetic exploration of lingering pain and untethered emotional closure.', fileUrl: '/scripts/Kasak.pdf', useDirectEmbed: true },
  { id: 6, title: "Raamleel", type: 'Short Script', genre: 'Tragedy', year: '2024', pages: 20, status: 'Draft', color: '#1a1a2e', spineColor: '#0f3460', logline: 'A culturally rich drama exploring the depths of tradition vs modernity.', fileUrl: '/scripts/Raamleel.pdf', useDirectEmbed: true },
  { id: 7, title: "Sometimes", type: 'Short Script', genre: 'Romance', year: '2024', pages: 12, status: 'Draft', color: '#16213e', spineColor: '#e94560', logline: 'A delicate, ephemeral look into the fleeting moments of modern love.', fileUrl: '/scripts/Sometimes.pdf', useDirectEmbed: true },
  { id: 8, title: "Tasveer", type: 'Pilot Script', genre: 'Psych Thriller', year: '2024', pages: 55, status: 'Draft', color: '#2a0944', spineColor: '#3fa796', logline: 'A psychological spiral investigating a photograph that changes every time you look at it.', fileUrl: '/scripts/Tasveer.pdf', useDirectEmbed: true },
  { id: 9, title: "The Bakri Files", type: 'Pilot Script', genre: 'Crime / Comedy', year: '2024', pages: 60, status: 'Draft', color: '#111111', spineColor: '#fec260', logline: 'A chaotic, hilarious investigation centered around a highly suspicious goat.', fileUrl: '/scripts/The Bakri Files.pdf', useDirectEmbed: true },
  { id: 10, title: "Think-Twice 2.50", type: 'Pilot Script', genre: 'Cyberpunk', year: '2024', pages: 50, status: 'Draft', color: '#002B5B', spineColor: '#EA5455', logline: 'A fast-paced neon thriller where artificial memories are the hottest commodity on the black market.', fileUrl: '/scripts/Think-Twice 2.50.pdf', useDirectEmbed: true },
]


/** Script reader modal */
function ScriptReader({ script, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)

  const embedUrl = script.useDirectEmbed
    ? `${encodeURI(script.fileUrl)}#toolbar=0&navpanes=0`
    : `https://docs.google.com/viewer?url=${encodeURIComponent(script.fileUrl)}&embedded=true`

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.fromTo(
      panelRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.6, ease: 'power4.out' }
    )
    const onKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    gsap.to(panelRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, onComplete: onClose })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex transition-colors duration-500"
      style={{ backgroundColor: 'rgba(var(--color-black-rgb, 10, 10, 10), 0.95)' }} // We leverage transparency natively soon! Let's just use CSS vars.
      // Wait, let's just use tailwind!
    >
      <div 
        className="absolute inset-0 bg-film-black opacity-95 transition-opacity" 
        onClick={(e) => handleClose()}
      />
      <div className="relative pointer-events-none hidden md:flex flex-col justify-center px-12 max-w-xs text-left z-20">
          <p className="font-mono text-film-gold text-[10px] tracking-[0.4em] uppercase mb-4">{script.type} · {script.genre}</p>
          <h2 className="font-serif text-film-cream text-3xl mb-4 italic">{script.title}</h2>
          <p className="font-sans text-film-muted text-sm font-light leading-relaxed mb-6">{script.logline}</p>
          <div className="space-y-2">
            <p className="font-mono text-film-muted text-xs">{script.pages} pages</p>
            <p className="font-mono text-film-gold text-xs tracking-wider">{script.status}</p>
            <p className="font-mono text-film-muted/50 text-xs">{script.year}</p>
        </div>
        <button
          onClick={handleClose}
          className="pointer-events-auto mt-10 w-fit font-mono text-film-muted text-xs tracking-widest uppercase hover:text-film-cream transition-colors text-left"
        >
          ← Close
        </button>
      </div>

      <div
        ref={panelRef}
        className="relative z-20 flex-1 flex flex-col bg-film-black border-l border-film-cream/10 transition-colors duration-500"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex items-center justify-between px-6 py-3 border-b border-film-cream/10 transition-colors duration-500">
          <div className="flex items-center gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2 h-3 rounded-sm border border-white/10" />
            ))}
          </div>
          <span className="font-mono text-film-muted text-xs tracking-widest">{script.title}</span>
          <button
            onClick={handleClose}
            className="font-mono text-film-muted text-xs tracking-widest uppercase hover:text-film-cream transition-colors md:hidden"
          >
            [ ESC ]
          </button>
          <div className="hidden md:flex items-center gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2 h-3 rounded-sm border border-white/10" />
            ))}
          </div>
        </div>

        <div className="flex-1 relative">
          <iframe
            src={embedUrl}
            title={`${script.title} — Script`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', background: 'var(--color-black)' }}
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
        </div>

        <div className="px-6 py-2 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-film-muted/40 text-[10px] tracking-widest uppercase">
            {script.pages} pages · {script.year}
          </span>
          <span className="font-mono text-film-gold/60 text-[10px] tracking-widest uppercase">{script.status}</span>
        </div>
      </div>
    </div>
  )
}

export default function ScriptShelf() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const bgTextRef = useRef(null)
  const [activeScript, setActiveScript] = useState(null)
  const [hoveredScript, setHoveredScript] = useState(scripts[0])

  useEffect(() => {
    // List elements animation
    gsap.fromTo(
      listRef.current.querySelectorAll('.script-list-item'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
      }
    )

    // Restored Background ghost text parallax
    gsap.to(bgTextRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <section ref={sectionRef} id="shelf" className="relative py-24 w-full overflow-hidden">
      
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
          Archives
        </span>
      </div>

      {/* Unified Section Header */}
      <div className="scroll-reveal mb-12 w-full max-w-[850px] mx-auto px-6 xl:px-0 text-center lg:text-left">
        <p className="font-mono text-film-gold text-xs tracking-[0.4em] uppercase mb-4">02b — Script Library</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-film-cream transition-colors duration-500">The Archives</h2>
        <div className="mt-8 w-12 h-px bg-film-gold mx-auto lg:mx-0" />
      </div>

      {/* Highly Aesthetic Architectural Bookshelf Desk */}
      <div className="flex flex-col lg:flex-row items-end justify-center w-full max-w-[1400px] mx-auto relative px-4 lg:px-12 mt-20">
        
        {/* Left Flank: Giant Geometric Sansevieria (Snake Plant) */}
        <div className="hidden lg:flex w-[240px] flex-col items-center justify-end z-20 pb-4 mb-[-2px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)] opacity-95 transition-opacity duration-500">
          <div className="relative w-[180px] h-[340px] mb-[-40px] z-10 flex justify-center">
             <svg viewBox="0 0 40 200" className="absolute bottom-0 w-[55px] h-[320px] text-film-muted opacity-80" preserveAspectRatio="none"><path d="M20 0 Q35 100 20 200 Q5 100 20 0Z" fill="currentColor" /></svg>
             <svg viewBox="0 0 40 200" className="absolute bottom-0 left-[25px] w-[50px] h-[260px] text-film-muted opacity-70 origin-bottom -rotate-12" preserveAspectRatio="none"><path d="M20 0 Q35 100 20 200 Q5 100 20 0Z" fill="currentColor" /></svg>
             <svg viewBox="0 0 40 200" className="absolute bottom-0 right-[25px] w-[60px] h-[280px] text-film-muted opacity-60 origin-bottom rotate-12" preserveAspectRatio="none"><path d="M20 0 Q35 100 20 200 Q5 100 20 0Z" fill="currentColor" /></svg>
             <svg viewBox="0 0 40 200" className="absolute bottom-0 left-[5px] w-[45px] h-[190px] text-film-muted opacity-50 origin-bottom -rotate-24" preserveAspectRatio="none"><path d="M20 0 Q35 100 20 200 Q5 100 20 0Z" fill="currentColor" /></svg>
             <svg viewBox="0 0 40 200" className="absolute bottom-0 right-[5px] w-[45px] h-[170px] text-film-muted opacity-40 origin-bottom rotate-24" preserveAspectRatio="none"><path d="M20 0 Q35 100 20 200 Q5 100 20 0Z" fill="currentColor" /></svg>
             <svg viewBox="0 0 40 200" className="absolute bottom-0 w-[55px] h-[160px] text-[#4a4a4a] dark:text-[#222] opacity-90 origin-bottom rotate-3 transition-colors duration-500" preserveAspectRatio="none"><path d="M20 0 Q35 100 20 200 Q5 100 20 0Z" fill="currentColor" /></svg>
          </div>
          <div className="w-[160px] h-[150px] bg-gradient-to-b from-[#e5e5e5] to-[#c0c0c0] dark:from-[#1a1a1a] dark:to-[#050505] rounded-b-[45px] rounded-t-sm border border-black/10 dark:border-white/5 relative shadow-[inset_0_-10px_20px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-10px_20px_rgba(0,0,0,0.8)] z-20 transition-colors duration-500">
             <div className="absolute top-0 inset-x-0 h-6 bg-[#3a302a] dark:bg-[#0a0806] rounded-t-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] transition-colors duration-500" />
             <div className="absolute top-[-2px] inset-x-[-4px] h-4 bg-gradient-to-b from-[#f4f4f4] to-[#e0e0e0] dark:from-[#2a2a2a] dark:to-[#111] rounded-sm shadow-[0_4px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.6)] border-b border-black/10 dark:border-white/5 transition-colors duration-500" />
          </div>
        </div>

        {/* Center: The Bookshelf Line */}
        <div ref={listRef} className="flex items-end justify-center gap-1 overflow-hidden relative z-10 w-full max-w-[800px] shrink-0">
          {/* Left Decorative Bookend */}
          <div className="w-5 h-[140px] bg-gradient-to-b from-film-gray to-film-black border border-film-cream/10 rounded-sm mr-4 shadow-xl flex-shrink-0 transition-colors duration-500" />
  
          {scripts.map((script) => {
             const isHovered = hoveredScript?.id === script.id;
             const baseWidth = Math.max(38, Math.min(64, script.pages / 2.2));
             return (
               <button
                 key={script.id}
                 onClick={() => setActiveScript(script)}
                 onMouseEnter={() => setHoveredScript(script)}
                 className="script-list-item relative flex-shrink-0 cursor-pointer focus:outline-none transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-t-[3px]"
                 style={{
                    width: baseWidth,
                    height: '240px',
                    background: `linear-gradient(135deg, ${script.color}, ${script.spineColor})`,
                    borderTop: `1px solid ${isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    borderLeft: `1px solid ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                    borderRight: '1px solid rgba(0,0,0,0.6)',
                    transform: isHovered ? 'translateY(-24px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered 
                       ? '0 30px 50px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.1)' 
                       : 'inset 0 0 10px rgba(0,0,0,0.8), -2px 0 5px rgba(0,0,0,0.3)',
                    zIndex: isHovered ? 50 : 10,
                 }}
               >
                 <span 
                   className="absolute inset-0 flex items-center justify-between py-4 font-serif text-[12px] tracking-[0.2em] whitespace-nowrap"
                   style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                 >
                   <span className="font-mono text-[9px] uppercase tracking-widest pl-2 opacity-50 select-none pb-4">{script.genre}</span>
                   <span 
                     className="transition-colors duration-300 font-bold"
                     style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.8)' }}
                   >
                     {script.title}
                   </span>
                 </span>
               </button>
             )
          })}
  
          {/* Right Decorative Bookend */}
          <div className="w-5 h-[140px] bg-gradient-to-b from-film-gray to-film-black border border-film-cream/10 rounded-sm ml-4 shadow-xl flex-shrink-0 transition-colors duration-500" />
        </div>

        {/* Right Flank: Giant Cinematic Coffee Mug */}
        <div className="hidden lg:flex w-[240px] flex-col items-center justify-end z-30 pb-0">
          <svg viewBox="0 0 50 100" className="w-16 h-32 text-gray-500 dark:text-white opacity-40 dark:opacity-20 animate-pulse mb-[-15px] z-10 transition-colors duration-500">
             <path d="M25 100 C10 70, 40 40, 25 0" stroke="currentColor" strokeWidth="2" fill="none" className="blur-[2px]" />
             <path d="M15 90 C0 60, 30 30, 15 -10" stroke="currentColor" strokeWidth="1.5" fill="none" className="blur-[3px]" />
          </svg>
          <div className="relative w-[110px] h-[130px] bg-gradient-to-br from-[#ffffff] to-[#d4d4d4] dark:from-[#222] dark:to-[#0a0a0a] rounded-[24px] rounded-b-[32px] shadow-[15px_15px_25px_rgba(0,0,0,0.15)] dark:shadow-[20px_20px_40px_rgba(0,0,0,0.9)] border border-black/5 dark:border-white/10 flex flex-col items-center justify-start transition-colors duration-500 z-20">
             <div className="w-[85%] h-[16px] bg-[#3e2723] rounded-[50%] mt-3 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] ring-1 ring-white/30 dark:ring-white/5" />
             <div className="absolute top-8 -right-8 w-14 h-20 border-[8px] border-[#e0e0e0] dark:border-[#1a1a1a] rounded-[24px] rounded-l-none z-[-1] transition-colors duration-500" />
          </div>
          <div className="w-[150px] h-4 bg-gradient-to-r from-[#999] to-[#cbcbcb] dark:from-[#111] dark:to-[#000] rounded-sm mt-4 shadow-2xl skew-x-[-15deg] transition-colors duration-500" />
        </div>
      </div>

      {activeScript && (
        <ScriptReader script={activeScript} onClose={() => setActiveScript(null)} />
      )}
    </section>
  )
}
