'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { month: 'Jan', Target: 2, Paid: 1.8 },
  { month: 'Feb', Target: 2.5, Paid: 2.2 },
  { month: 'Mar', Target: 2, Paid: 1.9 },
  { month: 'Apr', Target: 1.8, Paid: 1.6 },
  { month: 'May', Target: 1.6, Paid: 1.5 },
  { month: 'Jun', Target: 2, Paid: 1.7 },
  { month: 'Jul', Target: 2.5, Paid: 2.3 },
  { month: 'Aug', Target: 3.5, Paid: 3.2 },
  { month: 'Sep', Target: 3, Paid: 2.9 },
  { month: 'Oct', Target: 6, Paid: 5.7 },
  { month: 'Nov', Target: 5.5, Paid: 6 },
  { month: 'Dec', Target: 4.5, Paid: 4.2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-purple-600/70 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg text-white font-mono">
        <p className="text-sm font-semibold text-[#0B98AC]">{label}</p>
        <p className="text-xs text-black">🎯 Target: {payload[0].value}M</p>
        <p className="text-xs text-black">💰 Paid: {payload[1].value}M</p>
      </div>
    );
  }
  return null;
};

export default function AdminPerformanceChart() {
  return (
    <div className="w-full bg-[#0B98AC] backdrop-blur-md border border-[#0B98AC] rounded-2xl shadow-[0_8px_30px_rgba(168,85,247,0.2)] hover:shadow-[0_12px_40px_rgba(168,85,247,0.3)] transition-all duration-300 p-4 sm:p-5 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-white ">
          Performance
        </h2>
        <select className="bg-[#0B98AC]] border border-[#0B98AC] text-white px-2 py-1 rounded text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-white ">
          <option>2023</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              stroke="white" 
              tick={{ fill: 'white', fontSize: 11 }} 
              tickMargin={10} 
            />
            <YAxis 
              stroke="white" 
              domain={[0, 10]} 
              tickFormatter={(v) => `${v}M`} 
              tick={{ fill: 'white', fontSize: 11 }} 
              tickMargin={10} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168,85,247,0.1)' }} />

            {/* Bars */}
            <Bar dataKey="Target" fill="black" radius={[4, 4, 0, 0]}>
              <LabelList 
                dataKey="Target" 
                position="top" 
                formatter={(val) => `${val}M`} 
                fill="white" 
                fontSize={10} 
                offset={10} 
              />
            </Bar>
            <Bar dataKey="Paid" fill="white" radius={[4, 4, 0, 0]}>
              <LabelList 
                dataKey="Paid" 
                position="top" 
                formatter={(val) => `${val}M`} 
                fill="white" 
                fontSize={10} 
                offset={10} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
