import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AWS Tetris Pro',
  description: 'Tetris moderno com 235 serviços AWS oficiais. Ranking competitivo Top 20.',
  icons: { icon: '/image/favicon.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
