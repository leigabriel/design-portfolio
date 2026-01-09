import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const themes = {
  light: { bg: '#f2f2f2', text: '#212631', name: 'light' },
  dark: { bg: '#212631', text: '#f2f2f2', name: 'dark' },
  neon: { bg: '#212631', text: '#ff0000', name: 'neon' }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved && themes[saved]) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const cycleTheme = () => {
    const order = ['light', 'dark', 'neon']
    const currentIndex = order.indexOf(theme)
    setTheme(order[(currentIndex + 1) % order.length])
  }

  const isDarkMode = theme === 'dark' || theme === 'neon'
  const isNeonMode = theme === 'neon'
  const currentTheme = themes[theme]

  return (
    <ThemeContext.Provider value={{ isDarkMode, isNeonMode, theme, currentTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
