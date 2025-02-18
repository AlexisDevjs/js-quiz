import { QuizScreen } from './QuizScreen'
import { useQuiz } from '../../hooks/useQuiz'
import { ScoreScreen } from './ScoreScreen'
import InitialScreen from './InitialScreen'

export default function Game () {
  const {
    questions,
    currentQuestion,
    score,
    showScore,
    showGame,
    startGame,
    exitGame,
    restartQuiz,
    handleAnswerClick,
    handleNextQuestion
  } = useQuiz()

  return (
    <>
      {!showGame ? (
        <InitialScreen onStartGame={startGame} />
      ) : showScore ? (
        <ScoreScreen
          score={score}
          totalQuestions={questions.length}
          onRestart={restartQuiz}
          onQuitGame={exitGame}
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
