import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { SettingsIcon } from '../icons'
import { AnimatePresence, motion } from 'motion/react'
import { useQuizStore } from '../../zustand/useQuizStore'
import type { Difficulty } from '../../../types'
import { GAME_STATE } from '../../lib/app-constants'

export default function GameSettings () {
  const limitQuestions = useQuizStore((state) => state.limitQuestions)
  const difficulty = useQuizStore((state) => state.difficulty)

  const [showSettings, setShowSettings] = useState(false)
  const [showConfirmRestart, setShowConfirmRestart] = useState(false)
  const [localLimitQuestions, setLocalLimitQuestions] = useState(limitQuestions)
  const [localDifficulty, setLocalDifficulty] = useState<Difficulty>(difficulty)

  const gameState = useQuizStore((state) => state.gameState)
  const setLimitQuestions = useQuizStore((state) => state.setLimitQuestions)
  const setDifficulty = useQuizStore((state) => state.setDifficulty)
  const restartQuiz = useQuizStore((state) => state.restartQuiz)

  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalDifficulty(e.currentTarget.value as Difficulty)
  }

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalLimitQuestions(parseInt(e.currentTarget.value))
  }
  const saveSetting = () => {
    setLimitQuestions(localLimitQuestions)
    setDifficulty(localDifficulty)
    setShowSettings(false)
  }

  const handSaveSetting = () => {
    if (gameState === GAME_STATE.PLAYING) {
      return setShowConfirmRestart(true)
    }

    saveSetting()
  }

  useEffect(() => {
    if (showSettings) {
      setLocalDifficulty(difficulty)
      setLocalLimitQuestions(limitQuestions)
    }
  }, [difficulty, showSettings, limitQuestions])

  return (
    <>
      <button
        type='button'
        title='Settings'
        className='hover:cursor-pointer p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700'
        onClick={() => setShowSettings(true)}
      >
        <SettingsIcon className='w-6 h-6 text-gray-700 dark:text-gray-300' />
      </button>

      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40'
              onClick={() => setShowSettings(false)}
            />

            {!showConfirmRestart ? (
              <motion.article
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className='fixed z-50 top-[30%] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-sm'
              >
                <div className='flex justify-between items-center border-b border-gray-400 pb-3.5 mb-4'>
                  <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
                    Ajustes
                  </h2>
                  <button
                    type='button'
                    onClick={() => setShowSettings(false)}
                    className='text-gray-500 text-xl hover:text-red-500 transition hover:cursor-pointer'
                  >
                    ✕
                  </button>
                </div>

                <div className='flex flex-col gap-4 mt-2'>
                  <div>
                    <label
                      htmlFor='difficulty'
                      className='text-gray-700 dark:text-gray-300'
                    >
                      Dificultad
                    </label>
                    <select
                      id='difficulty'
                      name='difficulty'
                      value={localDifficulty}
                      onChange={handleDifficultyChange}
                      className='mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    >
                      <option value='Easy'>Fácil</option>
                      <option value='Medium'>Intermedio</option>
                      <option value='Hard'>Difícil</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='limit'
                      className='text-gray-700 dark:text-gray-300'
                    >
                      Límite de preguntas
                    </label>
                    <select
                      id='limit'
                      name='limitQuestions'
                      value={localLimitQuestions}
                      onChange={handleLimitChange}
                      className='mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    >
                      <option value='10'>10</option>
                      <option value='15'>15</option>
                      <option value='20'>20</option>
                    </select>
                  </div>

                  <div className='flex justify-end gap-2 mt-4'>
                    <button
                      type='button'
                      className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition'
                      onClick={() => setShowSettings(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type='button'
                      onClick={handSaveSetting}
                      className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </motion.article>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='fixed z-50 top-[40%] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-sm'
              >
                Deberás reiniciar el juego para aplicar los cambios. ¿Deseas
                reiniciar ahora?
                <div className='flex justify-center gap-5 mt-5'>
                  <button
                    type='button'
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                    onClick={() => {
                      saveSetting()
                      restartQuiz()
                      setShowConfirmRestart(false)
                      setShowSettings(false)
                    }}
                  >
                    Reiniciar
                  </button>
                  <button
                    type='button'
                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition'
                    onClick={() => {
                      setShowConfirmRestart(false)
                      setShowSettings(false)
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  )
}
