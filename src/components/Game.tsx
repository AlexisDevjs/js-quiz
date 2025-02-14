import { useQuiz } from '../hooks/useQuiz'
import { getButtonStyle } from '../lib/utils'
import Header from './Header'
import { ArrowIcon } from './icons'

export default function Game () {
  const {
    questions,
    currentQuestion,
    handleAnswerClick,
    handleNextQuestion
  } = useQuiz()

  return (
    <div className='flex flex-col gap-6'>
      <Header />
      <article className='w-full sm:w-[384px] max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-[0_5px_10px_rgba(0,0,0,0.1)] sm:p-6 dark:bg-gray-800 dark:border-gray-700'>
        <h2 className='mb-3 text-center text-base font-semibold text-gray-900 md:text-xl dark:text-white'>
          Pregunta {currentQuestion + 1}/{questions.length}
        </h2>
        <p className='text-base text-center font-semibold text-gray-800 dark:text-gray-900 rounded-lg py-2'>
          {questions[currentQuestion]?.question}
        </p>
        <ol className='my-4 space-y-3'>
          {questions[currentQuestion]?.options.map((answerOption, index) => (
            <li key={index}>
              <button
                type='button'
                onClick={() => handleAnswerClick(index)}
                disabled={
                  questions[currentQuestion]?.selectedAnswer !== undefined
                }
                className={`flex items-center p-2.5 text-base w-full text-gray-900 rounded-lg hover:shadow ${getButtonStyle(
                  index,
                  questions[currentQuestion]
                )}`}
              >
                <span className='flex-1 ms-3 whitespace-nowrap'>
                  {answerOption}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button
          type='button'
          onClick={handleNextQuestion}
          disabled={currentQuestion === questions.length - 1}
          className={`text-center p-2 text-base bg-primary text-black rounded-lg font-semibold hover:cursor-pointer ring ring-black w-full ${
            questions[currentQuestion]?.selectedAnswer !== undefined
              ? 'hover:bg-primary-200 active:translate-y-0.5 opacity-100'
              : 'opacity-65'
          }`}
        >
          <span className='flex items-center justify-center gap-2 text-center'>
            Siguiente <ArrowIcon />
          </span>
        </button>
      </article>
    </div>
  )
}
