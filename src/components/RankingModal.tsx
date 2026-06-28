'use client'

import { useState, useEffect } from 'react'

interface RankingEntry {
  posicao: number
  nome: string
  pontuacao: number
}

interface RankingModalProps {
  open: boolean
  onClose: () => void
}

export default function RankingModal({ open, onClose }: RankingModalProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch('/api/ranking')
      .then((r) => r.json())
      .then((data) => setRanking(data.ranking ?? []))
      .catch(() => setRanking([]))
      .finally(() => setLoading(false))
  }, [open])

  if (!open) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div
        style={{
          background: '#1a2332',
          border: '2px solid #FF9900',
          borderRadius: '8px',
          padding: '1.5rem',
          minWidth: '380px',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <h2 style={{ color: '#FF9900', margin: 0, fontSize: '1.3rem' }}>
            Top 20
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F2F3F3',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#F2F3F3', opacity: 0.7, textAlign: 'center' }}>
            Carregando...
          </p>
        ) : ranking.length === 0 ? (
          <p style={{ color: '#F2F3F3', opacity: 0.7, textAlign: 'center' }}>
            Nenhuma pontuação registrada.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Nome</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((entry) => (
                <tr key={entry.posicao}>
                  <td style={tdStyle}>{entry.posicao}</td>
                  <td style={{ ...tdStyle, textAlign: 'left' }}>{entry.nome}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    {entry.pontuacao.toLocaleString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  color: '#FF9900',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '0.4rem 0.5rem',
  borderBottom: '1px solid rgba(255, 153, 0, 0.3)',
  textAlign: 'center',
}

const tdStyle: React.CSSProperties = {
  color: '#F2F3F3',
  fontSize: '0.85rem',
  padding: '0.4rem 0.5rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  textAlign: 'center',
}
