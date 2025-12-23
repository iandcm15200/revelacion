'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useGuestStore } from '@/store/guestStore'
import { guestsDB } from '@/lib/supabase'

type FormData = {
  name: string
}

export default function LoginPage() {
  const router = useRouter()
  const guest = useGuestStore((state) => state.guest)
  const setGuest = useGuestStore((state) => state.setGuest)
  const clearGuest = useGuestStore((state) => state.clearGuest)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Si ya está registrado, mostrar botón de continuar
  const isAlreadyRegistered = !!guest

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleContinue = () => {
    router.push('/')
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError('')

    try {
      // Registrar invitado en localStorage
      const { data: guestData, error: dbError } = await guestsDB.insert({
        name: data.name,
      })

      if (dbError) throw dbError

      // Guardar en store
      setGuest({
        id: guestData!.id,
        name: data.name,
      })

      // Redirigir a la página principal
      router.push('/')
    } catch (err: any) {
      console.error('Error registrando invitado:', err)
      setError('Hubo un error al registrarte. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Iconos decorativos animados - Ositos */}
      <div className="absolute top-10 left-10 bear-float">
        <svg viewBox="0 0 100 120" className="w-20 h-24 opacity-40">
          {/* Globo rosa */}
          <ellipse cx="30" cy="15" rx="12" ry="15" fill="#FFB6D9"/>
          <ellipse cx="30" cy="14" rx="8" ry="11" fill="#FFC9E3"/>
          <ellipse cx="28" cy="12" rx="4" ry="5" fill="#FFFFFF" opacity="0.6"/>
          <path d="M 30 30 Q 28 38 30 45" stroke="#E8A5C8" strokeWidth="0.8" fill="none"/>
          
          {/* Estrella */}
          <path d="M 15 8 L 16 11 L 19 11 L 17 13 L 18 16 L 15 14 L 12 16 L 13 13 L 11 11 L 14 11 Z" fill="#FFD700" opacity="0.7"/>
          
          {/* Osito */}
          <ellipse cx="35" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <ellipse cx="55" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <circle cx="45" cy="68" r="14" fill="#E5C9A6"/>
          <ellipse cx="45" cy="74" rx="8" ry="7" fill="#F5E6D3"/>
          <ellipse cx="45" cy="72" rx="3" ry="2.5" fill="#4A3728"/>
          <circle cx="40" cy="68" r="2" fill="#4A3728"/>
          <circle cx="50" cy="68" r="2" fill="#4A3728"/>
          <ellipse cx="45" cy="88" rx="12" ry="14" fill="#E5C9A6"/>
          <ellipse cx="38" cy="100" rx="6" ry="8" fill="#D4A574"/>
          <ellipse cx="52" cy="100" rx="6" ry="8" fill="#D4A574"/>
        </svg>
      </div>

      <div className="absolute top-20 right-20 bear-float">
        <svg viewBox="0 0 100 120" className="w-24 h-28 opacity-40">
          {/* Globos azules */}
          <ellipse cx="65" cy="12" rx="10" ry="13" fill="#A8D5FF"/>
          <ellipse cx="65" cy="11" rx="7" ry="9" fill="#C5E4FF"/>
          <ellipse cx="63" cy="10" rx="3" ry="4" fill="#FFFFFF" opacity="0.6"/>
          <path d="M 65 25 Q 63 33 65 40" stroke="#8CC4F0" strokeWidth="0.8" fill="none"/>
          
          <ellipse cx="80" cy="15" rx="12" ry="15" fill="#A8D5FF"/>
          <ellipse cx="80" cy="14" rx="8" ry="11" fill="#C5E4FF"/>
          <ellipse cx="78" cy="12" rx="4" ry="5" fill="#FFFFFF" opacity="0.6"/>
          <path d="M 80 30 Q 78 38 80 45" stroke="#8CC4F0" strokeWidth="0.8" fill="none"/>
          
          {/* Estrella */}
          <path d="M 88 8 L 89 11 L 92 11 L 90 13 L 91 16 L 88 14 L 85 16 L 86 13 L 84 11 L 87 11 Z" fill="#FFD700" opacity="0.7"/>
          
          {/* Osito */}
          <ellipse cx="35" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <ellipse cx="55" cy="60" rx="8" ry="9" fill="#D4A574"/>
          <circle cx="45" cy="68" r="14" fill="#E5C9A6"/>
          <ellipse cx="45" cy="74" rx="8" ry="7" fill="#F5E6D3"/>
          <ellipse cx="45" cy="72" rx="3" ry="2.5" fill="#4A3728"/>
          <circle cx="40" cy="68" r="2" fill="#4A3728"/>
          <circle cx="50" cy="68" r="2" fill="#4A3728"/>
          <ellipse cx="45" cy="88" rx="12" ry="14" fill="#E5C9A6"/>
          <ellipse cx="38" cy="100" rx="6" ry="8" fill="#D4A574"/>
          <ellipse cx="52" cy="100" rx="6" ry="8" fill="#D4A574"/>
        </svg>
      </div>

      <div className="absolute bottom-20 left-20 bear-float">
        <svg viewBox="0 0 80 100" className="w-16 h-20 opacity-35">
          {/* Osito pequeño con estrella */}
          <path d="M 40 8 L 42 13 L 47 13 L 43 16 L 45 21 L 40 18 L 35 21 L 37 16 L 33 13 L 38 13 Z" fill="#FFD700" opacity="0.8"/>
          
          <ellipse cx="28" cy="45" rx="7" ry="8" fill="#D4A574"/>
          <ellipse cx="52" cy="45" rx="7" ry="8" fill="#D4A574"/>
          <circle cx="40" cy="52" r="12" fill="#E5C9A6"/>
          <ellipse cx="40" cy="57" rx="7" ry="6" fill="#F5E6D3"/>
          <ellipse cx="40" cy="55" rx="2.5" ry="2" fill="#4A3728"/>
          <circle cx="36" cy="52" r="1.5" fill="#4A3728"/>
          <circle cx="44" cy="52" r="1.5" fill="#4A3728"/>
          <ellipse cx="40" cy="70" rx="10" ry="12" fill="#E5C9A6"/>
          <ellipse cx="34" cy="82" rx="5" ry="7" fill="#D4A574"/>
          <ellipse cx="46" cy="82" rx="5" ry="7" fill="#D4A574"/>
        </svg>
      </div>

      {/* Globos */}
      <div className="absolute top-32 left-1/4 balloon-float">
        <svg viewBox="0 0 50 70" className="w-12 h-16 opacity-40">
          <ellipse cx="25" cy="25" rx="15" ry="20" fill="#EC4899"/>
          <path d="M 25 45 Q 23 55 25 60" stroke="#EC4899" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      <div className="absolute bottom-32 right-1/4 balloon-float">
        <svg viewBox="0 0 50 70" className="w-12 h-16 opacity-40">
          <ellipse cx="25" cy="25" rx="15" ry="20" fill="#3B82F6"/>
          <path d="M 25 45 Q 27 55 25 60" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Corazones */}
      <div className="absolute top-1/3 left-12 heart-pulse">
        <svg viewBox="0 0 50 50" className="w-10 h-10 opacity-30">
          <path d="M25 40 C 15 32, 10 27, 10 22 C 10 15, 18 12, 22 18 C 23 20, 25 22, 25 22 C 25 22, 27 20, 28 18 C 32 12, 40 15, 40 22 C 40 27, 35 32, 25 40 Z" fill="#F472B6"/>
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-12 heart-pulse">
        <svg viewBox="0 0 50 50" className="w-8 h-8 opacity-30">
          <path d="M25 40 C 15 32, 10 27, 10 22 C 10 15, 18 12, 22 18 C 23 20, 25 22, 25 22 C 25 22, 27 20, 28 18 C 32 12, 40 15, 40 22 C 40 27, 35 32, 25 40 Z" fill="#60A5FA"/>
        </svg>
      </div>

      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200 opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-200 opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-pink-100">
          {/* Header con osito grande */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 12 }}
              className="inline-block mb-4"
            >
              {/* Imagen personalizada - Osito con globos */}
              <div className="relative w-40 h-48 mx-auto">
                <svg viewBox="0 0 200 280" className="w-full h-full drop-shadow-xl">
                  {/* Racimo de globos rosa - múltiples capas */}
                  <g className="balloon-float">
                    {/* Capa trasera */}
                    <ellipse cx="80" cy="35" rx="16" ry="20" fill="#E8B4D4" stroke="#C9859F" strokeWidth="1.5" opacity="0.85"/>
                    <ellipse cx="80" cy="32" rx="12" ry="16" fill="#F5D4E8"/>
                    <ellipse cx="77" cy="28" rx="6" ry="9" fill="#FFFFFF" opacity="0.5"/>
                    
                    <ellipse cx="120" cy="35" rx="16" ry="20" fill="#E8B4D4" stroke="#C9859F" strokeWidth="1.5" opacity="0.85"/>
                    <ellipse cx="120" cy="32" rx="12" ry="16" fill="#F5D4E8"/>
                    <ellipse cx="117" cy="28" rx="6" ry="9" fill="#FFFFFF" opacity="0.5"/>
                    
                    {/* Capa media */}
                    <ellipse cx="60" cy="50" rx="18" ry="23" fill="#DDA5C8" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="60" cy="47" rx="14" ry="19" fill="#F0C4DD"/>
                    <ellipse cx="57" cy="43" rx="7" ry="10" fill="#FFFFFF" opacity="0.6"/>
                    
                    <ellipse cx="100" cy="45" rx="20" ry="25" fill="#D99BBF" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="100" cy="42" rx="16" ry="21" fill="#EEBDD6"/>
                    <ellipse cx="97" cy="38" rx="8" ry="11" fill="#FFFFFF" opacity="0.7"/>
                    
                    <ellipse cx="140" cy="50" rx="18" ry="23" fill="#DDA5C8" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="140" cy="47" rx="14" ry="19" fill="#F0C4DD"/>
                    <ellipse cx="137" cy="43" rx="7" ry="10" fill="#FFFFFF" opacity="0.6"/>
                    
                    {/* Capa frontal central */}
                    <ellipse cx="70" cy="65" rx="19" ry="24" fill="#D99BBF" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="70" cy="62" rx="15" ry="20" fill="#EEBDD6"/>
                    <ellipse cx="67" cy="58" rx="8" ry="11" fill="#FFFFFF" opacity="0.7"/>
                    
                    <ellipse cx="100" cy="70" rx="21" ry="26" fill="#CC88B3" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="100" cy="67" rx="17" ry="22" fill="#E8B4D4"/>
                    <ellipse cx="97" cy="62" rx="9" ry="12" fill="#FFFFFF" opacity="0.8"/>
                    
                    <ellipse cx="130" cy="65" rx="19" ry="24" fill="#D99BBF" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="130" cy="62" rx="15" ry="20" fill="#EEBDD6"/>
                    <ellipse cx="127" cy="58" rx="8" ry="11" fill="#FFFFFF" opacity="0.7"/>
                    
                    {/* Globos superiores pequeños */}
                    <ellipse cx="90" cy="25" rx="14" ry="18" fill="#E8B4D4" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="90" cy="23" rx="10" ry="14" fill="#F5D4E8"/>
                    <ellipse cx="88" cy="20" rx="5" ry="7" fill="#FFFFFF" opacity="0.5"/>
                    
                    <ellipse cx="110" cy="25" rx="14" ry="18" fill="#DDA5C8" stroke="#C9859F" strokeWidth="1.5"/>
                    <ellipse cx="110" cy="23" rx="10" ry="14" fill="#F0C4DD"/>
                    <ellipse cx="108" cy="20" rx="5" ry="7" fill="#FFFFFF" opacity="0.5"/>
                    
                    {/* Cuerdas de globos convergiendo */}
                    <path d="M 60 73 Q 80 105 95 130" stroke="#C9A189" strokeWidth="1" fill="none" opacity="0.4"/>
                    <path d="M 70 89 Q 85 110 98 130" stroke="#C9A189" strokeWidth="1" fill="none" opacity="0.4"/>
                    <path d="M 80 58 Q 92 95 100 130" stroke="#C9A189" strokeWidth="1" fill="none" opacity="0.4"/>
                    <path d="M 100 96 Q 100 115 100 130" stroke="#C9A189" strokeWidth="1.2" fill="none" opacity="0.5"/>
                    <path d="M 120 58 Q 108 95 102 130" stroke="#C9A189" strokeWidth="1" fill="none" opacity="0.4"/>
                    <path d="M 130 89 Q 112 110 105 130" stroke="#C9A189" strokeWidth="1" fill="none" opacity="0.4"/>
                    <path d="M 140 73 Q 115 105 108 130" stroke="#C9A189" strokeWidth="1" fill="none" opacity="0.4"/>
                  </g>

                  {/* Osito de peluche con textura */}
                  <g className="bear-sway">
                    {/* Brazo izquierdo sosteniendo cuerdas */}
                    <ellipse cx="75" cy="145" rx="11" ry="20" fill="#C9A189" transform="rotate(-35 75 145)"/>
                    <ellipse cx="75" cy="145" rx="8" ry="16" fill="#D4B49A" transform="rotate(-35 75 145)"/>
                    <ellipse cx="73" cy="140" rx="5" ry="10" fill="#E5C9A6" transform="rotate(-35 75 145)"/>
                    <circle cx="70" cy="135" r="6" fill="#D4B49A"/>
                    <circle cx="70" cy="135" r="4" fill="#E5C9A6"/>
                    
                    {/* Orejas */}
                    <ellipse cx="80" cy="135" rx="11" ry="13" fill="#C9A189"/>
                    <ellipse cx="80" cy="135" rx="7" ry="9" fill="#E5C9A6"/>
                    <ellipse cx="120" cy="135" rx="11" ry="13" fill="#C9A189"/>
                    <ellipse cx="120" cy="135" rx="7" ry="9" fill="#E5C9A6"/>
                    
                    {/* Cabeza */}
                    <ellipse cx="100" cy="150" rx="26" ry="24" fill="#C9A189"/>
                    <ellipse cx="100" cy="150" rx="22" ry="20" fill="#D4B49A"/>
                    
                    {/* Hocico */}
                    <ellipse cx="100" cy="160" rx="15" ry="13" fill="#F5E6D3"/>
                    <ellipse cx="100" cy="160" rx="11" ry="9" fill="#FFF4E6"/>
                    
                    {/* Nariz */}
                    <ellipse cx="100" cy="157" rx="4" ry="3.5" fill="#4A3728"/>
                    <ellipse cx="98.5" cy="156" rx="1.5" ry="1.2" fill="#6B5D52" opacity="0.6"/>
                    
                    {/* Boca */}
                    <path d="M 100 157 L 100 163" stroke="#4A3728" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M 93 165 Q 100 169 107 165" stroke="#4A3728" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    
                    {/* Ojos */}
                    <ellipse cx="90" cy="150" rx="3.5" ry="4.5" fill="#4A3728"/>
                    <ellipse cx="89" cy="148.5" rx="1.3" ry="1.8" fill="#FFFFFF" opacity="0.9"/>
                    <ellipse cx="110" cy="150" rx="3.5" ry="4.5" fill="#4A3728"/>
                    <ellipse cx="109" cy="148.5" rx="1.3" ry="1.8" fill="#FFFFFF" opacity="0.9"/>
                    
                    {/* Mejillas rosadas */}
                    <ellipse cx="82" cy="158" rx="5" ry="3" fill="#F5B6D4" opacity="0.4"/>
                    <ellipse cx="118" cy="158" rx="5" ry="3" fill="#F5B6D4" opacity="0.4"/>
                    
                    {/* Cuerpo */}
                    <ellipse cx="100" cy="195" rx="28" ry="30" fill="#C9A189"/>
                    <ellipse cx="100" cy="195" rx="24" ry="26" fill="#D4B49A"/>
                    <ellipse cx="100" cy="200" rx="16" ry="18" fill="#F5E6D3"/>
                    <ellipse cx="100" cy="200" rx="12" ry="14" fill="#FFF4E6"/>
                    
                    {/* Brazo derecho */}
                    <ellipse cx="125" cy="185" rx="11" ry="20" fill="#C9A189" transform="rotate(25 125 185)"/>
                    <ellipse cx="125" cy="185" rx="8" ry="16" fill="#D4B49A" transform="rotate(25 125 185)"/>
                    <circle cx="130" cy="200" r="6" fill="#D4B49A"/>
                    <circle cx="130" cy="200" r="4" fill="#E5C9A6"/>
                    
                    {/* Piernas */}
                    <ellipse cx="85" cy="230" rx="12" ry="18" fill="#C9A189"/>
                    <ellipse cx="85" cy="230" rx="9" ry="14" fill="#D4B49A"/>
                    <ellipse cx="85" cy="242" rx="10" ry="7" fill="#F5E6D3"/>
                    <ellipse cx="85" cy="242" rx="7" ry="5" fill="#FFF4E6"/>
                    
                    <ellipse cx="115" cy="230" rx="12" ry="18" fill="#C9A189"/>
                    <ellipse cx="115" cy="230" rx="9" ry="14" fill="#D4B49A"/>
                    <ellipse cx="115" cy="242" rx="10" ry="7" fill="#F5E6D3"/>
                    <ellipse cx="115" cy="242" rx="7" ry="5" fill="#FFF4E6"/>
                    
                    {/* Moño rosa en el cuello */}
                    <path d="M 88 175 Q 82 173 80 177 Q 82 181 88 179 Q 94 181 100 179 Q 106 181 112 179 Q 118 181 120 177 Q 118 173 112 175 Q 106 171 100 173 Q 94 171 88 175 Z" fill="#F5B6D4"/>
                    <path d="M 88 175 Q 82 173 80 177 Q 82 181 88 179 Q 94 181 100 179" fill="#E8A5C8"/>
                    <ellipse cx="100" cy="176" rx="5" ry="4" fill="#DDA5C8"/>
                    <path d="M 97 174 Q 100 176 103 174" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  </g>
                </svg>
              </div>
            </motion.div>
                {/* Globos rosa */}
                <g className="balloon-float">
                  <ellipse cx="50" cy="30" rx="18" ry="22" fill="#FFB6D9" opacity="0.9"/>
                  <ellipse cx="50" cy="28" rx="14" ry="18" fill="#FFC9E3"/>
                  <ellipse cx="48" cy="25" rx="6" ry="8" fill="#FFFFFF" opacity="0.6"/>
                  <path d="M 50 52 Q 48 65 50 70" stroke="#E8A5C8" strokeWidth="1" fill="none"/>
                  
                  <ellipse cx="70" cy="25" rx="16" ry="20" fill="#FFB6D9" opacity="0.9"/>
                  <ellipse cx="70" cy="23" rx="12" ry="16" fill="#FFC9E3"/>
                  <ellipse cx="68" cy="21" rx="5" ry="7" fill="#FFFFFF" opacity="0.6"/>
                  <path d="M 70 45 Q 68 58 70 65" stroke="#E8A5C8" strokeWidth="1" fill="none"/>
                </g>

                {/* Globos azules */}
                <g className="balloon-float">
                  <ellipse cx="150" cy="30" rx="18" ry="22" fill="#A8D5FF" opacity="0.9"/>
                  <ellipse cx="150" cy="28" rx="14" ry="18" fill="#C5E4FF"/>
                  <ellipse cx="148" cy="25" rx="6" ry="8" fill="#FFFFFF" opacity="0.6"/>
                  <path d="M 150 52 Q 152 65 150 70" stroke="#8CC4F0" strokeWidth="1" fill="none"/>
                  
                  <ellipse cx="130" cy="25" rx="16" ry="20" fill="#A8D5FF" opacity="0.9"/>
                  <ellipse cx="130" cy="23" rx="12" ry="16" fill="#C5E4FF"/>
                  <ellipse cx="128" cy="21" rx="5" ry="7" fill="#FFFFFF" opacity="0.6"/>
                  <path d="M 130 45 Q 132 58 130 65" stroke="#8CC4F0" strokeWidth="1" fill="none"/>
                </g>

                {/* Estrellas doradas */}
                <g className="heart-pulse">
                  <path d="M 35 15 L 37 20 L 42 20 L 38 23 L 40 28 L 35 25 L 30 28 L 32 23 L 28 20 L 33 20 Z" fill="#FFD700" opacity="0.8"/>
                  <path d="M 165 15 L 167 20 L 172 20 L 168 23 L 170 28 L 165 25 L 160 28 L 162 23 L 158 20 L 163 20 Z" fill="#FFD700" opacity="0.8"/>
                  <path d="M 20 45 L 22 48 L 25 48 L 23 50 L 24 53 L 20 51 L 16 53 L 17 50 L 15 48 L 18 48 Z" fill="#FFD700" opacity="0.6"/>
                  <path d="M 180 45 L 182 48 L 185 48 L 183 50 L 184 53 L 180 51 L 176 53 L 177 50 L 175 48 L 178 48 Z" fill="#FFD700" opacity="0.6"/>
                </g>

                {/* Cuerdas de los globos */}
                <path d="M 50 70 Q 85 90 95 100" stroke="#E8A5C8" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 70 65 Q 92 85 98 95" stroke="#E8A5C8" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 150 70 Q 115 90 105 100" stroke="#8CC4F0" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 130 65 Q 108 85 102 95" stroke="#8CC4F0" strokeWidth="1.5" fill="none" opacity="0.6"/>

                {/* Osito de peluche */}
                <g>
                  {/* Orejas */}
                  <ellipse cx="75" cy="105" rx="12" ry="14" fill="#D4A574"/>
                  <ellipse cx="75" cy="105" rx="8" ry="10" fill="#E5C9A6"/>
                  <ellipse cx="125" cy="105" rx="12" ry="14" fill="#D4A574"/>
                  <ellipse cx="125" cy="105" rx="8" ry="10" fill="#E5C9A6"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="100" cy="115" rx="28" ry="26" fill="#D4A574"/>
                  <ellipse cx="100" cy="115" rx="24" ry="22" fill="#E5C9A6"/>
                  
                  {/* Hocico */}
                  <ellipse cx="100" cy="125" rx="16" ry="14" fill="#F5E6D3"/>
                  <ellipse cx="100" cy="125" rx="12" ry="10" fill="#FFF4E6"/>
                  
                  {/* Nariz */}
                  <ellipse cx="100" cy="122" rx="5" ry="4" fill="#4A3728"/>
                  <ellipse cx="98" cy="121" rx="2" ry="1.5" fill="#6B5D52" opacity="0.6"/>
                  
                  {/* Boca */}
                  <path d="M 100 122 L 100 128" stroke="#4A3728" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M 92 130 Q 100 134 108 130" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  
                  {/* Ojos */}
                  <ellipse cx="88" cy="115" rx="4" ry="5" fill="#4A3728"/>
                  <ellipse cx="87" cy="113" rx="1.5" ry="2" fill="#FFFFFF" opacity="0.8"/>
                  <ellipse cx="112" cy="115" rx="4" ry="5" fill="#4A3728"/>
                  <ellipse cx="111" cy="113" rx="1.5" ry="2" fill="#FFFFFF" opacity="0.8"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="100" cy="165" rx="30" ry="32" fill="#D4A574"/>
                  <ellipse cx="100" cy="165" rx="26" ry="28" fill="#E5C9A6"/>
                  <ellipse cx="100" cy="170" rx="18" ry="20" fill="#F5E6D3"/>
                  
                  {/* Brazos */}
                  <ellipse cx="70" cy="155" rx="10" ry="18" fill="#D4A574" transform="rotate(-20 70 155)"/>
                  <ellipse cx="70" cy="155" rx="7" ry="14" fill="#E5C9A6" transform="rotate(-20 70 155)"/>
                  <ellipse cx="130" cy="155" rx="10" ry="18" fill="#D4A574" transform="rotate(20 130 155)"/>
                  <ellipse cx="130" cy="155" rx="7" ry="14" fill="#E5C9A6" transform="rotate(20 130 155)"/>
                  
                  {/* Patas */}
                  <ellipse cx="85" cy="200" rx="12" ry="16" fill="#D4A574"/>
                  <ellipse cx="85" cy="200" rx="9" ry="12" fill="#E5C9A6"/>
                  <ellipse cx="85" cy="210" rx="10" ry="6" fill="#F5E6D3"/>
                  
                  <ellipse cx="115" cy="200" rx="12" ry="16" fill="#D4A574"/>
                  <ellipse cx="115" cy="200" rx="9" ry="12" fill="#E5C9A6"/>
                  <ellipse cx="115" cy="210" rx="10" ry="6" fill="#F5E6D3"/>
                  
                  {/* Moño azul */}
                  <path d="M 95 100 Q 90 98 88 102 Q 90 105 95 103 Q 100 105 105 103 Q 110 105 112 102 Q 110 98 105 100 Q 100 95 95 100 Z" fill="#93C5FD"/>
                  <ellipse cx="100" cy="101" rx="4" ry="3" fill="#60A5FA"/>
                </g>
              </svg>
            </motion.div>
            
            <h1 className="text-4xl font-bold font-serif mb-2">
              <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                {isAlreadyRegistered ? `¡Hola ${guest.name}!` : '¿Niña o Niño?'}
              </span>
            </h1>
            <p className="text-gray-600">
              {isAlreadyRegistered
                ? 'Continúa a la celebración'
                : 'Escribe tu nombre para descubrirlo'}
            </p>
          </div>

          {/* Si ya está registrado */}
          {isAlreadyRegistered ? (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-pink-50 to-blue-50 border-2 border-pink-200 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {guest.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{guest.name}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
                      <span>✓</span> Listo para la fiesta
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Siguiente 🎉
              </motion.button>

              <button
                onClick={() => {
                  if (confirm('¿Cambiar de invitado?')) {
                    clearGuest()
                  }
                }}
                className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                Registrar otro nombre
              </button>
            </div>
          ) : (
            /* Formulario simplificado - solo nombre */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>👤</span>
                  Tu nombre
                </label>
                <input
                  id="name"
                  type="text"
                  autoFocus
                  {...register('name', {
                    required: 'Por favor escribe tu nombre',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres',
                    },
                  })}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                  placeholder="Ej: María García"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 font-medium"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  '¡Descubrir! 🎀💙'
                )}
              </motion.button>
            </form>
          )}

          {/* Footer con decoración */}
          <div className="mt-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-2xl">🎈</span>
              <span className="text-2xl">🍼</span>
              <span className="text-2xl">👶</span>
              <span className="text-2xl">🎁</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Un momento muy especial 💗💙
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
