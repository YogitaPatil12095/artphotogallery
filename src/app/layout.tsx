import type { Metadata } from 'next'
import { DM_Sans, IBM_Plex_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crony — A Personal Archive',
  description: 'A curated collection of moments, stories, and visuals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable}`}>
      <body className="bg-charcoal text-off-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
