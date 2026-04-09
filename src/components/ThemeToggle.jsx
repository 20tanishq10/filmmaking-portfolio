import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    // Check initial body class
    setIsLight(document.body.classList.contains('light-mode'))
  }, [])

  const toggleTheme = () => {
    const nextMode = !isLight
    setIsLight(nextMode)
    
    if (nextMode) {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }

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
