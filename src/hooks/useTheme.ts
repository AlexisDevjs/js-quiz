import { useEffect, useState } from 'react'
import { getThemeFromStorage } from '../lib/utils'

export function useTheme () {
  const [theme, setTheme] = useState(getThemeFromStorage)

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
