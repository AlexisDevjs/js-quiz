import { motion } from 'motion/react'
import { getButtonStyle } from '../../lib/utils'
import { useQuizStore } from '../../zustand/useQuizStore'
import Header from '../Header'
import { ArrowIcon } from '../icons'
import type { RefProp } from '../../../types'

function QuizScreen ({ ref }: RefProp<HTMLDivElement>) {
  const questions = useQuizStore((state) => state.questions)
  const currentQuestion = useQuizStore((state) => state.currentQuestion)
  const selectAnswer = useQuizStore((state) => state.selectAnswer)
  const nextQuestion = useQuizStore((state) => state.nextQuestion)

  const currentQuestionData = questions[currentQuestion]
  const isSelectedAnswer = currentQuestionData?.selectedAnswer !== undefined

  return (
    <div ref={ref} className='flex flex-col gap-7'>
      <Header />
      <motion.article
        layout
        transition={{ duration: 0.15, ease: 'linear' }}
        className='w-full sm:w-[384px] max-w-sm p-4 bg-white border border-gray-300 rounded-md shadow-lg sm:p-6 dark:bg-gray-800 dark:border-gray-700'
      >
        <h2 className='mb-3 text-center text-2xl font-semibold text-black dark:text-white'>
          Pregunta {currentQuestion + 1}/{questions.length}
        </h2>
        <p className='text-base text-center font-medium text-zinc-800 rounded-lg p-2 h-auto'>
          {currentQuestionData?.question}
        </p>
        <ol className='my-4 space-y-3.5'>
          {currentQuestionData?.options.map((answerOption, index) => (
            <li key={index}>
              <button
                type='button'
                onClick={() => selectAnswer(index)}
                disabled={currentQuestionData?.selectedAnswer !== undefined}
                className={`flex items-center px-5 py-2 font-semibold text-sm w-full text-gray-800/95 rounded-md hover:shadow ${getButtonStyle(
                  index,
                  currentQuestionData
                )}`}
              >
                {answerOption}
              </button>
            </li>
          ))}
        </ol>
        <motion.button
          type='button'
          onClick={nextQuestion}
          whileTap={{ y: 1 }}
          transition={{ duration: 0.05 }}
          disabled={currentQuestion === questions.length - 1}
          className={`text-center p-1.5 text-base bg-primary text-black rounded-md font-medium transition-colors duration-300 hover:cursor-pointer ring ring-black w-full ${
            isSelectedAnswer ? 'hover:bg-primary-200 opacity-100' : 'opacity-65'
          }`}
        >
          <span className='flex items-center justify-center gap-2 text-center'>
            Siguiente <ArrowIcon />
          </span>
        </motion.button>
      </motion.article>
    </div>
  )
}

export const AnimatedQuizScreen = motion.create(QuizScreen)
