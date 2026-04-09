import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Intro from './components/Intro'
import FilmStripLoader from './components/FilmStripLoader'
import FilmBorders from './components/FilmBorders'
import ThemeToggle from './components/ThemeToggle'
import ShortFilms from './components/ShortFilms'
import Writing from './components/Writing'
import Documentary from './components/Documentary'
import FilmGrain from './components/FilmGrain'
import AmbientToggle from './components/AmbientToggle'
import Narration from './components/Narration'
import MouseLight from './components/MouseLight'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // 100% Native Scroll. Re-calculating triggers to ensure nothing gets skipped.
    ScrollTrigger.addEventListener('refresh', () => ScrollTrigger.update())
    ScrollTrigger.refresh()

    // Scroll-reveal text elements
    gsap.utils.toArray('.scroll-reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    })

    // Removed the overlapping parallax loops that caused opacity drops and premature blurring.
    // The sections will now remain clean, sharp, and 100% visible at all times.
  }, [])

  return (
    <>
      {/* Fixed global layers */}
      <FilmGrain opacity={0.04} />
      <MouseLight />
      <Narration />
      <AmbientToggle />

      {/* Removed cinematic wipes for a more seamless/Apple-like experience */}

      {/* Native scroll wrapper. No artificial jacking, guaranteeing perfect section rendering. */}
      <div>
        <div className="bg-grid min-h-screen" style={{ backgroundColor: 'var(--color-black)' }}>
          <ThemeToggle />

          {/* Aesthetic 35mm Film Borders that frame the entire site permanently */}
          <FilmBorders />

          {/* Immersive Cinematic Typography Start Sequence */}
          <FilmStripLoader />
          
          {/* We wrap each major block in a camera-section to apply the lens morphs */}
          <div className="camera-section origin-center">
            <Intro />
          </div>
          <div className="camera-section origin-center">
            <ShortFilms />
          </div>
          <div className="camera-section origin-center">
            <Writing />
          </div>
          <div className="camera-section origin-center">
            <Documentary />
          </div>
        </div>
      </div>
    </>
  )
}
