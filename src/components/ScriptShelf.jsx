import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Richer, more cinematic colour palette — warm earth tones, deep jewels, muted film stocks
const scripts = [
  { id: 1,  title: "Aa Bail Mujhe Maar", type: 'Feature Script',  genre: 'Dark Comedy',      year: '2024', pages: 120, status: 'Draft', color: '#1c0a00', spineColor: '#7c3a00', logline: 'A satirical dark comedy exploring the consequences of inviting trouble.',                                                              fileUrl: '/scripts/Aa Bail Mujhe Maar.pdf', useDirectEmbed: true },
  { id: 2,  title: "Chor Kaun",          type: 'Feature Script',  genre: 'Mystery / Thriller',year: '2024', pages: 115, status: 'Draft', color: '#0a0a1a', spineColor: '#8b1a2a', logline: 'A gripping whodunit that challenges the very nature of guilt.',                                                                          fileUrl: '/scripts/Chor Kaun.pdf',          useDirectEmbed: true },
  { id: 3,  title: "Deja-vu",            type: 'Feature Script',  genre: 'Sci-Fi Drama',      year: '2024', pages: 110, status: 'Draft', color: '#050d1a', spineColor: '#1a4a6a', logline: 'A character-driven sci-fi blending memory and reality into an endless loop.',                                                            fileUrl: '/scripts/Deja-vu.pdf',            useDirectEmbed: true },
  { id: 4,  title: "Ebb and Flow",       type: 'Feature Script',  genre: 'Drama',             year: '2024', pages: 105, status: 'Draft', color: '#0d0d08', spineColor: '#4a4a1a', logline: 'An emotional journey tracking the steady tides of human connection.',                                                                    fileUrl: '/scripts/Ebb and Flow.pdf',       useDirectEmbed: true },
  { id: 5,  title: "Kasak",              type: 'Short Script',    genre: 'Emotional Drama',   year: '2024', pages: 15,  status: 'Draft', color: '#1a0505', spineColor: '#6a1515', logline: 'A poetic exploration of lingering pain and untethered emotional closure.',                                                               fileUrl: '/scripts/Kasak.pdf',              useDirectEmbed: true },
  { id: 6,  title: "Raamleel",           type: 'Short Script',    genre: 'Tragedy',           year: '2024', pages: 20,  status: 'Draft', color: '#0a0a00', spineColor: '#3a3000', logline: 'A culturally rich drama exploring the depths of tradition vs modernity.',                                                                fileUrl: '/scripts/Raamleel.pdf',           useDirectEmbed: true },
  { id: 7,  title: "Sometimes",          type: 'Short Script',    genre: 'Romance',           year: '2024', pages: 12,  status: 'Draft', color: '#0d0510', spineColor: '#4a1a5a', logline: 'A delicate, ephemeral look into the fleeting moments of modern love.',                                                                   fileUrl: '/scripts/Sometimes.pdf',          useDirectEmbed: true },
  { id: 8,  title: "Tasveer",            type: 'Pilot Script',    genre: 'Psych Thriller',    year: '2024', pages: 55,  status: 'Draft', color: '#050a0a', spineColor: '#0a3a3a', logline: 'A psychological spiral investigating a photograph that changes every time you look at it.',                                               fileUrl: '/scripts/Tasveer.pdf',            useDirectEmbed: true },
  { id: 9,  title: "The Bakri Files",    type: 'Pilot Script',    genre: 'Crime / Comedy',    year: '2024', pages: 60,  status: 'Draft', color: '#0a0800', spineColor: '#5a4000', logline: 'A chaotic, hilarious investigation centered around a highly suspicious goat.',                                                           fileUrl: '/scripts/The Bakri Files.pdf',    useDirectEmbed: true },
  { id: 10, title: "Think-Twice 2.50",   type: 'Pilot Script',    genre: 'Cyberpunk',         year: '2024', pages: 50,  status: 'Draft', color: '#000a0a', spineColor: '#003a4a', logline: 'A fast-paced neon thriller where artificial memories are the hottest commodity on the black market.',                                    fileUrl: '/scripts/Think-Twice 2.50.pdf',   useDirectEmbed: true },
]

