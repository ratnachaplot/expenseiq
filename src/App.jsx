import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useTheme } from './context/ThemeContext'
import { useExpenses } from './hooks/useExpenses'
import { useCurrency } from './hooks/useCurrency'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import PieChartView from './components/PieChart'
import BarChartView from './components/BarChart'
import BudgetAlert from './components/BudgetAlert'
import CurrencyConverter from './components/CurrencyConverter'
import { groupByCategory, groupByMonth } from './utils/helpers'

function App() {
  const { darkMode } = useTheme()
  const {
    expenses, budgets,
    addExpense, deleteExpense,
    updateBudget, getCategorySpend, totalThisMonth
  } = useExpenses()

  const {
    currency, setCurrency,
    fetchRates, convertAmount,
    loading: currencyLoading, symbol
  } = useCurrency()

  const [activeTab,   setActiveTab]   = useState('dashboard')
  const [filterMonth, setFilterMonth] = useState('all')
  const [filterCat,   setFilterCat]   = useState('all')

  const filteredExpenses = expenses.filter(exp => {
    const matchMonth = filterMonth === 'all' || exp.date.startsWith(filterMonth)
    const matchCat   = filterCat   === 'all' || exp.category === filterCat
    return matchMonth && matchCat
  })

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'expenses',  label: '💸 Expenses'  },
    { id: 'budgets',   label: '🎯 Budgets'   },
    { id: 'currency',  label: '💱 Currency'  },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-950 text-white' : 'bg-slate-100 text-gray-900'
    }`}>
      <Toaster position="top-right" />
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Tabs */}
        {/* Tabs — scrollable on mobile */}
<div className="overflow-x-auto mb-6">
  <div className={`flex gap-1 p-1 rounded-xl w-max min-w-full sm:w-fit ${
    darkMode ? 'bg-gray-800' : 'bg-white shadow'
  }`}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                    transition-all whitespace-nowrap ${
          activeTab === tab.id
            ? 'bg-blue-600 text-white shadow'
            : darkMode
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <SummaryCards
              expenses={expenses}
              totalThisMonth={totalThisMonth()}
              symbol={symbol}
              convertAmount={convertAmount}
              darkMode={darkMode}
            />
            <BudgetAlert
              budgets={budgets}
              getCategorySpend={getCategorySpend}
              darkMode={darkMode}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChartView
                data={groupByCategory(filteredExpenses)}
                darkMode={darkMode}
              />
              <BarChartView
                data={groupByMonth(expenses)}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {/* EXPENSES */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AddExpenseForm onAdd={addExpense} darkMode={darkMode} />
            </div>
            <div className="lg:col-span-2">
              <ExpenseList
                expenses={filteredExpenses}
                onDelete={deleteExpense}
                filterMonth={filterMonth}
                filterCat={filterCat}
                setFilterMonth={setFilterMonth}
                setFilterCat={setFilterCat}
                symbol={symbol}
                convertAmount={convertAmount}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {/* BUDGETS */}
        {activeTab === 'budgets' && (
          <BudgetAlert
            budgets={budgets}
            getCategorySpend={getCategorySpend}
            updateBudget={updateBudget}
            darkMode={darkMode}
            showEdit={true}
          />
        )}

        {/* CURRENCY */}
        {activeTab === 'currency' && (
          <CurrencyConverter
            currency={currency}
            setCurrency={setCurrency}
            fetchRates={fetchRates}
            convertAmount={convertAmount}
            loading={currencyLoading}
            symbol={symbol}
            totalThisMonth={totalThisMonth()}
            darkMode={darkMode}
          />
        )}

      </div>
    </div>
  )
}

export default App
