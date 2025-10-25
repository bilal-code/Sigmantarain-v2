"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaSortUp,
  FaSortDown,
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaShareAlt,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaIdCard,
} from "react-icons/fa";

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
        // console.error("❌ Error fetching users: " + (err?.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.role === "user");
  const verifiedUsers = filteredUsers.filter((u) => u.status === "active");
  const unverifiedUsers = filteredUsers.filter((u) => u.status === "inactive");
  const uniqueReferrals = [
    ...new Set(filteredUsers.map((u) => u.referralCode).filter(Boolean)),
  ];
  const lastCreated = filteredUsers.length
    ? new Date(
        Math.max(...filteredUsers.map((u) => new Date(u.createdAt)))
      ).toLocaleDateString()
    : "-";

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    return sortConfig.direction === "asc"
      ? aVal > bVal
        ? 1
        : -1
      : aVal < bVal
      ? 1
      : -1;
  });

  // Enhanced loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-4 lg:mb-0"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 py-3">
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getArrowClass = (key, direction) => {
    const isActive =
      sortConfig.key === key && sortConfig.direction === direction;
    return `h-3 w-3 transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-gray-400"
    }`;
  };

  const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
        </div>
        <div
          className={`h-12 w-12 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:text-blue-500 md:text-green-600 lg:text-red-500 xl:text-blue-500 mb-2">
              User Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage and monitor all registered users
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:w-full gap-2 sm:gap-4 mb-6">
          <StatCard
            icon={FaUsers}
            label="Total Users"
            value={filteredUsers.length}
            color="text-blue-600"
            bgColor="bg-blue-500"
          />
          <StatCard
            icon={FaUserCheck}
            label="Active Users"
            value={verifiedUsers.length}
            color="text-green-600"
            bgColor="bg-green-500"
          />
          <StatCard
            icon={FaUserClock}
            label="Inactive Users"
            value={unverifiedUsers.length}
            color="text-orange-600"
            bgColor="bg-orange-500"
          />
          <StatCard
            icon={FaShareAlt}
            label="Unique Referrals"
            value={uniqueReferrals.length}
            color="text-purple-600"
            bgColor="bg-purple-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white w-[380px] sm:w-[580px] md:w-[470px] lg:w-full xl:w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredUsers.length} users
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: "code", label: "User Code", icon: FaIdCard },
                    { key: "name", label: "Full Name", icon: FaUsers },
                    { key: "email", label: "Email Address", icon: FaEnvelope },
                    {
                      key: "referralCode",
                      label: "Referral Code",
                      icon: FaShareAlt,
                    },
                    {
                      key: "contactNo",
                      label: "Contact Number",
                      icon: FaPhone,
                    },
                    {
                      key: "createdAt",
                      label: "Registration Date",
                      icon: FaCalendar,
                    },
                  ].map(({ key, label, icon: Icon }) => (
                    <th
                      key={key}
                      className="xl:px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() =>
                        setSortConfig({
                          key,
                          direction:
                            sortConfig.key === key &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-400" />
                        <span>{label}</span>
                        <span className="flex flex-col">
                          <FaSortUp className={getArrowClass(key, "asc")} />
                          <FaSortDown className={getArrowClass(key, "desc")} />
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.length > 0 ? (
                  sortedUsers.map((u) => (
                    <tr
                      key={u._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-4 xl:px-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded inline-block">
                          {u.code || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 xl:px-2 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {u.name || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 xl:px-2">
                        <div
                          className="text-sm text-gray-900 truncate max-w-[200px]"
                          title={u.email}
                        >
                          {u.email}
                        </div>
                      </td>
                      <td className="py-4 xl:px-2 whitespace-nowrap">
                        <div className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded inline-block">
                          {u.referralCode || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 xl:px-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {u.contactNo || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 xl:px-2 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaUsers className="h-12 w-12 mb-3 opacity-50" />
                        <p className="text-lg font-medium">No users found</p>
                        <p className="text-sm mt-1">
                          No registered users in the system
                        </p>
                      </div>
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
}
