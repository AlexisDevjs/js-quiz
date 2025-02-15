import { QuizScreen } from './QuizScreen'
import { useQuiz } from '../../hooks/useQuiz'
import { ScoreScreen } from './ScoreScreen'

export default function Game () {
  const {
    questions,
    currentQuestion,
    score,
    showScore,
    restartQuiz,
    handleAnswerClick,
    handleNextQuestion
  } = useQuiz()

  return (
    <>
      {showScore ? (
        <ScoreScreen
          score={score}
          totalQuestions={questions.length}
          onRestart={restartQuiz}
        />
      ) : (
        <QuizScreen
          questions={questions}
          currentQuestion={currentQuestion}
          onAnswerClick={handleAnswerClick}
          onNextQuestionClick={handleNextQuestion}
        />
      )}
    </>
  )
}
