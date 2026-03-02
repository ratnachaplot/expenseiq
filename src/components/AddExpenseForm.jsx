import { useState } from 'react'
import toast from 'react-hot-toast'
import { CATEGORIES } from '../utils/helpers'

function AddExpenseForm({ onAdd, darkMode }) {
  const [form, setForm] = useState({
    title:    '',
    amount:   '',
    category: 'Food',
    date:     new Date().toISOString().split('T')[0],
    note:     ''
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    onAdd(form)
    toast.success('Expense added! 💰')

    // Reset form but keep category and date
    setForm(prev => ({
      ...prev,
      title:  '',
      amount: '',
      note:   ''
    }))
  }

  const inputClass = `w-full border rounded-xl px-3 py-2.5 outline-none
    focus:ring-2 focus:ring-blue-500 transition-all text-sm ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
  }`

  const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1 ${
    darkMode ? 'text-gray-400' : 'text-gray-500'
  }`

  return (
    <div className={`rounded-2xl p-6 border ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <h3 className={`font-bold text-lg mb-5 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>➕ Add Expense</h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Lunch at cafe"
            className={inputClass}
          />
        </div>

        {/* Amount */}
        <div>
          <label className={labelClass}>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Note */}
        <div>
          <label className={labelClass}>Note (optional)</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Any extra details..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     py-3 rounded-xl transition-all hover:-translate-y-0.5
                     hover:shadow-lg hover:shadow-blue-500/25"
        >
          Add Expense 💰
        </button>
      </form>
    </div>
  )
}

export default AddExpenseForm