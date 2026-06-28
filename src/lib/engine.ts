import type { ActivePiece, Cell, GameState, Grid, TetrominoShape } from '@/types/game'
import { getAwsManifest, type AwsService } from '@/lib/aws-manifest'
import { ALL_SHAPES, getBlocks } from '@/lib/tetrominos'

export const COLS = 10
export const ROWS = 20
const LINES_PER_LEVEL = 10
const MAX_LEVEL = 10
const BASE_INTERVAL = 1000
const SPEED_FACTOR = 0.82

const LINE_SCORES = [0, 100, 300, 500, 1200]

export function createEmptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

export function createInitialState(): GameState {
  return {
    grid: createEmptyGrid(),
    activePiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    linesCleared: 0,
    status: 'idle',
    lastServiceIndex: -1,
  }
}

export function getDropInterval(level: number): number {
  return BASE_INTERVAL * Math.pow(SPEED_FACTOR, level - 1)
}

function randomShape(): TetrominoShape {
  return ALL_SHAPES[Math.floor(Math.random() * ALL_SHAPES.length)]
}

function randomService(lastIndex: number): { service: AwsService; index: number } {
  const manifest = getAwsManifest()
  let index: number
  do {
    index = Math.floor(Math.random() * manifest.length)
  } while (index === lastIndex && manifest.length > 1)
  return { service: manifest[index], index }
}

export function spawnPiece(lastServiceIndex: number): { piece: ActivePiece; serviceIndex: number } {
  const shape = randomShape()
  const { service, index } = randomService(lastServiceIndex)

  const piece: ActivePiece = {
    shape,
    rotation: 0,
    x: shape === 'I' ? 3 : 4,
    y: 0,
    service: {
      comando: service.comando,
      iconPath: service.iconPath,
      category: service.category,
    },
  }

  return { piece, serviceIndex: index }
}

export function getPieceBlocks(piece: ActivePiece): Array<{ row: number; col: number }> {
  const blocks = getBlocks(piece.shape, piece.rotation)
  return blocks.map(([r, c]) => ({ row: piece.y + r, col: piece.x + c }))
}

export function isValidPosition(grid: Grid, piece: ActivePiece): boolean {
  const blocks = getPieceBlocks(piece)
  return blocks.every(({ row, col }) => {
    if (col < 0 || col >= COLS) return false
    if (row >= ROWS) return false
    if (row < 0) return true
    return grid[row][col] === null
  })
}

export function tryWallKick(grid: Grid, piece: ActivePiece): ActivePiece | null {
  const offsets = [0, -1, 1, -2, 2]
  for (const dx of offsets) {
    const kicked = { ...piece, x: piece.x + dx }
    if (isValidPosition(grid, kicked)) return kicked
  }
  return null
}

export function rotatePiece(grid: Grid, piece: ActivePiece): ActivePiece {
  const rotated: ActivePiece = {
    ...piece,
    rotation: (piece.rotation + 1) % 4,
  }

  if (isValidPosition(grid, rotated)) return rotated

  const kicked = tryWallKick(grid, rotated)
  if (kicked) return kicked

  return piece
}

export function movePiece(
  grid: Grid,
  piece: ActivePiece,
  dx: number,
  dy: number
): ActivePiece | null {
  const moved: ActivePiece = {
    ...piece,
    x: piece.x + dx,
    y: piece.y + dy,
  }

  if (isValidPosition(grid, moved)) return moved
  return null
}

export function lockPiece(grid: Grid, piece: ActivePiece): Grid {
  const newGrid = grid.map((row) => [...row])
  const blocks = getPieceBlocks(piece)
  const cell: Cell = {
    iconPath: piece.service.iconPath,
    category: piece.service.category,
    comando: piece.service.comando,
  }

  for (const { row, col } of blocks) {
    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      newGrid[row][col] = cell
    }
  }

  return newGrid
}

export function clearLines(grid: Grid): { grid: Grid; linesCount: number } {
  const remaining = grid.filter((row) => row.some((cell) => cell === null))
  const linesCount = ROWS - remaining.length

  if (linesCount === 0) return { grid, linesCount: 0 }

  const emptyRows: Grid = Array.from({ length: linesCount }, () =>
    Array(COLS).fill(null)
  )

  return { grid: [...emptyRows, ...remaining], linesCount }
}

