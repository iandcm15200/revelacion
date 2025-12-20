'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { guestsDB } from '@/lib/supabase'

type Guest = {
  id: string
  name: string
  created_at?: string
}

export default function ConfirmedGuestsList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGuests()

    // Suscribirse a cambios en tiempo real
    const subscription = guestsDB.subscribe(() => {
      loadGuests()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadGuests = async () => {
    try {
      const { data, error } = await guestsDB.getAll()
      
      if (error) throw error

      // Ordenar por fecha de creación (más recientes primero)
      const sortedGuests = (data || []).sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime()
        const dateB = new Date(b.created_at || 0).getTime()
        return dateB - dateA
      })

      setGuests(sortedGuests)
    } catch (error) {
      console.error('Error cargando invitados:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="invitados" className="py-20 px-4 bg-gradient-to-br from-beige-50 via-white to-pink-50">
      <div className="container mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Invitados Confirmados
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            {guests.length > 0
              ? `${guests.length} ${guests.length === 1 ? 'persona confirmada' : 'personas confirmadas'}`
              : 'Aún no hay invitados confirmados'}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
          </div>
        ) : guests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {guests.map((guest, index) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-pink-200"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar circular con inicial */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
                    {guest.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Nombre */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {guest.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ✓ Confirmado
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <span className="text-6xl mb-4 block">👥</span>
            <p className="text-gray-500 text-lg">
              Sé el primero en confirmar tu asistencia
            </p>
          </motion.div>
        )}

        {/* Estadísticas adicionales */}
        {guests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border-2 border-pink-200">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🎉</span>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-pink-600">{guests.length}</p>
                    <p className="text-sm text-gray-600">Confirmados</p>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <span className="text-3xl">💝</span>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-blue-600">¡Gracias!</p>
                    <p className="text-sm text-gray-600">Por acompañarnos</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
