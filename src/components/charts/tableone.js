import { IoFilterOutline } from "react-icons/io5";
import React from "react";

export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      name: "Netflix",
      date: "7 Nov, 3:20 PM",
      status: "In process",
      amount: "- $12.00",
      type: "Subscription",
      color: "from-[#9333EA] to-[#C084FC]",
    },
    {
      id: 2,
      name: "Lightroom",
      date: "6 Nov, 12:45 PM",
      status: "In process",
      amount: "- $19.99",
      type: "Subscription",
      color: "from-[#6D28D9] to-[#A855F7]",
    },
    {
      id: 3,
      name: "Mobbin",
      date: "5 Nov, 5:37 PM",
      status: "Completed",
      amount: "- $10.00",
      type: "Subscription",
      color: "from-[#4C1D95] to-[#7E22CE]",
    },
    {
      id: 4,
      name: "Figma",
      date: "5 Nov, 11:02 AM",
      status: "Completed",
      amount: "- $15.00",
      type: "Subscription",
      color: "from-[#581C87] to-[#A855F7]",
    },
  ];

  const statusColors = {
    "In process": "text-orange-400",
    Completed: "text-green-400",
  };

  return (
    <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-[#0f0f12] via-[#1a1a1f] to-[#24202b] border border-[#3a3a3a]/70 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Transaction History</h2>
          <p className="text-xs text-gray-400">Nov 5 2024 - Nov 7 2024</p>
        </div>
        <div className="flex space-x-3">
          <IoFilterOutline className="w-5 h-5 text-gray-400 cursor-pointer hover:text-purple-400 transition" />
          <IoFilterOutline className="w-5 h-5 text-gray-400 cursor-pointer hover:text-purple-400 transition" />
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#3b3b3b] scrollbar-track-transparent">
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center p-3 rounded-xl bg-[#1e1e25]/70 border border-[#2d2d35]/70 hover:border-purple-500/30 hover:bg-[#282832]/90 transition duration-300"
            >
              {/* Left Side */}
              <div className="flex items-center space-x-3 min-w-0">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br ${tx.color} shadow-[0_0_8px_rgba(168,85,247,0.3)]`}
                >
                  <IoFilterOutline className="text-white w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-100 truncate">
                    {tx.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">{tx.date}</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-3">
                <span
                  className={`text-[11px] font-medium ${statusColors[tx.status]}`}
                >
                  {tx.status}
                </span>
                <span className="hidden sm:block text-[10px] border border-[#3b3b3b] rounded-md px-2 py-0.5 text-gray-300">
                  {tx.type}
                </span>
                <span className="text-sm font-semibold text-gray-100 whitespace-nowrap">
                  {tx.amount}
                </span>
                <span className="text-gray-500 cursor-pointer text-base hover:text-purple-400 transition">
                  •••
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purple Glow Overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-t from-purple-500/30 to-transparent transition duration-500 pointer-events-none" />
    </div>
  );
}
