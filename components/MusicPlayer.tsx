'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Playlist de Spotify embed
  const spotifyPlaylistUrl = 'https://open.spotify.com/embed/playlist/1jcVNKro8z5Q1qWRCZzQr4?utm_source=generator'

  return (
    <>
      {/* Botón flotante de música */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden group"
          style={{
            background: '#f9a8d4',
            boxShadow: '0 0 20px rgba(249, 168, 212, 0.5)',
          }}
        >
          {/* Logo de Spotify estilo rosa con corazón */}
          <svg
            className="w-10 h-10 relative z-10"
            viewBox="0 0 24 28"
            fill="none"
          >
            {/* Líneas curvas estilo Spotify */}
            <path
              d="M6 8C9.5 6.5 14.5 6.5 18 8.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}
            />
            <path
              d="M7 11.5C9.8 10.3 14.2 10.3 17 11.8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}
            />
            <path
              d="M8 15C10.2 14 13.8 14 16 15.2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}
            />
            {/* Corazón pequeño más separado */}
            <path
              d="M12 25C11 24 9.5 23 9.5 21.7C9.5 20.5 10.5 20 11.3 20.5C11.7 20.8 12 21.3 12 21.3C12 21.3 12.3 20.8 12.7 20.5C13.5 20 14.5 20.5 14.5 21.7C14.5 23 13 24 12 25Z"
              fill="white"
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' }}
            />
          </svg>

          {/* Onda decorativa */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.button>

        {/* Panel expandido con Spotify */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-20 right-0 w-80 bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border-2 border-pink-100/50"
            >
              {/* Header */}
              <div className="p-4 bg-pink-400">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">Nuestra Playlist</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-white/80 hover:text-white transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 text-sm">Música especial para este momento</p>
              </div>

              {/* Spotify Embed */}
              <div className="p-4">
                <iframe
                  src={spotifyPlaylistUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </div>

              {/* Footer */}
              <div className="px-4 pb-4 pt-2 text-center">
                <p className="text-xs text-gray-500">
                  Agrega las canciones que deseas escuchar en el evento 💗💙
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
