import type { ChangeEvent } from 'react'
import type { Difficulty } from '../../types'
import { useEffect, useState } from 'react'
import { useQuizStore } from '../zustand/useQuizStore'
import { GAME_STATE } from '../lib/app-constants'

export function useGameSettings () {
  const limitQuestions = useQuizStore((state) => state.limitQuestions)
  const difficulty = useQuizStore((state) => state.difficulty)
  const gameState = useQuizStore((state) => state.gameState)
  const setLimitQuestions = useQuizStore((state) => state.setLimitQuestions)
  const setDifficulty = useQuizStore((state) => state.setDifficulty)
  const restartQuiz = useQuizStore((state) => state.restartQuiz)

  const [showSettings, setShowSettings] = useState(false)
  const [showConfirmRestart, setShowConfirmRestart] = useState(false)
  const [localLimitQuestions, setLocalLimitQuestions] = useState(limitQuestions)
  const [localDifficulty, setLocalDifficulty] = useState<Difficulty>(difficulty)

  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalDifficulty(e.currentTarget.value as Difficulty)
  }

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalLimitQuestions(parseInt(e.currentTarget.value))
  }

  const saveSettings = () => {
    setLimitQuestions(localLimitQuestions)
    setDifficulty(localDifficulty)
    setShowSettings(false)
  }

  const handSaveSettings = () => {
    if (gameState === GAME_STATE.PLAYING) {
      return setShowConfirmRestart(true)
    }

    saveSettings()
  }

  const confirmRestart = () => {
    saveSettings()
    restartQuiz()
    setShowConfirmRestart(false)
  }

  useEffect(() => {
    if (showSettings) {
      setLocalDifficulty(difficulty)
      setLocalLimitQuestions(limitQuestions)
    }
  }, [difficulty, showSettings, limitQuestions])

  return {
    localDifficulty,
    localLimitQuestions,
    showSettings,
    showConfirmRestart,
    setShowSettings,
    setShowConfirmRestart,
    saveSettings,
    handSaveSettings,
    confirmRestart,
    handleDifficultyChange,
    handleLimitChange
  }
}
