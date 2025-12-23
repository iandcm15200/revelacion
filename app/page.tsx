'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useGuestStore } from '@/store/guestStore'
import WelcomeAnimation from '@/components/WelcomeAnimation'
import Navbar from '@/components/Navbar'
import MusicPlayer from '@/components/MusicPlayer'
import FloatingBearsBackground from '@/components/FloatingBears'
import VotingModule from '@/components/VotingModule'
import ContributionsSection from '@/components/ContributionsSection'
import EventInfo from '@/components/EventInfo'
import DedicationsModule from '@/components/DedicationsModule'
import MenuSection from '@/components/MenuSection'
import ConfirmedGuestsList from '@/components/ConfirmedGuestsList'
import Footer from '@/components/Footer'
import AnimatedIcons from '@/components/AnimatedIcons'
import ThemeManager from '@/components/ThemeManager'

export default function HomePage() {
  const router = useRouter()
  const guest = useGuestStore((state) => state.guest)
  const [showWelcome, setShowWelcome] = useState(false)
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
      {/* Manejador de temas */}
      <ThemeManager />
      
      {/* Animación de bienvenida */}
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}

      {/* Contenido principal */}
      {!showWelcome && (
        <>
          {/* Fondo con ositos flotantes y degradado */}
          <FloatingBearsBackground />
          
          <Navbar />
          <MusicPlayer />

          <main className="relative z-10">
            {/* Hero Section */}
            <section id="top" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

              {/* Contenido del Hero */}
              <div className="text-center relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-6xl font-bold mb-4 text-outlined"
                >
                  ¿Niña o Niño?
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-outlined mb-12"
                >
                  ¡Haz tu predicción!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <button
                    onClick={() => document.querySelector('#voting')?.scrollIntoView({ behavior: 'smooth' })}
                    className="shimmer-btn shimmer-btn--pink"
                  >
                    <span className="text">Hacer mi Predicción</span>
                    <span className="shimmer" />
                  </button>
                  <button
                    onClick={() => document.querySelector('#event-info')?.scrollIntoView({ behavior: 'smooth' })}
                    className="shimmer-btn shimmer-btn--pink"
                  >
                    <span className="text">Ver Detalles del Evento</span>
                    <span className="shimmer" />
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


