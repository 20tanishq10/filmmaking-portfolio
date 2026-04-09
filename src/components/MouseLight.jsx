import { useEffect, useRef } from 'react'

/**
 * Cursor spotlight — warm amber in dark mode, deep ink in day mode.
 * Reads body.classList to switch colour in real time.
 */
export default function MouseLight() {
  const lightRef = useRef(null)
  const pos      = useRef({ x: -999, y: -999 })
  const current  = useRef({ x: -999, y: -999 })
  const rafId    = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      const ease = 0.07
      current.current.x += (pos.current.x - current.current.x) * ease
      current.current.y += (pos.current.y - current.current.y) * ease

      if (lightRef.current) {
        const isLight = document.body.classList.contains('light-mode')
        const x = current.current.x
        const y = current.current.y

        if (isLight) {
          // Day mode: very subtle warm shadow that follows cursor
          lightRef.current.style.background = `
            radial-gradient(
              500px circle at ${x}px ${y}px,
              transparent 0%,
              transparent 40%,
              rgba(60,40,10,0.03) 70%,
              rgba(40,25,5,0.07) 100%
            )
          `
        } else {
          // Dark mode: warm amber projector beam
          lightRef.current.style.background = `
            radial-gradient(
              600px circle at ${x}px ${y}px,
              rgba(201,168,76,0.10) 0%,
              rgba(201,168,76,0.04) 25%,
              transparent 60%
            )
          `
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={lightRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9995,
      }}
    />
  )
}