/** Script reader modal — unchanged */
function ScriptReader({ script, onClose }) {
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)
  const embedUrl   = script.useDirectEmbed
    ? `${encodeURI(script.fileUrl)}#toolbar=0&navpanes=0`
    : `https://docs.google.com/viewer?url=${encodeURIComponent(script.fileUrl)}&embedded=true`

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.6, ease: 'power4.out' })
    const onKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    gsap.to(panelRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, onComplete: onClose })
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[10000] flex">
      <div className="absolute inset-0 bg-film-black opacity-95" onClick={handleClose} />
      <div className="relative pointer-events-none hidden md:flex flex-col justify-center px-12 max-w-xs z-20">
        <p className="font-mono text-film-gold text-[10px] tracking-[0.4em] uppercase mb-4">{script.type} · {script.genre}</p>
        <h2 className="font-serif text-film-cream text-3xl mb-4 italic">{script.title}</h2>
        <p className="font-sans text-film-muted text-sm font-light leading-relaxed mb-6">{script.logline}</p>
        <div className="space-y-2">
          <p className="font-mono text-film-muted text-xs">{script.pages} pages</p>
          <p className="font-mono text-film-gold text-xs tracking-wider">{script.status}</p>
          <p className="font-mono text-film-muted/50 text-xs">{script.year}</p>
        </div>
        <button onClick={handleClose} className="pointer-events-auto mt-10 w-fit font-mono text-film-muted text-xs tracking-widest uppercase hover:text-film-cream transition-colors">← Close</button>
      </div>
      <div ref={panelRef} className="relative z-20 flex-1 flex flex-col bg-film-black border-l border-film-cream/10" style={{ transform: 'translateX(100%)' }}>
        <div className="flex items-center justify-between px-6 py-3 border-b border-film-cream/10">
          <div className="flex items-center gap-3">{[...Array(6)].map((_,i) => <div key={i} className="w-2 h-3 rounded-sm border border-white/10" />)}</div>
          <span className="font-mono text-film-muted text-xs tracking-widest">{script.title}</span>
          <button onClick={handleClose} className="font-mono text-film-muted text-xs tracking-widest uppercase hover:text-film-cream transition-colors md:hidden">[ ESC ]</button>
          <div className="hidden md:flex items-center gap-3">{[...Array(6)].map((_,i) => <div key={i} className="w-2 h-3 rounded-sm border border-white/10" />)}</div>
        </div>
        <div className="flex-1 relative">
          <iframe src={embedUrl} title={`${script.title} — Script`} className="absolute inset-0 w-full h-full" style={{ border: 'none', background: 'var(--color-black)' }} />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
        </div>
        <div className="px-6 py-2 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-film-muted/40 text-[10px] tracking-widest uppercase">{script.pages} pages · {script.year}</span>
          <span className="font-mono text-film-gold/60 text-[10px] tracking-widest uppercase">{script.status}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Minimal hanging bulb — clean geometric, no ornamentation.
 * Thin wire, pure teardrop silhouette, single filament line, small pull knob.
 */
