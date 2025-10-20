"use client";
import React, { useEffect, useState } from "react";
import AdminCard from "./cards";
import { LuPackageCheck } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { LuBriefcaseBusiness } from "react-icons/lu";
import axios from "axios";

function AdminHoverDevCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/dashboardData");

        console.log("dashboard", res.data);
        setStats(res.data);
      } catch (err) {
        const errorMsg =
          err.response?.data?.error || err.message || "Unknown error";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  const cardData = [
    {
      name: "Total Users",
      Icon: LuPackageCheck,
      price: stats?.totalUsers,
      change: "+1.25%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
    {
      name: "Total Packages",
      Icon: FiPackage,
      price: stats?.totalPackages,
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#EDE9FE",
    },
    {
      name: "Bought Package Amount",
      Icon: LuBriefcaseBusiness,
      price: `$${stats?.totalPackageAmount}`,
      change: "-1.25%",
      color: "#B91C1C",
      bgColor: "#E0F2FE",
    },
    {
      name: "Total Withdraw",
      Icon: BsCashCoin,
      price: `${stats?.totalWithdrawAmount} Tokens`,
      change: "+0.89%",
      color: "#16A34A",
      bgColor: "#ECFDF5",
    },
    {
      name: "Staking Tokens",
      Icon: BsMicrosoftTeams,
      price: `${stats?.totalStakingToken} Tokens`,
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
    {
      name: "Bought SG Tokens",
      Icon: BsMicrosoftTeams,
      price: `${stats?.totalSGTokens} Tokens`,
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
  ];

  if (loading) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 sm:gap-3 w-full">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-[#0B98AC] p-4 rounded-lg border border-gray-700 animate-pulse"
        >
          <div className="h-2 w-1/2 bg-[#0B98AC] rounded mb-3"></div> {/* Title */}
          <div className="h-2 w-3/4 bg-[#0B98AC] rounded mb-2"></div> {/* Value */}
          <div className="h-2 w-1/3 bg-[#0B98AC] rounded mt-2"></div> {/* Change */}
        </div>
      ))}
    </div>
  );
}


  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 sm:gap-3 w-full">
      {cardData.map((item, index) => (
        <AdminCard
          key={index}
          name={item.name}
          Icon={item.Icon}
          price={item.price}
          change={item.change}
          color={item.color}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
}

export default AdminHoverDevCards;
