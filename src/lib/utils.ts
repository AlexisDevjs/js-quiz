import type { Question, Theme } from '../../types'

export function getThemeFromStorage () {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    return savedTheme as Theme
  }

  const match = window.matchMedia('(prefers-color-scheme: dark)')

  return match.matches ? 'dark' : 'light'
}

export async function fetchQuestions ():Promise<Question[]> {
  try {
    const response = await fetch('/questions.json')
    const data: Question[] = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('La respuesta no tiene el formato esperado')
    }

    return data.sort(() => Math.random() - 0.5)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return []
  }
}

export function getButtonStyle (answerIndex: number, question: Question) {
  const { selectedAnswer, correctAnswer } = question
  const defaultStyle = 'bg-gray-50 ring ring-gray-300 hover:bg-gray-100 active:translate-y-0.5'

  if (selectedAnswer === undefined) return defaultStyle

  if (answerIndex !== selectedAnswer && answerIndex !== correctAnswer) {
    return defaultStyle
  }

  if (answerIndex === correctAnswer) return 'bg-lime-300/70 ring ring-lime-600'

  if (answerIndex === selectedAnswer) return 'bg-red-300/70 ring ring-red-600'
}
