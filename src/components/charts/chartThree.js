import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiArrowUpRight } from "react-icons/fi";

export default function SalesPerformanceCard() {
  const data = [
    { name: "Total Sales per day", value: 80, color: "#A855F7" }, // purple main
    { name: "Average Sales", value: 60, color: "#C084FC" }, // light purple
    { name: "Empty", value: 60, color: "#1F1B24" }, // dark background section
  ];

  return (
    <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#0f0f12] via-[#1a1a1f] to-[#24202b] border border-[#3a3a3a]/60 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm tracking-wide font-semibold text-gray-100">
          Sales Performance
        </h3>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-purple-400 transition">ℹ️</span>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center mb-5">
        <div className="w-full h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={3}
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

      {/* Performance stats */}
      <div className="text-center mb-4">
        <div className="text-3xl font-extrabold text-white flex justify-center items-center">
          17.9%
          <span className="ml-2 text-purple-400 text-lg">
            <FiArrowUpRight />
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Since yesterday</p>
      </div>

      {/* Breakdown */}
      <div className="border-t border-[#3a3a3a]/70 pt-3 text-xs space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] rounded"></span>
            <span className="text-gray-200">Total Sales</span>
          </div>
          <span className="text-gray-400">For week</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1.5 bg-gradient-to-r from-[#C084FC] to-[#E9D5FF] rounded"></span>
            <span className="text-gray-200">Average Sales</span>
          </div>
          <span className="text-gray-400">For today</span>
        </div>
      </div>

      {/* CTA Button */}
      <button className="self-center text-sm text-purple-400 flex items-center space-x-1 hover:text-purple-300 font-medium transition">
        <span>See Details</span>
        <FiArrowUpRight className="w-4 h-4" />
      </button>

      {/* Hover Glow Overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-t from-purple-500/40 to-transparent transition duration-500 pointer-events-none" />
    </div>
  );
}
