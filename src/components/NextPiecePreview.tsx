'use client'

import { useRef, useEffect } from 'react'
import type { ActivePiece } from '@/types/game'
import { renderPreview } from '@/lib/renderer'
import { getAwsManifest } from '@/lib/aws-manifest'

const PREVIEW_SIZE = 220

interface NextPiecePreviewProps {
  piece: ActivePiece | null
}

function getFullDescription(comando: string): string {
  const manifest = getAwsManifest()
  const svc = manifest.find((s) => s.comando === comando)
  if (!svc) return ''
  return svc.descricao
}

export default function NextPiecePreview({ piece }: NextPiecePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    renderPreview(ctx, piece, PREVIEW_SIZE, PREVIEW_SIZE)
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        color: '#FF9900',
        fontSize: '0.9rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.5rem',
      }}>
        Próxima
      </div>
      <canvas
        ref={canvasRef}
        width={PREVIEW_SIZE}
        height={PREVIEW_SIZE}
        style={{
          border: '1px solid rgba(255, 153, 0, 0.3)',
          borderRadius: '4px',
          display: 'block',
          margin: '0 auto',
        }}
      />
      {piece && (
        <div style={{
          marginTop: '0.6rem',
          width: `${PREVIEW_SIZE}px`,
          textAlign: 'left',
        }}>
          <div style={{
            color: '#FF9900',
            fontSize: '1rem',
            fontWeight: 600,
          }}>
            {piece.service.comando}
          </div>
          <div style={{
            color: '#F2F3F3',
            fontSize: '0.85rem',
            marginTop: '0.3rem',
            opacity: 0.8,
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}>
            {getFullDescription(piece.service.comando)}
          </div>
        </div>
      )}
    </div>
  )
}
