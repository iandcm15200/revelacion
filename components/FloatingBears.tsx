'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useVotingStore } from '@/store/votingStore'

interface CloudProps {
  x: number
  size: number
  flipped: number
  speed: number
  delay: number
  z: number
}

interface BalloonBearProps {
  id?: string
  x: number
  hue: number
  speed: number
  onFinish?: (id: string) => void
  size: number
  flipped: number
  main?: boolean
  z: number
}

const Cloud = ({ x, size, flipped, speed, delay, z }: CloudProps) => {
  return (
    <svg
      className="cloud"
      viewBox="0 0 855 544"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ['--x' as any]: x,
        ['--speed' as any]: speed,
        ['--size' as any]: size,
        ['--delay' as any]: delay,
        ['--flipped' as any]: flipped,
        ['--z' as any]: z,
      }}
    >
      <path
        d="M458 0C499.817 0 537.472 17.8242 563.779 46.291C567.659 46.0977 571.567 46 575.5 46C692.308 46 787 132.409 787 239C787 248.31 786.277 257.465 784.881 266.422C826.391 284.906 855 323.894 855 369C855 431.961 799.259 483 730.5 483C707.731 483 686.39 477.403 668.027 467.631C629.401 514.036 568.285 544 499.5 544C448.311 544 401.37 527.405 364.783 499.79C348.99 505.743 331.875 509 314 509C256.452 509 206.789 475.243 183.732 426.449C171.112 430.064 157.782 432 144 432C64.4712 432 0 367.529 0 288C0 208.471 64.4712 144 144 144C146.961 144 149.902 144.09 152.819 144.266C173.069 89.2441 225.952 50 288 50C306.708 50 324.583 53.5674 340.982 60.0596C367.119 23.6885 409.793 0 458 0Z"
        fill="white"
      />
    </svg>
  )
}