export function calculateScore(linesCount: number, level: number): number {
  if (linesCount === 0) return 0
  const base = LINE_SCORES[linesCount] ?? LINE_SCORES[4]
  const points = base * level
  return level >= 9 ? Math.floor(points * 1.5) : points
}

export function calculateLevel(totalLines: number): number {
  return Math.min(MAX_LEVEL, Math.floor(totalLines / LINES_PER_LEVEL) + 1)
}

export function canSpawn(grid: Grid, piece: ActivePiece): boolean {
  return isValidPosition(grid, piece)
}

export type GameAction =
  | { type: 'START' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'SOFT_DROP' }
  | { type: 'ROTATE' }
  | { type: 'TICK' }
  | { type: 'LOCK' }

export interface GameTickResult {
  state: GameState
  events: GameEvent[]
}

export type GameEvent =
  | { type: 'PIECE_LOCKED' }
  | { type: 'LINES_CLEARED'; count: number }
  | { type: 'GAME_OVER' }
  | { type: 'LEVEL_UP'; level: number }

export function gameReducer(state: GameState, action: GameAction): GameTickResult {
  const events: GameEvent[] = []

  switch (action.type) {
    case 'START': {
      const first = spawnPiece(-1)
      const second = spawnPiece(first.serviceIndex)
      return {
        state: {
          ...createInitialState(),
          status: 'playing',
          activePiece: first.piece,
          nextPiece: second.piece,
          lastServiceIndex: second.serviceIndex,
        },
        events: [],
      }
    }

    case 'MOVE_LEFT': {
      if (!state.activePiece || state.status !== 'playing') return { state, events }
      const moved = movePiece(state.grid, state.activePiece, -1, 0)
      if (!moved) return { state, events }
      return { state: { ...state, activePiece: moved }, events }
    }

    case 'MOVE_RIGHT': {
      if (!state.activePiece || state.status !== 'playing') return { state, events }
      const moved = movePiece(state.grid, state.activePiece, 1, 0)
      if (!moved) return { state, events }
      return { state: { ...state, activePiece: moved }, events }
    }

    case 'ROTATE': {
      if (!state.activePiece || state.status !== 'playing') return { state, events }
      const rotated = rotatePiece(state.grid, state.activePiece)
      return { state: { ...state, activePiece: rotated }, events }
    }

    case 'SOFT_DROP':
    case 'TICK': {
      if (!state.activePiece || state.status !== 'playing') return { state, events }
      const moved = movePiece(state.grid, state.activePiece, 0, 1)
      if (moved) {
        return { state: { ...state, activePiece: moved }, events }
      }
      return lockAndSpawn(state, events)
    }

    case 'LOCK': {
      if (!state.activePiece || state.status !== 'playing') return { state, events }
      return lockAndSpawn(state, events)
    }

    default:
      return { state, events }
  }
}

function lockAndSpawn(state: GameState, events: GameEvent[]): GameTickResult {
  const piece = state.activePiece!
  let grid = lockPiece(state.grid, piece)
  events.push({ type: 'PIECE_LOCKED' })

  const { grid: clearedGrid, linesCount } = clearLines(grid)
  grid = clearedGrid

  if (linesCount > 0) {
    events.push({ type: 'LINES_CLEARED', count: linesCount })
  }

  const totalLines = state.linesCleared + linesCount
  const newLevel = calculateLevel(totalLines)
  const oldLevel = state.level

  if (newLevel > oldLevel) {
    events.push({ type: 'LEVEL_UP', level: newLevel })
  }

  const scoreGain = calculateScore(linesCount, newLevel)

  const nextPiece = state.nextPiece!
  if (!canSpawn(grid, nextPiece)) {
    events.push({ type: 'GAME_OVER' })
    return {
      state: {
        ...state,
        grid,
        activePiece: null,
        score: state.score + scoreGain,
        linesCleared: totalLines,
        level: newLevel,
        status: 'gameover',
      },
      events,
    }
  }

  const spawned = spawnPiece(state.lastServiceIndex)

  return {
    state: {
      ...state,
      grid,
      activePiece: nextPiece,
      nextPiece: spawned.piece,
      score: state.score + scoreGain,
      linesCleared: totalLines,
      level: newLevel,
      lastServiceIndex: spawned.serviceIndex,
    },
    events,
  }
}
