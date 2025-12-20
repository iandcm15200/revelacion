'use client'

import { motion } from 'framer-motion'

export default function ContributionsSection() {
  return (
    <section id="contributions" className="py-20 px-4 bg-gradient-to-b from-transparent to-beige-50">
      <div className="container mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              ¿Cómo Contribuir?
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Según tu predicción, aquí está lo que puedes traer para ayudarnos
          </p>
        </motion.div>

        {/* Tarjetas de contribución */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tarjeta Niña */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-8 shadow-xl border-2 border-pink-200 overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                {/* Icono */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-6 shadow-lg"
                >
                  <span className="text-4xl">🍼</span>
                </motion.div>

                {/* Contenido */}
                <h3 className="text-3xl font-bold text-pink-700 mb-3">
                  Si crees que es NIÑA 💗
                </h3>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-4">
                  <p className="text-lg font-semibold text-pink-800 mb-2">
                    ¡Trae pañales! 👶
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span>Talla recién nacido o 1</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span>Cualquier marca es bienvenida</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span>¡Nunca sobran los pañales!</span>
                    </li>
                  </ul>
                </div>

                {/* Ilustración decorativa */}
                <div className="flex justify-around text-4xl opacity-60 mt-4">
                  <span>🎀</span>
                  <span>👶🏻</span>
                  <span>💝</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tarjeta Niño */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-xl border-2 border-blue-200 overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                {/* Icono */}
                <motion.div
                  whileHover={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 shadow-lg"
                >
                  <span className="text-4xl">🧸</span>
                </motion.div>

                {/* Contenido */}
                <h3 className="text-3xl font-bold text-blue-700 mb-3">
                  Si crees que es NIÑO 💙
                </h3>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-4">
                  <p className="text-lg font-semibold text-blue-800 mb-2">
                    ¡Trae toallas! 🛁
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>Toallitas húmedas para bebé</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>Toallas suaves y absorbentes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>¡Siempre útiles para el bebé!</span>
                    </li>
                  </ul>
                </div>

                {/* Ilustración decorativa */}
                <div className="flex justify-around text-4xl opacity-60 mt-4">
                  <span>🚼</span>
                  <span>👶🏻</span>
                  <span>💙</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nota adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Nota:</span> ¡Tu presencia es el mejor regalo! 
              <br className="hidden md:block" />
              Pero si deseas contribuir, ¡será muy apreciado! ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
