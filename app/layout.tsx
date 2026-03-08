import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CineHall — AI Cinema Social',
  description: 'Discover and share AI, tech, and science content',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
