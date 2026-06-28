'use client'

import { useCallback, useState, useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'
import NextPiecePreview from '@/components/NextPiecePreview'
import RankingModal from '@/components/RankingModal'
import GameOverScreen from '@/components/GameOverScreen'
import { useGameLoop } from '@/hooks/useGameLoop'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useGameAudio } from '@/hooks/useGameAudio'
import { preloadIcons } from '@/lib/renderer'
import { getAwsManifest } from '@/lib/aws-manifest'
import type { GameEvent } from '@/lib/engine'

export default function Home() {
  useEffect(() => {
    const manifest = getAwsManifest()
    const paths = manifest.map((s) => s.iconPath)
    preloadIcons(paths)
  }, [])
  const [rankingOpen, setRankingOpen] = useState(false)
  const [flashLines, setFlashLines] = useState(false)
  const { muted, playBgm, playBeep, playGameover, toggleMute } = useGameAudio()

  const handleEvent = useCallback((event: GameEvent) => {
    if (event.type === 'PIECE_LOCKED') {
      playBeep()
    } else if (event.type === 'LINES_CLEARED') {
      setFlashLines(true)
      setTimeout(() => setFlashLines(false), 200)
    } else if (event.type === 'GAME_OVER') {
      playGameover()
    }
  }, [playBeep, playGameover])

  const { gameState, dispatch, start, setSoftDrop } = useGameLoop({
    onEvent: handleEvent,
  })

  useKeyboard({
    dispatch,
    setSoftDrop,
    enabled: gameState.status === 'playing',
  })

  const handleStart = useCallback(() => {
    playBgm()
    start()
  }, [playBgm, start])

  const handleRestart = useCallback(() => {
    playBgm()
    start()
  }, [playBgm, start])

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '0.75rem',
      padding: '1rem',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '520px',
        justifyContent: 'space-between',
      }}>
        <h1 style={{
          color: '#FF9900',
          fontSize: '1.5rem',
          fontWeight: 700,
          margin: 0,
        }}>
          AWS Tetris Pro
        </h1>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setRankingOpen(true)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 153, 0, 0.5)',
              borderRadius: '4px',
              color: '#FF9900',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Ranking
          </button>
          {gameState.status === 'playing' && (
            <button
              onClick={toggleMute}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 153, 0, 0.4)',
                borderRadius: '4px',
                color: muted ? '#DD344C' : '#FF9900',
                padding: '0.35rem 0.8rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {muted ? 'Som OFF' : 'Som ON'}
            </button>
          )}
        </div>
      </div>

      {/* Game area */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <GameCanvas
          grid={gameState.grid}
          activePiece={gameState.activePiece}
          flashLines={flashLines}
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minWidth: '140px',
        }}>
          <StatBox label="Pontuação" value={gameState.score.toLocaleString('pt-BR')} />
          <StatBox label="Nível" value={String(gameState.level)} />
          <StatBox label="Linhas" value={String(gameState.linesCleared)} />
          <NextPiecePreview piece={gameState.nextPiece} />
        </div>
      </div>

      {/* Footer controls */}
      {gameState.status === 'idle' && (
        <button
          onClick={handleStart}
          style={{
            background: '#FF9900',
            color: '#232F3E',
            border: 'none',
            borderRadius: '6px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Começar
        </button>
      )}

      {gameState.status === 'playing' && (
        <div style={{ color: 'rgba(242, 243, 243, 0.5)', fontSize: '0.75rem' }}>
          A/D mover &bull; W girar &bull; S acelerar
        </div>
      )}

      {/* Modals */}
      <RankingModal open={rankingOpen} onClose={() => setRankingOpen(false)} />

      {gameState.status === 'gameover' && (
        <GameOverScreen score={gameState.score} onRestart={handleRestart} />
      )}
    </main>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: 'rgba(255, 153, 0, 0.08)',
      border: '1px solid rgba(255, 153, 0, 0.25)',
      borderRadius: '6px',
      padding: '0.6rem',
      textAlign: 'center',
    }}>
      <div style={{
        color: '#FF9900',
        fontSize: '0.65rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
      }}>
        {label}
      </div>
      <div style={{ color: '#F2F3F3', fontSize: '1.3rem', fontWeight: 700 }}>
        {value}
      </div>
    </div>
  )
}