const BalloonBear = ({ id, x, hue, speed, onFinish, size, flipped, main, z }: BalloonBearProps) => {
  const balloonRef = useRef<SVGGElement>(null)
  const bearRef = useRef<SVGSVGElement>(null)
  const controls = useAnimation()
  const [isPopped, setIsPopped] = useState(false)

  // Color del globo: amarillo para el central, rosa o azul para los demás
  const balloonHue = main ? 45 : hue

  useEffect(() => {
    if (!main && bearRef.current) {
      controls.start({
        y: -window.innerHeight * 1.5,
        transition: {
          duration: speed,
          ease: 'linear',
        },
      }).then(() => {
        if (onFinish && id) onFinish(id)
      })
    }
  }, [main, speed, controls, onFinish, id])

  const handleBalloonClick = () => {
    if (main || isPopped) return
    
    setIsPopped(true)
    
    // Animar el pop del globo
    controls.start({
      scale: 2,
      opacity: 0,
      transition: { duration: 0.1 },
    }).then(() => {
      // Caída del osito
      controls.start({
        y: '100vh',
        transition: { duration: 1 },
      }).then(() => {
        if (onFinish && id) onFinish(id)
      })
    })
  }

  return (
    <motion.svg
      ref={bearRef}
      className="balloon-bear"
      data-balloon-bear-static={main ? '' : undefined}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 885 1059"
      animate={controls}
      style={{
        ['--x' as any]: x,
        ['--hue' as any]: balloonHue,
        ['--speed' as any]: speed,
        ['--size' as any]: size,
        ['--flipped' as any]: flipped,
        ['--z' as any]: z,
      }}
    >
      <g className="balloon-bear__arm">
        <rect
          width={115}
          height={52}
          x="527.5"
          y="961.5"
          fill="#AF7128"
          stroke="#000"
          strokeWidth={6}
          rx={26}
          transform="rotate(-90 527.5 961.5)"
        />
        <path
          fill="#000"
          d="M551.674 948.205a3 3 0 1 0-6 0h6Zm0 12v-12h-6v12h6ZM564.34 948.205a3 3 0 1 0-6 0h6Zm0 12v-12h-6v12h6Z"
        />
      </g>

      {/* Accesorios solo para ositos voladores */}
      {!main && (
        <>
          {hue > 250 ? (
            // Moño rosa en la cabeza para ositos pares (hue 330 = rosa)
            <>
              {/* Moño rosa entre los ojos */}
              <ellipse cx="520" cy="760" rx="22" ry="18" fill="#F8B5C8" stroke="#000" strokeWidth={3}/>
              <ellipse cx="555" cy="760" rx="22" ry="18" fill="#F8B5C8" stroke="#000" strokeWidth={3}/>
              <circle cx="537.5" cy="760" r="12" fill="#F8B5C8" stroke="#000" strokeWidth={3}/>
            </>
          ) : (
            // Gorra negra con corbata para ositos impares (hue 210 = azul)
            <>
              {/* Gorra en la parte superior */}
              <ellipse cx="537" cy="690" rx="45" ry="25" fill="#000" stroke="#000" strokeWidth={3}/>
              <ellipse cx="537" cy="682" rx="35" ry="35" fill="#000" stroke="#000" strokeWidth={3}/>
              <circle cx="537" cy="672" r="8" fill="#FFD700" stroke="#000" strokeWidth={2}/>
              
              {/* Corbata entre el cuerpo */}
              <path
                fill="#0066CC"
                stroke="#000"
                strokeWidth={2}
                d="M530 820 L545 820 L537.5 880 Z"
              />
            </>
          )}
        </>
      )}

      <path
        fill="#AF7128"
        d="M505.653 673.433c-8.572-14.183-6.748-32.879 5.479-45.106 14.388-14.387 37.731-14.37 52.14.038 10.153 10.153 13.16 24.742 9.017 37.509 13.071 3.917 25.39 11.04 35.718 21.369l14.163 14.162c10.282 10.283 17.388 22.537 21.316 35.542 12.744-4.098 27.287-1.081 37.415 9.048 14.409 14.408 14.426 37.752.039 52.14-12.179 12.178-30.774 14.036-44.935 5.581a84.968 84.968 0 0 1-13.747 17.985l-47.065 47.066-77.583 77.583a36.986 36.986 0 0 0-5.206 6.541l-15.761 25.197c-3.205 5.125-6.75 10.464-12.384 12.655-7.889 3.068-17.198 1.412-23.575-4.965l-13.115-11.847-7.404-6.859-9.004-9.24c-8.605-8.604-5.835-20.208-1.016-30.609l13.314-23.061c-2.048-1.407-4.711-4.694-6.52-6.503-1.563-1.563-3.05-4.787-4.312-6.531L397.298 912.3c-6.512 8.418-20.24 9.852-28.844 1.247l-26.204-25.523c-8.604-8.604-15.463-21.052-4.977-36.77l46.35-60.011a29.027 29.027 0 0 1-1.286-8.551l-.046-63.046c-.012-16.028 12.972-29.012 29-29 16.028.012 29.03 13.014 29.042 29.042l.011 14.834 47.367-47.367a84.962 84.962 0 0 1 17.942-13.722Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={6}
        d="m575.193 868.767 47.065-47.066a84.968 84.968 0 0 0 13.747-17.985c14.161 8.455 32.756 6.597 44.935-5.581 14.387-14.388 14.37-37.732-.039-52.14-10.128-10.129-24.671-13.146-37.415-9.048-3.928-13.005-11.034-25.259-21.316-35.542l-14.163-14.162c-10.328-10.329-22.647-17.452-35.718-21.369 4.143-12.767 1.136-27.356-9.017-37.509-14.409-14.408-37.752-14.425-52.14-.038-12.227 12.227-14.051 30.923-5.479 45.106a84.962 84.962 0 0 0-17.942 13.722l-47.367 47.367-.011-14.834c-.012-16.028-13.014-29.03-29.042-29.042-16.028-.012-29.012 12.972-29 29l.046 63.046a29.027 29.027 0 0 0 1.286 8.551l-46.35 60.011c-10.486 15.718-3.627 28.166 4.977 36.77l26.204 25.523c8.604 8.605 22.332 7.171 28.844-1.247l15.329-21.172c1.262 1.744 2.749 4.968 4.312 6.531 1.809 1.809 4.472 5.096 6.52 6.503l-13.314 23.061c-4.819 10.401-7.589 22.005 1.016 30.609l9.004 9.24 7.404 6.859 13.115 11.847c6.377 6.377 15.685 8.033 23.575 4.965 5.634-2.191 9.179-7.53 12.384-12.655l15.761-25.197a36.986 36.986 0 0 1 5.206-6.541l39.815-39.815"
      />
      <path
        fill="#000"
        d="M411.783 705.187a3.005 3.005 0 0 0 3.002 3.002 2.994 2.994 0 0 0 2.998-2.997l-6-.005Zm-.009-12.009.009 12.009 6 .005-.009-12.009-6-.005ZM399.676 705.178a3.006 3.006 0 0 0 3.002 3.003 2.995 2.995 0 0 0 2.998-2.998l-6-.005Zm-.009-12.008.009 12.008 6 .005-.009-12.009-6-.004Z"
      />
      <g className="balloon-bear__eye">
        <ellipse
          cx="582.096"
          cy="803.26"
          fill="#000"
          rx="8.091"
          ry="8.079"
          transform="rotate(45 582.096 803.26)"
        />
      </g>
      <g className="balloon-bear__eye">
        <ellipse
          cx="505.202"
          cy="726.366"
          fill="#000"
          rx="8.091"
          ry="8.079"
          transform="rotate(45 505.202 726.366)"
        />
      </g>
      <path
        fill="#000"
        d="M548.047 789.863c-5.806 5.806-19.328 5.352-27.101-2.421s-8.227-21.295-2.421-27.101c5.805-5.805 15.671-1.695 23.444 6.078 7.773 7.773 11.883 17.639 6.078 23.444Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={6}
        d="m430.374 955.873-8.486 8.485M447.369 972.869l-8.485 8.485M357.435 882.935l-8.485 8.485M374.43 899.93l-8.485 8.485M426.5 821.5l-5-376"
      />
      <g ref={balloonRef} className="balloon" onClick={handleBalloonClick} style={{ cursor: main ? 'default' : 'pointer' }}>
        <circle
          className="balloon-bear__balloon"
          cx="421.5"
          cy="273.5"
          r={169}
          fill="#D52828"
          fillOpacity=".5"
          stroke="#000"
          strokeWidth={6}
        />
        <path
          className="balloon-bear__balloon"
          fill="#F20000"
          fillOpacity=".5"
          stroke="#000"
          strokeLinejoin="round"
          strokeWidth={6}
          d="M405.5 444.5H437l9.5 20h-50l9-20Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity=".5"
          strokeWidth={30}
          d="M384.118 142.738a136.004 136.004 0 0 0-98.123 119.174"
        />
      </g>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={6}
        d="m380 757 62-42"
      />
    </motion.svg>
  )
}

