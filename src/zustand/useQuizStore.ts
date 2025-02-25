import { create } from 'zustand'
import type { QuizState } from '../../types'
import { getLimitedQuestions } from '../lib/utils'
import { GAME_STATE } from '../lib/app-constants'

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  difficulty: 'Easy',
  limitQuestions: 10,
  currentQuestion: 0,
  score: 0,
  gameState: GAME_STATE.IDLE,

  getQuestions: async () => {
    const { limitQuestions } = get()
    const questions = await getLimitedQuestions(limitQuestions)
    set({ questions })
  },

  setDifficulty: (difficulty) => set({ difficulty }),

  setLimitQuestions: (limit) => set({ limitQuestions: limit }),

  startGame: async () => {
    await get().getQuestions()
    set({ gameState: GAME_STATE.PLAYING })
  },

  selectAnswer: (answerIndex: number) => {
    const { currentQuestion, questions, score } = get()
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    const newScore = isCorrect ? score + 1 : score
    const isLastQuestion = currentQuestion === questions.length - 1

    const updatedQuestions = questions.map((question, index) => {
      if (index === currentQuestion) {
        return {
          ...question,
          selectedAnswer: answerIndex,
          isCorrectSelected: isCorrect
        }
      }
      return question
    })

    set({
      questions: updatedQuestions,
      score: newScore,
      gameState: isLastQuestion ? GAME_STATE.GAME_OVER : GAME_STATE.PLAYING
    })
  },

  nextQuestion: () => {
    const state = get()
    const { currentQuestion, questions } = state
    const isSelected = questions[currentQuestion].selectedAnswer !== undefined

    if (!isSelected) return
    if (currentQuestion >= questions.length - 1) return

    set({ currentQuestion: currentQuestion + 1 })
  },

  restartQuiz: async () => {
    await get().getQuestions()

    set({
      currentQuestion: 0,
      gameState: GAME_STATE.PLAYING,
      score: 0
    })
  },

  quitGame : () => {
    set({
      questions: [],
      currentQuestion: 0,
      gameState: GAME_STATE.IDLE,
      score: 0
    })
  }
}))
