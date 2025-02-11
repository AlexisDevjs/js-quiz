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
