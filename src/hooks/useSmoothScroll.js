import { useEffect, useRef } from 'react'

/**
 * Camera-movement scroll: lerps the page wrapper's translateY
 * so the viewport "drifts" into position like a camera dolly.
 */
export default function useSmoothScroll(wrapperRef) {
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Disable smooth scroll on touch devices — native scroll is better on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      // On mobile just make the wrapper static — no transform needed
      wrapper.style.position = 'relative'
      wrapper.style.transform = 'none'
      document.body.style.height = ''
      return
    }

    let current = 0
    let target  = 0
    let rafId   = null
    const ease  = 0.08

    const setHeight = () => {
      document.body.style.height = wrapper.scrollHeight + 'px'
    }
    setHeight()

    const resizeObserver = new ResizeObserver(setHeight)
    resizeObserver.observe(wrapper)

    const onScroll = () => { target = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      current += (target - current) * ease
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