function HangingBulb({ lit, onToggle }) {
  const wireRef   = useRef(null)
  const knobRef   = useRef(null)
  const glowRef   = useRef(null)

  const handlePull = useCallback(() => {
    gsap.timeline()
      .to(knobRef.current, { y: 18, duration: 0.10, ease: 'power3.in' })
      .to(knobRef.current, { y: 0,  duration: 0.90, ease: 'elastic.out(1,0.32)' })
      .to(wireRef.current, { scaleY: 1.12, duration: 0.10, ease: 'power2.in',  transformOrigin: 'top center' }, 0)
      .to(wireRef.current, { scaleY: 1,    duration: 0.80, ease: 'elastic.out(1,0.38)', transformOrigin: 'top center' }, 0.10)

    if (!lit) {
      gsap.timeline()
        .to(glowRef.current, { opacity: 0.9, duration: 0.03 })
        .to(glowRef.current, { opacity: 0.2, duration: 0.04 })
        .to(glowRef.current, { opacity: 1.0, duration: 0.04 })
        .to(glowRef.current, { opacity: 0.5, duration: 0.03 })
        .to(glowRef.current, { opacity: 1.0, duration: 0.16 })
    } else {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' })
    }
    onToggle()
  }, [lit, onToggle])

  return (
    <div
      className="hidden lg:flex flex-col items-center flex-shrink-0 cursor-pointer select-none"
      style={{ width: 36, zIndex: 30, marginBottom: -2 }}
      onClick={handlePull}
      role="button"
      aria-label={lit ? 'Turn off' : 'Turn on'}
    >
      <svg width="72" height="300" viewBox="0 0 72 300"
        style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <radialGradient id="hb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffd060" stopOpacity={lit ? 0.65 : 0} />
            <stop offset="55%"  stopColor="#ff8800" stopOpacity={lit ? 0.18 : 0} />
            <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hb-glass" cx="36%" cy="30%" r="60%">
            <stop offset="0%"   stopColor={lit ? '#fffef5' : '#888'} stopOpacity={lit ? 0.95 : 0.18} />
            <stop offset="50%"  stopColor={lit ? '#ffc840' : '#555'} stopOpacity={lit ? 0.85 : 0.12} />
            <stop offset="100%" stopColor={lit ? '#a05800' : '#222'} stopOpacity={lit ? 0.90 : 0.30} />
          </radialGradient>
          <filter id="hb-blur"><feGaussianBlur stdDeviation="8" /></filter>
          <filter id="hb-soft"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>

        {/* Ambient pool below — removed, was causing yellow patch */}

        {/* Outer glow halo — tighter, only when lit */}
        <ellipse ref={glowRef}
          cx="36" cy="138" rx="38" ry="40"
          fill="url(#hb-glow)" filter="url(#hb-blur)"
          opacity={lit ? 1 : 0} style={{ transition: 'none' }} />

        {/* Wire — single 1px line, faintly visible in dark */}
        <line ref={wireRef}
          x1="36" y1="0" x2="36" y2="118"
          stroke={lit ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.18)'}
          strokeWidth="1"
          style={{ transition: 'stroke 0.6s ease', transformOrigin: '36px 0px' }}
        />

        {/* Bulb — clean teardrop, visible outline in dark */}
        <path
          d="M22 138 Q18 118 36 108 Q54 118 50 138 Q50 156 42 164 L30 164 Q22 156 22 138Z"
          fill="url(#hb-glass)"
          stroke={lit ? 'rgba(255,200,80,0.25)' : 'rgba(255,255,255,0.14)'}
          strokeWidth="0.8"
        />

        {/* Single specular glint — top left */}
        <path d="M26 118 Q29 112 36 110 Q31 116 28 124Z"
          fill={lit ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.06)'} />

        {/* Filament — glows when lit, faintly visible + sparkles in dark */}
        <line
          x1="30" y1="148" x2="42" y2="148"
          stroke={lit ? '#fff8c0' : 'rgba(255,255,255,0.28)'}
          strokeWidth={lit ? 1.2 : 0.8}
          style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
          className={lit ? '' : 'filament-idle'}
        />
        {lit && (
          <line x1="30" y1="148" x2="42" y2="148"
            stroke="#ffe080" strokeWidth="5"
            opacity="0.2" filter="url(#hb-soft)" />
        )}

        {/* Neck */}
        <rect x="33" y="164" width="6" height="8" rx="1"
          fill={lit ? 'rgba(255,200,80,0.15)' : 'rgba(255,255,255,0.07)'} />

        {/* Pull string */}
        <line x1="36" y1="172" x2="36" y2="230"
          stroke={lit ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.15)'}
          strokeWidth="0.8"
          style={{ transition: 'stroke 0.5s ease' }}
        />

        {/* Pull knob */}
        <circle ref={knobRef}
          cx="36" cy="234" r="4"
          fill="none"
          stroke={lit ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.25)'}
          strokeWidth="1"
          style={{ transition: 'stroke 0.5s ease' }}
        />

        {/* Label — sits just below the knob, inside SVG */}
        <text
          x="36" y="250"
          textAnchor="middle"
          fontFamily="'Courier Prime', monospace"
          fontSize="7"
          letterSpacing="3"
          fill={lit ? 'rgba(201,168,76,0.55)' : 'rgba(255,255,255,0.35)'}
          className={lit ? '' : 'filament-idle'}
        >
          {lit ? 'ON' : 'PULL'}
        </text>
      </svg>

      {/* no external label needed */}
    </div>
  )
}

