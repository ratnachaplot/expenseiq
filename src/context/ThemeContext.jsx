import { createContext, useContext, useState } from 'react'

// Create the context
const ThemeContext = createContext()

// Provider component — wraps entire app
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    // eslint-disable-next-line no-constant-binary-expression
    localStorage.getItem('theme') === 'dark' ?? true
  )

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use theme anywhere
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)