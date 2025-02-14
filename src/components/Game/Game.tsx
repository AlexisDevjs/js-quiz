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
    <div className='flex flex-col gap-6'>
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
    </div>
  )
}
