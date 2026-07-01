import type { AwsCategory } from '@/lib/aws-manifest'

export interface Cell {
  iconPath: string
  category: AwsCategory
  comando: string
}

export type Grid = (Cell | null)[][]

export type TetrominoShape = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L' | 'D'

export interface ActivePiece {
  shape: TetrominoShape
  rotation: number
  x: number
  y: number
  service: {
    comando: string
    iconPath: string
    category: AwsCategory
  }
}

export interface GameState {
  grid: Grid
  activePiece: ActivePiece | null
  nextPiece: ActivePiece | null
  score: number
  level: number
  linesCleared: number
  status: 'idle' | 'playing' | 'gameover'
  lastServiceIndex: number
}
