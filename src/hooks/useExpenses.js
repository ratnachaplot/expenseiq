import { useState, useEffect } from 'react'
import { generateId } from '../utils/helpers'

export function useExpenses() {
  // Load expenses from localStorage on first render
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })

  // Load budgets from localStorage
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets')
    return saved ? JSON.parse(saved) : {
      Food: 5000,
      Transport: 3000,
      Shopping: 4000,
      Entertainment: 2000,
      Health: 3000,
      Education: 5000,
      Bills: 6000,
      Other: 2000
    }
  })

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // Save to localStorage whenever budgets change
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  // Add new expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setExpenses(prev => [newExpense, ...prev])
  }

  // Delete expense by id
  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id))
  }

  // Update budget for a category
  const updateBudget = (category, amount) => {
    setBudgets(prev => ({ ...prev, [category]: Number(amount) }))
  }

  // Get total spending for a category this month
  const getCategorySpend = (category) => {
    const now = new Date()
    return expenses
      .filter(exp => {
        const expDate = new Date(exp.date)
        return exp.category === category &&
          expDate.getMonth() === now.getMonth() &&
          expDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, exp) => sum + Number(exp.amount), 0)
  }

  // Total spent this month
  const totalThisMonth = () => {
    const now = new Date()
    return expenses
      .filter(exp => {
        const expDate = new Date(exp.date)
        return expDate.getMonth() === now.getMonth() &&
          expDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, exp) => sum + Number(exp.amount), 0)
  }

  return {
    expenses,
    budgets,
    addExpense,
    deleteExpense,
    updateBudget,
    getCategorySpend,
    totalThisMonth
  }
}