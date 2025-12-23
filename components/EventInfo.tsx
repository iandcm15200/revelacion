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
  const eventDate = new Date('2025-12-24T18:00:00') // 24 de diciembre de 2025, 6:00 PM
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
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-outlined">
            Información del Evento
          </h2>
          <p className="text-gray-600 text-lg">
            ¡Marca tu calendario para este día especial!
          </p>
        </motion.div>

        {/* Contador regresivo estilo Flip Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-outlined">
            Cuenta Regresiva
          </h3>

          <div className="flip-clock">
            {/* Días */}
            <div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-number">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <p className="flip-label">Días</p>
            </div>

            {/* Horas */}
            <div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-number">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <p className="flip-label">Horas</p>
            </div>

            {/* Minutos */}
            <div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-number">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <p className="flip-label">Minutos</p>
            </div>

            {/* Segundos */}
            <div>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-number">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <p className="flip-label">Segundos</p>
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
            className="rounded-3xl p-8 border border-pink-300/40"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Detalles</h3>
            
            <div className="space-y-5">
              {/* Fecha */}
              <div>
                <p className="font-semibold text-gray-800 mb-1">Fecha</p>
                <p className="text-gray-600 capitalize">{formatDate(eventDate)}</p>
              </div>

              {/* Hora */}
              <div>
                <p className="font-semibold text-gray-800 mb-1">Hora</p>
                <p className="text-gray-600">{formatTime(eventDate)}</p>
              </div>

              {/* Ubicación */}
              <div>
                <p className="font-semibold text-gray-800 mb-1">Ubicación</p>
                <p className="text-gray-600">{eventLocation}</p>
                <p className="text-sm text-gray-500 mt-1">{eventAddress}</p>
              </div>

              {/* Botón Google Maps */}
              <a
                href={eventMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn shimmer-btn--pink inline-flex items-center gap-2 mt-4"
              >
                <span className="text">Abrir en Google Maps</span>
                <span className="shimmer" />
              </a>
            </div>
          </motion.div>

          {/* Mapa 3D animado */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 border border-pink-300/40"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Como Llegar</h3>
            
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
