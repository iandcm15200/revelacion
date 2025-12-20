'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function EventInfo() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Configuración del evento
  const eventDate = new Date('2024-12-24T18:00:00') // 24 de diciembre, 6:00 PM
  const eventLocation = 'Natura Pao Jimenez'
  const eventAddress = 'Loma de San Gabriel, San Juan, 54660 Coyotepec, Méx.'
  const eventMapUrl = 'https://maps.app.goo.gl/F5Yktdf2ifYy5WES7'

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <section id="event-info" className="py-20 px-4 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-beige-50 to-white pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Información del Evento
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            ¡Marca tu calendario para este día especial!
          </p>
        </motion.div>

        {/* Contador regresivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl mb-12 border border-pink-100"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
            ⏰ Cuenta Regresiva
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Días */}
            <div className="flex flex-col items-center">
              <motion.div
                key={timeLeft.days}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-6 w-full shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-white text-center">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="mt-3 text-gray-600 font-semibold text-sm md:text-base">Días</p>
            </div>

            {/* Horas */}
            <div className="flex flex-col items-center">
              <motion.div
                key={timeLeft.hours}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 w-full shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-white text-center">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="mt-3 text-gray-600 font-semibold text-sm md:text-base">Horas</p>
            </div>

            {/* Minutos */}
            <div className="flex flex-col items-center">
              <motion.div
                key={timeLeft.minutes}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-6 w-full shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-white text-center">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="mt-3 text-gray-600 font-semibold text-sm md:text-base">Minutos</p>
            </div>

            {/* Segundos */}
            <div className="flex flex-col items-center">
              <motion.div
                key={timeLeft.seconds}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 w-full shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-white text-center">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="mt-3 text-gray-600 font-semibold text-sm md:text-base">Segundos</p>
            </div>
          </div>
        </motion.div>

        {/* Información del evento y mapa */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Detalles del evento */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">📅 Detalles</h3>
            
            <div className="space-y-6">
              {/* Fecha */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
                  📆
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Fecha</p>
                  <p className="text-gray-600 capitalize">{formatDate(eventDate)}</p>
                </div>
              </div>

              {/* Hora */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
                  🕐
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Hora</p>
                  <p className="text-gray-600">{formatTime(eventDate)}</p>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Ubicación</p>
                  <p className="text-gray-600">{eventLocation}</p>
                  <p className="text-sm text-gray-500 mt-1">{eventAddress}</p>
                </div>
              </div>

              {/* Botón Google Maps */}
              <a
                href={eventMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <span>🗺️</span>
                <span>Abrir en Google Maps</span>
              </a>
            </div>
          </motion.div>

          {/* Mapa 3D animado */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">🗺️ Cómo Llegar</h3>
            
            {/* Contenedor del mapa 3D animado */}
            <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl overflow-hidden">
              {/* Aquí va el componente Map3D */}
              <Map3D />
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center">
              Haz clic en el botón de arriba para obtener direcciones precisas
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Componente de Mapa 3D simplificado
function Map3D() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Iframe de Google Maps embebido */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.234!2d-98.9784!3d19.5893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e7c7c7c7c7c7%3A0x7c7c7c7c7c7c7c7!2sNatura%20Pao%20Jimenez%2C%20Coyotepec!5e0!3m2!1ses!2smx!4v1734744000000!5m2!1ses!2smx"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
      />
    </div>
  )
}
