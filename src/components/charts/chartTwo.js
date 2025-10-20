"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", Target: 2, Paid: 1.8 },
  { month: "Feb", Target: 2.5, Paid: 2.2 },
  { month: "Mar", Target: 2, Paid: 1.9 },
  { month: "Apr", Target: 1.8, Paid: 1.6 },
  { month: "May", Target: 1.6, Paid: 1.5 },
  { month: "Jun", Target: 2, Paid: 1.7 },
  { month: "Jul", Target: 2.5, Paid: 2.3 },
  { month: "Aug", Target: 3.5, Paid: 3.2 },
  { month: "Sep", Target: 3, Paid: 2.9 },
  { month: "Oct", Target: 6, Paid: 5.7 },
  { month: "Nov", Target: 5.5, Paid: 6 },
  { month: "Dec", Target: 4.5, Paid: 4.2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#0B98AC] px-3 py-2 rounded-lg shadow-lg text-gray-800 font-mono">
        <p className="text-sm font-semibold text-[#0B98AC]">{label}</p>
        <p className="text-xs text-gray-700">🎯 Target: {payload[0].value}M</p>
        <p className="text-xs text-gray-700">💰 Paid: {payload[1].value}M</p>
      </div>
    );
  }
  return null;
};

export default function PerformanceChart() {
  return (
    <div className="w-full bg-white border border-[#0B98AC]/30 shadow-[0_0_15px_rgba(11,152,172,0.2)] rounded-2xl p-4 font-mono text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#0B98AC]">
          Performance Overview
        </h2>
        <select className="bg-[#0B98AC]/10 border border-[#0B98AC] rounded px-2 py-1 text-sm text-[#0B98AC] focus:outline-none">
          <option className="bg-white text-[#0B98AC]">2023</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={6}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#0B98AC33" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#0B98AC"
              tick={{ fill: "#0B98AC", fontSize: 11 }}
              tickMargin={10}
            />
            <YAxis
              stroke="#0B98AC"
              tickFormatter={(v) => `${v}M`}
              tick={{ fill: "#0B98AC", fontSize: 11 }}
              tickMargin={10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#0B98AC10" }} />

            <Bar
              dataKey="Target"
              fill="#E2E8F0"
              radius={[5, 5, 0, 0]}
              className="hover:opacity-80 transition-all"
            />
            <Bar
              dataKey="Paid"
              fill="#0B98AC"
              stroke="#0B98AC"
              strokeWidth={1.5}
              radius={[5, 5, 0, 0]}
              className="hover:opacity-80 transition-all"
            >
              <LabelList
                dataKey="Paid"
                position="top"
                formatter={(val) => `${val}M`}
                fill="#0B98AC"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
