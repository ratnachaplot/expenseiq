import { useState } from 'react'
import { CATEGORIES } from '../utils/helpers'

function BudgetAlert({ budgets, getCategorySpend, updateBudget, darkMode, showEdit = false }) {

  const [editingCat, setEditingCat] = useState(null)
  const [editValue,  setEditValue]  = useState('')

  const handleEditSave = (category) => {
    if (editValue && Number(editValue) > 0) {
      updateBudget(category, editValue)
    }
    setEditingCat(null)
    setEditValue('')
  }

  return (
    <div className={`rounded-2xl p-6 border ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <h3 className={`font-bold text-lg mb-5 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        🎯 {showEdit ? 'Manage Budgets' : 'Budget Alerts'}
      </h3>

      <div className="space-y-4">
        {CATEGORIES.map(cat => {
          const spent    = getCategorySpend(cat.name)
          const budget   = budgets[cat.name] || 0
          const percent  = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
          const isOver   = spent > budget
          const isNear   = percent >= 80 && !isOver

          return (
            <div key={cat.name}>
              {/* Category row */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>{cat.name}</span>

                  {/* Alert badges */}
                  {isOver && (
                    <span className="text-xs bg-red-500/20 text-red-400
                                     px-2 py-0.5 rounded-full font-medium">
                      🚨 Over budget!
                    </span>
                  )}
                  {isNear && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400
                                     px-2 py-0.5 rounded-full font-medium">
                      ⚠️ Almost full
                    </span>
                  )}
                </div>

                {/* Amount + edit */}
                <div className="flex items-center gap-2">
                  {showEdit && editingCat === cat.name ? (
                    // Edit input
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={`w-24 border rounded-lg px-2 py-1 text-sm
                                    outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSave(cat.name)}
                        className="text-green-400 hover:text-green-300 font-bold"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditingCat(null)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    // Display amount
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        ₹{spent.toLocaleString()} / ₹{budget.toLocaleString()}
                      </span>
                      {showEdit && (
                        <button
                          onClick={() => {
                            setEditingCat(cat.name)
                            setEditValue(budget)
                          }}
                          className={`text-xs px-2 py-0.5 rounded-lg transition-all ${
                            darkMode
                              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                              : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          ✏️ Edit
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOver  ? 'bg-red-500'    :
                    isNear  ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BudgetAlert