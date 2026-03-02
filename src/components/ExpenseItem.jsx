import { CATEGORIES } from '../utils/helpers'

function ExpenseItem({ expense, onDelete, symbol, convertAmount, darkMode }) {
  const category = CATEGORIES.find(c => c.name === expense.category)

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl
                    border transition-all hover:-translate-y-0.5 hover:shadow-md ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
        : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
    }`}>

      {/* Left — icon + details */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Category icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     text-xl flex-shrink-0"
          style={{ backgroundColor: `${category?.color}20` }}
        >
          {category?.icon}
        </div>

        {/* Title + meta */}
        <div className="min-w-0 flex-1">
          <p className={`font-semibold truncate ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>{expense.title}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: `${category?.color}20`,
                color: category?.color
              }}
            >
              {expense.category}
            </span>
            <span className={`text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              📅 {new Date(expense.date).toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </span>
            {expense.note && (
              <span className={`text-xs truncate ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                📝 {expense.note}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right — amount + delete */}
      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
        <p className={`font-bold text-lg ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {symbol}{Number(convertAmount(expense.amount)).toLocaleString()}
        </p>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-red-400 hover:text-red-500 hover:scale-110
                     transition-all p-1"
          title="Delete expense"
        >
          🗑️
        </button>
      </div>

    </div>
  )
}

export default ExpenseItem