/** Snake plant — 3D scroll parallax, reacts to light and day/night mode */
function SnakePlant({ sectionRef, lit, isLight }) {
  const plantRef = useRef(null)
  const leaves = [
    { x: 0,   h: 340, rot:  0,  z: 1.0, op: 0.95 },
    { x: 22,  h: 290, rot:  13, z: 0.8, op: 0.80 },
    { x: -22, h: 305, rot: -13, z: 0.8, op: 0.75 },
    { x: 42,  h: 235, rot:  25, z: 0.6, op: 0.58 },
    { x: -42, h: 250, rot: -25, z: 0.6, op: 0.52 },
    { x: 12,  h: 195, rot:   7, z: 0.4, op: 0.42 },
    { x: -12, h: 180, rot:  -7, z: 0.4, op: 0.38 },
  ]

  useEffect(() => {
    if (!sectionRef?.current || !plantRef.current) return
    plantRef.current.querySelectorAll('.leaf').forEach((leaf, i) => {
      const f = leaves[i].z
      gsap.to(leaf, {
        y: -(70 * f), rotateX: 16 * f, rotateZ: leaves[i].rot * 0.28 * f,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    })
  }, [sectionRef])

  // Leaf colour: dark mode = near-black / lit green, day mode = charcoal green
  const leafFill = isLight
    ? (lit ? '#3a5228' : '#3a3530')
    : (lit ? '#2e3d1e' : '#222222')
  const veinStroke = isLight
    ? (lit ? 'rgba(100,70,20,0.4)' : 'rgba(80,60,20,0.2)')
    : (lit ? 'rgba(180,150,60,0.4)' : 'rgba(201,168,76,0.12)')
  const stripeStroke = isLight
    ? (lit ? 'rgba(100,70,20,0.12)' : 'rgba(0,0,0,0.06)')
    : (lit ? 'rgba(220,190,80,0.14)' : 'rgba(255,255,255,0.05)')

  // Pot colours
  const potBg = isLight
    ? (lit ? 'linear-gradient(to bottom,#7a5a3a,#5a3a1a)' : 'linear-gradient(to bottom,#6a5030,#4a3010)')
    : (lit ? 'linear-gradient(to bottom,#1e1a10,#0a0800)' : 'linear-gradient(to bottom,#1a1a1a,#0a0a0a)')
  const potBorder = isLight
    ? `1px solid rgba(100,70,20,0.25)`
    : `1px solid ${lit ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)'}`
  const rimBg = isLight
    ? (lit ? 'linear-gradient(to bottom,#8a6840,#6a4820)' : 'linear-gradient(to bottom,#7a5a30,#5a3a10)')
    : (lit ? 'linear-gradient(to bottom,#2a2210,#1a1608)' : 'linear-gradient(to bottom,#252525,#181818)')
  const soilBg = isLight ? '#5a4020' : '#0d0d0d'

  return (
    <div ref={plantRef} className="hidden lg:flex flex-col items-center justify-end flex-shrink-0"
      style={{ perspective: '500px', perspectiveOrigin: '50% 100%', width: 130, marginBottom: -2 }}>
      <div className="relative flex justify-center" style={{ width: 130, height: 340 }}>
        {leaves.map((l, i) => (
          <svg key={i} className="leaf absolute bottom-0" viewBox="0 0 40 200" preserveAspectRatio="none"
            style={{ width: 48 - i*2, height: l.h, left:`calc(50% + ${l.x}px - 24px)`,
              transformOrigin:'50% 100%', transform:`rotate(${l.rot}deg)`,
              opacity: l.op, filter:`brightness(${isLight ? 0.7 + l.z * 0.4 : 0.45 + l.z * 0.55})` }}>
            <path d="M20 0 Q34 80 20 200 Q6 80 20 0Z"
              fill={leafFill} style={{ transition:'fill 1.2s ease' }} />
            <line x1="20" y1="8" x2="20" y2="194"
              stroke={veinStroke} strokeWidth="1" style={{ transition:'stroke 1.2s ease' }} />
            {[28,56,84,112,140,168].map(y => (
              <line key={y} x1="9" y1={y} x2="31" y2={y}
                stroke={stripeStroke} strokeWidth="1.5" style={{ transition:'stroke 1.2s ease' }} />
            ))}
          </svg>
        ))}
      </div>
      {/* Pot */}
      <div className="relative z-20 flex-shrink-0" style={{
        width: 86, height: 68,
        background: potBg,
        borderRadius: '3px 3px 18px 18px',
        border: potBorder,
        boxShadow: isLight ? '0 8px 20px rgba(0,0,0,0.2)' : '0 16px 32px rgba(0,0,0,0.9)',
        transition: 'background 1.2s ease, border-color 1.2s ease',
      }}>
        <div style={{ position:'absolute', top:-5, left:-5, right:-5, height:12,
          background: rimBg, borderRadius:3,
          border: isLight ? '1px solid rgba(100,70,20,0.2)' : '1px solid rgba(255,255,255,0.07)',
          transition:'background 1.2s ease' }} />
        <div style={{ position:'absolute', top:7, left:7, right:7, height:8, background: soilBg, borderRadius:2 }} />
      </div>
    </div>
  )
}

export default function ScriptShelf() {
  const sectionRef    = useRef(null)
  const listRef       = useRef(null)
  const bgTextRef     = useRef(null)
  const lightRef      = useRef(null)
  const [activeScript,  setActiveScript]  = useState(null)
  const [hoveredScript, setHoveredScript] = useState(null)
  const [lit, setLit] = useState(false)
  const [isLight, setIsLight] = useState(false)

  // Track day/night mode changes
  useEffect(() => {
    const check = () => setIsLight(document.body.classList.contains('light-mode'))
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const toggleLight = useCallback(() => {
    const next = !lit
    setLit(next)
    gsap.to(lightRef.current, {
      opacity: next ? 1 : 0,
      duration: next ? 0.7 : 0.9,
      ease: next ? 'power2.out' : 'power2.in',
    })
  }, [lit])

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.querySelectorAll('.script-list-item'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 82%' } }
      )
    }
    gsap.to(bgTextRef.current, {
      yPercent: -20, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }, [])

  return (
    <section ref={sectionRef} id="shelf" className="relative w-full overflow-hidden"
      style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>

      {/* Warm light wash — only meaningful in dark mode when lit */}
      <div ref={lightRef} aria-hidden="true" style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:1, opacity:0,
        background:'radial-gradient(ellipse 60% 65% at 8% 60%, rgba(255,160,40,0.12) 0%, rgba(180,90,10,0.05) 50%, transparent 80%)',
      }} />

      {/* Ghost watermark */}
      <div ref={bgTextRef} aria-hidden="true"
        className="absolute top-0 bottom-0 left-4 md:left-12 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-serif text-6xl md:text-8xl text-film-cream opacity-[0.025] uppercase tracking-[0.4em] whitespace-nowrap"
          style={{ writingMode:'vertical-rl', transform:'rotate(180deg)' }}>
          Archives
        </span>
      </div>

      {/* ── Header ── */}
      <div className="scroll-reveal mb-6 w-full max-w-[1100px] mx-auto px-6 lg:px-8 relative z-10">
        <p className="font-mono text-film-gold text-xs tracking-[0.4em] uppercase mb-3">02b — Script Library</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl transition-colors duration-700"
          style={{ color: lit ? '#fff8e7' : 'var(--color-cream)' }}>
          The Archives
        </h2>
        <div className="mt-5 w-12 h-px bg-film-gold" />
      </div>

      {/* ── Desktop scene: lamp + books + plant ── */}
      <div className="hidden lg:block relative z-10 w-full max-w-[1100px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-center gap-0">
          <HangingBulb lit={lit} onToggle={toggleLight} />
          <div className="flex-1 flex flex-col items-center min-w-0">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3 transition-colors duration-700 tap-hint"
              style={{ color: lit ? 'rgba(201,168,76,0.55)' : 'rgba(255,255,255,0.22)', animation: lit ? 'none' : 'pulseLabel 3s ease-in-out infinite' }}>
              Tap a book to read
            </p>
            <div ref={listRef} className="flex items-end justify-center gap-[2px] w-full">
              <div className="w-4 h-[120px] rounded-sm mr-2 shadow-xl flex-shrink-0 transition-all duration-700"
                style={{ background: isLight ? 'linear-gradient(to bottom,#7a5a30,#5a3a10)' : lit ? 'linear-gradient(to bottom,#2a1e08,#160e04)' : 'linear-gradient(to bottom,#1c1c1c,#0a0a0a)', border: `1px solid ${isLight ? 'rgba(100,70,20,0.3)' : lit ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.08)'}` }} />
              {scripts.map((script) => {
                const isHov = hoveredScript?.id === script.id
                const w = Math.max(34, Math.min(58, script.pages / 2.3))
                return (
                  <button key={script.id} onClick={() => setActiveScript(script)}
                    onMouseEnter={() => setHoveredScript(script)} onMouseLeave={() => setHoveredScript(null)}
                    className="script-list-item relative flex-shrink-0 cursor-pointer focus:outline-none rounded-t-[2px]"
                    style={{ width: w, height: 220, background: `linear-gradient(160deg, ${script.color} 0%, ${script.spineColor} 100%)`, filter: isLight ? 'brightness(1.3) saturate(1.4)' : 'none', borderTop: `1px solid ${isHov ? 'rgba(255,255,255,0.45)' : lit ? 'rgba(255,180,50,0.22)' : 'rgba(255,255,255,0.09)'}`, borderLeft: `1px solid ${isHov ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.04)'}`, borderRight: '1px solid rgba(0,0,0,0.65)', transform: isHov ? 'translateY(-22px) scale(1.025)' : 'translateY(0) scale(1)', transition: 'transform 0.32s cubic-bezier(0.25,1,0.5,1), box-shadow 0.32s ease, border-color 0.6s ease', boxShadow: isHov ? `0 28px 48px rgba(0,0,0,0.95), 0 0 18px ${lit ? 'rgba(255,175,45,0.22)' : 'rgba(255,255,255,0.08)'}` : 'inset 0 0 12px rgba(0,0,0,0.85), -2px 0 4px rgba(0,0,0,0.4)', zIndex: isHov ? 50 : 10 }}>
                    <span className="absolute inset-0 flex items-center justify-between py-3" style={{ writingMode:'vertical-rl', transform:'rotate(180deg)' }}>
                      <span className="font-mono text-[8px] uppercase tracking-widest pl-1 opacity-40 select-none pb-3">{script.genre}</span>
                      <span className="font-serif text-[11px] tracking-[0.18em] transition-colors duration-300" style={{ color: isHov ? '#fff' : 'rgba(255,255,255,0.78)', fontWeight: 600 }}>{script.title}</span>
                    </span>
                    {lit && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(to right,transparent,rgba(255,180,50,0.35),transparent)', borderRadius:'2px 2px 0 0' }} />}
                  </button>
                )
              })}
              <div className="w-4 h-[120px] rounded-sm ml-2 shadow-xl flex-shrink-0 transition-all duration-700"
                style={{ background: isLight ? 'linear-gradient(to bottom,#7a5a30,#5a3a10)' : lit ? 'linear-gradient(to bottom,#2a1e08,#160e04)' : 'linear-gradient(to bottom,#1c1c1c,#0a0a0a)', border: `1px solid ${isLight ? 'rgba(100,70,20,0.3)' : lit ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.08)'}` }} />
            </div>
          </div>
          <SnakePlant sectionRef={sectionRef} lit={lit} isLight={isLight} />
        </div>
        <div style={{ height: 11, background: isLight ? 'linear-gradient(to bottom,#8a6840,#6a4820)' : lit ? 'linear-gradient(to bottom,#2c2008,#160e04)' : 'linear-gradient(to bottom,#1a1400,#0a0800)', boxShadow: isLight ? '0 6px 20px rgba(0,0,0,0.25)' : lit ? '0 6px 28px rgba(0,0,0,0.95), 0 -1px 10px rgba(255,155,35,0.1)' : '0 6px 24px rgba(0,0,0,0.95)', borderTop: `1px solid ${isLight ? 'rgba(100,70,20,0.35)' : lit ? 'rgba(201,168,76,0.22)' : 'rgba(201,168,76,0.07)'}`, transition: 'background 0.9s ease, border-color 0.9s ease, box-shadow 0.9s ease' }} />
      </div>

      {/* ── Mobile script list ── */}
      <div className="lg:hidden relative z-10 w-full px-6 mt-2">
        <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-6 text-film-muted">Tap a script to read</p>
        <div className="space-y-0 divide-y divide-white/5">
          {scripts.map((script, i) => (
            <button key={script.id} onClick={() => setActiveScript(script)}
              className="w-full text-left py-5 flex items-start gap-4 group active:bg-white/[0.02] transition-colors">
              <div className="flex-shrink-0 w-1 self-stretch rounded-full"
                style={{ background: `linear-gradient(to bottom, ${script.spineColor}, ${script.color})`, filter: isLight ? 'brightness(1.3) saturate(1.4)' : 'none' }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-film-gold/40 text-[9px] flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <h3 className="font-serif text-film-cream text-base leading-tight truncate">{script.title}</h3>
                </div>
                <p className="font-mono text-film-muted text-[9px] tracking-wider uppercase">{script.type} · {script.genre}</p>
                <p className="font-sans text-film-muted/60 text-xs mt-1 font-light leading-relaxed line-clamp-2">{script.logline}</p>
              </div>
              <div className="flex-shrink-0 text-right pt-0.5">
                <p className="font-mono text-film-muted/50 text-[9px]">{script.pages}p</p>
                <p className="font-mono text-film-gold/50 text-[9px] mt-0.5">{script.year}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-0 h-[3px] rounded-full" style={{ background: isLight ? 'linear-gradient(to right,#8a6840,#6a4820)' : 'linear-gradient(to right,#1a1400,#2a2000,#1a1400)' }} />
      </div>

      {activeScript && <ScriptReader script={activeScript} onClose={() => setActiveScript(null)} />}
    </section>
  )
}
