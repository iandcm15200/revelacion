'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

export default function AnimatedIcons() {
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!iconsRef.current) return

    // Animación del biberón
    const bottleAnimation = animate({
      targets: '.bottle-icon__liquid',
      translateY: [20, -10, 0],
      opacity: [0, 1],
      easing: 'easeInOutQuad',
      duration: 1500,
      loop: true,
      direction: 'alternate'
    })

    // Animación del chupete
    animate({
      targets: '.pacifier-icon__circle',
      scale: [0.8, 1.1, 1],
      easing: 'easeOutElastic(1, .8)',
      duration: 2000,
      loop: true,
      delay: 300
    })

    // Animación de los globos
    animate({
      targets: '.balloon-icon__balloon',
      translateY: [0, -15, 0],
      easing: 'easeInOutSine',
      duration: 3000,
      loop: true,
      delay: stagger(200)
    })

    // Animación del osito
    animate({
      targets: '.teddy-icon__bear',
      rotate: [-5, 5, 0],
      easing: 'easeInOutSine',
      duration: 2500,
      loop: true
    })

    // Animación del corazón
    animate({
      targets: '.heart-icon__heart',
      scale: [1, 1.2, 1],
      easing: 'easeInOutQuad',
      duration: 1500,
      loop: true
    })

    return () => {
      bottleAnimation.pause()
    }
  }, [])

  return (
    <div ref={iconsRef} className="py-16 bg-gradient-to-b from-pink-50/30 to-blue-50/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-beige-600">
          ¡Descubre el secreto! 🎀💙
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Biberón */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g className="bottle-icon">
                  {/* Cuerpo del biberón */}
                  <rect x="35" y="30" width="30" height="50" rx="5" fill="#EC4899" opacity="0.3"/>
                  <g className="bottle-icon__liquid">
                    <rect x="37" y="50" width="26" height="25" rx="3" fill="#EC4899"/>
                  </g>
                  {/* Tapa */}
                  <rect x="40" y="20" width="20" height="12" rx="3" fill="#F9A8D4"/>
                  <circle cx="50" cy="17" r="5" fill="#F9A8D4"/>
                </g>
              </svg>
            </div>
            <span className="text-sm font-medium text-pink-600">Biberón</span>
          </div>

          {/* Chupete */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g className="pacifier-icon">
                  <g className="pacifier-icon__circle">
                    <circle cx="50" cy="45" r="20" fill="#3B82F6" opacity="0.8"/>
                    <circle cx="50" cy="45" r="15" fill="#60A5FA"/>
                    <circle cx="50" cy="45" r="8" fill="white" opacity="0.5"/>
                  </g>
                  {/* Mango */}
                  <ellipse cx="50" cy="70" rx="8" ry="6" fill="#93C5FD"/>
                  <rect x="48" y="58" width="4" height="12" rx="2" fill="#93C5FD"/>
                </g>
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-600">Chupete</span>
          </div>

          {/* Globos */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g className="balloon-icon">
                  <g className="balloon-icon__balloon">
                    <ellipse cx="35" cy="40" rx="12" ry="15" fill="#EC4899"/>
                    <path d="M 35 55 Q 32 65 35 70" stroke="#EC4899" strokeWidth="1" fill="none"/>
                  </g>
                  <g className="balloon-icon__balloon">
                    <ellipse cx="50" cy="35" rx="12" ry="15" fill="#3B82F6"/>
                    <path d="M 50 50 Q 48 60 50 65" stroke="#3B82F6" strokeWidth="1" fill="none"/>
                  </g>
                  <g className="balloon-icon__balloon">
                    <ellipse cx="65" cy="40" rx="12" ry="15" fill="#F9A8D4"/>
                    <path d="M 65 55 Q 67 65 65 70" stroke="#F9A8D4" strokeWidth="1" fill="none"/>
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-sm font-medium text-purple-600">Globos</span>
          </div>

          {/* Osito */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g className="teddy-icon">
                  <g className="teddy-icon__bear" style={{transformOrigin: '50% 50%'}}>
                    {/* Orejas */}
                    <circle cx="35" cy="35" r="10" fill="#D4A574"/>
                    <circle cx="65" cy="35" r="10" fill="#D4A574"/>
                    {/* Cabeza */}
                    <circle cx="50" cy="45" r="18" fill="#E5C9A6"/>
                    {/* Ojos */}
                    <circle cx="43" cy="43" r="2" fill="#4A3728"/>
                    <circle cx="57" cy="43" r="2" fill="#4A3728"/>
                    {/* Nariz */}
                    <ellipse cx="50" cy="50" rx="3" ry="2" fill="#D4A574"/>
                    {/* Sonrisa */}
                    <path d="M 45 53 Q 50 56 55 53" stroke="#D4A574" strokeWidth="1.5" fill="none"/>
                    {/* Cuerpo */}
                    <ellipse cx="50" cy="73" rx="15" ry="12" fill="#E5C9A6"/>
                    {/* Patas */}
                    <circle cx="42" cy="83" r="6" fill="#D4A574"/>
                    <circle cx="58" cy="83" r="6" fill="#D4A574"/>
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-sm font-medium text-beige-600">Osito</span>
          </div>

          {/* Corazón */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <g className="heart-icon">
                  <g className="heart-icon__heart" style={{transformOrigin: '50% 50%'}}>
                    <path
                      d="M50 75 C 25 60, 15 45, 15 35 C 15 20, 30 15, 40 25 C 45 30, 50 35, 50 35 C 50 35, 55 30, 60 25 C 70 15, 85 20, 85 35 C 85 45, 75 60, 50 75 Z"
                      fill="#F472B6"
                    />
                    <path
                      d="M50 70 C 30 58, 22 47, 22 38 C 22 28, 32 24, 40 30 C 45 34, 50 40, 50 40 C 50 40, 55 34, 60 30 C 68 24, 78 28, 78 38 C 78 47, 70 58, 50 70 Z"
                      fill="#FCA5CC"
                      opacity="0.7"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-sm font-medium text-pink-500">Amor</span>
          </div>
        </div>

        {/* Decoración adicional */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <span className="text-4xl animate-bounce">🎀</span>
          <span className="text-2xl text-beige-500 font-medium">¿Niña o Niño?</span>
          <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>💙</span>
        </div>
      </div>
    </div>
  )
}
