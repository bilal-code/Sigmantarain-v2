"use client";
import React, { useContext, useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { FiCheck, FiArrowUp, FiTrendingUp, FiZap } from "react-icons/fi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import { adminAddress, buySGTokens, SALE_ABI, SALE_CONTRACT_ADDRESS, usdtAbi, usdtToken } from "@/content/data";
import { Contract, ethers } from "ethers";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

export default function UpgradePlanPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [boughtPackageIds, setBoughtPackageIds] = useState([]);
  const [highestBoughtIndex, setHighestBoughtIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [purchasingPackage, setPurchasingPackage] = useState(null);

  const { walletAddress, signer } = useContext(WalletContext);

  const packageOrder = [
    "Basic",
    "Apprentice",
    "Trading",
    "Blockchain",
    "Professional",
    "Mining",
    "Forex",
    "Robotics",
  ];

  useEffect(() => {
    const initialize = async () => {
      try {
        setDataLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/get-package");
        if (res.status === 200) {
          const packages = res.data.packages;
          setAllPackages(packages);

          if (token) {
            const decoded = jwtDecode(token);
            setClientId(decoded?.id);

            const boughtRes = await axios.get("/api/user/getUserBoughtDetail", {
              headers: { Authorization: `Bearer ${decoded.id}` },
            });
            const bought = boughtRes.data.data;
            const ids = bought.map((pkg) => pkg.packageId);
            setBoughtPackageIds(ids);

            const boughtPkgs = packages.filter((p) => ids.includes(p._id));
            const boughtIndexes = boughtPkgs.map((p) =>
              packageOrder.indexOf(p.packageName)
            );
            const maxIndex = boughtIndexes.length > 0 ? Math.max(...boughtIndexes) : -1;
            setHighestBoughtIndex(maxIndex);
          }
        }
      } catch (err) {
        console.error("Init error:", err);
        showErrorToast("Failed to load packages. Please try again.");
      } finally {
        setDataLoading(false);
      }
    };
    initialize();
  }, []);

  async function buySGTokens(usdtAmount) {
    try {
      if (!walletAddress || !signer) {
        showErrorToast("⚠️ Please connect MetaMask first!");
        return;
      }

      const usdt = new ethers.Contract(usdtToken, usdtAbi, signer);
      const sale = new ethers.Contract(SALE_CONTRACT_ADDRESS, SALE_ABI, signer);

      const decimals = await usdt.decimals();
      const amountInWei = ethers.parseUnits(usdtAmount.toString(), decimals);

      const allowance = await usdt.allowance(walletAddress, SALE_CONTRACT_ADDRESS);
      if (allowance < amountInWei) {
        const approveTx = await usdt.approve(SALE_CONTRACT_ADDRESS, amountInWei);
        await approveTx.wait();
        showSuccessToast("✅ USDT Approved Successfully!");
      }

      const tx2 = await sale.buyPackage(amountInWei);
      await tx2.wait();
      showSuccessToast("🎉 SG Tokens Purchased Successfully!");

      return true;
    } catch (err) {
      console.error("❌ Transaction failed:", err.reason || err.message || err);
      showErrorToast(`Transaction failed: ${err.reason || err.message}`);
      return false;
    }
  }

  const BuyPackage = async (pkg) => {
    setPurchasingPackage(pkg._id);
    try {
      const usdt = new ethers.Contract(usdtToken, usdtAbi, signer);
      const parsedAmount = ethers.parseUnits(pkg.packageAmount.toString(), 18);
      const tx = await usdt.transfer(adminAddress, parsedAmount);
      const receipt = await tx.wait();

      if (!receipt.status) throw new Error("Blockchain transaction failed.");

      const response = await axios.post("/api/user/buy-package", {
        userId: clientId,
        packageId: pkg._id,
        from: walletAddress,
        purchaseHash: tx?.hash,
        network: "USDT",
        tokenAddress: "0x2Ea4E4CAB5eA8F391DB88f514be5095e6001Df56",
        tokenRecieve: pkg.packageDailyPercentage,
      });

      if (response.status === 201 && response.data.success) {
        setBoughtPackageIds((prev) => [...prev, pkg._id]);
        showSuccessToast("🎉 Package purchased successfully!");

        await axios.post("/api/user/staking", {
          userId: clientId,
          stackAmount: pkg.packageDailyPercentage,
          durationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        });
      } else {
        showErrorToast(response.data.error || "Failed to buy package");
      }
    } catch (err) {
      console.error("Error during package purchase:", err);
      showErrorToast("Something went wrong while purchasing package.");
    } finally {
      setPurchasingPackage(null);
    }
  };



  // const sortedPackages = allPackages.sort(
  //   (a, b) => packageOrder.indexOf(a.packageName) - packageOrder.indexOf(b.packageName)
  // );

  const sortedPackages = [...allPackages].sort(
  (a, b) => a.packageAmount - b.packageAmount
);


  // Package Card Skeleton Loader
  const PackageCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
      <div className="text-center mb-4">
        <div className="bg-gray-200 rounded-lg h-6 w-24 mx-auto mb-2"></div>
        <div className="bg-gray-200 rounded h-4 w-32 mx-auto"></div>
      </div>
      <div className="text-center mb-4">
        <div className="bg-gray-200 rounded-lg h-8 w-20 mx-auto mb-2"></div>
      </div>
      <div className="bg-gray-200 rounded-lg h-10 w-full"></div>
    </div>
  );

  // Global Loader
  const GlobalLoader = () => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0B98AC] mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading packages...</p>
      </div>
    </div>
  );

  // Purchase Loader
  const PurchaseLoader = () => (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      <span>Processing...</span>
    </div>
  );

  const getPackageIcon = (packageName) => {
    switch (packageName?.toLowerCase()) {
      case 'basic':
        return <FiZap className="text-blue-500" size={20} />;
      case 'apprentice':
        return <FiTrendingUp className="text-green-500" size={20} />;
      case 'trading':
        return <FiArrowUp className="text-purple-500" size={20} />;
      case 'blockchain':
        return <div className="text-orange-500 text-lg">⛓️</div>;
      case 'professional':
        return <div className="text-red-500 text-lg">💼</div>;
      case 'mining':
        return <div className="text-gray-600 text-lg">⛏️</div>;
      case 'forex':
        return <div className="text-green-600 text-lg">💹</div>;
      case 'robotics':
        return <div className="text-blue-600 text-lg">🤖</div>;
      default:
        return <FiTrendingUp className="text-[#0B98AC]" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 sm:p-6 font-sans">
      {/* Global Loader */}
      {dataLoading && <GlobalLoader />}

      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[#0B98AC] bg-clip-text text-transparent">
          Investment Packages
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Choose from our range of investment packages and start earning daily returns
        </p>
        
        {/* Wallet Connection Status */}
        <div className="flex justify-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            walletAddress 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${walletAddress ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            {walletAddress ? 'Wallet Connected' : 'Connect Wallet to Purchase'}
          </div>
        </div>
      </div>

      {/* Selected Package Banner */}
      {selectedPackage && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-[#0B98AC] to-blue-600 rounded-2xl p-6 text-center text-white shadow-lg">
            <HiBadgeCheck className="mx-auto text-white text-4xl mb-3" />
            <h2 className="text-2xl font-bold mb-2">Active Package</h2>
            <p className="text-lg opacity-90 mb-1">
              {selectedPackage.packageName} - ${selectedPackage.packageAmount} USDT
            </p>
            <p className="text-sm opacity-80">
              Earned {selectedPackage.packageDailyPercentage} SIG Tokens
            </p>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto">
        {dataLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <PackageCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {sortedPackages.map((pkg, index) => {
              const isBought = boughtPackageIds.includes(pkg._id);
              const isPurchasing = purchasingPackage === pkg._id;

              let buttonLabel = "Buy Package";
              let buttonVariant = "primary";
              let disabled = false;

              if (isBought) {
                buttonLabel = "Already Purchased";
                buttonVariant = "owned";
                disabled = true;
              } else if (isPurchasing) {
                buttonLabel = "processing";
                buttonVariant = "processing";
                disabled = true;
              } else if (boughtPackageIds.length > 0) {
                buttonLabel = `Upgrade to ${pkg.packageName}`;
                buttonVariant = "upgrade";
              }

              const buttonClasses = {
                primary: "bg-gradient-to-r from-[#0B98AC] to-blue-600 hover:from-blue-600 hover:to-[#0B98AC] text-white",
                upgrade: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white",
                owned: "bg-gray-300 text-gray-500 cursor-not-allowed",
                processing: "bg-blue-400 text-white cursor-not-allowed"
              };

              return (
                <div
                  key={pkg._id}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl ${
                    isBought ? 'opacity-75' : 'hover:scale-[1.02]'
                  }`}
                >
                  {/* Package Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center items-center gap-3 mb-3">
                      {getPackageIcon(pkg.packageName)}
                      <h3 className="text-xl font-bold text-gray-800">
                        {pkg.packageName}
                      </h3>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-[#0B98AC] mb-1">
                        ${pkg.packageAmount}
                      </div>
                      <p className="text-sm text-gray-600">One-time payment</p>
                    </div>
                  </div>

                  {/* Estimated Tokens */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
                    <p className="text-xs text-gray-600 mb-1">Estimated Tokens</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {(pkg.packageDailyPercentage ).toLocaleString()} SG
                    </p>
                  </div>

                  {/* Status Badge */}
                  {isBought && (
                    <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-green-50 rounded-lg border border-green-200">
                      <FiCheck className="text-green-500" size={16} />
                      <span className="text-sm font-semibold text-green-700">Owned</span>
                    </div>
                  )}

                  {/* Purchase Button */}
                  <button
                    disabled={disabled}
                    onClick={() => !disabled && BuyPackage(pkg)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      buttonClasses[buttonVariant]
                    } ${!disabled && !isBought ? 'hover:shadow-lg transform hover:scale-[1.02]' : ''}`}
                  >
                    {isPurchasing ? <PurchaseLoader /> : buttonLabel}
                  </button>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}