'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Animación de revelado vertical con efecto elástico
const revealAnimation = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  })
}

// Componente de Biberón animado
const BottleIcon = ({ isActive }: { isActive: boolean }) => (
  <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fdf2f8" />
        <stop offset="100%" stopColor="#fbcfe8" />
      </linearGradient>
      <linearGradient id="milkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fce7f3" />
        <stop offset="100%" stopColor="#f9a8d4" />
      </linearGradient>
    </defs>
    
    {/* Tetina */}
    <motion.g
      animate={isActive ? { y: [0, -3, 0] } : {}}
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
    >
      <ellipse cx="50" cy="18" rx="8" ry="10" fill="#f9a8d4" />
      <ellipse cx="50" cy="12" rx="4" ry="5" fill="#fbcfe8" />
    </motion.g>
    
    {/* Tapa rosca */}
    <rect x="38" y="25" width="24" height="10" rx="2" fill="#ec4899" />
    <rect x="40" y="27" width="20" height="2" rx="1" fill="#f472b6" />
    <rect x="40" y="31" width="20" height="2" rx="1" fill="#f472b6" />
    
    {/* Cuerpo del biberón */}
    <motion.g
      animate={isActive ? { rotate: [-2, 2, -2] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '50px 70px' }}
    >
      <rect x="35" y="35" width="30" height="60" rx="8" fill="url(#bottleGradient)" stroke="#f9a8d4" strokeWidth="2" />
      
      {/* Medidas */}
      <line x1="60" y1="50" x2="55" y2="50" stroke="#f9a8d4" strokeWidth="1" />
      <line x1="60" y1="60" x2="55" y2="60" stroke="#f9a8d4" strokeWidth="1" />
      <line x1="60" y1="70" x2="55" y2="70" stroke="#f9a8d4" strokeWidth="1" />
      <line x1="60" y1="80" x2="55" y2="80" stroke="#f9a8d4" strokeWidth="1" />
      
      {/* Leche animada */}
      <motion.rect
        x="37"
        y="55"
        width="26"
        height="38"
        rx="6"
        fill="url(#milkGradient)"
        animate={isActive ? {
          y: [55, 50, 55],
          height: [38, 43, 38]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Burbujas */}
      <motion.circle
        cx="45"
        cy="70"
        r="2"
        fill="white"
        opacity={0.7}
        animate={isActive ? { y: [0, -15], opacity: [0.7, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
      />
      <motion.circle
        cx="52"
        cy="75"
        r="1.5"
        fill="white"
        opacity={0.6}
        animate={isActive ? { y: [0, -12], opacity: [0.6, 0] } : {}}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8, delay: 0.3 }}
      />
    </motion.g>
  </svg>
)

// Componente de Chupete animado
const PacifierIcon = ({ isActive }: { isActive: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id="pacifierGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <radialGradient id="pacifierShine" cx="30%" cy="30%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.6" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    <motion.g
      animate={isActive ? { 
        rotate: [-5, 5, -5],
        y: [0, -3, 0]
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '50px 50px' }}
    >
      {/* Escudo/Base */}
      <ellipse cx="50" cy="50" rx="28" ry="22" fill="url(#pacifierGradient)" />
      <ellipse cx="50" cy="50" rx="26" ry="20" fill="url(#pacifierShine)" />
      
      {/* Agujeros decorativos */}
      <circle cx="35" cy="50" r="4" fill="#60a5fa" />
      <circle cx="65" cy="50" r="4" fill="#60a5fa" />
      
      {/* Tetina */}
      <motion.ellipse
        cx="50"
        cy="30"
        rx="12"
        ry="15"
        fill="#60a5fa"
        animate={isActive ? { ry: [15, 13, 15] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <ellipse cx="47" cy="26" rx="4" ry="5" fill="#93c5fd" opacity={0.5} />
      
      {/* Aro */}
      <motion.g
        animate={isActive ? { y: [0, 2, 0] } : {}}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
      >
        <ellipse cx="50" cy="78" rx="10" ry="8" fill="none" stroke="#3b82f6" strokeWidth="4" />
        <ellipse cx="50" cy="78" rx="10" ry="8" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <rect x="47" y="68" width="6" height="12" rx="2" fill="#3b82f6" />
      </motion.g>
    </motion.g>
  </svg>
)

// Componente de Globo con sorpresa
const BalloonIcon = ({ isActive }: { isActive: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <defs>
      <radialGradient id="balloonPink" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fce7f3" />
        <stop offset="100%" stopColor="#ec4899" />
      </radialGradient>
      <radialGradient id="balloonBlue" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#dbeafe" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
      <radialGradient id="balloonRed" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fecaca" />
        <stop offset="100%" stopColor="#ef4444" />
      </radialGradient>
    </defs>
    
    {/* Globo grande central rojo con signo de interrogación */}
    <motion.g
      animate={isActive ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="50" cy="40" rx="30" ry="35" fill="url(#balloonRed)" />
      <ellipse cx="42" cy="32" rx="8" ry="10" fill="#fecaca" opacity={0.5} />
      
      {/* Signos de interrogación rosa y azul */}
      <motion.g
        animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <text x="38" y="48" fontSize="18" fill="#ec4899" fontWeight="bold">?</text>
        <text x="52" y="42" fontSize="14" fill="#3b82f6" fontWeight="bold">?</text>
      </motion.g>
      
      {/* Nudo */}
      <polygon points="50,75 45,80 55,80" fill="#dc2626" />
      
      {/* Cuerda */}
      <motion.path
        d="M50 80 Q 48 88 50 95"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.5"
        animate={isActive ? { d: ['M50 80 Q 48 88 50 95', 'M50 80 Q 52 88 50 95', 'M50 80 Q 48 88 50 95'] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
    
    {/* Mini globos flotando */}
    <motion.ellipse
      cx="25"
      cy="25"
      rx="8"
      ry="10"
      fill="url(#balloonPink)"
      animate={isActive ? { y: [0, -8, 0], x: [0, 3, 0] } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.ellipse
      cx="75"
      cy="30"
      rx="7"
      ry="9"
      fill="url(#balloonBlue)"
      animate={isActive ? { y: [0, -6, 0], x: [0, -3, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    />
  </svg>
)

// Componente de Pañal animado
const DiaperIcon = ({ isActive }: { isActive: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <motion.g
      animate={isActive ? { y: [0, -4, 0] } : {}}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Cuerpo principal del pañal - forma redondeada */}
      <motion.path
        d="M15 30 
           L15 25 L30 25 L30 30
           L70 30 L70 25 L85 25 L85 30
           Q88 32 88 38
           L88 50
           Q88 75 50 82
           Q12 75 12 50
           L12 38
           Q12 32 15 30 Z"
        fill="white"
        stroke="#374151"
        strokeWidth="2"
        animate={isActive ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ transformOrigin: '50px 55px' }}
      />
      
      {/* Cintas/Alas laterales izquierda */}
      <motion.path
        d="M15 30 L15 25 L30 25 L30 30 Q25 32 20 35 Q15 35 15 30 Z"
        fill="white"
        stroke="#374151"
        strokeWidth="2"
        animate={isActive ? { rotate: [-2, 2, -2] } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ transformOrigin: '22px 30px' }}
      />
      
      {/* Cintas/Alas laterales derecha */}
      <motion.path
        d="M70 30 L70 25 L85 25 L85 30 Q85 35 80 35 Q75 32 70 30 Z"
        fill="white"
        stroke="#374151"
        strokeWidth="2"
        animate={isActive ? { rotate: [2, -2, 2] } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ transformOrigin: '78px 30px' }}
      />
      
      {/* Líneas horizontales superiores */}
      <motion.line
        x1="25"
        y1="38"
        x2="75"
        y2="38"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <motion.line
        x1="28"
        y1="44"
        x2="72"
        y2="44"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Curvas internas de las piernas - izquierda */}
      <motion.path
        d="M20 50 Q25 70 40 75"
        fill="none"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Curvas internas de las piernas - derecha */}
      <motion.path
        d="M80 50 Q75 70 60 75"
        fill="none"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Efecto de brillo sutil cuando está activo */}
      {isActive && (
        <motion.ellipse
          cx="35"
          cy="50"
          rx="8"
          ry="12"
          fill="white"
          opacity={0.5}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.g>
  </svg>
)

// Componente de Corazón animado
const HeartIcon = ({ isActive }: { isActive: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fce7f3" />
        <stop offset="50%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <motion.g
      animate={isActive ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '50px 55px' }}
      filter="url(#heartGlow)"
    >
      {/* Corazón principal */}
      <motion.path
        d="M50 85 C 20 65, 10 45, 10 35 C 10 15, 30 10, 50 30 C 70 10, 90 15, 90 35 C 90 45, 80 65, 50 85 Z"
        fill="url(#heartGradient)"
      />
      
      {/* Brillo */}
      <ellipse cx="30" cy="35" rx="8" ry="10" fill="white" opacity={0.3} />
      
      {/* Corazones pequeños flotando */}
      <motion.path
        d="M20 25 C 15 22, 12 18, 12 15 C 12 10, 17 8, 20 12 C 23 8, 28 10, 28 15 C 28 18, 25 22, 20 25 Z"
        fill="#fca5cc"
        animate={isActive ? { y: [0, -10, 0], opacity: [0.8, 0, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.path
        d="M80 20 C 77 18, 75 15, 75 13 C 75 9, 78 8, 80 10 C 82 8, 85 9, 85 13 C 85 15, 83 18, 80 20 Z"
        fill="#f9a8d4"
        animate={isActive ? { y: [0, -8, 0], opacity: [0.6, 0, 0.6] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
      />
    </motion.g>
    
    {/* Partículas de amor */}
    {isActive && (
      <>
        <motion.circle
          cx="30"
          cy="60"
          r="2"
          fill="#f472b6"
          animate={{ y: [0, -30], opacity: [1, 0], x: [-5, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="70"
          cy="60"
          r="2"
          fill="#f472b6"
          animate={{ y: [0, -25], opacity: [1, 0], x: [5, 10] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.7 }}
        />
      </>
    )}
  </svg>
)

interface IconBlockProps {
  icon: React.ReactNode
  label: string
  color: string
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}

const IconBlock = ({ icon, label, color, index, isActive, onHover, onLeave }: IconBlockProps) => (
  <motion.div
    className="flex flex-col items-center cursor-pointer"
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={revealAnimation}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <motion.div 
      className="w-20 h-20 md:w-24 md:h-24 mb-3"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.div>
    <span className={`text-sm font-medium ${color}`}>{label}</span>
  </motion.div>
)

export default function AnimatedIcons() {
  const [activeIcon, setActiveIcon] = useState<number | null>(null)
  const [autoPlay, setAutoPlay] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (autoPlay) {
      let current = 0
      intervalRef.current = setInterval(() => {
        setActiveIcon(current)
        current = (current + 1) % 5
      }, 2000)
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay])

  const handleHover = (index: number) => {
    setAutoPlay(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActiveIcon(index)
  }

  const handleLeave = () => {
    setAutoPlay(true)
  }

  const icons = [
    { icon: <BottleIcon isActive={activeIcon === 0} />, label: 'Biberón', color: 'text-pink-500' },
    { icon: <PacifierIcon isActive={activeIcon === 1} />, label: 'Chupete', color: 'text-blue-500' },
    { icon: <BalloonIcon isActive={activeIcon === 2} />, label: 'Globo', color: 'text-amber-600' },
    { icon: <DiaperIcon isActive={activeIcon === 3} />, label: 'Pañal', color: 'text-blue-400' },
    { icon: <HeartIcon isActive={activeIcon === 4} />, label: 'Amor', color: 'text-pink-500' },
  ]

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-outlined"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Descubre el secreto
        </motion.h2>
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 max-w-4xl mx-auto">
          {icons.map((item, index) => (
            <IconBlock
              key={index}
              icon={item.icon}
              label={item.label}
              color={item.color}
              index={index}
              isActive={activeIcon === index}
              onHover={() => handleHover(index)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
