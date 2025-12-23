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

  // Si ya estñ¡ registrado, mostrar botñ³n de continuar
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

      // Redirigir a la pñ¡gina principal
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
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
              </svg>


      </div>

      <div className="absolute top-20 right-20 bear-float">
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
              </svg>


      </div>

      <div className="absolute bottom-20 left-20 bear-float">
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
              </svg>


      </div>

      {/* Globos */}
      <div className="absolute top-32 left-1/4 balloon-float">
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
              </svg>


      </div>

      <div className="absolute bottom-32 right-1/4 balloon-float">
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
              </svg>


      </div>

      {/* Corazones */}
      <div className="absolute top-1/3 left-12 heart-pulse">
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
              </svg>


      </div>

      <div className="absolute bottom-1/3 right-12 heart-pulse">
        <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
                </g>
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <svg viewBox="0 0 300 400" className="w-64 h-80">
                {/* Osito con racimo de globos rosas */}
                
                {/* Racimo de globos rosas en tonos pastel */}
                <g className="balloon-float">
                  {/* Capa trasera de globos */}
                  <ellipse cx="150" cy="80" rx="30" ry="35" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="148" cy="75" rx="18" ry="22" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="200" cy="90" rx="28" ry="33" fill="#D8A5B8" opacity="0.9"/>
                  <ellipse cx="198" cy="85" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="100" cy="95" rx="26" ry="31" fill="#F0C5D8" opacity="0.9"/>
                  <ellipse cx="98" cy="90" rx="15" ry="18" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa media de globos */}
                  <ellipse cx="180" cy="60" rx="32" ry="37" fill="#E0A8C0" opacity="0.95"/>
                  <ellipse cx="178" cy="55" rx="20" ry="24" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="120" cy="65" rx="30" ry="35" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="118" cy="60" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="210" cy="120" rx="27" ry="32" fill="#DDA0B8" opacity="0.9"/>
                  <ellipse cx="208" cy="115" rx="16" ry="20" fill="#FFFFFF" opacity="0.5"/>
                  
                  <ellipse cx="90" cy="130" rx="29" ry="34" fill="#E8B5C8" opacity="0.9"/>
                  <ellipse cx="88" cy="125" rx="17" ry="21" fill="#FFFFFF" opacity="0.5"/>
                  
                  {/* Capa frontal - globo central grande */}
                  <ellipse cx="150" cy="120" rx="38" ry="44" fill="#F0A8C8" opacity="1"/>
                  <ellipse cx="148" cy="113" rx="24" ry="28" fill="#FFFFFF" opacity="0.7"/>
                  
                  <ellipse cx="175" cy="145" rx="30" ry="35" fill="#E8B5C8" opacity="0.95"/>
                  <ellipse cx="173" cy="140" rx="18" ry="22" fill="#FFFFFF" opacity="0.6"/>
                  
                  <ellipse cx="125" cy="150" rx="28" ry="33" fill="#F8D5E8" opacity="0.95"/>
                  <ellipse cx="123" cy="145" rx="17" ry="20" fill="#FFFFFF" opacity="0.6"/>
                  
                  {/* Hilos de los globos convergiendo en la mano del osito */}
                  <path d="M 150 164 Q 145 200 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 175 180 Q 150 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 125 183 Q 135 210 142 240" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.6"/>
                  <path d="M 180 97 Q 155 160 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 120 100 Q 135 170 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 200 125 Q 160 180 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                  <path d="M 90 163 Q 125 200 142 240" stroke="#8B7355" strokeWidth="0.8" fill="none" opacity="0.5"/>
                </g>
                
                {/* Osito beige/marron */}
                <g className="bear-sway">
                  {/* Brazo izquierdo sosteniendo globos */}
                  <ellipse cx="115" cy="250" rx="18" ry="45" fill="#B89A7C" transform="rotate(-35 115 250)"/>
                  <ellipse cx="115" cy="250" rx="14" ry="40" fill="#C8AA8C" transform="rotate(-35 115 250)"/>
                  
                  {/* Mano sosteniendo hilos */}
                  <ellipse cx="135" cy="235" rx="14" ry="16" fill="#B89A7C"/>
                  <ellipse cx="135" cy="235" rx="10" ry="12" fill="#C8AA8C"/>
                  
                  {/* Cuerpo */}
                  <ellipse cx="150" cy="300" rx="48" ry="60" fill="#B89A7C"/>
                  <ellipse cx="150" cy="300" rx="42" ry="54" fill="#C8AA8C"/>
                  
                  {/* Panza clara */}
                  <ellipse cx="150" cy="310" rx="32" ry="42" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="310" rx="28" ry="38" fill="#F5EFE8"/>
                  
                  {/* Piernas */}
                  <ellipse cx="125" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="125" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  <ellipse cx="175" cy="355" rx="20" ry="28" fill="#B89A7C"/>
                  <ellipse cx="175" cy="355" rx="16" ry="24" fill="#C8AA8C"/>
                  
                  {/* Patas con almohadillas */}
                  <ellipse cx="125" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="125" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  <ellipse cx="175" cy="375" rx="18" ry="12" fill="#B89A7C"/>
                  <ellipse cx="175" cy="375" rx="14" ry="9" fill="#E8D8C8"/>
                  
                  {/* Cabeza */}
                  <ellipse cx="150" cy="260" rx="42" ry="45" fill="#B89A7C"/>
                  <ellipse cx="150" cy="260" rx="38" ry="41" fill="#C8AA8C"/>
                  
                  {/* Orejas */}
                  <ellipse cx="120" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="120" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  <ellipse cx="180" cy="235" rx="18" ry="20" fill="#B89A7C"/>
                  <ellipse cx="180" cy="235" rx="14" ry="16" fill="#E8D8C8"/>
                  
                  {/* Hocico */}
                  <ellipse cx="150" cy="275" rx="24" ry="20" fill="#E8D8C8"/>
                  <ellipse cx="150" cy="275" rx="20" ry="16" fill="#F5EFE8"/>
                  
                  {/* Nariz */}
                  <ellipse cx="150" cy="270" rx="7" ry="5" fill="#6B5A48"/>
                  <ellipse cx="147" cy="268" rx="2" ry="1.5" fill="#8B7A68" opacity="0.6"/>
                  
                  {/* Ojos tiernos */}
                  <circle cx="135" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="136" cy="254" r="2" fill="#FFFFFF"/>
                  <circle cx="165" cy="255" r="5" fill="#4A3828"/>
                  <circle cx="166" cy="254" r="2" fill="#FFFFFF"/>
                  
                  {/* Cejas suaves */}
                  <path d="M 128 248 Q 133 246 138 247" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  <path d="M 162 247 Q 167 246 172 248" stroke="#8B7355" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
                  
                  {/* Mejillas rosadas */}
                  <circle cx="120" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  <circle cx="180" cy="268" r="8" fill="#F8B5C8" opacity="0.5"/>
                  
                  {/* Boca */}
                  <path d="M 143 278 Q 150 282 157 278" stroke="#6B5A48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Brazo derecho */}
                  <ellipse cx="185" cy="295" rx="18" ry="42" fill="#B89A7C" transform="rotate(25 185 295)"/>
                  <ellipse cx="185" cy="295" rx="14" ry="37" fill="#C8AA8C" transform="rotate(25 185 295)"/>
                  
                  {/* Mono rosa en el cuello */}
                  <g className="heart-pulse">
                    <path d="M 140 285 L 135 295 L 140 305 L 145 300 L 150 305 L 155 300 L 160 305 L 165 295 L 160 285 Z" fill="#F8B5D8"/>
                    <ellipse cx="150" cy="290" rx="8" ry="6" fill="#FFD5E8"/>
                    
                    {/* Lazos del mono */}
                    <path d="M 135 295 Q 125 295 120 300 Q 125 305 135 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="128" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                    
                    <path d="M 165 295 Q 175 295 180 300 Q 175 305 165 305 Z" fill="#F8B5D8" opacity="0.9"/>
                    <ellipse cx="172" cy="300" rx="6" ry="8" fill="#FFD5E8" opacity="0.7"/>
                  </g>
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

          {/* Si ya estñ¡ registrado */}
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
                      <span>âœ“</span> Listo para la fiesta
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
                Siguiente 
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
                  <span></span>
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
                  placeholder="Ej: Marñ­a Garcñ­a"
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
                  '¡Descubrir! '
                )}
              </motion.button>
            </form>
          )}

          {/* Footer con decoraciñ³n */}
          <div className="mt-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-2xl"></span>
              <span className="text-2xl"></span>
              <span className="text-2xl"></span>
              <span className="text-2xl"></span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Un momento muy especial 
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



