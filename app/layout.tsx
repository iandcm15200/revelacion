import type { Metadata } from 'next'
import { Indie_Flower, Oswald } from 'next/font/google'
import './globals.css'
import BackgroundMusic from '@/components/BackgroundMusic'

const indieFlower = Indie_Flower({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-indie',
})

const oswald = Oswald({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'Revelación de Género',
  description: 'Únete a nosotros para descubrir si será niña o niño',
  keywords: 'revelación de género, baby shower, bebé, niña, niño',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${indieFlower.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-indie antialiased">
        <BackgroundMusic />
        {children}
      </body>
    </html>
  )
}
