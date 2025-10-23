"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { FiUsers } from "react-icons/fi"; // ✅ correct import


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/user/getAllUsers");
        setUsers(res.data?.users || []);
      } catch (err) {
        alert("❌ Error fetching users: " + (err?.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.role === "user");
  const verifiedUsers = filteredUsers.filter((u) => u.isVerified);
  const unverifiedUsers = filteredUsers.filter((u) => !u.isVerified);
  const uniqueReferrals = [...new Set(filteredUsers.map((u) => u.referralCode).filter(Boolean))];
  const lastCreated = filteredUsers.length
    ? new Date(Math.max(...filteredUsers.map((u) => new Date(u.createdAt)))).toLocaleDateString()
    : "-";

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    return sortConfig.direction === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        {/* <div className="animate-spin h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full"></div> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <h1 className="text-3xl sm:text-4xl font-bold text-[#0B98AC] mb-6">
          Users
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
          <StatCard icon={<FiUsers />} label="Total Users" value={filteredUsers.length} color="text-gray-300" />
          {/* <StatCard icon={<FiUsers />} label="Verified Users" value={verifiedUsers.length} color="text-gray-300" /> */}
          {/* <StatCard icon={<FiUsers />} label="Inactive Users" value={unverifiedUsers.length} color="text-gray-300" /> */}
          <StatCard icon={<FiUsers />} label="Unique Referrals" value={uniqueReferrals.length} color="text-gray-300" />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-cyan-400 text-sm">
            <thead className="bg-[#0B98AC] sticky top-0">
              <tr>
                {[
                  { key: "code", label: "Code" },
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "referralCode", label: "Referral" },
                  { key: "contactNo", label: "Contact" },
                  { key: "createdAt", label: "Created" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() =>
                      setSortConfig({
                        key,
                        direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
                      })
                    }
                    className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between">
                      {label}
                      <span className="ml-1 flex flex-col">
                        <FaSortUp
                          className={`${sortConfig.key === key && sortConfig.direction === "asc" ? "text-yellow-400" : "text-gray-600"}`}
                          size={10}
                        />
                        <FaSortDown
                          className={`${sortConfig.key === key && sortConfig.direction === "desc" ? "text-yellow-400" : "text-gray-600"}`}
                          size={10}
                        />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-400">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((u) => (
                  <tr key={u._id} className="transition-all duration-300">
                    <td className="px-4 py-2 text-gray-800">{u.code || "N/A"}</td>
                    <td className="px-4 py-2 text-gray-800 font-semibold">{u.name || "N/A"}</td>
                    <td className="px-4 py-2 text-gray-800 truncate max-w-[200px]" title={u.email}>{u.email}</td>
                    <td className="px-4 py-2 text-gray-800 truncate max-w-[150px]" title={u.referralCode}>{u.referralCode || "N/A"}</td>
                    <td className="px-4 py-2 text-gray-800">{u.contactNo || "N/A"}</td>
                    <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ✅ Stat Card
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-[#0B98AC] p-4 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center gap-3 transition transform hover:scale-105">
    {icon}
    <div>
      <h3 className="text-xs text-white">{label}</h3>
      <p className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  </div>
);
