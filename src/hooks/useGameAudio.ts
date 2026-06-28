'use client'

import { useRef, useCallback, useState } from 'react'

export function useGameAudio() {
  const [muted, setMuted] = useState(false)
  const bgmRef = useRef<HTMLAudioElement | null>(null)
  const beepRef = useRef<HTMLAudioElement | null>(null)
  const gameoverRef = useRef<HTMLAudioElement | null>(null)
  const mutedRef = useRef(false)

  const initAudio = useCallback(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/som/som.mp3')
      bgmRef.current.loop = true
      bgmRef.current.volume = 0.4
    }
    if (!beepRef.current) {
      beepRef.current = new Audio('/som/beep.mp3')
      beepRef.current.volume = 0.6
    }
    if (!gameoverRef.current) {
      gameoverRef.current = new Audio('/som/gameover.mp3')
      gameoverRef.current.volume = 0.7
    }
  }, [])

  const playBgm = useCallback(() => {
    initAudio()
    if (!mutedRef.current && bgmRef.current) {
      bgmRef.current.currentTime = 0
      bgmRef.current.play().catch(() => {})
    }
  }, [initAudio])

  const stopBgm = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause()
      bgmRef.current.currentTime = 0
    }
  }, [])

  const playBeep = useCallback(() => {
    if (mutedRef.current || !beepRef.current) return
    beepRef.current.currentTime = 0
    beepRef.current.play().catch(() => {})
  }, [])

  const playGameover = useCallback(() => {
    stopBgm()
    if (mutedRef.current || !gameoverRef.current) return
    gameoverRef.current.currentTime = 0
    gameoverRef.current.play().catch(() => {})
  }, [stopBgm])

  const toggleMute = useCallback(() => {
    const newMuted = !mutedRef.current
    mutedRef.current = newMuted
    setMuted(newMuted)

    if (bgmRef.current) {
      if (newMuted) {
        bgmRef.current.pause()
      } else {
        bgmRef.current.play().catch(() => {})
      }
    }
  }, [])

  return { muted, playBgm, stopBgm, playBeep, playGameover, toggleMute }
}
