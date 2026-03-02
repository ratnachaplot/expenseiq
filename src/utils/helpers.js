// All expense categories with colors and icons
export const CATEGORIES = [
  { name: 'Food',          icon: '🍔', color: '#f97316' },
  { name: 'Transport',     icon: '🚗', color: '#3b82f6' },
  { name: 'Shopping',      icon: '🛍️', color: '#a855f7' },
  { name: 'Entertainment', icon: '🎬', color: '#ec4899' },
  { name: 'Health',        icon: '💊', color: '#10b981' },
  { name: 'Education',     icon: '📚', color: '#f59e0b' },
  { name: 'Bills',         icon: '📄', color: '#ef4444' },
  { name: 'Other',         icon: '💼', color: '#6b7280' },
]

// Format number as currency
export const formatCurrency = (amount, symbol = '₹') =>
  `${symbol}${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

// Get month name from date string
export const getMonthName = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric'
  })

// Group expenses by category for pie chart
export const groupByCategory = (expenses) => {
  const grouped = {}
  expenses.forEach(exp => {
    grouped[exp.category] = (grouped[exp.category] || 0) + Number(exp.amount)
  })
  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100
  }))
}

// Group expenses by month for bar chart
export const groupByMonth = (expenses) => {
  const grouped = {}
  expenses.forEach(exp => {
    const month = getMonthName(exp.date)
    grouped[month] = (grouped[month] || 0) + Number(exp.amount)
  })
  return Object.entries(grouped)
    .slice(-6) // last 6 months only
    .map(([month, total]) => ({
      month,
      total: Math.round(total * 100) / 100
    }))
}

// Generate unique ID
export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2)