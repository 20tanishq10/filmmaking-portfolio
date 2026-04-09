import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setIsLight(document.body.classList.contains('light-mode'))

    // Watch for overlay-open class on body
    const observer = new MutationObserver(() => {
      setHidden(document.body.classList.contains('overlay-open'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const nextMode = !isLight
    setIsLight(nextMode)
    document.body.classList.toggle('light-mode', nextMode)
  }

  if (hidden) return null

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-[9999] px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-500 border rounded-full backdrop-blur-md
        ${isLight 
          ? 'bg-white/50 border-black/10 text-black hover:bg-white inset-shadow' 
          : 'bg-black/50 border-white/10 text-film-cream hover:bg-black shadow-[0_0_15px_rgba(201,168,76,0.1)]'
        }
      `}
      aria-label="Toggle DAY/NIGHT Mode"
    >
      {isLight ? '[ NIGHT ]' : '[ DAY ]'}
    </button>
  )
}
