'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const spotifyPlaylistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID || ''

  return (
    <footer className="bg-gradient-to-b from-white to-beige-100 py-12 px-4 border-t border-pink-100">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Sobre el evento */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-xl">
                👶
              </div>
              <span className="font-serif font-bold text-xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Revelación de Género
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Un momento especial para compartir con nuestros seres queridos
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#voting" className="hover:text-pink-500 transition-colors">
                  Apuestas
                </a>
              </li>
              <li>
                <a href="#event-info" className="hover:text-pink-500 transition-colors">
                  Información del Evento
                </a>
              </li>
              <li>
                <a href="#dedications" className="hover:text-pink-500 transition-colors">
                  Dedicatorias
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-pink-500 transition-colors">
                  Menú
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto y Spotify */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Música del Evento</h3>
            {spotifyPlaylistId && (
              <a
                href={`https://open.spotify.com/playlist/${spotifyPlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Ver Playlist
              </a>
            )}

            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Síguenos</h4>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors"
                >
                  <span className="text-xl">📷</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  <span className="text-xl">📘</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-pink-100 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Revelación de Género. Hecho con 💗 y 💙
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400">Desarrollado por</span>
            <a
              href="https://www.instagram.com/voz_eterea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-pink-500 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @voz_eterea
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
