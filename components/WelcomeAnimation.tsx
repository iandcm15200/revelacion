'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type WelcomeAnimationProps = {
  onComplete: () => void
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [phase, setPhase] = useState<'curtain' | 'reveal' | 'message'>('curtain')

  useEffect(() => {
    // Abrir cortina después de 500ms
    const curtainTimer = setTimeout(() => {
      setPhase('reveal')
    }, 500)

    // Mostrar mensaje después de la revelación
    const messageTimer = setTimeout(() => {
      setPhase('message')
    }, 2500)

    // Completar la animación
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 5500)

    return () => {
      clearTimeout(curtainTimer)
      clearTimeout(messageTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 overflow-hidden">
      {/* Confetti de fondo */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#3b82f6' : '#f59e0b',
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* Fase 1: Cortinas cerradas */}
          {phase === 'curtain' && (
            <motion.div
              key="curtain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-[80vh] max-h-[600px]"
            >
              {/* Cortina izquierda */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-pink-600 to-pink-500 shadow-2xl z-20"
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-pink-400/20 to-transparent"></div>
              </motion.div>

              {/* Cortina derecha */}
              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600 to-blue-500 shadow-2xl z-20"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
              </motion.div>

              {/* Texto sobre cortinas */}
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                >
                  <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
                    🎭
                  </h1>
                  <p className="text-2xl md:text-3xl font-semibold text-white drop-shadow-lg">
                    Preparando la sorpresa...
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Fase 2: Revelación */}
          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative"
            >
              {/* Cortinas abriéndose */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-pink-600 to-pink-500 shadow-2xl z-20"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-pink-400/20 to-transparent"></div>
              </motion.div>

              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600 to-blue-500 shadow-2xl z-20"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
              </motion.div>

              {/* Revelación del bebé */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex items-center justify-center h-screen"
              >
                <div className="text-center">
                  <motion.div
                    className="text-9xl mb-6"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: 1 }}
                  >
                    👶✨
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-5xl md:text-6xl font-bold font-serif bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    ¡Un Bebé Viene en Camino!
                  </motion.h1>

                  {/* Confetti */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? '#ec4899' : '#3b82f6',
                      }}
                      animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Fase 3: Mensaje final */}
          {phase === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.div
                className="text-9xl mb-6"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🎊
              </motion.div>
              
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300">
                <motion.h2
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent"
                >
                  ¡Gracias por venir a mi revelación!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl text-purple-600 font-semibold mb-4"
                >
                  🎄 ¡Y feliz Navidad! 🎅
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-3 justify-center mt-6"
                >
                  {['❤️', '💙', '💚', '💛', '💜'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-3xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botón Saltar */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-700 font-semibold border-2 border-pink-200"
      >
        Saltar ⏭️
      </motion.button>
    </div>
  )
}
