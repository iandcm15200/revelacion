'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Intenta reproducir automáticamente después de la primera interacción
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        // El navegador bloquea autoplay, espera interacción del usuario
        console.log('Esperando interacción del usuario para reproducir música')
      }
    }

    // Intenta reproducir después de un pequeño delay
    const timer = setTimeout(playAudio, 500)

    // También intenta reproducir en la primera interacción
    const handleInteraction = () => {
      playAudio()
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/indigo-camilo.mp3"
        loop
        preload="auto"
      />
      
      {/* Botón de control flotante */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        
        {/* Indicador de música */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        )}
      </button>
    </>
  )
}
