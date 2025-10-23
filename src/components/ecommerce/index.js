"use client";
import React, { useEffect, useState } from "react";
import {
  BsCashCoin,
  BsPeopleFill,
  BsWallet2,
  BsCoin,
  BsLockFill,
  BsArrowUpRight,
} from "react-icons/bs";
import { GiTakeMyMoney, GiToken } from "react-icons/gi";
import { PiHandWithdrawLight, PiStackLight } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa6";
import { FaCoins, FaChartLine } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { fetchChildCommissions } from "@/lib/utils/getChildCommision";

function HoverDevCards() {
  const [loading, setLoading] = useState(true);
  const [personalCommission, setPersonalCommission] = useState(0);
  const [childCommission, setChildCommission] = useState(0);
  const [withDrawData, setWithDrawData] = useState([]);
  const [businessCommission, setBusinessCommission] = useState(0);
  const [stackAmount, setStackAmount] = useState(0);
  const [SGTokens, setSGTokens] = useState(0);

  async function fetchStakingData(userId) {
    try {
      const url = userId
        ? `/api/user/staking?userId=${userId}`
        : `/api/user/staking`;

      const res = await axios.get(url);

      if (res.data.success && Array.isArray(res.data.data)) {
        const stakingData = res.data.data;
        // console.log("✅ Fetched Staking Data:", stakingData);

        const activeStakes = stakingData.filter(
          (item) => item.isActive === true
        );
        const totalStakedAmount = activeStakes.reduce((sum, item) => {
          return sum + Number(item.stakedAmount || 0);
        }, 0);

        // console.log("💰 Total Active Staked Amount:", totalStakedAmount);
        setStackAmount(totalStakedAmount);
      } else {
        // console.warn("⚠️ No staking data found:", res.data.message);
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      // console.error(
      //   "❌ Error fetching staking data:",
      //   err.response?.data || err.message
      // );
      return {
        success: false,
        message: err.response?.data?.error || "Something went wrong",
      };
    }
  }

  const fetchCommision = async (userId) => {
    try {
      const url = userId
        ? `/api/user/child-commission?userId=${userId}`
        : `/api/commission`;
      const res = await axios.get(url);
      const commissions = res.data.commission || [];
      const totalAmount = commissions.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      setPersonalCommission(totalAmount);
    } catch (error) {
      // console.error(error.message);
    }
  };

  const fetchUserBusinessCommission = async (userId) => {
    try {
      if (!userId) {
        // console.error("❌ userId is required to fetch commission");
        return { success: false, message: "userId is required" };
      }
      // console.log("Fetching business commission for userId:", userId);

      const response = await axios.get(
        `/api/user/business-commission?userId=${userId}`
      );
      const data = await response.json();

      // console.log("data", data);
      if (data.success) {
        // console.log("✅ Business commission fetched successfully:", data.data);
        setBusinessCommission(data?.totalAmount);
      } else {
        // console.warn("⚠️ No commission found for this user:", data.message);
        return [];
      }
    } catch (error) {
      // console.error("❌ Error fetching user commission:", error);
      return [];
    }
  };

  async function fetchUserPackages(userId) {
    try {
      const url = `/api/user/buy-package?userId=${userId}`;
      const res = await axios.get(url);

      if (res.data.success) {
        // console.log("✅ Fetched User Packages:", res.data.boughtPackages);
        let SGTokens = res.data.boughtPackages
          .map((item) => item.tokenRecieve)
          .reduce((acc, val) => acc + val, 0);
        // console.log("💰 Total SG Tokens:", SGTokens);
        setSGTokens(SGTokens);
      } else {
        // console.warn("⚠️ No packages found:", res.data.message);
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      // console.error(
      //   "❌ Error fetching user packages:",
      //   error.response?.data || error.message
      // );
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Something went wrong while fetching packages",
      };
    }
  }

  useEffect(() => {
    const fetchWithDrawData = async (userId) => {
      try {
        const res = await fetch("/api/user/withdraw-request", {
          method: "GET",
          headers: { Authorization: `Bearer ${userId}` },
        });
        const data = await res.json();
        let acceptedData = data?.data.filter(
          (item) => item.status === "accepted"
        );
        if (res.ok) setWithDrawData(acceptedData);
      } catch (error) {
        // console.error(error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id && decoded?.code) {
          Promise.all([
            fetchWithDrawData(decoded?.id),
            fetchCommision(decoded?.id),
            fetchUserBusinessCommission(decoded?.id),
            fetchStakingData(decoded?.id),
            fetchUserPackages(decoded?.id),
            fetchChildCommissions(decoded?.code).then((data) => {
              if (data) setChildCommission(data);
            }),
          ]).then(() => setLoading(false));
        }
      } catch (err) {
        // console.error("Invalid token:", err);
      }
    }
  }, []);

  const totalWithdraw =
    withDrawData
      ?.filter((e) => e.status !== "Rejected")
      ?.reduce((acc, e) => acc + parseFloat(e?.withdrawAmount || 0), 0) || 0;

  let personal =
    businessCommission && businessCommission > 0
      ? personalCommission + businessCommission
      : personalCommission;

  let token =
    stackAmount && stackAmount > 0 ? SGTokens - stackAmount : SGTokens;

  const cardData = [
    {
      name: "Refferal Commission",
      Icon: BsCashCoin,
      price: personalCommission,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      showDollar: true, // New property for first three cards
      showTokens: false, // New property for first three cards
    },
    {
      name: "Downward Commission",
      Icon: BsPeopleFill,
      price: childCommission.toFixed(2),
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      showDollar: true, // New property for first three cards
      showTokens: false, // New property for first three cards
    },
        {
      name: "Business Commission",
      Icon: BsPeopleFill,
      price: businessCommission.toFixed(2),
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      showDollar: true, // New property for first three cards
      showTokens: false, // New property for first three cards
    },
    {
      name: "Total Balance",
      Icon: BsWallet2,
      price: personal.toFixed(2),
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      showDollar: true, // New property for first three cards
      showTokens: false, // New property for first three cards
    },
    {
      name: "Total SG Tokens",
      Icon: GiToken,
      price: token.toFixed(2),
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      showDollar: false, // New property for remaining cards
      showTokens: true, // New property for remaining cards
    },
    {
      name: "Total Staking Tokens",
      Icon: PiStackLight,
      price: stackAmount.toFixed(2),
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-indigo-500 to-purple-500",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      showDollar: false, // New property for remaining cards
      showTokens: true, // New property for remaining cards
    },
    // {
    //   name: "Total Withdraw",
    //   Icon: PiHandWithdrawLight,
    //   price: totalWithdraw.toFixed(2),
    //   gradient: "from-teal-500 to-cyan-500",
    //   bgColor: "bg-gradient-to-br from-teal-500 to-cyan-500",
    //   iconBg: "bg-teal-100",
    //   iconColor: "text-teal-600",
    // },
  ];

  // Skeleton Loader Component
  const CardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3 flex-1">
          <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          <div className="bg-gray-200 rounded h-6 w-1/2"></div>
        </div>
        <div className="bg-gray-200 rounded-xl w-12 h-12"></div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <CardSkeleton key={i} />)
          : cardData.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-[#0B98AC]/30 shadow-[0_0_15px_rgba(11,152,172,0.2)] p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                {/* Background Gradient Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold text-gray-800 font-mono">
                          {item.price.toLocaleString() || 0}
                        </p>
                        {item.showDollar && (
                          <FaDollarSign className="text-gray-600" size={16} />
                        )}
                      </div>
                      {item.showTokens && (
                        <p className="text-xs text-gray-500 mt-1">Tokens</p>
                      )}
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`p-3 rounded-xl ${item.iconBg} ${item.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <item.Icon size={24} />
                    </div>
                  </div>

                  {/* Progress Bar for Visual Interest */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-1000`}
                        style={{
                          width: `${Math.min(
                            (item.price /
                              (personal > 0 ? personal * 1.5 : 1000)) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Hover Action Indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <BsArrowUpRight className="text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default HoverDevCards;