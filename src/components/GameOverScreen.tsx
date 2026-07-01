'use client'

import { useState, useEffect } from 'react'

const EMOJI_LIST = [
  '🐶', '🐱', '🐼', '🦊', '🐸', '🐵', '🦁', '🐯', '🐻', '🐨',
  '🐷', '🐔', '🦄', '🐲', '🦈', '🐙', '🦋', '🐢', '🐊', '🦜',
  '👨', '👩', '👨‍💻', '👩‍💻', '🧑‍🚀', '🧑‍🔬', '🧛', '🧟', '🤖', '👾',
  '👨‍🦱', '👩‍🦱', '👱‍♂️', '👱‍♀️', '👨‍🦳', '👩‍🦳', '🧑‍🎤', '🦹', '🧙', '🎅',
]

interface GameOverScreenProps {
  score: number
  onRestart: () => void
}

export default function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
  const [qualifies, setQualifies] = useState<boolean | null>(null)
  const [nome, setNome] = useState('')
  const [emoji, setEmoji] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ posicao: number } | null>(null)

  useEffect(() => {
    fetch('/api/ranking')
      .then((r) => r.json())
      .then((data) => {
        const ranking = data.ranking ?? []
        if (ranking.length < 20) {
          setQualifies(true)
        } else {
          const lowest = ranking[ranking.length - 1].pontuacao
          setQualifies(score >= lowest)
        }
      })
      .catch(() => setQualifies(true))
  }, [score])

  const handleSubmit = async () => {
    const trimmed = nome.trim()
    if (!trimmed || submitting) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: trimmed, pontuacao: score, emoji }),
      })
      const data = await res.json()
      if (data.qualificou) {
        setResult({ posicao: data.posicao })
      } else {
        setQualifies(false)
      }
    } catch {
      setQualifies(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#1a2332',
        border: '2px solid #DD344C',
        borderRadius: '8px',
        padding: '2rem',
        minWidth: '360px',
        maxWidth: '420px',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#DD344C', margin: '0 0 0.5rem', fontSize: '1.5rem' }}>
          Game Over
        </h2>
        <p style={{ color: '#F2F3F3', fontSize: '1.1rem', margin: '0 0 1.5rem' }}>
          Pontuação: <strong style={{ color: '#FF9900' }}>
            {score.toLocaleString('pt-BR')}
          </strong>
        </p>

        {qualifies === null && (
          <p style={{ color: '#F2F3F3', opacity: 0.7 }}>Verificando ranking...</p>
        )}

        {qualifies === false && !result && (
          <p style={{ color: '#F2F3F3', opacity: 0.8 }}>
            Pontuação não entrou no Top 20.
          </p>
        )}

        {qualifies === true && !result && (
          <div>
            <p style={{ color: '#FF9900', margin: '0 0 0.75rem', fontWeight: 600 }}>
              Parabéns! Você entrou no Top 20!
            </p>

            {/* Emoji picker */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{
                color: '#F2F3F3',
                fontSize: '0.75rem',
                marginBottom: '0.4rem',
                opacity: 0.8,
              }}>
                Escolha um avatar:
              </div>
              <div style={{
                maxHeight: '120px',
                overflowY: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: '4px',
                background: '#232F3E',
                borderRadius: '4px',
                padding: '6px',
                border: '1px solid rgba(255, 153, 0, 0.3)',
              }}>
                {EMOJI_LIST.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    style={{
                      background: emoji === e ? 'rgba(255, 153, 0, 0.3)' : 'transparent',
                      border: emoji === e ? '1px solid #FF9900' : '1px solid transparent',
                      borderRadius: '4px',
                      fontSize: '1.3rem',
                      cursor: 'pointer',
                      padding: '2px',
                      lineHeight: 1.2,
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                background: '#232F3E',
                border: '1px solid rgba(255, 153, 0, 0.5)',
                borderRadius: '4px',
                padding: '0.6rem',
                fontSize: '1.3rem',
                minWidth: '42px',
                textAlign: 'center',
                lineHeight: 1,
              }}>
                {emoji || '?'}
              </div>
              <input
                type="text"
                placeholder="Seu nome (máx. 30 caracteres)"
                maxLength={30}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 153, 0, 0.5)',
                  background: '#232F3E',
                  color: '#F2F3F3',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                autoFocus
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || nome.trim().length === 0}
              style={{
                background: submitting ? '#666' : '#FF9900',
                color: '#232F3E',
                border: 'none',
                borderRadius: '6px',
                padding: '0.6rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: submitting ? 'default' : 'pointer',
                width: '100%',
              }}
            >
              {submitting ? 'Salvando...' : 'Registrar'}
            </button>
          </div>
        )}

        {result && (
          <p style={{ color: '#FF9900', fontSize: '1.1rem', fontWeight: 600 }}>
            Posição conquistada: #{result.posicao}
          </p>
        )}

        <button
          onClick={onRestart}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 153, 0, 0.5)',
            borderRadius: '6px',
            color: '#FF9900',
            padding: '0.5rem 1.5rem',
            fontSize: '0.85rem',
            cursor: 'pointer',
            marginTop: '1.2rem',
          }}
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  )
}
