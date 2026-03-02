import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import { CATEGORIES } from '../utils/helpers'

// ✅ Outside the component
const CustomTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-3 py-2 rounded-xl border text-sm ${
        darkMode
          ? 'bg-gray-800 border-gray-700 text-white'
          : 'bg-white border-gray-200 text-gray-800 shadow-lg'
      }`}>
        <p className="font-bold">{payload[0].name}</p>
        <p>₹{payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

function PieChartView({ data, darkMode }) {
  const getColor = (name) => {
    const cat = CATEGORIES.find(c => c.name === name)
    return cat?.color || '#6b7280'
  }

  return (
    <div className={`rounded-2xl p-6 border ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <h3 className={`font-bold text-lg mb-4 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        🥧 Spending by Category
      </h3>

      {data.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📊</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            No data yet — add expenses to see chart
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.name)} />
              ))}
            </Pie>
            {/* ✅ Pass darkMode as prop */}
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Legend
              formatter={(value) => (
                <span style={{
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  fontSize: '12px'
                }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default PieChartView
