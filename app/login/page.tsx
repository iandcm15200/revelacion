'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { animate, stagger } from 'animejs'
import { useGuestStore } from '@/store/guestStore'
import { guestsDB } from '@/lib/supabase'

type FormData = {
  name: string
}

export default function LoginPage() {
  const router = useRouter()
  const guest = useGuestStore((state) => state.guest)
  const setGuest = useGuestStore((state) => state.setGuest)
  const clearGuest = useGuestStore((state) => state.clearGuest)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Si ya está registrado, mostrar botón de continuar
  const isAlreadyRegistered = !!guest

  // Animaciones de iconos
  useEffect(() => {
    // Animación de ositos flotando
    animate({
      targets: '.bear-float',
      translateY: [0, -15, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      loop: true,
      delay: stagger(300)
    })

    // Animación de globos
    animate({
      targets: '.balloon-float',
      translateY: [0, -20, 0],
      easing: 'easeInOutSine',
      duration: 2500,
      loop: true,
      delay: stagger(200)
    })

    // Animación de corazones
    animate({
      targets: '.heart-pulse',
      scale: [1, 1.15, 1],
      easing: 'easeInOutQuad',
      duration: 1500,
      loop: true,
      delay: stagger(400)
    })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleContinue = () => {
    router.push('/')
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError('')

    try {
      // Registrar invitado en localStorage
      const { data: guestData, error: dbError } = await guestsDB.insert({
        name: data.name,
      })

      if (dbError) throw dbError

      // Guardar en store
      setGuest({
        id: guestData!.id,
        name: data.name,
      })

      // Redirigir a la página principal
      router.push('/')
    } catch (err: any) {
      console.error('Error registrando invitado:', err)
      setError('Hubo un error al registrarte. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Iconos decorativos animados - Ositos */}
      <div className="absolute top-10 left-10 bear-float">
        <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-30">
          <circle cx="35" cy="35" r="10" fill="#F9A8D4"/>
          <circle cx="65" cy="35" r="10" fill="#F9A8D4"/>
          <circle cx="50" cy="45" r="18" fill="#FCA5CC"/>
          <circle cx="43" cy="43" r="2" fill="#4A3728"/>
          <circle cx="57" cy="43" r="2" fill="#4A3728"/>
          <ellipse cx="50" cy="50" rx="3" ry="2" fill="#D4A574"/>
        </svg>
      </div>

      <div className="absolute top-20 right-20 bear-float">
        <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-30">
          <circle cx="35" cy="35" r="10" fill="#93C5FD"/>
          <circle cx="65" cy="35" r="10" fill="#93C5FD"/>
          <circle cx="50" cy="45" r="18" fill="#60A5FA"/>
          <circle cx="43" cy="43" r="2" fill="#4A3728"/>
          <circle cx="57" cy="43" r="2" fill="#4A3728"/>
          <ellipse cx="50" cy="50" rx="3" ry="2" fill="#D4A574"/>
        </svg>
      </div>

      <div className="absolute bottom-20 left-20 bear-float">
        <svg viewBox="0 0 100 100" className="w-14 h-14 opacity-30">
          <circle cx="35" cy="35" r="10" fill="#E5C9A6"/>
          <circle cx="65" cy="35" r="10" fill="#E5C9A6"/>
          <circle cx="50" cy="45" r="18" fill="#D4A574"/>
          <circle cx="43" cy="43" r="2" fill="#4A3728"/>
          <circle cx="57" cy="43" r="2" fill="#4A3728"/>
          <ellipse cx="50" cy="50" rx="3" ry="2" fill="#C9A26D"/>
        </svg>
      </div>

      {/* Globos */}
      <div className="absolute top-32 left-1/4 balloon-float">
        <svg viewBox="0 0 50 70" className="w-12 h-16 opacity-40">
          <ellipse cx="25" cy="25" rx="15" ry="20" fill="#EC4899"/>
          <path d="M 25 45 Q 23 55 25 60" stroke="#EC4899" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      <div className="absolute bottom-32 right-1/4 balloon-float">
        <svg viewBox="0 0 50 70" className="w-12 h-16 opacity-40">
          <ellipse cx="25" cy="25" rx="15" ry="20" fill="#3B82F6"/>
          <path d="M 25 45 Q 27 55 25 60" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Corazones */}
      <div className="absolute top-1/3 left-12 heart-pulse">
        <svg viewBox="0 0 50 50" className="w-10 h-10 opacity-30">
          <path d="M25 40 C 15 32, 10 27, 10 22 C 10 15, 18 12, 22 18 C 23 20, 25 22, 25 22 C 25 22, 27 20, 28 18 C 32 12, 40 15, 40 22 C 40 27, 35 32, 25 40 Z" fill="#F472B6"/>
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-12 heart-pulse">
        <svg viewBox="0 0 50 50" className="w-8 h-8 opacity-30">
          <path d="M25 40 C 15 32, 10 27, 10 22 C 10 15, 18 12, 22 18 C 23 20, 25 22, 25 22 C 25 22, 27 20, 28 18 C 32 12, 40 15, 40 22 C 40 27, 35 32, 25 40 Z" fill="#60A5FA"/>
        </svg>
      </div>

      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200 opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-200 opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-pink-100">
          {/* Header con osito grande */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                {/* Osito central */}
                <circle cx="30" cy="30" r="12" fill="#F9A8D4"/>
                <circle cx="70" cy="30" r="12" fill="#93C5FD"/>
                <circle cx="50" cy="45" r="22" fill="#FDE68A"/>
                <circle cx="42" cy="43" r="3" fill="#4A3728"/>
                <circle cx="58" cy="43" r="3" fill="#4A3728"/>
                <ellipse cx="50" cy="52" rx="4" ry="3" fill="#D4A574"/>
                <path d="M 43 56 Q 50 60 57 56" stroke="#D4A574" strokeWidth="2" fill="none"/>
                {/* Cuerpo */}
                <ellipse cx="50" cy="75" rx="18" ry="14" fill="#FDE68A"/>
                <circle cx="40" cy="86" r="7" fill="#D4A574"/>
                <circle cx="60" cy="86" r="7" fill="#D4A574"/>
              </svg>
            </motion.div>
            
            <h1 className="text-4xl font-bold font-serif mb-2">
              <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                {isAlreadyRegistered ? `¡Hola ${guest.name}!` : '¿Niña o Niño?'}
              </span>
            </h1>
            <p className="text-gray-600">
              {isAlreadyRegistered
                ? 'Continúa a la celebración'
                : 'Escribe tu nombre para descubrirlo'}
            </p>
          </div>

          {/* Si ya está registrado */}
          {isAlreadyRegistered ? (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-pink-50 to-blue-50 border-2 border-pink-200 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {guest.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{guest.name}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
                      <span>✓</span> Listo para la fiesta
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Siguiente 🎉
              </motion.button>

              <button
                onClick={() => {
                  if (confirm('¿Cambiar de invitado?')) {
                    clearGuest()
                  }
                }}
                className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                Registrar otro nombre
              </button>
            </div>
          ) : (
            /* Formulario simplificado - solo nombre */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>👤</span>
                  Tu nombre
                </label>
                <input
                  id="name"
                  type="text"
                  autoFocus
                  {...register('name', {
                    required: 'Por favor escribe tu nombre',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres',
                    },
                  })}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                  placeholder="Ej: María García"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 font-medium"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  '¡Descubrir! 🎀💙'
                )}
              </motion.button>
            </form>
          )}

          {/* Footer con decoración */}
          <div className="mt-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-2xl">🎈</span>
              <span className="text-2xl">🍼</span>
              <span className="text-2xl">👶</span>
              <span className="text-2xl">🎁</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Un momento muy especial 💗💙
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
