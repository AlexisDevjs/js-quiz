import { useState } from 'react'
import { useQuestions } from './useQuestions'
import { getLimitedQuestions } from '../lib/utils'

export function useQuiz () {
  const { questions, updateQuestions } = useQuestions(10)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (answerIndex: number) => {
    if (currentQuestion === questions.length - 1) {
      setShowScore(true)
    }

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore))

    const updatedQuestions = questions.map((question, index) =>
      index === currentQuestion
        ? {
          ...question,
          selectedAnswer: answerIndex,
          isCorrectSelected: isCorrect
        }
        : question
    )

    updateQuestions(updatedQuestions)
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1

    if (
      questions[currentQuestion]?.selectedAnswer !== undefined
      && currentQuestion < questions.length
    ) {
      setCurrentQuestion(nextQuestion)
    }
  }

  const restartQuiz = async () => {
    const newQuestions = await getLimitedQuestions(10)
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    updateQuestions(newQuestions)
  }

  return {
    questions,
    currentQuestion,
    score,
    showScore,
    handleAnswerClick,
    handleNextQuestion,
    restartQuiz
  }
}
