'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/app/portada/styles.css'
import FloatingBearsBackground from '@/components/FloatingBears'

export default function PortadaPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <div className="portada-wrapper">
      <FloatingBearsBackground />
      <div className="portada-stack">
        <div className={`card ${open ? 'open' : ''}`}>
          <div className="imgBox">
            <div className="bark"></div>
            <img src="/portada-cover.jpg" alt="Portada" />
          </div>
          <div className="details">
            <h4 className="color1">Felices fiestas</h4>
            <h4 className="color2 margin"></h4>
            <p className="intro">Querida familia y amigos,</p>
            <p></p>
            <p>Nos llena de alegría invitarlos a compartir</p>
            <p>con nosotros este momento tan especial.</p>
            <p></p>
            <p>Queremos que sean parte de este hermoso</p>
            <p>capítulo de nuestras vidas mientras descubrimos</p>
            <p>juntos si nuestro bebé será niña o niño.</p>
            <p></p>
            <p>Gracias por acompañarnos en esta aventura</p>
            <p>y por ser parte de nuestra historia.</p>
            <p></p>
            <p className="text-right">¡Feliz Navidad!</p>
            <p className="text-right">Con amor, Jessie & Fabian</p>
            <p></p>
            <button onClick={(e) => { e.stopPropagation(); router.push('/') }} className="shimmer-btn shimmer-btn--pink">
              <span className="text">Siguiente →</span>
              <span className="shimmer" />
            </button>
          </div>
        </div>
        {!open ? (
          <button onClick={() => setOpen(true)} className="shimmer-btn shimmer-btn--pink">
            <span className="text">Abrir tarjeta</span>
            <span className="shimmer" />
          </button>
        ) : (
          <button onClick={() => setOpen(false)} className="shimmer-btn shimmer-btn--pink">
            <span className="text">Cerrar tarjeta</span>
            <span className="shimmer" />
          </button>
        )}
      </div>
    </div>
  )
}
