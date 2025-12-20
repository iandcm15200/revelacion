'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGuestStore } from '@/store/guestStore'
import { useVotingStore } from '@/store/votingStore'
import { votesDB } from '@/lib/supabase'

export default function VotingModule() {
  const guest = useGuestStore((state) => state.guest)
  const { girlVotes, boyVotes, hasVoted, userVote, setVotes, setUserVote, incrementVote } = useVotingStore()
  const [isVoting, setIsVoting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const totalVotes = girlVotes + boyVotes
  const girlPercentage = totalVotes > 0 ? Math.round((girlVotes / totalVotes) * 100) : 50
  const boyPercentage = totalVotes > 0 ? Math.round((boyVotes / totalVotes) * 100) : 50

  // Cargar votos desde la base de datos
  useEffect(() => {
    loadVotes()
    checkUserVote()

    // Suscribirse a cambios en tiempo real
    const subscription = votesDB.subscribe(() => {
      loadVotes()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [guest])

  const loadVotes = async () => {
    try {
      const { data, error } = await votesDB.getAll()

      if (error) throw error

      const girls = data?.filter((v) => v.team === 'girl').length || 0
      const boys = data?.filter((v) => v.team === 'boy').length || 0
      setVotes(girls, boys)
    } catch (error) {
      console.error('Error cargando votos:', error)
    }
  }

  const checkUserVote = async () => {
    if (!guest?.id) return

    try {
      const { data, error } = await votesDB.getByGuestId(guest.id)

      if (data && !error) {
        setUserVote(data.team)
      }
    } catch (error) {
      // Usuario no ha votado
    }
  }

  const handleVote = async (team: 'girl' | 'boy') => {
    if (!guest || hasVoted || isVoting) return

    setIsVoting(true)

    try {
      const { error } = await votesDB.insert({ guest_id: guest.id, team })

      if (error) throw error

      setUserVote(team)
      incrementVote(team)
      setShowConfetti(true)

      setTimeout(() => setShowConfetti(false), 3000)
    } catch (error: any) {
      console.error('Error al votar:', error)
      alert(error.message || 'Hubo un error al registrar tu voto. Por favor intenta de nuevo.')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <section id="voting" className="py-20 px-4 relative overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%',
                  backgroundColor: i % 2 === 0 ? '#ec4899' : '#3b82f6',
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 50,
                  opacity: 0,
                  rotate: 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

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
              ¿Niña o Niño?
            </span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            {hasVoted ? '¡Gracias por tu voto!' : '¡Haz tu predicción!'}
          </p>

          {/* Toggle Group de votación */}
          <div className="inline-block">
            <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Selecciona tu predicción
            </label>
            <div className="relative inline-flex p-1.5 bg-white border-2 border-gray-300 rounded-2xl shadow-lg">
              {/* Team Niña */}
              <motion.button
                onClick={() => handleVote('girl')}
                disabled={hasVoted || isVoting}
                whileTap={!hasVoted ? { scale: 0.97 } : {}}
                className={`relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  userVote === 'girl'
                    ? 'bg-pink-300 text-pink-900 shadow-lg'
                    : hasVoted
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-pink-50 cursor-pointer'
                } ${isVoting ? 'cursor-wait' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-3xl">💗</span>
                  <span>Team Niña</span>
                </span>
              </motion.button>

              {/* Team Niño */}
              <motion.button
                onClick={() => handleVote('boy')}
                disabled={hasVoted || isVoting}
                whileTap={!hasVoted ? { scale: 0.97 } : {}}
                className={`relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ml-2 ${
                  userVote === 'boy'
                    ? 'bg-blue-300 text-blue-900 shadow-lg'
                    : hasVoted
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-blue-50 cursor-pointer'
                } ${isVoting ? 'cursor-wait' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-3xl">💙</span>
                  <span>Team Niño</span>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contador de votos */}
        <div className="flex justify-center gap-8 mb-12">
          {/* Tarjeta Team Niña */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
              userVote === 'girl'
                ? 'bg-pink-100 border-2 border-pink-400'
                : 'bg-white border-2 border-gray-200'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">👶🏻💗</span>
              <h3 className="text-2xl font-bold mb-2 text-pink-600">Team Niña</h3>
              <p className="text-4xl font-bold text-pink-800">{girlVotes}</p>
              <p className="text-sm text-gray-600">votos</p>
            </div>
          </motion.div>

          {/* Tarjeta Team Niño */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
              userVote === 'boy'
                ? 'bg-blue-100 border-2 border-blue-400'
                : 'bg-white border-2 border-gray-200'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">👶🏻💙</span>
              <h3 className="text-2xl font-bold mb-2 text-blue-600">Team Niño</h3>
              <p className="text-4xl font-bold text-blue-800">{boyVotes}</p>
              <p className="text-sm text-gray-600">votos</p>
            </div>
          </motion.div>
        </div>

        {/* Gráfico de barras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Resultados en tiempo real
          </h3>

          {/* Barras de porcentaje */}
          <div className="space-y-6">
            {/* Barra Niña */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-pink-600">Team Niña 💗</span>
                <span className="font-bold text-pink-600">{girlPercentage}%</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-end pr-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${girlPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <span className="text-white font-semibold text-sm">{girlVotes}</span>
                </motion.div>
              </div>
            </div>

            {/* Barra Niño */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-blue-600">Team Niño 💙</span>
                <span className="font-bold text-blue-600">{boyPercentage}%</span>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end pr-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${boyPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <span className="text-white font-semibold text-sm">{boyVotes}</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Total de votos */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Total de votos: <span className="font-bold text-2xl text-gray-800">{totalVotes}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
