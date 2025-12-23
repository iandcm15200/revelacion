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
          className="relative w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white overflow-hidden group"
        >
          {/* Icono de música */}
          <svg
            className="w-8 h-8 relative z-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>

          {/* Onda decorativa */}
          <motion.div
            className="absolute inset-0 bg-white/20"
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
              className="absolute bottom-20 right-0 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border-2 border-pink-100"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-pink-500 to-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">🎵 Nuestra Playlist</h3>
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
                  Disfruta de nuestra selección musical 💗💙
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
