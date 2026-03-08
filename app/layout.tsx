import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CineHall Social',
  description: 'Discover and share cinematic content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body style={{ fontFamily: 'var(--font-jetbrains), monospace', margin: 0, background: '#0a0a0f', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
