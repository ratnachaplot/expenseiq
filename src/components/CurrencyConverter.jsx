import { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { formatCurrency } from '../utils/helpers'

const CURRENCIES = [
  { code: 'INR', name: 'Indian Rupee',   symbol: '₹', flag: '🇮🇳' },
  { code: 'USD', name: 'US Dollar',      symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro',           symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound',  symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen',   symbol: '¥', flag: '🇯🇵' },
  { code: 'AED', name: 'UAE Dirham',     symbol: 'د.إ', flag: '🇦🇪' },
]

function CurrencyConverter({
  currency, setCurrency,
  fetchRates, convertAmount,
  loading, symbol,
  totalThisMonth, darkMode
}) {

  // Fetch rates when this tab opens
  useEffect(() => {
    fetchRates()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cardClass = `rounded-2xl p-6 border ${
    darkMode
      ? 'bg-gray-800/50 border-gray-700'
      : 'bg-white border-gray-200 shadow-sm'
  }`

  return (
    <div className="space-y-6">

      {/* Header card */}
      <div className={cardClass}>
        <h3 className={`font-bold text-lg mb-2 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          💱 Currency Converter
        </h3>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          View your expenses in different currencies using live exchange rates.
          Base currency is always INR.
        </p>
      </div>

      {/* Currency selector */}
      <div className={cardClass}>
        <h4 className={`font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>Select Display Currency</h4>

        {loading ? (
          <p className={`text-center py-4 animate-pulse ${
            darkMode ? 'text-blue-400' : 'text-blue-500'
          }`}>
            Fetching live exchange rates...
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CURRENCIES.map(cur => (
              <button
                key={cur.code}
                onClick={() => setCurrency(cur.code)}
                className={`flex items-center gap-3 p-4 rounded-xl border
                            transition-all hover:-translate-y-0.5 ${
                  currency === cur.code
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : darkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white hover:border-blue-500/50'
                      : 'bg-gray-50 border-gray-200 text-gray-800 hover:border-blue-300'
                }`}
              >
                <span className="text-2xl">{cur.flag}</span>
                <div className="text-left">
                  <p className="font-bold text-sm">{cur.code}</p>
                  <p className={`text-xs ${
                    currency === cur.code
                      ? 'text-blue-100'
                      : darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{cur.symbol}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conversion summary */}
      {totalThisMonth > 0 && (
        <div className={cardClass}>
          <h4 className={`font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            This Month's Spending in {currency}
          </h4>
          <div className="flex items-center gap-4">
            <div className={`text-center p-4 rounded-xl flex-1 ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <p className={`text-xs uppercase tracking-wider mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>INR</p>
              <p className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                ₹{totalThisMonth.toLocaleString()}
              </p>
            </div>

            <p className={`text-2xl ${
              darkMode ? 'text-gray-400' : 'text-gray-400'
            }`}>→</p>

            <div className="text-center p-4 rounded-xl flex-1 bg-blue-600">
              <p className="text-xs uppercase tracking-wider mb-1 text-blue-100">
                {currency}
              </p>
              <p className="text-2xl font-bold text-white">
                {symbol}{Number(convertAmount(totalThisMonth)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default CurrencyConverter