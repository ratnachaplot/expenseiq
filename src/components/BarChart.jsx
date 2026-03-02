import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

// ✅ CustomTooltip OUTSIDE BarChartView — not inside!
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-3 py-2 rounded-xl border text-sm ${
        darkMode
          ? 'bg-gray-800 border-gray-700 text-white'
          : 'bg-white border-gray-200 text-gray-800 shadow-lg'
      }`}>
        <p className="font-bold">{label}</p>
        <p>₹{payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

function BarChartView({ data, darkMode }) {
  return (
    <div className={`rounded-2xl p-6 border ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <h3 className={`font-bold text-lg mb-4 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        📈 Monthly Spending Trend
      </h3>

      {data.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📈</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            No data yet — add expenses to see trend
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? '#374151' : '#f0f0f0'}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v}`}
            />
            {/* ✅ Pass darkMode as prop instead of closing over it */}
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default BarChartView