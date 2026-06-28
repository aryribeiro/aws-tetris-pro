'use client'

import { useEffect, useRef } from 'react'
import type { GameAction } from '@/lib/engine'

interface UseKeyboardOptions {
  dispatch: (action: GameAction) => void
  setSoftDrop: (active: boolean) => void
  enabled: boolean
}

const KEY_REPEAT_DELAY = 170
const KEY_REPEAT_INTERVAL = 50

export function useKeyboard({ dispatch, setSoftDrop, enabled }: UseKeyboardOptions) {
  const repeatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeKeyRef = useRef<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    function clearRepeat() {
      if (repeatTimerRef.current) {
        clearTimeout(repeatTimerRef.current)
        repeatTimerRef.current = null
      }
      if (repeatIntervalRef.current) {
        clearInterval(repeatIntervalRef.current)
        repeatIntervalRef.current = null
      }
      activeKeyRef.current = null
    }

    function startRepeat(action: GameAction, key: string) {
      clearRepeat()
      activeKeyRef.current = key
      repeatTimerRef.current = setTimeout(() => {
        repeatIntervalRef.current = setInterval(() => {
          dispatch(action)
        }, KEY_REPEAT_INTERVAL)
      }, KEY_REPEAT_DELAY)
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return

      const key = e.key.toLowerCase()

      switch (key) {
        case 'a':
          dispatch({ type: 'MOVE_LEFT' })
          startRepeat({ type: 'MOVE_LEFT' }, key)
          break
        case 'd':
          dispatch({ type: 'MOVE_RIGHT' })
          startRepeat({ type: 'MOVE_RIGHT' }, key)
          break
        case 's':
          setSoftDrop(true)
          break
        case 'w':
          dispatch({ type: 'ROTATE' })
          break
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase()

      if (key === 's') {
        setSoftDrop(false)
      }

      if (key === activeKeyRef.current) {
        clearRepeat()
      }
    }

    function handleBlur() {
      clearRepeat()
      setSoftDrop(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      clearRepeat()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [dispatch, setSoftDrop, enabled])
}
