import type { Theme } from '../../types'

export function getThemeFromStorage () {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    return savedTheme as Theme
  }

  const match = window.matchMedia('(prefers-color-scheme: dark)')

  return match.matches ? 'dark' : 'light'
}
