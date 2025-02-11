export type Theme = 'light' | 'dark'

export interface Question {
  id: number
  question: string
  code?: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  options: readonly [string, string, string, string]
  correctAnswer: number
  selectedAnswer: number | null
  isCorrectSelected: boolean | undefined
}
