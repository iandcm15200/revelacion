'use client'

import { motion } from 'framer-motion'

const menuItems = {
  entradas: [
    { name: 'Ensalada Primavera', description: 'Mix de lechugas con vinagreta de frutas' },
    { name: 'Brochetas Caprese', description: 'Tomate, mozzarella y albahaca fresca' },
  ],
  platosFuertes: [
    { name: 'Pollo a la Parrilla', description: 'Con vegetales asados y salsa especial' },
    { name: 'Pasta Alfredo', description: 'Fetuccini en salsa cremosa' },
    { name: 'Arroz con Camarones', description: 'Arroz amarillo con camarones al ajillo' },
  ],
  postres: [
    { name: 'Pastel de Revelación', description: 'Sorpresa de género en el interior' },
    { name: 'Mini Cupcakes', description: 'Surtido rosa y azul' },
    { name: 'Gelatina de Frutas', description: 'Fresca y colorida' },
  ],
  bebidas: [
    { name: 'Limonada Natural', description: 'Con hierbabuena fresca' },
    { name: 'Ponche de Frutas', description: 'Sin alcohol' },
    { name: 'Café y Té', description: 'Servicio continuo' },
  ],
}

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-beige-50 to-white pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              Menú del Evento
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Disfruta de una deliciosa selección de platillos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Entradas */}
          <MenuCategory title="🥗 Entradas" items={menuItems.entradas} color="pink" />

          {/* Platos Fuertes */}
          <MenuCategory title="🍽️ Platos Fuertes" items={menuItems.platosFuertes} color="blue" />

          {/* Postres */}
          <MenuCategory title="🍰 Postres" items={menuItems.postres} color="pink" />

          {/* Bebidas */}
          <MenuCategory title="🥤 Bebidas" items={menuItems.bebidas} color="blue" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm">
            * El menú puede variar según disponibilidad. Opciones vegetarianas disponibles.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function MenuCategory({ title, items, color }: { title: string; items: any[]; color: 'pink' | 'blue' }) {
  const colorClasses = color === 'pink'
    ? 'from-pink-50 to-pink-100 border-pink-200'
    : 'from-blue-50 to-blue-100 border-blue-200'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br ${colorClasses} rounded-3xl p-8 shadow-xl border-2`}
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
