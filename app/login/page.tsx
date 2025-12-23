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
              <svg viewBox="0 0 280 320" className="w-48 h-56">
                {/* Fondo rosa pastel */}
                <circle cx="140" cy="160" r="135" fill="#FBE4F1" opacity="0.5"/>
                <circle cx="140" cy="160" r="120" fill="#F8D5E8" opacity="0.3"/>

                {/* Estrellitas decorativas flotantes */}
                <g className="heart-pulse">
                  <path d="M 30 50 L 32 56 L 38 57 L 33 61 L 34 67 L 30 64 L 26 67 L 27 61 L 22 57 L 28 56 Z" fill="#FFD700"/>
                  <path d="M 245 80 L 247 86 L 253 87 L 248 91 L 249 97 L 245 94 L 241 97 L 242 91 L 237 87 L 243 86 Z" fill="#FFD700"/>
                  <path d="M 250 240 L 252 246 L 258 247 L 253 251 L 254 257 L 250 254 L 246 257 L 247 251 L 242 247 L 248 246 Z" fill="#FFD700"/>
                  <path d="M 25 230 L 27 236 L 33 237 L 28 241 L 29 247 L 25 244 L 21 247 L 22 241 L 17 237 L 23 236 Z" fill="#FFD700"/>
                </g>

                {/* Osito estilo Winnie Pooh con colores pastel y pelaje beige */}
                <g className="bear-sway">
                  {/* Cuerpo beige */}
                  <ellipse cx="140" cy="210" rx="45" ry="55" fill="#E5C9A6"/>
                  <ellipse cx="140" cy="210" rx="38" ry="48" fill="#F5E6D3"/>
                  
                  {/* Panza m�s clara */}
                  <ellipse cx="140" cy="215" rx="28" ry="35" fill="#FFF9F0"/>
                  
                  {/* Cabeza principal beige */}
                  <circle cx="140" cy="130" r="50" fill="#E5C9A6"/>
                  <circle cx="140" cy="130" r="45" fill="#F5E6D3"/>
                  
                  {/* Orejas beige pastel */}
                  <g>
                    <circle cx="105" cy="95" r="22" fill="#E5C9A6"/>
                    <circle cx="105" cy="95" r="18" fill="#F5E6D3"/>
                    <circle cx="105" cy="95" r="14" fill="#FFE8D8"/>
                    
                    <circle cx="175" cy="95" r="22" fill="#E5C9A6"/>
                    <circle cx="175" cy="95" r="18" fill="#F5E6D3"/>
                    <circle cx="175" cy="95" r="14" fill="#FFE8D8"/>
                  </g>
                  
                  {/* Hocico beige claro */}
                  <ellipse cx="140" cy="145" rx="30" ry="25" fill="#FFE8D8"/>
                  <ellipse cx="140" cy="145" rx="25" ry="20" fill="#FFF5EB"/>
                  
                  {/* Nariz marr�n pastel */}
                  <ellipse cx="140" cy="142" rx="8" ry="6" fill="#8B7355"/>
                  <ellipse cx="137" cy="140" rx="3" ry="2" fill="#A89080" opacity="0.6"/>
                  
                  {/* Ojos grandes y tiernos */}
                  <g>
                    <circle cx="120" cy="125" r="8" fill="#4A3728"/>
                    <circle cx="122" cy="123" r="3" fill="#FFFFFF"/>
                    <circle cx="160" cy="125" r="8" fill="#4A3728"/>
                    <circle cx="162" cy="123" r="3" fill="#FFFFFF"/>
                  </g>
                  
                  {/* Cejas expresivas */}
                  <path d="M 110 115 Q 115 113 120 115" stroke="#8B7355" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M 160 115 Q 165 113 170 115" stroke="#8B7355" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="105" cy="135" r="8" fill="#FFB6D9" opacity="0.4"/>
                  <circle cx="175" cy="135" r="8" fill="#FFB6D9" opacity="0.4"/>
                  
                  {/* Boca sonriente */}
                  <path d="M 130 150 Q 140 156 150 150" stroke="#8B7355" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M 140 142 L 140 151" stroke="#8B7355" strokeWidth="2" strokeLinecap="round"/>
                  
                  {/* Brazos beige */}
                  <ellipse cx="100" cy="195" rx="18" ry="40" fill="#E5C9A6" transform="rotate(-25 100 195)"/>
                  <ellipse cx="100" cy="195" rx="14" ry="35" fill="#F5E6D3" transform="rotate(-25 100 195)"/>
                  
                  <ellipse cx="180" cy="195" rx="18" ry="40" fill="#E5C9A6" transform="rotate(25 180 195)"/>
                  <ellipse cx="180" cy="195" rx="14" ry="35" fill="#F5E6D3" transform="rotate(25 180 195)"/>
                  
                  {/* Patitas */}
                  <ellipse cx="120" cy="260" rx="20" ry="15" fill="#E5C9A6"/>
                  <ellipse cx="120" cy="260" rx="16" ry="12" fill="#F5E6D3"/>
                  <ellipse cx="160" cy="260" rx="20" ry="15" fill="#E5C9A6"/>
                  <ellipse cx="160" cy="260" rx="16" ry="12" fill="#F5E6D3"/>
                  
                  {/* Almohadillas de las patas rosadas */}
                  <ellipse cx="115" cy="262" rx="4" ry="3" fill="#FFB6D9" opacity="0.6"/>
                  <ellipse cx="125" cy="262" rx="4" ry="3" fill="#FFB6D9" opacity="0.6"/>
                  <ellipse cx="155" cy="262" rx="4" ry="3" fill="#FFB6D9" opacity="0.6"/>
                  <ellipse cx="165" cy="262" rx="4" ry="3" fill="#FFB6D9" opacity="0.6"/>
                  
                  {/* Mo�o rosa pastel en la cabeza */}
                  <g className="balloon-float">
                    <ellipse cx="125" cy="85" rx="12" ry="8" fill="#F9A8D4" transform="rotate(-30 125 85)"/>
                    <ellipse cx="155" cy="85" rx="12" ry="8" fill="#F9A8D4" transform="rotate(30 155 85)"/>
                    <circle cx="140" cy="82" r="6" fill="#FFC9E3"/>
                    <path d="M 136 82 L 140 78 L 144 82 L 142 86 L 138 86 Z" fill="#FFD700"/>
                  </g>
                </g>
                
                {/* Globitos flotantes alrededor */}
                <g className="balloon-float">
                  {/* Globo rosa */}
                  <ellipse cx="50" cy="140" rx="18" ry="22" fill="#F9A8D4"/>
                  <ellipse cx="48" cy="138" rx="8" ry="10" fill="#FFC9E3" opacity="0.6"/>
                  <path d="M 50 162 Q 48 172 46 180" stroke="#F9A8D4" strokeWidth="1.5" fill="none"/>
                  
                  {/* Globo azul */}
                  <ellipse cx="230" cy="170" rx="18" ry="22" fill="#93C5FD"/>
                  <ellipse cx="228" cy="168" rx="8" ry="10" fill="#C5E4FF" opacity="0.6"/>
                  <path d="M 230 192 Q 228 202 226 210" stroke="#93C5FD" strokeWidth="1.5" fill="none"/>
                  
                  {/* Globo beige */}
                  <ellipse cx="60" cy="240" rx="16" ry="20" fill="#FDE68A"/>
                  <ellipse cx="58" cy="238" rx="7" ry="9" fill="#FFF9E6" opacity="0.6"/>
                  <path d="M 60 260 Q 58 268 56 275" stroke="#FDE68A" strokeWidth="1.5" fill="none"/>
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
