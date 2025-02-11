import { useState } from 'react'
import { useQuestions } from '../hooks/useQuestions'

export default function Game () {
  const { questions, updateQuestions } = useQuestions(10)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswerClick = (index: number) => {
    const isCorrect = index === questions[currentQuestion].correctAnswer
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore))

    const updatedQuestions = questions.map((question, index) =>
      index === currentQuestion
        ? { ...question, selectedAnswer: index, isCorrectSelected: isCorrect }
        : question
    )

    updateQuestions(updatedQuestions)
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (
      questions[currentQuestion].selectedAnswer !== undefined
      && currentQuestion < questions.length
    ) {
      setCurrentQuestion(nextQuestion)
    }
  }

  return (
    <article className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700'>
      <h5 className='mb-3 text-center text-base font-semibold text-gray-900 md:text-xl dark:text-white'>
        Pregunta {currentQuestion}/{questions.length}
      </h5>
      <span className='block w-full mb-2 text-sm text-center'>
        Your score: {score}
      </span>
      <p className='text-base text-center font-semibold text-gray-700 dark:text-gray-400'>
        {questions[currentQuestion]?.question}
      </p>
      <ol className='my-4 space-y-3'>
        {questions[currentQuestion]?.options.map((answerOption, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerClick(index)}
              className='flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white w-full'
            >
              <span className='flex-1 ms-3 whitespace-nowrap'>
                {answerOption}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <button
        onClick={handleNextQuestion}
        className='text-center p-3 text-base text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white w-full'
      >
        <span className='block text-center'>Siguente pregunta</span>
      </button>
    </article>
  )
}
