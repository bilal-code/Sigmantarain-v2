"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const UserBoughtPackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIdIndex, setExpandedIdIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/getBoughtPackages");
        setPackages(res.data.BoughtPackages || []);
      } catch (err) {
        alert("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedPackages = [...packages].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "createdAt" || sortConfig.key === "buyDate" || sortConfig.key === "expiryDate") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else if (sortConfig.key === "packageName") {
      aVal = (aVal || "").toLowerCase();
      bVal = (bVal || "").toLowerCase();
    } else {
      aVal = parseFloat(aVal) || 0;
      bVal = parseFloat(bVal) || 0;
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="p-2 sm:p-6 min-h-screen bg-white animate-pulse">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-white rounded mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-3 rounded-xl border border-white h-24"></div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-white h-64"></div>
        </div>
      </div>
    );
  }

  const getArrowClass = (key, direction) => {
    const isActive = sortConfig.key === key && sortConfig.direction === direction;
    return `h-3 w-3 transition-colors duration-200 ${
      isActive ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]" : "text-gray-500"
    }`;
  };

  const Card = ({ title, value, color }) => (
    <div className="bg-[#0B98AC] p-4 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition">
      <h3 className="text-xs sm:text-sm font-medium text-white">{title}</h3>
      <p className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mt-1`}>{value}</p>
    </div>
  );

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B98AC] mt-4 sm:mt-0">
            User's Bought Packages
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6  ">
          <Card title="Total Packages" value={packages.length} color="yellow " />
          {/* <Card title="Active" value={packages.filter(p => p.status === "Active").length} color="green" /> */}
          {/* <Card title="Expired" value={packages.filter(p => p.status === "Expired").length} color="red" /> */}
          <Card title="Revenue" value={`$${packages.reduce((acc, p) => acc + parseFloat(p.packageAmount || 0), 0).toFixed(2)}`} color="indigo" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cyan-400">
              <thead className="bg-[#0B98AC]">
                <tr>
                  {[
                    { key: "_id", label: "ID" },
                    { key: "packageName", label: "Package" },
                    { key: "packageAmount", label: "Amount" },
                    { key: "SGTokens", label: "SG Tokens" },
                    { key: "createdAt", label: "Created" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => setSortConfig(prev => ({
                        key,
                        direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
                      }))}
                      className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer select-none"
                    >
                      <div className="flex items-center justify-between">
                        {label}
                        <span className="ml-2 flex flex-col">
                          <FaSortUp className={getArrowClass(key, "asc")} />
                          <FaSortDown className={getArrowClass(key, "desc")} />
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-cyan-400">
                {sortedPackages.length > 0 ? (
                  sortedPackages.map((pkg, idx) => (
                    <tr key={idx} className="transition-all duration-300">
                      <td
                        className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800 cursor-pointer hover:text-black"
                        onClick={() => setExpandedIdIndex(expandedIdIndex === idx ? null : idx)}
                      >
                        <span className="block lg:hidden">
                          {pkg._id ? (expandedIdIndex === idx ? pkg._id : `${pkg._id.slice(0, 6)}...`) : `#PKG${idx + 1}`}
                        </span>
                        <span className="hidden lg:block">{pkg._id || `#PKG${idx + 1}`}</span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">{pkg.packageName}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">${parseFloat(pkg.packageAmount || 0).toFixed(2)}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">{pkg.tokenRecieve}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400 text-sm">
                      No packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBoughtPackagesPage;
