'use client'

import { useRef, useEffect, useState } from 'react'
import type { ActivePiece, Grid } from '@/types/game'
import { renderGame, CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/renderer'

interface GameCanvasProps {
  grid: Grid
  activePiece: ActivePiece | null
  flashLines?: boolean
}

export default function GameCanvas({ grid, activePiece, flashLines }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLImageElement | null>(null)
  const [flashing, setFlashing] = useState(false)
  const [logoReady, setLogoReady] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = '/image/logo.png'
    img.onload = () => {
      logoRef.current = img
      setLogoReady(true)
    }
  }, [])

  useEffect(() => {
    if (flashLines) {
      setFlashing(true)
      const t = setTimeout(() => setFlashing(false), 150)
      return () => clearTimeout(t)
    }
  }, [flashLines])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    renderGame(ctx, grid, activePiece, logoRef.current)
  }, [grid, activePiece, logoReady])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{
        border: '2px solid #FF9900',
        borderRadius: '4px',
        display: 'block',
        boxShadow: flashing
          ? '0 0 20px rgba(255, 153, 0, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.15)'
          : 'none',
        transition: 'box-shadow 0.1s ease-out',
      }}
    />
  )
}
