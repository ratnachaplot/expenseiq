import { formatCurrency } from '../utils/helpers'

function SummaryCards({ expenses, totalThisMonth, symbol, convertAmount, darkMode }) {

  // Total all time
  const totalAllTime = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  // Total this week
  const totalThisWeek = expenses
    .filter(exp => {
      const expDate = new Date(exp.date)
      const now = new Date()
      const weekAgo = new Date(now.setDate(now.getDate() - 7))
      return expDate >= weekAgo
    })
    .reduce((sum, exp) => sum + Number(exp.amount), 0)

  // Most expensive category this month
  const now = new Date()
  const thisMonthExpenses = expenses.filter(exp => {
    const d = new Date(exp.date)
    return d.getMonth() === now.getMonth() &&
           d.getFullYear() === now.getFullYear()
  })

  const categoryTotals = {}
  thisMonthExpenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount)
  })
  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]

  const cards = [
    {
      title: 'This Month',
      value: formatCurrency(convertAmount(totalThisMonth), symbol),
      icon: '📅',
      color: 'from-blue-500 to-blue-600',
      sub: `${thisMonthExpenses.length} transactions`
    },
    {
      title: 'This Week',
      value: formatCurrency(convertAmount(totalThisWeek), symbol),
      icon: '📆',
      color: 'from-purple-500 to-purple-600',
      sub: 'Last 7 days'
    },
    {
      title: 'All Time',
      value: formatCurrency(convertAmount(totalAllTime), symbol),
      icon: '💳',
      color: 'from-green-500 to-green-600',
      sub: `${expenses.length} total expenses`
    },
    {
      title: 'Top Category',
      value: topCategory ? topCategory[0] : 'None',
      icon: '🏆',
      color: 'from-orange-500 to-orange-600',
      sub: topCategory
        ? formatCurrency(convertAmount(topCategory[1]), symbol)
        : 'No data yet'
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-2xl p-5 border transition-all hover:-translate-y-1
                      hover:shadow-lg ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br
                           ${card.color} mb-3`}>
            <span className="text-xl">{card.icon}</span>
          </div>
          <p className={`text-xs uppercase tracking-wider mb-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>{card.title}</p>
          <p className={`text-xl font-bold truncate ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>{card.value}</p>
          <p className={`text-xs mt-1 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>{card.sub}</p>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards