"use client";
import React, { useEffect, useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import axios from "axios";

const PackageDetailsPage = () => {
  const [packageData, setPackageData] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [expandedIdIndex, setExpandedIdIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get("/api/user/get-package");
        setPackageData(response.data.packages || []);
      } catch (error) {
        alert("Error fetching package details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackageDetails();
  }, []);

  if (loading) {
    return (
      <div className="p-2 sm:p-6 min-h-screen bg-white animate-pulse">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-3 rounded-lg border border-white h-24"></div>
            ))}
          </div>
          <div className="bg-rounded-lg border border-white h-64"></div>
        </div>
      </div>
    );
  }

  const getArrowClass = (key, direction) => {
    const isActive = sortConfig.key === key && sortConfig.direction === direction;
    return `h-3 w-3 transition-colors duration-200 ${
      isActive ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]" : "text-gray-500"
    }`;
  };

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B98AC] mt-4 sm:mt-0">
            Package Details
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0B98AC] p-4 rounded-xl border border-[#0B98AC] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition transform hover:scale-103">
            <h3 className="text-xs sm:text-sm font-medium text-white">Total Packages</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mt-1">{packageData.length}</p>
          </div>

          <div className="bg-[#0B98AC] p-4 rounded-xl border border-[#0B98AC] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition transform hover:scale-103 ">
            <h3 className="text-xs sm:text-sm font-medium text-white">Active</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300">{packageData.filter((pkg) => pkg.status === "active").length}</p>
          </div>

          {/* <div className="bg-[#0B98AC] p-4 rounded-xl border border-[#0B98AC] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition">
            <h3 className="text-xs sm:text-sm font-medium text-white">Deactivated</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300">{packageData.filter((pkg) => pkg.status === "Expired").length}</p>
          </div>

          <div className="bg-[#0B98AC] p-4 rounded-xl border border-[#0B98AC] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition">
            <h3 className="text-xs sm:text-sm font-medium text-white">Revenue</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300">
              ${packageData.reduce((acc, pkg) => acc + parseFloat(pkg.amount || 0), 0).toFixed(2)}
            </p>
          </div> */}
        </div>

        {/* Table */}
        {view === "list" && (
<div className="bg-[#1c1c1c] rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-cyan-400">
      <thead className="bg-[#0B98AC]">
        <tr>
          {["ID", "Package", "Amount", "Daily %", "Created"].map((head, idx) => {
            const keyMap = ["_id", "packageName", "packageAmount", "packageDailyPercentage", "createdAt"];
            const key = keyMap[idx];
            return (
              <th
                key={idx}
                className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer select-none"
                onClick={() =>
                  setSortConfig({
                    key,
                    direction:
                      sortConfig.key === key && sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                <span className="flex items-center">
                  {head}
                  <span className="ml-1 flex flex-col">
                    <FaSortUp className={getArrowClass(key, "asc")} />
                    <FaSortDown className={getArrowClass(key, "desc")} />
                  </span>
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-cyan-400">
        {packageData.length > 0 ? (
          packageData
            .sort((a, b) => {
              if (!sortConfig.key) return 0;
              let aVal = a[sortConfig.key];
              let bVal = b[sortConfig.key];
              if (sortConfig.key === "packageAmount" || sortConfig.key === "packageDailyPercentage") {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
              }
              if (sortConfig.key === "createdAt") {
                aVal = new Date(aVal).getTime();
                bVal = new Date(bVal).getTime();
              }
              if (sortConfig.direction === "asc") return aVal < bVal ? -1 : 1;
              return aVal > bVal ? -1 : 1;
            })
            .map((pkg, index) => (
              <tr
                key={index}
                className="transition-all duration-300"
              >
                <td
                  className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800 cursor-pointer hover:text-black"
                  onClick={() =>
                    setExpandedIdIndex(expandedIdIndex === index ? null : index)
                  }
                  title="Click to toggle full ID"
                >
                  <span className="block lg:hidden">
                    {pkg._id ? (expandedIdIndex === index ? pkg._id : `${pkg._id.slice(0, 6)}...`) : `#PKG${index + 1}`}
                  </span>
                  <span className="hidden lg:block">
                    {pkg._id || `#PKG${index + 1}`}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800">{pkg.packageName}</td>
                <td className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800">${parseFloat(pkg.packageAmount).toFixed(2)}</td>
                <td className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800">{pkg.packageDailyPercentage}%</td>
                <td className="px-3 py-2 text-xs sm:text-sm text-gray-800">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : "-"}</td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-6 text-gray-400 text-sm">No packages found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

        )}
      </div>
    </div>
  );
};

export default PackageDetailsPage;
