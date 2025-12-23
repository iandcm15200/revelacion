'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
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
        <svg viewBox="0 0 100 120" className="w-20 h-24 opacity-40">
          {/* Globo rosa */}
          <ellipse cx="30" cy="15" rx="12" ry="15" fill="#FFB6D9"/>
          <ellipse cx="30" cy="14" rx="8" ry="11" fill="#FFC9E3"/>
          <ellipse cx="28" cy="12" rx="4" ry="5" fill="#FFFFFF" opacity="0.6"/>
          <path d="M 30 30 Q 28 38 30 45" stroke="#E8A5C8" strokeWidth="0.8" fill="none"/>
          
          {/* Estrella */}
          <path d="M 15 8 L 16 11 L 19 11 L 17 13 L 18 16 L 15 14 L 12 16 L 13 13 L 11 11 L 14 11 Z" fill="#FFD700" opacity="0.7"/>
          
          {/* Osito */}
          <ellipse cx="35" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <ellipse cx="55" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <circle cx="45" cy="68" r="14" fill="#E5C9A6"/>
          <ellipse cx="45" cy="74" rx="8" ry="7" fill="#F5E6D3"/>
          <ellipse cx="45" cy="72" rx="3" ry="2.5" fill="#4A3728"/>
          <circle cx="40" cy="68" r="2" fill="#4A3728"/>
          <circle cx="50" cy="68" r="2" fill="#4A3728"/>
          <ellipse cx="45" cy="88" rx="12" ry="14" fill="#E5C9A6"/>
          <ellipse cx="38" cy="100" rx="6" ry="8" fill="#D4A574"/>
          <ellipse cx="52" cy="100" rx="6" ry="8" fill="#D4A574"/>
        </svg>
      </div>

      <div className="absolute top-20 right-20 bear-float">
        <svg viewBox="0 0 100 120" className="w-24 h-28 opacity-40">
          {/* Globos azules */}
          <ellipse cx="65" cy="12" rx="10" ry="13" fill="#A8D5FF"/>
          <ellipse cx="65" cy="11" rx="7" ry="9" fill="#C5E4FF"/>
          <ellipse cx="63" cy="10" rx="3" ry="4" fill="#FFFFFF" opacity="0.6"/>
          <path d="M 65 25 Q 63 33 65 40" stroke="#8CC4F0" strokeWidth="0.8" fill="none"/>
          
          <ellipse cx="80" cy="15" rx="12" ry="15" fill="#A8D5FF"/>
          <ellipse cx="80" cy="14" rx="8" ry="11" fill="#C5E4FF"/>
          <ellipse cx="78" cy="12" rx="4" ry="5" fill="#FFFFFF" opacity="0.6"/>
          <path d="M 80 30 Q 78 38 80 45" stroke="#8CC4F0" strokeWidth="0.8" fill="none"/>
          
          {/* Estrella */}
          <path d="M 88 8 L 89 11 L 92 11 L 90 13 L 91 16 L 88 14 L 85 16 L 86 13 L 84 11 L 87 11 Z" fill="#FFD700" opacity="0.7"/>
          
          {/* Osito */}
          <ellipse cx="35" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <ellipse cx="55" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <circle cx="45" cy="68" r="14" fill="#E5C9A6"/>
          <ellipse cx="45" cy="74" rx="8" ry="7" fill="#F5E6D3"/>
          <ellipse cx="45" cy="72" rx="3" ry="2.5" fill="#4A3728"/>
          <circle cx="40" cy="68" r="2" fill="#4A3728"/>
          <circle cx="50" cy="68" r="2" fill="#4A3728"/>
          <ellipse cx="45" cy="88" rx="12" ry="14" fill="#E5C9A6"/>
          <ellipse cx="38" cy="100" rx="6" ry="8" fill="#D4A574"/>
          <ellipse cx="52" cy="100" rx="6" ry="8" fill="#D4A574"/>
        </svg>
      </div>

      <div className="absolute bottom-20 left-20 bear-float">
        <svg viewBox="0 0 80 100" className="w-16 h-20 opacity-35">
          {/* Osito pequeño con estrella */}
          <path d="M 40 8 L 42 13 L 47 13 L 43 16 L 45 21 L 40 18 L 35 21 L 37 16 L 33 13 L 38 13 Z" fill="#FFD700" opacity="0.8"/>
          
          <ellipse cx="28" cy="45" rx="7" ry="8" fill="#D4A574"/>
          <ellipse cx="52" cy="45" rx="7" ry="8" fill="#D4A574"/>
          <circle cx="40" cy="52" r="12" fill="#E5C9A6"/>
          <ellipse cx="40" cy="57" rx="7" ry="6" fill="#F5E6D3"/>
          <ellipse cx="40" cy="55" rx="2.5" ry="2" fill="#4A3728"/>
          <circle cx="36" cy="52" r="1.5" fill="#4A3728"/>
          <circle cx="44" cy="52" r="1.5" fill="#4A3728"/>
          <ellipse cx="40" cy="70" rx="10" ry="12" fill="#E5C9A6"/>
          <ellipse cx="34" cy="82" rx="5" ry="7" fill="#D4A574"/>
          <ellipse cx="46" cy="82" rx="5" ry="7" fill="#D4A574"/>
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
              <svg viewBox="0 0 220 240" className="w-36 h-44">
                {/* Fondo rosa circular */}
                <circle cx="110" cy="120" r="105" fill="#F8D5E8" opacity="0.6"/>
                <circle cx="110" cy="120" r="95" fill="#FBE4F1" opacity="0.8"/>
                
                {/* Nubes decorativas */}
                <g opacity="0.9">
                  <ellipse cx="40" cy="40" rx="18" ry="12" fill="#FFFFFF"/>
                  <ellipse cx="50" cy="38" rx="15" ry="10" fill="#FFFFFF"/>
                  <ellipse cx="30" cy="38" rx="12" ry="8" fill="#FFFFFF"/>
                  
                  <ellipse cx="180" cy="200" rx="18" ry="12" fill="#FFFFFF"/>
                  <ellipse cx="170" cy="198" rx="15" ry="10" fill="#FFFFFF"/>
                  <ellipse cx="190" cy="198" rx="12" ry="8" fill="#FFFFFF"/>
                </g>

                {/* Banderines */}
                <g className="heart-pulse">
                  <path d="M 40 60 L 180 100" stroke="#4A3728" strokeWidth="1.5" fill="none"/>
                  
                  {/* Banderines rosa */}
                  <path d="M 55 65 L 55 75 L 65 70 Z" fill="#F9A8D4"/>
                  <path d="M 85 75 L 85 85 L 95 80 Z" fill="#FFC9E3"/>
                  <path d="M 145 90 L 145 100 L 155 95 Z" fill="#F9A8D4"/>
                  
                  {/* Banderines azules */}
                  <path d="M 70 70 L 70 80 L 80 75 Z" fill="#93C5FD"/>
                  <path d="M 115 83 L 115 93 L 125 88 Z" fill="#A8D5FF"/>
                  <path d="M 165 95 L 165 105 L 175 100 Z" fill="#60A5FA"/>
                </g>

                {/* Estrellas doradas brillantes */}
                <g className="heart-pulse">
                  <path d="M 50 180 L 53 188 L 61 190 L 54 196 L 56 204 L 50 200 L 44 204 L 46 196 L 39 190 L 47 188 Z" fill="#FFD700"/>
                  <ellipse cx="50" cy="192" rx="4" ry="4" fill="#FFF9E6" opacity="0.8"/>
                  
                  <path d="M 170 70 L 173 78 L 181 80 L 174 86 L 176 94 L 170 90 L 164 94 L 166 86 L 159 80 L 167 78 Z" fill="#FFD700"/>
                  <ellipse cx="170" cy="82" rx="4" ry="4" fill="#FFF9E6" opacity="0.8"/>
                  
                  <path d="M 190 155 L 192 160 L 197 161 L 193 165 L 194 170 L 190 167 L 186 170 L 187 165 L 183 161 L 188 160 Z" fill="#FFD700"/>
                  <ellipse cx="190" cy="163" rx="3" ry="3" fill="#FFF9E6" opacity="0.8"/>
                  
                  <path d="M 75 30 L 77 35 L 82 36 L 78 40 L 79 45 L 75 42 L 71 45 L 72 40 L 68 36 L 73 35 Z" fill="#FFD700"/>
                  <ellipse cx="75" cy="38" rx="3" ry="3" fill="#FFF9E6" opacity="0.8"/>
                </g>

                {/* Bolsa/Pañuelo de regalo celeste */}
                <g className="balloon-float">
                  {/* Nudo superior */}
                  <ellipse cx="90" cy="100" rx="8" ry="12" fill="#A8D5FF" transform="rotate(-30 90 100)"/>
                  <ellipse cx="130" cy="100" rx="8" ry="12" fill="#A8D5FF" transform="rotate(30 130 100)"/>
                  <ellipse cx="110" cy="95" rx="12" ry="8" fill="#B8E1FF"/>
                  
                  {/* Bolsa principal */}
                  <path d="M 75 110 Q 70 140 75 170 Q 80 195 110 200 Q 140 195 145 170 Q 150 140 145 110 Z" fill="#A8D5FF"/>
                  <path d="M 78 112 Q 73 140 78 168 Q 82 190 110 195 Q 138 190 142 168 Q 147 140 142 112 Z" fill="#C5E4FF"/>
                  <path d="M 85 120 Q 82 145 85 165 Q 88 180 110 185 Q 132 180 135 165 Q 138 145 135 120 Z" fill="#D5ECFF"/>
                  
                  {/* Brillos en la bolsa */}
                  <ellipse cx="95" cy="135" rx="15" ry="25" fill="#E8F4FF" opacity="0.6"/>
                  <ellipse cx="92" cy="130" rx="8" ry="15" fill="#FFFFFF" opacity="0.5"/>
                </g>

                {/* Osito azul bebé dentro de la bolsa */}
                <g className="bear-sway">
                  {/* Orejas */}
                  <circle cx="95" cy="135" r="9" fill="#6BA5D6"/>
                  <circle cx="95" cy="135" r="6" fill="#93C5FD"/>
                  <circle cx="125" cy="135" r="9" fill="#6BA5D6"/>
                  <circle cx="125" cy="135" r="6" fill="#93C5FD"/>
                  
                  {/* Cabeza */}
                  <circle cx="110" cy="145" r="22" fill="#6BA5D6"/>
                  <circle cx="110" cy="145" r="18" fill="#93C5FD"/>
                  
                  {/* Hocico */}
                  <ellipse cx="110" cy="152" rx="13" ry="11" fill="#E8F4FF"/>
                  <ellipse cx="110" cy="152" rx="10" ry="8" fill="#FFFFFF"/>
                  
                  {/* Nariz */}
                  <ellipse cx="110" cy="150" rx="4" ry="3" fill="#4A3728"/>
                  <ellipse cx="108.5" cy="149" rx="1.5" ry="1" fill="#7A6D68" opacity="0.6"/>
                  
                  {/* Ojos cerrados (dormido/feliz) */}
                  <path d="M 100 144 Q 103 146 106 144" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M 114 144 Q 117 146 120 144" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="95" cy="150" r="4" fill="#FFB6D9" opacity="0.5"/>
                  <circle cx="125" cy="150" r="4" fill="#FFB6D9" opacity="0.5"/>
                  
                  {/* Boca sonriente */}
                  <path d="M 104 156 Q 110 160 116 156" stroke="#4A3728" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Moño/Corona rosa en la cabeza */}
                  <path d="M 100 130 Q 98 128 96 130 Q 98 132 100 131 Q 102 132 104 131 Q 106 132 108 131 Q 110 132 112 131 Q 114 132 116 130 Q 114 128 112 129 Q 110 128 108 129 Q 106 128 104 129 Q 102 128 100 130 Z" fill="#F9A8D4"/>
                  <ellipse cx="108" cy="129.5" rx="5" ry="3" fill="#FFC9E3"/>
                  
                  {/* Estrellita en el moño */}
                  <path d="M 108 126 L 109 128 L 111 128 L 109.5 129.5 L 110 131.5 L 108 130 L 106 131.5 L 106.5 129.5 L 105 128 L 107 128 Z" fill="#FFD700"/>
                </g>
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
