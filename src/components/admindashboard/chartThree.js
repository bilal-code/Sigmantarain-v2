'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FiArrowUpRight } from 'react-icons/fi';

export default function AdminSalesPerformanceCard() {
  const data = [
    { name: 'Total Sales per day', value: 80, color: 'black' },
    { name: 'Average Sales', value: 60, color: '#272727' },
    { name: 'Empty', value: 60, color: '#4B5563' },
  ];

  return (
    <div className="p-4 rounded-2xl shadow-[0_4px_20px_rgba(168,85,247,0.25)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.35)] border border-purple-700/30 w-full h-full bg-[#0B98AC] flex flex-col transition-all duration-300">
      {/* Header */}
      <h3 className="text-sm font-semibold text-white flex items-center mb-3">
        Sales Performance
        <span className="ml-2 text-gray-400 cursor-pointer text-xs">ℹ️</span>
      </h3>

      {/* Pie Chart */}
      <div className="flex-1 flex items-center justify-center mb-3">
        <div className="w-full h-[140px] xs:h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Percentage Indicator */}
      <div className="text-center mb-3">
        <div className="text-2xl font-bold flex justify-center items-center text-white">
          17.9%
          <span className="ml-1 text-black text-sm">
            <FiArrowUpRight />
          </span>
        </div>
        <p className="text-xs text-gray-400">Since yesterday</p>
      </div>

      {/* Legend */}
      <div className="border-t border-gray-700/50 py-2 text-xs space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1.5 bg-black rounded-full"></span>
            <span className="text-white">Total Sales</span>
          </div>
          <span className="text-white">For week</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1.5 bg-black rounded-full"></span>
            <span className="text-white">Average Sales</span>
          </div>
          <span className="text-white">For today</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button className="text-sm text-gray-200 flex items-center space-x-1 hover:text-black transition-all duration-200">
          <span>See Details</span>
          <FiArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
