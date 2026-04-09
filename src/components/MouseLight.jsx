import { useEffect, useRef } from 'react'

/**
 * Subtle spotlight that follows the cursor — like a film projector beam
 * scanning the room. Uses a radial gradient on a fixed canvas-like div.
 * Lerped for smooth, weighted movement.
 */
export default function MouseLight() {
  const lightRef = useRef(null)
  const pos = useRef({ x: -999, y: -999 })
  const current = useRef({ x: -999, y: -999 })
  const rafId = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      const ease = 0.06
      current.current.x += (pos.current.x - current.current.x) * ease
      current.current.y += (pos.current.y - current.current.y) * ease

      if (lightRef.current) {
          lightRef.current.style.background = `radial-gradient(
            600px circle at ${current.current.x}px ${current.current.y}px,
            rgba(201,168,76,0.10) 0%,
            rgba(201,168,76,0.04) 25%,
            transparent 60%
          )`
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
        transition: 'opacity 0.3s',
      }}
    />
  )
}
