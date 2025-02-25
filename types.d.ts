import type { GAME_STATE } from './src/lib/app-constants'

export type Theme = 'light' | 'dark'

export interface Question {
  id: number
  question: string
  code?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  options: readonly [string, string, string, string]
  correctAnswer: number
  selectedAnswer: number | undefined
  isCorrectSelected: boolean | undefined
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface QuizState {
  questions: Question[]
  difficulty: Difficulty
  limitQuestions: number
  currentQuestion: number
  score: number
  gameState: typeof GAME_STATE[keyof typeof GAME_STATE],
  setDifficulty: (difficulty: Difficulty) => void
  setLimitQuestions: (limit: number) => void
  getQuestions: () => Promise<void>
  selectAnswer: (answerIndex: number) => void
  nextQuestion: () => void
  restartQuiz: () => void
  startGame: () => void
  quitGame : () => void
}

export type RefProp<T> = {
  ref: React.RefObject<T>
}
