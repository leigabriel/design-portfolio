import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const themes = {
  light: { bg: '#f2f2f2', text: '#212631', name: 'light' },
  dark: { bg: '#212631', text: '#f2f2f2', name: 'dark' }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved && themes[saved]) return saved
      // Default to dark theme
      return 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const isDarkMode = theme === 'dark'
  const currentTheme = themes[theme]

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
