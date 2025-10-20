"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Contract, ethers } from "ethers";
import { SGToken, SGTokenAbi, usdtAbi, usdtToken } from "@/content/data";
import { WalletContext } from "@/context/WalletContext";

const PackageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIdIndex, setExpandedIdIndex] = useState(null);
  const { walletAddress, signer } = useContext(WalletContext);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/buy-package");
      setRequests(res.data.boughtPackages || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (data, status) => {
    if (!walletAddress || !signer) {
      alert("Connect Metamask");
      return;
    }

    const from = data?.from;
    const packageAmount = data?.packageAmount;

    try {
      if (status === "approved") {
        const contract = new Contract(SGToken, SGTokenAbi, signer);
        const parsedAmount = ethers.parseUnits(packageAmount.toString(), 18);
        const tx = await contract.transfer(from, parsedAmount);
        const receipt = await tx.wait();
        if (!receipt.status) throw new Error("Blockchain transaction failed.");

        await fetch("/api/user/buy-package/updateStatus", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data?.userId,
            packageId: data?.packageId,
            status: "approved",
            tokenAddress: SGToken,
          }),
        });
      } else {
        const contract = new Contract(usdtToken, usdtAbi, signer);
        const tx = await contract.transfer(from, packageAmount * 10 ** 6);
        const receipt = await tx.wait();
        if (!receipt.status) throw new Error("Blockchain transaction failed.");
      }
      fetchRequests();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-b from-[#0b0017] via-[#1a0033] to-[#0b0017] animate-pulse">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#272727] p-4 rounded-xl border border-gray-700 h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const Card = ({ title, value, color }) => (
    <div className="bg-[#272727] p-4 rounded-xl border border-purple-600/40 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition">
      <h3 className="text-xs sm:text-sm font-medium text-gray-400">{title}</h3>
      <p className={`text-lg sm:text-xl md:text-2xl font-bold text-${color}-400 mt-1`}>{value}</p>
    </div>
  );

  return (
    <div className="p-2 sm:p-6 min-h-screen bg-gradient-to-b from-[#0b0017] via-[#1a0033] to-[#0b0017] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
            Package Requests
          </h1>
          <button
            onClick={fetchRequests}
            className="px-3 py-1 text-sm bg-[var(--themeColor)] hover:bg-yellow-600 transition-all rounded-md font-semibold"
          >
            Refresh
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card title="Total Requests" value={requests.length} color="yellow" />
          <Card title="Pending" value={requests.filter(r => r.status === "pending").length} color="orange" />
          <Card title="Accepted" value={requests.filter(r => r.status === "accepted").length} color="green" />
          <Card title="Rejected" value={requests.filter(r => r.status === "rejected").length} color="red" />
        </div>

        {/* Requests Table */}
        <div className="bg-[#1c1c1c] rounded-xl border border-purple-600/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-800">
              <thead className="bg-[#272727]">
                <tr>
                  {["ID", "User", "Package", "Amount", "Network", "Hash", "Status", "Action"].map((head, i) => (
                    <th
                      key={i}
                      className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[#1c1c1c] divide-y divide-purple-800">
                {requests.length > 0 ? (
                  requests.map((req, idx) => (
                    <tr key={req._id} className="hover:bg-gradient-to-r from-purple-900/20 to-purple-800/30 transition-all duration-300">
                      <td
                        className="px-3 py-2 text-xs sm:text-sm font-medium cursor-pointer hover:text-purple-400"
                        onClick={() => setExpandedIdIndex(expandedIdIndex === idx ? null : idx)}
                      >
                        {expandedIdIndex === idx ? req._id : `${req._id.slice(0, 8)}...`}
                      </td>
                      <td className="px-3 py-2 text-xs sm:text-sm">{req.userId || "-"}</td>
                      <td className="px-3 py-2 text-xs sm:text-sm">{req.packageName}</td>
                      <td className="px-3 py-2 text-xs sm:text-sm text-yellow-400">${req.packageAmount}</td>
                      <td className="px-3 py-2 text-xs sm:text-sm">{req.network}</td>
                      <td className="px-3 py-2 text-xs sm:text-sm">
                        <a
                          href={`https://bscscan.com/tx/${req.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          {req.hash.slice(0, 10)}...
                        </a>
                      </td>
                      <td className="px-3 py-2 text-xs sm:text-sm font-semibold">
                        <span className={`${
                          req.status === "accepted"
                            ? "text-green-500"
                            : req.status === "rejected"
                            ? "text-red-500"
                            : "text-orange-400"
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs sm:text-sm">
                        {req.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusChange(req, "approved")}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-xs font-semibold"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusChange(req, "rejected")}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-xs font-semibold"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-400 text-sm">
                      No package requests found.
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

export default PackageRequest;
