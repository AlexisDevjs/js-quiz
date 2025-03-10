import { InitialScreen } from './InitialScreen'
import { useQuizStore } from '../../zustand/useQuizStore'
import { GAME_STATE } from '../../lib/app-constants'
import { AnimatePresence } from 'motion/react'
import { QuizScreen } from './QuizScreen'
import { ScoreScreen } from './ScoreScreen'

export default function Game () {
  const gameState = useQuizStore((state) => state.gameState)

  return (
    <>
      <AnimatePresence>
        {gameState === GAME_STATE.IDLE && <InitialScreen />}
        {gameState === GAME_STATE.PLAYING && <QuizScreen />}
        {gameState === GAME_STATE.GAME_OVER && <ScoreScreen />}
      </AnimatePresence>
    </>
  )
}