// Generar nubes aleatorias (más cantidad y variedad)
const generateClouds = () => {
  return Array.from({ length: 24 }, () => ({
    id: crypto.randomUUID(),
    x: Math.random() * 1.4 - 0.2,
    size: Math.floor(Math.random() * 50) + 20,
    speed: Math.floor(Math.random() * 60) + 15,
    delay: Math.floor(Math.random() * 80) - 40,
    flipped: Math.random() > 0.5 ? 1 : 0,
    z: Math.floor(Math.random() * 10),
  }))
}

export default function FloatingBearsBackground() {
  const [bears, setBears] = useState<Array<BalloonBearProps & { id: string }>>([])
  const [clouds] = useState(generateClouds())
  const themeColor = useVotingStore((state) => state.themeColor)

  // Determinar el gradiente según el tema
  const getGradientClasses = () => {
    switch (themeColor) {
      case 'blue':
        return 'bg-gradient-to-tr from-blue-300 via-sky-200 to-pink-200'
      case 'pink':
        return 'bg-gradient-to-tr from-pink-300 via-rose-200 to-sky-200'
      default:
        return 'bg-gradient-to-tr from-sky-200 via-pink-300 to-rose-200'
    }
  }

  const onFinish = (id: string) => {
    setBears(bears => bears.filter(bear => bear.id !== id))
  }

  const addBear = () => {
    const isEven = bears.length % 2 === 0
    setBears(oldBears => [
      ...oldBears,
      {
        id: crypto.randomUUID(),
        x: Math.random(),
        hue: isEven ? 330 : 210, // 330 = rosa, 210 = azul
        size: Math.floor(Math.random() * 30) + 10,
        speed: Math.floor(Math.random() * 18) + 2,
        flipped: Math.random() > 0.5 ? 1 : 0,
        z: Math.floor(Math.random() * 10),
        onFinish,
      },
    ])
  }

  useEffect(() => {
    const handleClick = () => addBear()
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [bears.length])

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* Degradado de cielo que cambia según el voto */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${getGradientClasses()}`}
        aria-hidden
      />
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <BalloonBear main x={0.5} hue={45} speed={0} size={50} flipped={0} z={5} />
      </div>
      {bears.map(bear => (
        <BalloonBear key={bear.id} {...bear} />
      ))}
      {clouds.map(cloud => (
        <Cloud key={cloud.id} {...cloud} />
      ))}
    </div>
  )
}
