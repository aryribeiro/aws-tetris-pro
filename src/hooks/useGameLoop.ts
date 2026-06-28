'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import type { GameState } from '@/types/game'
import { gameReducer, getDropInterval, createInitialState, type GameAction, type GameEvent } from '@/lib/engine'

interface UseGameLoopOptions {
  onEvent?: (event: GameEvent) => void
}

export function useGameLoop(options?: UseGameLoopOptions) {
  const [gameState, setGameState] = useState<GameState>(createInitialState)
  const stateRef = useRef(gameState)
  const lastDropRef = useRef(0)
  const softDropRef = useRef(false)
  const rafRef = useRef<number>(0)
  const onEventRef = useRef(options?.onEvent)

  useEffect(() => {
    onEventRef.current = options?.onEvent
  }, [options?.onEvent])

  useEffect(() => {
    stateRef.current = gameState
  }, [gameState])

  const dispatch = useCallback((action: GameAction) => {
    const current = stateRef.current
    if (current.status !== 'playing' && action.type !== 'START') return

    const { state, events } = gameReducer(current, action)
    stateRef.current = state
    setGameState(state)

    for (const event of events) {
      onEventRef.current?.(event)
    }
  }, [])

  const tick = useCallback((timestamp: number) => {
    const state = stateRef.current
    if (state.status !== 'playing') {
      rafRef.current = requestAnimationFrame(tick)
      return
    }

    const interval = softDropRef.current
      ? 50
      : getDropInterval(state.level)

    if (timestamp - lastDropRef.current >= interval) {
      lastDropRef.current = timestamp
      dispatch({ type: 'TICK' })
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [dispatch])

  const start = useCallback(() => {
    dispatch({ type: 'START' })
    lastDropRef.current = performance.now()
  }, [dispatch])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  const setSoftDrop = useCallback((active: boolean) => {
    softDropRef.current = active
  }, [])

  return { gameState, dispatch, start, setSoftDrop }
}
