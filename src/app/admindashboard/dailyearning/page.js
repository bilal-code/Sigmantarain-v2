"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrendingUp } from "react-icons/fi";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export default function DailyEarningsPage() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLoading, setNewLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("/api/admin/getDailyEarning");
        setEarnings(res.data.data || []);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  const sortedEarnings = [...earnings].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    return sortConfig.direction === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  // Top Box Calculations
  const totalEarnings = earnings.reduce(
    (sum, e) => sum + (e.earningAmount || 0),
    0
  );
  const uniqueUsers = new Map();
  earnings.forEach((e) => {
    if (!uniqueUsers.has(e.userId)) {
      uniqueUsers.set(e.userId, e.packageAmount || 0);
    }
  });
  const totalPackage = Array.from(uniqueUsers.values()).reduce(
    (sum, val) => sum + val,
    0
  );

  const avgPercentage = earnings.length
    ? earnings.reduce((sum, e) => sum + (e.percentage || 0), 0) /
      earnings.length
    : 0;
  const totalRecords = earnings.length;

  const formatId = (id = "") => id.slice(0, 4) + "..." + id.slice(-4);

  if (loading) {
  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Skeleton */}
        <div className="h-8 w-60 bg-gray-700 rounded mb-6 animate-pulse"></div>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700 animate-pulse"
            >
              <div className="h-5 w-2/3 bg-gray-700 rounded mb-2"></div>
              <div className="h-6 w-1/2 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-[#272727] border border-gray-700 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600 text-sm">
            <thead className="bg-[#1f1f1f]">
              <tr>
                {["User", "Package", "Pkg Amt", "Earnings", "%", "Date"].map((label, i) => (
                  <th
                    key={i}
                    className="px-3 py-3 text-left text-gray-400 font-medium whitespace-nowrap"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[...Array(6)].map((_, rowIdx) => (
                <tr key={rowIdx} className="animate-pulse hover:bg-[#1a1a1a]">
                  {[...Array(6)].map((_, colIdx) => (
                    <td key={colIdx} className="px-3 py-3">
                      <div className="h-4 w-4/5 bg-gray-700 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


  return (
   <div className="min-h-screen bg-black text-white p-2 sm:p-6">
  <div className="max-w-7xl w-[395px] sm:w-full mx-auto">
    {/* Page Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl mt-4 sm:mt-0 font-bold text-[var(--themeColor)]">
          Daily Earnings Report
        </h1>
      </div>
    </div>

    {/* Stat Boxes */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4">
      <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
        <h3 className="text-xs sm:text-sm text-gray-400">Total Earnings</h3>
        <p className="text-lg sm:text-xl font-bold text-green-400 mt-1">
          ${totalEarnings.toFixed(2)}
        </p>
      </div>
      <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
        <h3 className="text-xs sm:text-sm text-gray-400">Total Package Amount</h3>
        <p className="text-lg sm:text-xl font-bold text-blue-400 mt-1">
          ${totalPackage.toFixed(2)}
        </p>
      </div>
      <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
        <h3 className="text-xs sm:text-sm text-gray-400">Average Earning %</h3>
        <p className="text-lg sm:text-xl font-bold text-yellow-400 mt-1">
          {avgPercentage.toFixed(2)}%
        </p>
      </div>
      <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
        <h3 className="text-xs sm:text-sm text-gray-400">Total Records</h3>
        <p className="text-lg sm:text-xl font-bold text-indigo-400 mt-1">
          {totalRecords}
        </p>
      </div>
    </div>

    {/* Table */}
    <div className="bg-[#272727] border border-gray-700 rounded-lg -mt-1 sm:mt-2 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600 text-sm">
        <thead className="bg-[#1f1f1f]">
          <tr>
            {["User", "Package", "Pkg Amt", "Earnings", "%", "Date"].map((label, i) => (
              <th key={i} className="px-3 py-3 text-left text-gray-400 font-medium whitespace-nowrap">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedEarnings.length > 0 ? (
            sortedEarnings.map((e) => (
              <tr key={e._id} className="hover:bg-[#1a1a1a]">
                <td className="px-3 py-2 text-white">
                  <span className="block lg:hidden">{`${e.userId.slice(0, 6)}...`}</span>
                  <span className="hidden lg:block">{e.userId}</span>
                </td>
                <td className="px-3 py-2 text-gray-200">{e.packageName}</td>
                <td className="px-3 py-2 text-white text-center">${e.packageAmount || 0}</td>
                <td className="px-3 py-2 text-green-400 text-center">${e.earningAmount || 0}</td>
                <td className="px-3 py-2 text-yellow-300 text-center">{e.percentage || 0}%</td>
                <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-6 text-center text-gray-500">
                No earning records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Error */}
    {error && (
      <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
    )}
  </div>
</div>

  );
}
