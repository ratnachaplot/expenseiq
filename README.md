# 💰 ExpenseIQ — Smart Expense Tracker

> A professional React-based personal finance dashboard that helps you track expenses, visualize spending patterns, manage category budgets, and view your expenses in multiple currencies using live exchange rates.

---

## 🌐 Live Demo

| | Link |
|---|---|
| **Frontend** | https://expenseiq.vercel.app |
| **GitHub** | https://github.com/ratnachaplot/expenseiq |

---

## ✨ Features

### 📊 Dashboard
- Summary cards — this month, this week, all time, top category
- Pie chart — spending breakdown by category
- Bar chart — monthly spending trend (last 6 months)
- Budget alerts with progress bars — warnings at 80% and over budget

### 💸 Expenses
- Add expenses with title, amount, category, date, and note
- Delete expenses instantly
- Filter by month and category
- Live expense list with category color coding

### 🎯 Budgets
- Set custom monthly budget for each category
- Visual progress bar per category
- Green → Yellow → Red based on spending level
- Inline edit — update budget without leaving page

### 💱 Currency
- Live exchange rates via ExchangeRate API (no API key needed)
- View all expenses in INR, USD, EUR, GBP, JPY, AED
- One-click currency switching
- Conversion summary for current month

### 🌙 Dark Mode
- Full dark and light mode support
- Persisted in localStorage — remembers your preference
- Smooth transition across all components

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library with component-based architecture |
| Vite | Fast build tool and dev server |
| Tailwind CSS v3 | Utility-first CSS styling |
| Recharts | Data visualization (pie and bar charts) |
| Axios | HTTP requests to currency API |
| React Hot Toast | Toast notification system |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx            # Sticky header with dark mode toggle
│   ├── AddExpenseForm.jsx    # Controlled form to add expenses
│   ├── ExpenseList.jsx       # Filtered expense list with search
│   ├── ExpenseItem.jsx       # Single expense card with delete
│   ├── SummaryCards.jsx      # 4 metric cards at top of dashboard
│   ├── PieChart.jsx          # Spending by category (Recharts)
│   ├── BarChart.jsx          # Monthly trend (Recharts)
│   ├── BudgetAlert.jsx       # Budget progress bars + edit
│   └── CurrencyConverter.jsx # Live currency switcher
├── hooks/
│   ├── useExpenses.js        # All expense logic + localStorage
│   └── useCurrency.js        # Exchange rate API + conversion
├── context/
│   └── ThemeContext.jsx      # Global dark mode via useContext
├── utils/
│   └── helpers.js            # Categories, formatters, aggregators
├── App.jsx                   # Main app with tab navigation
├── main.jsx                  # Entry point with ThemeProvider
└── index.css                 # Tailwind imports + Poppins font
```

---

## ⚙️ Run Locally

### Prerequisites
- Node.js v18 or higher

### Steps
```bash
git clone https://github.com/ratnachaplot/expenseiq.git
cd expenseiq
npm install
npm run dev
# App runs on http://localhost:5173
```

No environment variables needed — the currency API is completely free with no key required.

---

## 🔌 External API

### ExchangeRate API
```
URL:    https://api.exchangerate-api.com/v4/latest/INR
Method: GET
Auth:   None required
```

**What it returns:**
```json
{
  "base": "INR",
  "rates": {
    "USD": 0.01193,
    "EUR": 0.01098,
    "GBP": 0.00938,
    "JPY": 1.812,
    "AED": 0.04381
  }
}
```

**How we use it:**
- All expenses stored in INR in localStorage
- On currency switch → multiply INR amount by the rate
- Rates fetched once per session and cached in state — no unnecessary API calls

---

## 🧠 Key Implementation Details

### Custom Hooks
- **useExpenses** — manages all expense state, localStorage sync, category spending calculations and budget tracking. Single source of truth for all financial data.
- **useCurrency** — handles API call to fetch live exchange rates, caches result in state, exposes `convertAmount()` used across all components.

### useContext for Dark Mode
Instead of passing `darkMode` as a prop through every component, `ThemeContext` makes it globally available. Any component can call `useTheme()` to get or toggle dark mode.

### Data Aggregation
- `groupByCategory()` — reduces expense array into category totals for pie chart
- `groupByMonth()` — groups expenses by month for bar chart using `toLocaleDateString`
- Both functions live in `helpers.js` keeping components clean

### localStorage Strategy
- Expenses saved on every state change via `useEffect`
- Budgets saved separately so they persist independently
- Theme preference saved as `'dark'` or `'light'` string
- All data survives page refresh and browser restart

### Component Architecture
- CustomTooltip components defined **outside** parent components to prevent React's "cannot create components during render" error
- Each component receives only the props it needs — no unnecessary data passed down

---

## 🚀 Deployment

### Vercel
```
Framework:        Vite
Build Command:    npm run build
Output Directory: dist
```

`vercel.json` in root for React Router support:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🐛 Challenges Faced & Solved

| Challenge | Solution |
|---|---|
| CustomTooltip crashing Recharts | Moved component definition outside parent function — React rule: never define components inside components |
| Dark mode prop drilling getting messy | Switched to useContext — ThemeContext available globally without passing props |
| Currency API fetching on every tab switch | Added `if (rates) return` check — fetches only once per session |
| Expenses not persisting on refresh | Added useEffect watching expenses state to sync to localStorage on every change |
| Bar chart showing wrong months | Used `slice(-6)` on grouped data to show only last 6 months in correct order |

---

## 🔮 Future Improvements

- [ ] Export expenses as CSV or PDF
- [ ] Recurring expenses (auto-add monthly bills)
- [ ] Income tracking alongside expenses
- [ ] Savings goal tracker
- [ ] Multiple accounts (cash, card, UPI)
- [ ] Backend + database for multi-device sync

