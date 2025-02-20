import { AnimatedQuizScreen } from './QuizScreen'
import { AnimatedScoreScreen } from './ScoreScreen'
import { AnimatedInitialScreen } from './InitialScreen'
import { useQuizStore } from '../../zustand/useQuizStore'
import { GAME_STATE } from '../../lib/app-constants'
import { AnimatePresence } from 'motion/react'

export default function Game () {
  const gameState = useQuizStore((state) => state.gameState)

  return (
    <>
      <AnimatePresence>
        {gameState === GAME_STATE.IDLE && (
          <AnimatedInitialScreen exit={{ opacity: 0, scale: 0 }} />
        )}
        {gameState === GAME_STATE.PLAYING && (
          <AnimatedQuizScreen
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: { type: 'spring', bounce: 0.5, duration: 0.7 }
            }}
          />
        )}
        {gameState === GAME_STATE.GAME_OVER && (
          <AnimatedScoreScreen
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
