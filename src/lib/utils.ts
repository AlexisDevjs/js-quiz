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

export async function getLimitedQuestions (limit: number) {
  const questions = await fetchQuestions()
  return questions.slice(0, limit)
}

export function getButtonStyle (answerIndex: number, question: Question) {
  const { selectedAnswer, correctAnswer } = question
  const defaultStyle = 'ring ring-gray-400/40 hover:bg-gray-100 hover:shadow hover:cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white transition-all duration-200'

  if (selectedAnswer === undefined) {
    return defaultStyle
  }

  if (answerIndex !== selectedAnswer && answerIndex !== correctAnswer) {
    return defaultStyle
  }

  if (answerIndex === correctAnswer) return 'transition-all duration-200 bg-green-500/85 dark:text-white'

  if (answerIndex === selectedAnswer) return 'transition-all duration-200 bg-red-500/60 dark:text-white'
}
