"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
  { name: "1st", value: 0 },
  { name: "2nd", value: 4000 },
  { name: "3rd", value: 2000 },
  { name: "4th", value: 6000 },
  { name: "5th", value: 2000 },
  { name: "6th", value: 6000 },
  { name: "7th", value: 2000 },
  { name: "8th", value: 5000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-xl text-gray-800 font-sans">
        <p className="text-sm font-semibold text-[#0B98AC] mb-2">{label} Quarter</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-[#0B98AC] to-blue-600 rounded-full"></div>
          <p className="text-sm text-gray-600">
            Value: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ProductValuationChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#0B98AC]/30 shadow-[0_0_15px_rgba(11,152,172,0.2)] p-6 font-sans h-[98%]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Product Valuation
        </h2>
        <p className="text-sm text-gray-600">Quarterly product value trends</p>
      </div>

      {/* Chart */}
      <div className="h-[250px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B98AC" stopOpacity={1} />
                <stop offset="100%" stopColor="#0B98AC" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B98AC" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0B98AC" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid & Axis */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#f0f0f0" 
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              tickMargin={12}
            />
            <YAxis
              domain={[0, 7000]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(tick) => `${tick / 1000}K`}
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              tickMargin={12}
            />

            {/* Tooltip */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: "#0B98AC", strokeWidth: 1, strokeDasharray: "3 3" }} 
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#areaGradient)"
              fillOpacity={0.6}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{
                stroke: "#0B98AC",
                strokeWidth: 2,
                r: 4,
                fill: "#ffffff",
              }}
              activeDot={{ 
                r: 6, 
                fill: "#0B98AC",
                stroke: "#ffffff",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Current</p>
          <p className="text-lg font-bold text-[#0B98AC]">5,000</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Peak</p>
          <p className="text-lg font-bold text-gray-800">6,000</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Growth</p>
          <p className="text-lg font-bold text-green-500">+25%</p>
        </div>
      </div> */}
    </div>
  );
};

export default ProductValuationChart;