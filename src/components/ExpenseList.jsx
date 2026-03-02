import ExpenseItem from './ExpenseItem'
import { CATEGORIES } from '../utils/helpers'

function ExpenseList({
  expenses, onDelete,
  filterMonth, filterCat,
  setFilterMonth, setFilterCat,
  symbol, convertAmount, darkMode
}) {

  // Get unique months from all expenses for filter dropdown
  const months = [...new Set(
    expenses.map(exp => exp.date.slice(0, 7))
  )].sort().reverse()

  const inputClass = `border rounded-xl px-3 py-2 text-sm outline-none
    focus:ring-2 focus:ring-blue-500 transition-all ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  }`

  return (
    <div className={`rounded-2xl p-6 border h-full ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>

      {/* Header + filters */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <h3 className={`font-bold text-lg ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          💸 Expenses
          <span className={`text-sm font-normal ml-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            ({expenses.length} total)
          </span>
        </h3>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {/* Month filter */}
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className={inputClass}
          >
            <option value="all">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>
                {new Date(month + '-01').toLocaleDateString('en-US', {
                  month: 'long', year: 'numeric'
                })}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className={inputClass}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {/* Clear filters */}
          {(filterMonth !== 'all' || filterCat !== 'all') && (
            <button
              onClick={() => {
                setFilterMonth('all')
                setFilterCat('all')
              }}
              className="px-3 py-2 text-sm text-red-400 hover:text-red-500
                         border border-red-400/30 rounded-xl transition-all"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Expense list */}
      {expenses.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">💸</p>
          <p className={`font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>No expenses yet</p>
          <p className={`text-sm mt-1 ${
            darkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>Add your first expense on the left</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {expenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              symbol={symbol}
              convertAmount={convertAmount}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default ExpenseList