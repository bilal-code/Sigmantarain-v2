'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1st', value: 0 },
  { name: '2nd', value: 4000 },
  { name: '3rd', value: 2000 },
  { name: '4th', value: 6000 },
  { name: '5th', value: 2000 },
  { name: '6th', value: 6000 },
  { name: '7th', value: 2000 },
  { name: '8th', value: 5000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#0B98A] backdrop-blur-md px-3 py-2 rounded-lg shadow-lg text-white font-mono">
        <p className="text-sm font-semibold text-[#0B98AC]">{label}</p>
        <p className="text-xs text-black">💰 Value: {payload[0].value} PKR</p>
      </div>
    );
  }
  return null;
};

const AdminProductValuationChart = () => {
  return (
    <div className="bg-[#0B98AC] border border-[#0B98AC] rounded-2xl shadow-[0_4px_18px_rgba(168,85,247,0.2)] hover:shadow-[0_6px_25px_rgba(168,85,247,0.3)] transition-all duration-300 p-4 sm:p-5 w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-white  bg-clip-text ">
        Product Valuation
      </h2>

      <div className="h-[250px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity={0.8} />
                <stop offset="100%" stopColor="white" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="white" opacity={0.4} />
            
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'white', fontSize: 11 }} 
              tickMargin={10} 
              axisLine={{ stroke: 'white', strokeWidth: 1 }}
            />
            
            <YAxis 
              domain={[0, 7000]} 
              tickFormatter={(tick) => `${tick / 1000}K`} 
              tick={{ fill: 'white', fontSize: 11 }}
              tickMargin={10}
              axisLine={{ stroke: 'white', strokeWidth: 1 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#AD46FF40" }} />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#purpleGradient)"
              strokeWidth={3}
              dot={{
                stroke: 'white',
                strokeWidth: 2,
                r: 5,
                fill: '#272727',
              }}
              activeDot={{ r: 7, fill: 'black' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminProductValuationChart;
