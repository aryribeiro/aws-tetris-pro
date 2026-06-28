import type { ActivePiece, Grid } from '@/types/game'
import { CATEGORY_COLORS, type AwsCategory } from '@/lib/aws-manifest'
import { getPieceBlocks, COLS, ROWS } from '@/lib/engine'

export const BLOCK_SIZE = 38
export const CANVAS_WIDTH = COLS * BLOCK_SIZE
export const CANVAS_HEIGHT = ROWS * BLOCK_SIZE

const BEVEL_LIGHT = 'rgba(255, 255, 255, 0.35)'
const BEVEL_DARK = 'rgba(0, 0, 0, 0.4)'
const BEVEL_SIZE = 3
const GRID_LINE_COLOR = 'rgba(0, 0, 0, 0.06)'
const BG_COLOR = '#ffffff'

const imageCache = new Map<string, HTMLImageElement>()

function loadImage(src: string): HTMLImageElement | null {
  const cached = imageCache.get(src)
  if (cached?.complete) return cached

  if (!cached) {
    const img = new Image()
    img.src = src
    imageCache.set(src, img)
  }

  return null
}

export function preloadIcons(paths: string[]): void {
  for (const path of paths) {
    if (!imageCache.has(path)) {
      const img = new Image()
      img.src = path
      imageCache.set(path, img)
    }
  }
}

function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  category: AwsCategory,
  iconPath: string,
  ghost?: boolean
) {
  const color = CATEGORY_COLORS[category]
  const size = BLOCK_SIZE

  ctx.save()

  if (ghost) {
    ctx.globalAlpha = 0.3
  }

  // Background fill
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)

  // Bevel - top/left highlight
  ctx.fillStyle = BEVEL_LIGHT
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + size, y)
  ctx.lineTo(x + size - BEVEL_SIZE, y + BEVEL_SIZE)
  ctx.lineTo(x + BEVEL_SIZE, y + BEVEL_SIZE)
  ctx.lineTo(x + BEVEL_SIZE, y + size - BEVEL_SIZE)
  ctx.lineTo(x, y + size)
  ctx.closePath()
  ctx.fill()

  // Bevel - bottom/right shadow
  ctx.fillStyle = BEVEL_DARK
  ctx.beginPath()
  ctx.moveTo(x + size, y)
  ctx.lineTo(x + size, y + size)
  ctx.lineTo(x, y + size)
  ctx.lineTo(x + BEVEL_SIZE, y + size - BEVEL_SIZE)
  ctx.lineTo(x + size - BEVEL_SIZE, y + size - BEVEL_SIZE)
  ctx.lineTo(x + size - BEVEL_SIZE, y + BEVEL_SIZE)
  ctx.closePath()
  ctx.fill()

  // Inner face
  ctx.fillStyle = color
  ctx.fillRect(
    x + BEVEL_SIZE,
    y + BEVEL_SIZE,
    size - BEVEL_SIZE * 2,
    size - BEVEL_SIZE * 2
  )

  // Icon
  const img = loadImage(iconPath)
  if (img) {
    const iconSize = size - BEVEL_SIZE * 2 - 4
    const iconX = x + BEVEL_SIZE + 2
    const iconY = y + BEVEL_SIZE + 2
    ctx.drawImage(img, iconX, iconY, iconSize, iconSize)
  }

  ctx.restore()
}

export function renderGame(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  activePiece: ActivePiece | null,
  logoImage: HTMLImageElement | null
) {
  // Clear
  ctx.fillStyle = BG_COLOR
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // Grid lines
  ctx.strokeStyle = GRID_LINE_COLOR
  ctx.lineWidth = 0.5
  for (let r = 0; r <= ROWS; r++) {
    ctx.beginPath()
    ctx.moveTo(0, r * BLOCK_SIZE)
    ctx.lineTo(CANVAS_WIDTH, r * BLOCK_SIZE)
    ctx.stroke()
  }
  for (let c = 0; c <= COLS; c++) {
    ctx.beginPath()
    ctx.moveTo(c * BLOCK_SIZE, 0)
    ctx.lineTo(c * BLOCK_SIZE, CANVAS_HEIGHT)
    ctx.stroke()
  }

  // Logo at the top of the grid, proportional
  if (logoImage?.complete) {
    ctx.save()
    const imgW = logoImage.naturalWidth
    const imgH = logoImage.naturalHeight
    const maxW = CANVAS_WIDTH * 0.5
    const maxH = CANVAS_HEIGHT * 0.15
    const scale = Math.min(maxW / imgW, maxH / imgH, 1)
    const drawW = imgW * scale
    const drawH = imgH * scale
    const lx = (CANVAS_WIDTH - drawW) / 2
    const ly = 12
    ctx.drawImage(logoImage, lx, ly, drawW, drawH)
    ctx.restore()
  }

  // Locked cells
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c]
      if (cell) {
        drawBlock(ctx, c * BLOCK_SIZE, r * BLOCK_SIZE, cell.category, cell.iconPath)
      }
    }
  }

  // Active piece
  if (activePiece) {
    const blocks = getPieceBlocks(activePiece)
    for (const { row, col } of blocks) {
      if (row >= 0) {
        drawBlock(
          ctx,
          col * BLOCK_SIZE,
          row * BLOCK_SIZE,
          activePiece.service.category,
          activePiece.service.iconPath
        )
      }
    }
  }
}

const PREVIEW_BG = '#1a2332'

export function renderPreview(
  ctx: CanvasRenderingContext2D,
  piece: ActivePiece | null,
  width: number,
  height: number
) {
  ctx.fillStyle = PREVIEW_BG
  ctx.fillRect(0, 0, width, height)

  if (!piece) return

  const blocks = getPieceBlocks({
    ...piece,
    x: 0,
    y: 0,
    rotation: piece.rotation,
  })

  const minCol = Math.min(...blocks.map((b) => b.col))
  const maxCol = Math.max(...blocks.map((b) => b.col))
  const minRow = Math.min(...blocks.map((b) => b.row))
  const maxRow = Math.max(...blocks.map((b) => b.row))

  const pieceWidth = (maxCol - minCol + 1) * BLOCK_SIZE
  const pieceHeight = (maxRow - minRow + 1) * BLOCK_SIZE

  const offsetX = (width - pieceWidth) / 2 - minCol * BLOCK_SIZE
  const offsetY = (height - pieceHeight) / 2 - minRow * BLOCK_SIZE

  for (const { row, col } of blocks) {
    drawBlock(
      ctx,
      col * BLOCK_SIZE + offsetX,
      row * BLOCK_SIZE + offsetY,
      piece.service.category,
      piece.service.iconPath
    )
  }
}
