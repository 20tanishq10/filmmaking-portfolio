import { useEffect, useRef, useState } from 'react'

/**
 * Generates ambient sound via Web Audio API — no external file needed.
 * Layered brown noise + subtle low-frequency drone = film projector room feel.
 */
function createAmbientAudio() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()

  // Brown noise via filtered white noise
  const bufferSize = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let lastOut = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    data[i] = (lastOut + 0.02 * white) / 1.02
    lastOut = data[i]
    data[i] *= 3.5
  }

  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = buffer
  noiseSource.loop = true

  // Low-pass filter for warmth
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 400

  // Subtle drone oscillator
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = 48
  const oscGain = ctx.createGain()
  oscGain.gain.value = 0.04

  // Master gain
  const masterGain = ctx.createGain()
  masterGain.gain.value = 0

  noiseSource.connect(filter)
  filter.connect(masterGain)
  osc.connect(oscGain)
  oscGain.connect(masterGain)
  masterGain.connect(ctx.destination)

  noiseSource.start()
  osc.start()

  return {
    ctx,
    masterGain,
    fadeIn() {
      masterGain.gain.cancelScheduledValues(ctx.currentTime)
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5)
    },
    fadeOut() {
      masterGain.gain.cancelScheduledValues(ctx.currentTime)
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
    },
    destroy() {
      noiseSource.stop()
      osc.stop()
      ctx.close()
    },
  }
}

export default function AmbientToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = createAmbientAudio()
    }
    if (!playing) {
      // Resume context if suspended (browser autoplay policy)
      if (audioRef.current.ctx.state === 'suspended') {
        audioRef.current.ctx.resume()
      }
      audioRef.current.fadeIn()
      setPlaying(true)
    } else {
      audioRef.current.fadeOut()
      setPlaying(false)
    }
  }

  useEffect(() => {
    return () => audioRef.current?.destroy()
  }, [])

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Mute ambient sound' : 'Play ambient sound'}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9997] flex items-center gap-2 px-3 py-2 border border-white/10 bg-film-black/80 backdrop-blur-sm hover:border-film-gold/40 transition-colors duration-300 group"
    >
      {/* Waveform icon */}
      <span className="flex items-end gap-[3px] h-4">
        {[3, 6, 4, 7, 3, 5, 2].map((h, i) => (
          <span
            key={i}
            className="w-[2px] bg-film-gold/60 group-hover:bg-film-gold transition-colors duration-300"
            style={{
              height: playing ? `${h * 2}px` : '3px',
              transition: `height ${0.2 + i * 0.05}s ease`,
              animation: playing ? `barPulse ${0.6 + i * 0.1}s ease-in-out infinite alternate` : 'none',
            }}
          />
        ))}
      </span>
      <span className="font-mono text-film-muted text-[10px] tracking-widest uppercase group-hover:text-film-cream transition-colors duration-300">
        {playing ? 'Ambient' : 'Sound'}
      </span>
    </button>
  )
}
