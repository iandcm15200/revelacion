import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import BackgroundMusic from '@/components/BackgroundMusic'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: '¡Revelación de Género! 👶💗💙',
  description: 'Únete a nosotros para descubrir si será niña o niño',
  keywords: 'revelación de género, baby shower, bebé, niña, niño',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <BackgroundMusic />
        {children}
      </body>
    </html>
  )
}
