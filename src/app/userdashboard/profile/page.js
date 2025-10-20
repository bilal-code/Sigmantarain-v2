"use client";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiShield,
  FiCreditCard,
  FiHash,
  FiCheck,
  FiClock,
  FiEdit
} from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const boughtRes = await axios.get("/api/user/getSingleUser", {
            headers: {
              Authorization: `Bearer ${decoded.id}`,
            },
          });
          setUser(boughtRes.data.user);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Skeleton Loaders
  const ProfileSkeleton = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="bg-gray-200 rounded h-6 w-32 mb-2"></div>
            <div className="bg-gray-200 rounded h-4 w-40 mb-6"></div>
            <div className="w-full bg-gray-200 rounded-xl h-16 mb-4"></div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-gray-200 rounded-lg h-16"></div>
              <div className="bg-gray-200 rounded-lg h-16"></div>
            </div>
          </div>
        </div>

        {/* Right Section Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
          <div className="bg-gray-200 rounded h-6 w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-xl h-20"></div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-200 rounded-xl h-16"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Global Loader
  const GlobalLoader = () => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0B98AC] mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading your profile...</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
        <GlobalLoader />
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <FiUser size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">No Profile Data</h1>
          <p className="text-gray-600 mb-6">User information is not available at the moment.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#0B98AC] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 sm:p-6 font-sans">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0B98AC] to-blue-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Manage your account information and preferences
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center">
              {/* Profile Avatar */}
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-[#0B98AC] to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg border-2 border-white">
                    <FiCheck className="text-white text-sm" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-6">{user.email}</p>

              {/* User ID */}
              <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <div className="flex items-center text-gray-600 text-xs font-semibold mb-2">
                  <FiHash className="mr-2" size={14} />
                  USER ID
                </div>
                <div className="text-[#0B98AC] text-sm font-mono break-all bg-blue-50 px-3 py-2 rounded-lg">
                  {user._id}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-center">
                  <div className="text-gray-600 text-xs font-semibold mb-1">ROLE</div>
                  <div className="text-[#0B98AC] text-sm font-medium capitalize">
                    {user.role}
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 p-3 rounded-lg text-center">
                  <div className="text-gray-600 text-xs font-semibold mb-1">JOINED</div>
                  <div className="text-green-600 text-sm font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Personal Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiUser className="text-[#0B98AC]" />
                Personal Information
              </h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Last updated: {formatDate(user.updatedAt)}
              </span>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  label: "FULL NAME", 
                  value: user.name, 
                  icon: <FiUser className="text-blue-500" />,
                  color: "blue"
                },
                { 
                  label: "EMAIL ADDRESS", 
                  value: user.email, 
                  icon: <FiMail className="text-purple-500" />,
                  color: "purple"
                },
                { 
                  label: "PHONE NUMBER", 
                  value: user.contactNo, 
                  icon: <FiPhone className="text-green-500" />,
                  color: "green"
                },
                { 
                  label: "ACCOUNT TYPE", 
                  value: user.role, 
                  icon: <FiShield className="text-orange-500" />,
                  color: "orange"
                },
                {
                  label: "MEMBER SINCE",
                  value: formatDate(user.createdAt),
                  icon: <FiCalendar className="text-red-500" />,
                  color: "red"
                },
                {
                  label: "REFERRAL CODE",
                  value: user.referralCode,
                  icon: <FiCreditCard className="text-indigo-500" />,
                  color: "indigo"
                },
              ].map((field, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br from-${field.color}-50 to-white border border-${field.color}-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-center text-gray-600 text-xs font-semibold mb-3">
                    <span className="mr-2">{field.icon}</span>
                    {field.label}
                  </div>
                  <div className={`text-gray-800 font-medium text-sm break-all ${
                    !field.value ? 'text-gray-400 italic' : ''
                  }`}>
                    {field.value || "Not provided"}
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Status */}
            <div className="mt-8 border-t border-gray-200">
            

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center text-gray-600 text-xs font-semibold mb-2">
                    <FiCalendar className="mr-2" />
                    ACCOUNT CREATED
                  </div>
                  <div className="text-gray-800 text-sm font-medium">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center text-gray-600 text-xs font-semibold mb-2">
                    <FiCalendar className="mr-2" />
                    LAST UPDATED
                  </div>
                  <div className="text-gray-800 text-sm font-medium">
                    {formatDate(user.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}