import { useState } from 'react'
import { useQuestions } from './useQuestions'

export function useQuiz () {
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

  return {
    questions,
    currentQuestion,
    score,
    handleAnswerClick,
    handleNextQuestion
  }
}
