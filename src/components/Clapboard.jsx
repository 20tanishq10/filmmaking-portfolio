import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Clapboard() {
  const stickRef = useRef(null)

  useEffect(() => {
    // Add scroll triggers to clap the stick shut at milestones.
    const triggers = [0.15, 0.45, 0.75, 0.95]
    
    triggers.forEach((ratio) => {
      ScrollTrigger.create({
        trigger: document.body,
        start: () => `${(document.body.scrollHeight - window.innerHeight) * ratio - 10}px top`,
        end: () => `${(document.body.scrollHeight - window.innerHeight) * ratio + 10}px top`,
        onEnter: () => gsap.fromTo(stickRef.current, { rotation: 0 }, { rotation: -22, duration: 0.1, yoyo: true, repeat: 1, ease: 'power4.inOut' }),
        onEnterBack: () => gsap.fromTo(stickRef.current, { rotation: 0 }, { rotation: -22, duration: 0.1, yoyo: true, repeat: 1, ease: 'power4.inOut' }),
      })
    })

    // Apple-style: Make it a massive central element that moves down and scales
    gsap.to('.clapboard-wrapper', {
      y: '60vh', // Drops down the page
      x: '30vw',
      rotation: 15,
      scale: 1.5,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })
  }, [])

  return (
    <div className="clapboard-wrapper fixed top-1/2 left-1/2 -mt-[100px] -ml-[120px] z-[9999] pointer-events-none transition-transform hidden md:block" style={{ transformOrigin: 'center center' }}>
      <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}>
        <defs>
          <linearGradient id="premium-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer Frame Mesh */}
        <rect x="2" y="50" width="236" height="148" rx="2" fill="none" stroke="url(#premium-glow)" strokeWidth="0.5" />
        <rect x="10" y="58" width="220" height="132" fill="transparent" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" />
        
        {/* Sleek Minimalist Chevron Patterns */}
        <path d="M10 58 L40 80 M40 58 L70 80 M70 58 L100 80 M100 58 L130 80 M130 58 L160 80 M160 58 L190 80 M190 58 L220 80 M220 58 L230 65" stroke="url(#premium-glow)" strokeWidth="3" strokeLinecap="round" />
        
        {/* Minimalist Grid & Text */}
        <line x1="10" y1="90" x2="230" y2="90" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <line x1="80" y1="90" x2="80" y2="150" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <line x1="150" y1="90" x2="150" y2="150" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <line x1="10" y1="150" x2="230" y2="150" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        
        {/* High-end Thin Typography */}
        <text x="25" y="110" fill="#fff" fontFamily="Courier Prime, monospace" fontSize="8" letterSpacing="0.2em" opacity="0.5">SCENE</text>
        <text x="25" y="135" fill="url(#premium-glow)" fontFamily="Courier Prime, monospace" fontSize="20" fontWeight="300">101</text>
        
        <text x="95" y="110" fill="#fff" fontFamily="Courier Prime, monospace" fontSize="8" letterSpacing="0.2em" opacity="0.5">TAKE</text>
        <text x="95" y="135" fill="url(#premium-glow)" fontFamily="Courier Prime, monospace" fontSize="20" fontWeight="300">03</text>
        
        <text x="165" y="110" fill="#fff" fontFamily="Courier Prime, monospace" fontSize="8" letterSpacing="0.2em" opacity="0.5">ROLL</text>
        <text x="165" y="135" fill="url(#premium-glow)" fontFamily="Courier Prime, monospace" fontSize="20" fontWeight="300">A2</text>
        
        <text x="20" y="172" fill="#fff" fontFamily="Courier Prime, monospace" fontSize="8" letterSpacing="0.2em" opacity="0.6">DIR: T. GUPTA / CAM: CINE-RIG V1</text>
        
        {/* The Clapper Stick (Animatable) */}
        <g ref={stickRef} transform="translate(10, 48)" style={{ transformOrigin: '0% 100%' }}>
          <rect x="0" y="-30" width="220" height="25" rx="2" fill="none" stroke="url(#premium-glow)" strokeWidth="0.5" />
          <path d="M0 -30 L30 -5 M30 -30 L60 -5 M60 -30 L90 -5 M90 -30 L120 -5 M120 -30 L150 -5 M150 -30 L180 -5 M180 -30 L210 -5 M210 -30 L220 -20" stroke="url(#premium-glow)" strokeWidth="3" strokeLinecap="round" />
        </g>
        
        {/* Sleek Joint Pin */}
        <circle cx="15" cy="45" r="3" fill="#000" stroke="#fff" strokeWidth="0.5" />
        <circle cx="15" cy="45" r="1" fill="#c9a84c" />
      </svg>
    </div>
  )
}
