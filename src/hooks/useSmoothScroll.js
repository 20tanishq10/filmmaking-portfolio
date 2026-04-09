import { useEffect, useRef } from 'react'

/**
 * Camera-movement scroll: lerps the page wrapper's translateY
 * so the viewport "drifts" into position like a camera dolly.
 */
export default function useSmoothScroll(wrapperRef) {
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let current = 0   // rendered scroll position
    let target = 0    // actual scroll position
    let rafId = null
    const ease = 0.08 // Faster, more responsive ease

    // Make body tall enough to scroll
    const setHeight = () => {
      document.body.style.height = wrapper.scrollHeight + 'px'
    }
    setHeight()

    const resizeObserver = new ResizeObserver(setHeight)
    resizeObserver.observe(wrapper)

    const onScroll = () => {
      target = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      current += (target - current) * ease
      // Stop micro-jitter
      if (Math.abs(target - current) < 0.05) current = target
      wrapper.style.transform = `translateY(${-current}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()
      document.body.style.height = ''
      wrapper.style.transform = ''
    }
  }, [wrapperRef])
}
