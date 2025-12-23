'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useGuestStore } from '@/store/guestStore'
import { dedicationsDB, guestsDB } from '@/lib/supabase'

type DedicationForm = {
  message: string
}

export default function DedicationsModule() {
  const guest = useGuestStore((state) => state.guest)
  const [dedications, setDedications] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DedicationForm>()

  useEffect(() => {
    loadDedications()

    // Suscribirse a cambios en tiempo real
    dedicationsDB.subscribe(() => { loadDedications() })
  }, [])

  const onSubmit = async (data: DedicationForm) => {
    if (!guest) return

    setIsSubmitting(true)

    try {
      const { error } = await dedicationsDB.insert({
        guest_id: guest.id,
        guest_name: guest.name,
        message: data.message,
        approved: true,
      })

      if (error) throw error

      setShowSuccess(true)
      reset()
      setTimeout(() => setShowSuccess(false), 3000)
      loadDedications()
    } catch (error) {
      console.error('Error enviando dedicatoria:', error)
      alert('Hubo un error al enviar tu dedicatoria')
    } finally {
      setIsSubmitting(false)
    }
  }

  const loadDedications = async () => {
    try {
      const { data: dedicationsData, error } = await dedicationsDB.getAll()
      if (error) throw error

      // Obtener nombres de invitados
      const { data: guestsData } = await guestsDB.getAll()
      const guestsMap = new Map((guestsData as any[])?.map((g: any) => [g.id, g.name]))

      const dedicationsWithGuests = (dedicationsData as any[])?.map((d: any) => ({
        ...d,
        guests: { name: guestsMap.get(d.guest_id) || d.guest_name || 'Anónimo' }
      })) || []

      setDedications(dedicationsWithGuests)
    } catch (error) {
      console.error('Error cargando dedicatorias:', error)
    }
  }

  return (
    <section id="dedications" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-outlined">
            Dedicatorias para el Bebe
          </h2>
          <p className="text-gray-600 text-lg">
            Deja tus mejores deseos y mensajes de amor
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              Escribe tu Dedicatoria
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu mensaje para el bebé
                </label>
                <textarea
                  {...register('message', {
                    required: 'El mensaje es requerido',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                    maxLength: { value: 500, message: 'Máximo 500 caracteres' },
                  })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none resize-none"
                  placeholder="Escribe tus mejores deseos para el bebé..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center"
                >
                  ✓ ¡Dedicatoria enviada con éxito!
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-btn shimmer-btn--pink w-full"
              >
                <span className="text">{isSubmitting ? 'Enviando...' : 'Enviar Dedicatoria'}</span>
                <span className="shimmer" />
              </button>
            </form>
          </motion.div>

          {/* Muro de dedicatorias */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-xl max-h-[600px] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Muro de Dedicatorias</h3>

            <div className="space-y-4">
              {dedications.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Sé el primero en dejar una dedicatoria
                </p>
              ) : (
                dedications.map((dedication, index) => (
                  <motion.div
                    key={dedication.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-4 border border-pink-100"
                  >
                    <p className="text-gray-700 mb-2">{dedication.message}</p>
                    <p className="text-sm text-gray-500">
                      — {dedication.guests?.name || 'Anónimo'}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

