import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function CameraRig() {
  useEffect(() => {
    // Scroll interaction for Camera: Apple-style product float
    gsap.fromTo('.camera-rig-wrapper', 
      { y: 0, x: 0, rotation: 0, scale: 1 },
      {
        y: '80vh',
        x: '-60vw', // Crosses the entire screen diagonally
        rotation: -25, 
        scale: 1.8, // Becomes massive
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      }
    )
    
    // Animate the film reels spinning continuously, acting as the lifeblood of the camera
    gsap.to('.film-reel', {
      rotation: 360,
      repeat: -1,
      duration: 12,
      ease: 'none'
    })
  }, [])

  return (
    <div className="camera-rig-wrapper fixed top-1/4 right-20 z-[9998] pointer-events-none hidden md:block" style={{ transformOrigin: 'center center', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.9))' }}>
      <svg width="400" height="420" viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cam-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Lens Barrel */}
        <path d="M140 140 L210 115 L210 205 L140 180 Z" fill="transparent" stroke="url(#cam-glow)" strokeWidth="0.5" strokeLinejoin="round" />
        <line x1="140" y1="140" x2="210" y2="115" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <line x1="140" y1="180" x2="210" y2="205" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        
        {/* Lens Glass Reflection */}
        <ellipse cx="210" cy="160" rx="8" ry="45" fill="none" stroke="url(#cam-glow)" strokeWidth="0.5" opacity="0.8" />
        <ellipse cx="210" cy="160" rx="3" ry="20" fill="#fff" opacity="0.5" />
        <line x1="210" y1="115" x2="210" y2="205" stroke="#fff" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4" />
        
        {/* Focus Ring details */}
        <line x1="165" y1="130" x2="165" y2="190" stroke="url(#cam-glow)" strokeWidth="1" />
        <line x1="180" y1="125" x2="180" y2="195" stroke="url(#cam-glow)" strokeWidth="1" />
        
        {/* Main Body Mesh */}
        <rect x="20" y="110" width="120" height="100" rx="4" fill="transparent" stroke="url(#cam-glow)" strokeWidth="0.5" />
        <rect x="25" y="115" width="110" height="90" fill="transparent" stroke="#fff" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.4" />
        
        {/* Sleek Vents */}
        <line x1="35" y1="135" x2="105" y2="135" stroke="#fff" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 2" />
        <line x1="35" y1="150" x2="105" y2="150" stroke="#fff" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 2" />
        <line x1="35" y1="165" x2="105" y2="165" stroke="#fff" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 2" />
        <line x1="35" y1="180" x2="105" y2="180" stroke="#fff" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 2" />
        
        {/* Viewfinder block */}
        <path d="M75 90 L135 90 L135 110 L75 110 Z" fill="transparent" stroke="url(#cam-glow)" strokeWidth="0.5" strokeLinejoin="round" />
        <path d="M75 90 L135 110 M135 90 L75 110" stroke="#fff" strokeWidth="0.5" opacity="0.2" /> {/* X interior */}
        <circle cx="115" cy="100" r="2" fill="#ff2a2a" className="animate-pulse" /> {/* Recording light */}
        
        {/* Top Film Reels (Mickey ears) */}
        <g className="film-reel" transform="translate(55, 50)">
          <circle cx="0" cy="0" r="40" fill="none" stroke="url(#cam-glow)" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M0 -40 L0 40 M-40 0 L40 0 M-28 -28 L28 28 M-28 28 L28 -28" stroke="url(#cam-glow)" strokeWidth="0.5" opacity="0.6" />
        </g>
        
        <g className="film-reel" transform="translate(125, 50)">
          <circle cx="0" cy="0" r="40" fill="none" stroke="url(#cam-glow)" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
          <path d="M0 -40 L0 40 M-40 0 L40 0 M-28 -28 L28 28 M-28 28 L28 -28" stroke="url(#cam-glow)" strokeWidth="0.5" opacity="0.6" />
        </g>
        
        {/* Top Handle */}
        <path d="M45 90 L45 65 L145 65 L145 90" fill="none" stroke="url(#cam-glow)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="45" y1="70" x2="145" y2="70" stroke="#fff" strokeWidth="0.5" opacity="0.2" />
        
        {/* Bottom Matte Mount */}
        <rect x="40" y="210" width="80" height="4" rx="1" fill="none" stroke="url(#cam-glow)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}
