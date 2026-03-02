import { useTheme } from '../context/ThemeContext'

function Header() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${
      darkMode
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur'
        : 'bg-white/95 border-gray-200 backdrop-blur shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className={`text-xl font-extrabold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            💰 ExpenseIQ
          </h1>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>Smart expense tracking</p>
        </div>

        <div className="flex items-center gap-3">
          <p className={`text-sm font-medium hidden sm:block ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric'
            })}
          </p>
          <button
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-xl text-lg hover:scale-110 transition-all ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header