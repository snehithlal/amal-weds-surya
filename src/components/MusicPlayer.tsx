import { useState, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggle = () => {
    if (!audioRef.current) {
      // Royalty-free ambient romantic instrumental audio
      const a = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-instrumental-113529.mp3')
      a.loop = true
      a.volume = 0.4
      audioRef.current = a
    }

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {
        // autoplay restriction
      })
      setPlaying(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        background: 'rgba(250,248,245,0.9)',
        color: '#3A4B3C',
        border: '1px solid rgba(212,175,55,0.5)',
        boxShadow: '0 4px 18px rgba(58,75,60,0.18)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? <Volume2 size={18} className="text-gold-deep animate-pulse" /> : <VolumeX size={18} className="opacity-60" />}
    </button>
  )
}
