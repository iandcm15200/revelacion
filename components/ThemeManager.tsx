'use client'

import { useEffect } from 'react'
import { useVotingStore } from '@/store/votingStore'

export default function ThemeManager() {
  const themeColor = useVotingStore((state) => state.themeColor)

  useEffect(() => {
    const html = document.documentElement
    
    // Remover clases anteriores
    html.classList.remove('theme-pink', 'theme-blue', 'theme-neutral')
    
    // Agregar la clase del tema actual
    html.classList.add(`theme-${themeColor}`)
    
    // También cambiar el estilo del background del html
    switch (themeColor) {
      case 'blue':
        html.style.background = 'linear-gradient(to top right, #93c5fd, #bae6fd, #f9a8d4)'
        break
      case 'pink':
        html.style.background = 'linear-gradient(to top right, #f9a8d4, #fecdd3, #bae6fd)'
        break
      default:
        html.style.background = 'linear-gradient(to top right, #bae6fd, #f9a8d4, #fecdd3)'
    }
  }, [themeColor])

  return null
}
