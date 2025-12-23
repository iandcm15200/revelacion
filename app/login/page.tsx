'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useGuestStore } from '@/store/guestStore'
import { motion } from 'framer-motion'
import { guestsDB } from '@/lib/supabase'
import FloatingBearsBackground from '@/components/FloatingBears'

export default function LoginPage() {
  const router = useRouter()
  const setGuest = useGuestStore((state) => state.setGuest)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre')
      return
    }

    setLoading(true)
    setError('')

    try {
      const guestData = {
        id: crypto.randomUUID(),
        name: name.trim(),
        confirmed: false,
        plus_ones: 0,
        created_at: new Date().toISOString()
      }

      await guestsDB.insert(guestData)
      setGuest(guestData)
      router.push('/portada')
    } catch (err) {
      console.error('Error en login:', err)
      setError('Hubo un error al procesar tu solicitud')
    } finally {
      setLoading(false)
    }
  }

  const guest = useGuestStore((state) => state.guest)
  
  if (guest) {
    return (
      <div className="min-h-screen flex items-end justify-center relative overflow-hidden pb-48 md:pb-64 lg:pb-72">
        <FloatingBearsBackground />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="backdrop-blur-sm rounded-2xl border border-white/20 bg-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Hola, {guest.name}!</h2>
            <p className="text-gray-700 mb-4 text-sm">Ya estás registrado</p>
            <button onClick={() => router.push('/portada')} className="shimmer-btn shimmer-btn--pink">
              <span className="text">Continuar</span>
              <span className="shimmer" />
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBearsBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-4 relative z-10"
        style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="backdrop-blur-md rounded-2xl border border-white/20 bg-white/10 px-5 py-5">
          <div className="text-center mb-3">
            <h1 className="text-xl font-semibold text-gray-800">Bienvenido</h1>
            <p className="text-xs text-gray-700">Ingresa tu nombre para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 placeholder-gray-500 text-sm"
                disabled={loading}
              />
              {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
            </div>

            <button type="submit" disabled={loading} className="shimmer-btn shimmer-btn--pink w-full justify-center">
              <span className="text">{loading ? 'Ingresando…' : 'Entrar a la Fiesta'}</span>
              <span className="shimmer" />
            </button>
          </form>

          <p className="text-[11px] text-center text-gray-700 mt-3">Haz clic en cualquier lugar para crear ositos voladores</p>
        </div>
      </motion.div>
    </div>
  )
}





