"use client";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiCalendar, FiDollarSign, FiHash, FiLink, FiUser, FiCreditCard, FiCopy, FiCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function MyPackagesPage() {
  const [clientId, setClientId] = useState("");
  const [boughtData, setBoughtData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBoughtData = async (userId) => {
      try {
        setLoading(true);
        let url = "/api/user/buy-package";
        if (userId) url += `?userId=${userId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await res.json();
        console.log("Bought Packages Data:", data);
        if (!res.ok) throw new Error(data.error || "Failed to fetch packages");
        setBoughtData(data?.boughtPackages || []);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setClientId(decodedToken?.id);
      fetchBoughtData(decodedToken?.id);
    } else {
      setLoading(false);
    }
  }, []);

  // Copy to clipboard function
  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "✅ Approved";
      case "pending":
        return "⏳ Pending";
      case "rejected":
        return "❌ Rejected";
      default:
        return "🔵 " + (status || "Unknown");
    }
  };

  const getPackageStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-purple-100 text-purple-800";
      case "expired":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleBrowsePackages = () => router.push("/userdashboard/buypackage");

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format wallet address
  const formatWalletAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Format transaction hash
  const formatTransactionHash = (hash) => {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  // Loader Components
  const PackageCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-200 rounded-full h-6 w-20"></div>
        <div className="bg-gray-200 rounded-full h-8 w-8"></div>
      </div>
      <div className="text-center mb-6">
        <div className="bg-gray-200 rounded-lg h-8 w-24 mx-auto mb-2"></div>
        <div className="bg-gray-200 rounded h-4 w-32 mx-auto"></div>
      </div>
      <div className="space-y-3">
        <div className="bg-gray-200 rounded h-3 w-full"></div>
        <div className="bg-gray-200 rounded h-3 w-3/4"></div>
        <div className="bg-gray-200 rounded h-3 w-5/6"></div>
        <div className="bg-gray-200 rounded h-3 w-4/5"></div>
      </div>
    </div>
  );

  const GlobalLoader = () => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0B98AC] mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading your packages...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 sm:p-6 font-sans">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[#0B98AC] bg-clip-text text-transparent">
          My Packages
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Manage and track your investment packages, earnings, and transaction history
        </p>
      </div>

      {/* Global Loader */}
      {loading && <GlobalLoader />}

      {/* Empty State */}
      {!loading && boughtData.length === 0 && (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-r from-[#0B98AC] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
            📦
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Packages Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't purchased any investment packages yet. Start your journey by exploring our available packages.
          </p>
          <button
            onClick={handleBrowsePackages}
            className="bg-gradient-to-r from-[#0B98AC] to-blue-600 hover:from-blue-600 hover:to-[#0B98AC] text-white font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] shadow-md"
          >
            Browse Available Packages
            <FiArrowUpRight size={18} />
          </button>
        </div>
      )}

      {/* Packages Grid */}
      {!loading && boughtData.length > 0 && (
        <div className="max-w-6xl mx-auto">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Packages</p>
              <p className="text-2xl font-bold text-[#0B98AC]">{boughtData.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-purple-600">
                ${boughtData.reduce((sum, pkg) => sum + (Number(pkg.packageAmount) || 0), 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-1">Tokens Received</p>
              <p className="text-2xl font-bold text-green-600">
                {boughtData.reduce((sum, pkg) => sum + (Number(pkg.tokenRecieve) || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center">
              <p className="text-sm font-semibold text-gray-600 mb-1">Approved Packages</p>
              <p className="text-2xl font-bold text-green-600">
                {boughtData.filter(pkg => pkg.status?.toLowerCase() === 'approved').length}
              </p>
            </div>
          </div>

          {/* Packages Grid - Single Column */}
          <div className="grid grid-cols-1 gap-6">
            {boughtData.map((pkg, index) => (
              <div
                key={pkg._id || index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl"
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                        {getStatusBadge(pkg.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPackageStatusColor(pkg.packageId?.status)}`}>
                        📦 {pkg.packageId?.status || 'Unknown'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {pkg.packageId?.packageName || 'Package'} Package
                    </h3>
                    <p className="text-gray-600">Investment: ${pkg.packageAmount}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Daily ROI</p>
                      <p className="text-lg font-bold text-[#0B98AC]">
                        {pkg.packageId?.packageDailyPercentage}%
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0B98AC] to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      ${pkg.packageAmount}
                    </div>
                  </div>
                </div>

                {/* Package Details - Single Column Grid */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FiCreditCard className="text-blue-500" size={18} />
                          <div>
                            <p className="text-sm text-gray-600">Tokens Received</p>
                            <p className="font-semibold text-gray-800">
                              {pkg.tokenRecieve?.toLocaleString() || '0'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FiLink className="text-purple-500" size={18} />
                          <div>
                            <p className="text-sm text-gray-600">Network</p>
                            <p className="font-semibold text-gray-800">{pkg.network}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FiCalendar className="text-[#0B98AC]" size={18} />
                          <div>
                            <p className="text-sm text-gray-600">Purchase Date</p>
                            <p className="font-semibold text-gray-800">
                              {formatDate(pkg.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FiCalendar className="text-gray-500" size={18} />
                          <div>
                            <p className="text-sm text-gray-600">Last Updated</p>
                            <p className="font-semibold text-gray-800">
                              {formatDate(pkg.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Addresses and Hashes with Copy Functionality */}
                  <div className="space-y-4">
                    {/* From Wallet Address */}
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 flex-1">
                        <FiUser className="text-blue-600" size={18} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">From Wallet</p>
                          <p className="font-semibold text-gray-800 font-mono text-sm">
                            {formatWalletAddress(pkg.from)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(pkg.from, `wallet-${pkg._id}`)}
                        className="ml-2 p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                        title="Copy full address"
                      >
                        {copiedField === `wallet-${pkg._id}` ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      </button>
                    </div>

                    {/* Token Address */}
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-3 flex-1">
                        <FiCreditCard className="text-orange-600" size={18} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Token Address</p>
                          <p className="font-semibold text-gray-800 font-mono text-sm">
                            {formatWalletAddress(pkg.tokenAddress)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(pkg.tokenAddress, `token-${pkg._id}`)}
                        className="ml-2 p-2 text-gray-500 hover:text-orange-600 transition-colors duration-200"
                        title="Copy full address"
                      >
                        {copiedField === `token-${pkg._id}` ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      </button>
                    </div>

                    {/* Approval Hash */}
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3 flex-1">
                        <FiHash className="text-green-600" size={18} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Approval Hash</p>
                          <p className="font-semibold text-gray-800 font-mono text-sm">
                            {formatTransactionHash(pkg.approveHash)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(pkg.approveHash, `approve-${pkg._id}`)}
                        className="ml-2 p-2 text-gray-500 hover:text-green-600 transition-colors duration-200"
                        title="Copy full hash"
                      >
                        {copiedField === `approve-${pkg._id}` ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      </button>
                    </div>

                    {/* Purchase Hash */}
                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-3 flex-1">
                        <FiHash className="text-indigo-600" size={18} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Purchase Hash</p>
                          <p className="font-semibold text-gray-800 font-mono text-sm">
                            {formatTransactionHash(pkg.purchaseHash)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(pkg.purchaseHash, `purchase-${pkg._id}`)}
                        className="ml-2 p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                        title="Copy full hash"
                      >
                        {copiedField === `purchase-${pkg._id}` ? <FiCheck className="text-green-500" /> : <FiCopy />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Referral Chain */}
                {pkg.parentReferralChain && pkg.parentReferralChain.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <FiUser className="text-purple-600" size={18} />
                      <div>
                        <p className="text-sm text-gray-600">Referral Chain</p>
                        <p className="font-semibold text-gray-800">
                          {pkg.parentReferralChain.length} levels
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Browse More Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleBrowsePackages}
              className="bg-white text-[#0B98AC] border border-[#0B98AC] hover:bg-[#0B98AC] hover:text-white font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] shadow-md"
            >
              Browse More Packages
              <FiArrowUpRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Loading State with Skeletons */}
      {loading && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <PackageCardSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}