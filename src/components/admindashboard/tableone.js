'use client';
import { IoFilterOutline } from "react-icons/io5";
import React from "react";

export default function AdminTransactionHistory() {
  const transactions = [
    { id: 1, name: "Netflix", date: "7 Nov, 3:20 PM", status: "In process", amount: "- $12.00", type: "Subscription", icon: <IoFilterOutline className="text-red-500" /> },
    { id: 2, name: "Lightroom", date: "6 Nov, 12:45 PM", status: "In process", amount: "- $19.99", type: "Subscription", icon: <IoFilterOutline className="text-blue-400" /> },
    { id: 3, name: "Mobbin", date: "5 Nov, 5:37 PM", status: "Completed", amount: "- $10.00", type: "Subscription", icon: <IoFilterOutline className="text-gray-200" /> },
    { id: 4, name: "Figma", date: "5 Nov, 11:02 AM", status: "Completed", amount: "- $15.00", type: "Subscription", icon: <IoFilterOutline className="text-purple-500" /> },
  ];

  const statusColors = {
    "In process": "bg-orange-500",
    "Completed": "bg-green-500",
  };

  return (
    <div className="p-4 rounded-2xl shadow-[0_8px_25px_rgba(168,85,247,0.2)] hover:shadow-[0_12px_35px_rgba(168,85,247,0.3)] transition-all duration-300 bg-[#0B98AC] border border-purple-700/40 w-full h-[300px] flex flex-col font-mono">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Transaction History
          </h2>
          <p className="text-xs text-black">Nov 5 2024 - Nov 7 2024</p>
        </div>
        <div className="flex space-x-3">
          <IoFilterOutline className="w-5 h-5 text-gray-500 cursor-pointer hover:text-purple-400 transition" />
          <IoFilterOutline className="w-5 h-5 text-gray-500 cursor-pointer hover:text-purple-400 transition" />
        </div>
      </div>
      
      {/* Transactions */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center p-2 rounded-xl hover:bg-purple-900/20 transition-all"
            >
              {/* Left */}
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full shadow-inner">
                  {React.cloneElement(tx.icon, { className: `${tx.icon.props.className} w-4 h-4` })}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{tx.name}</h4>
                  <p className="text-xs text-gray-400 truncate">{tx.date}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <span className={`w-2 h-2 rounded-full ${statusColors[tx.status]}`}></span>
                  <span className="text-xs text-gray-200">{tx.status}</span>
                </div>
                <div className="text-xs border border-purple-600/50 rounded px-1 py-0.5 text-purple-300">
                  {tx.type}
                </div>
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  {tx.amount}
                </span>
                <span className="text-gray-400 cursor-pointer text-base">•••</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
