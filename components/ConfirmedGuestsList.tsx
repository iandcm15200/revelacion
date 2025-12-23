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
    guestsDB.subscribe(() => { loadGuests() })
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
    <section id="invitados" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-outlined">
            Invitados Confirmados
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
                className="bg-white/40 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100/50 hover:border-pink-200"
              >
                <p className="font-semibold text-gray-800 text-center">
                  {guest.name}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">?</div>
            <p className="text-gray-500 text-lg">
              Se el primero en confirmar tu asistencia
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

