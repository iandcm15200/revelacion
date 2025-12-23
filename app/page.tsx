'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useGuestStore } from '@/store/guestStore'
import WelcomeAnimation from '@/components/WelcomeAnimation'
import Navbar from '@/components/Navbar'
import MusicPlayer from '@/components/MusicPlayer'
import VotingModule from '@/components/VotingModule'
import ContributionsSection from '@/components/ContributionsSection'
import EventInfo from '@/components/EventInfo'
import DedicationsModule from '@/components/DedicationsModule'
import MenuSection from '@/components/MenuSection'
import ConfirmedGuestsList from '@/components/ConfirmedGuestsList'
import Footer from '@/components/Footer'
import AnimatedIcons from '@/components/AnimatedIcons'

export default function HomePage() {
  const router = useRouter()
  const guest = useGuestStore((state) => state.guest)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    if (!guest) {
      router.push('/login')
      return
    }

    setIsLoading(false)
  }, [guest, router])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Animación de bienvenida */}
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}

      {/* Contenido principal */}
      {!showWelcome && (
        <>
          <Navbar />
          <MusicPlayer />

          <main>
            {/* Hero Section */}
            <section id="top" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
              {/* Decoraciones de fondo */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-200 opacity-30 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-blue-200 opacity-30 blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{ duration: 12, repeat: Infinity }}
                />
              </div>

              {/* Contenido del Hero */}
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="inline-block mb-8"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center text-6xl shadow-2xl">
                    👶
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl font-bold font-serif mb-6"
                >
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    ¿Niña o Niño?
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-gray-700 mb-4"
                >
                  ¡Bienvenido, {guest?.name}!
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
                >
                  Únete a nosotros en este momento especial mientras descubrimos
                  si nuestro pequeño tesoro será una princesa 💗 o un príncipe 💙
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <button
                    onClick={() => document.querySelector('#voting')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Hacer mi Predicción 🎯
                  </button>
                  <button
                    onClick={() => document.querySelector('#event-info')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-pink-200"
                  >
                    Ver Detalles del Evento 📅
                  </button>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 10, 0] }}
                  transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                  className="mt-16"
                >
                  <p className="text-sm text-gray-500 mb-2">Desliza para explorar</p>
                  <svg
                    className="w-6 h-6 mx-auto text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </div>
            </section>

            {/* Secciones del contenido */}
            <VotingModule />

            {/* Iconos Animados */}
            <AnimatedIcons />
            <ConfirmedGuestsList />
            <ContributionsSection />
            <EventInfo />
            <DedicationsModule />
            <MenuSection />
          </main>

          <Footer />
        </>
      )}
    </>
  )
}
