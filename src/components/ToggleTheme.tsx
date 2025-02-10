import { useTheme } from '../hooks/useTheme'
import { ToggleThemeIcon } from './icons'

export function ToggleTheme () {
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <button
      className={`theme-toggle ${isDarkMode ? '' : 'theme-toggle--toggled'}`}
      type='button'
      title='Toggle theme'
      aria-label='Toggle theme'
      onClick={() => toggleTheme()}
    >
      <ToggleThemeIcon />
    </button>
  )
}
