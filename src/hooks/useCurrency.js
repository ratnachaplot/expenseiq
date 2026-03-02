import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export function useCurrency() {
  const [rates,    setRates]    = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [currency, setCurrency] = useState('INR')

  const fetchRates = async () => {
    if (rates) return // already fetched — no need to fetch again
    setLoading(true)
    try {
      // Free API — no key needed!
      const res = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/INR'
      )
      setRates(res.data.rates)
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Could not fetch exchange rates')
    } finally {
      setLoading(false)
    }
  }

  // Convert amount from INR to selected currency
  const convertAmount = (amountInINR) => {
    if (!rates || currency === 'INR') return amountInINR
    return (amountInINR * rates[currency]).toFixed(2)
  }

  const currencySymbols = {
    INR: '₹', USD: '$', EUR: '€',
    GBP: '£', JPY: '¥', AED: 'د.إ'
  }

  return {
    currency, setCurrency,
    fetchRates, convertAmount,
    loading, rates,
    symbol: currencySymbols[currency] || currency
  }
}