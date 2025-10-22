"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Contract, ethers } from "ethers";
import { transferSGTokenFromContract, transferSGTokenFromContractAbi, usdtAbi, usdtToken } from "@/content/data";
import { WalletContext } from "@/context/WalletContext";
import { FiUsers, FiCheckCircle, FiXCircle, FiTrendingUp, FiClock, FiDollarSign } from "react-icons/fi";
import { FaMoneyCheckAlt, FaSortUp, FaSortDown } from "react-icons/fa";
import { SGToken,SGTokenAbi } from "@/content/data";

export default function AdminWithdrawalPage() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [disabledButtons, setDisabledButtons] = useState({});
  const [loadingButtons, setLoadingButtons] = useState({});
  const [activeTab, setActiveTab] = useState("usdt"); // "usdt" or "staking"
  const { walletAddress, signer } = useContext(WalletContext);
  const [stakingWithdrawl, setStakingWithdrawl] = useState([]);
  const [stakingUsers, setStakingUsers] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [acceptedStaking, setAcceptedStaking] = useState(0);
  const [rejectedStaking, setRejectedStaking] = useState(0);
  // Fetch Withdrawals
  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/withdraw-request");
      const data = res.data.data.filter((item) => item.type === "usdt");
      const stakData = res.data.data.filter((item) => item.type === "tokens");
      setStakingWithdrawl(stakData || []);
      console.log("usdt withdrawl data",data)
      setWithdrawals(data || []);
const totalWithdraw = Array.isArray(res.data.data)
  ? res.data.data
      .filter((item) => item.type === "tokens" && item.status === "accepted")
      .reduce((acc, item) => acc + (Number(item.withdrawAmount) || 0), 0)
  : 0;
      console.log("total withdrawl amount", totalWithdraw); 
      setTotalWithdraw(totalWithdraw);
      const res2 = await axios.get("/api/user/staking");
      // setStakingWithdrawl(res2.data.data || []);
      console.log("staking withdrawl data", res2.data.data.length);
      setStakingUsers(res2.data.data.length || 0);

      const acceptedStaking = Array.isArray(res.data.data)
  ? res.data.data
      .filter((item) => item.type === "tokens" && item.status === "accepted")
  : 0;
  console.log("accepted staking amount", acceptedStaking.length);
  setAcceptedStaking(acceptedStaking.length)
  const rejectedStaking = Array.isArray(res.data.data)
  ? res.data.data
      .filter((item) => item.type === "tokens" && item.status === "rejected")
  : 0;
  console.log("rejected staking amount", rejectedStaking.length);
  setRejectedStaking(rejectedStaking.length);
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
      alert("Failed to fetch withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // Update Withdraw Status
  const updateWithdrawStatus = async (detail, status,type) => {
    if (!walletAddress || !signer) {
      alert("Please connect your wallet first!");
      return;
    }
    
    try {
      // Set both disabled and loading states for this specific button
      setDisabledButtons((prev) => ({ ...prev, [detail._id]: true }));
      setLoadingButtons((prev) => ({ ...prev, [detail._id]: status }));

      if (status.toLowerCase() === "accepted" && type === "usdt") {
        const contract = new Contract(usdtToken, usdtAbi, signer);
        const parsedAmount = ethers.parseUnits(
          detail.withdrawAmount.toString(),
          6
        );
        console.log("USDT transferring...");
        const tx = await contract.transfer(detail.from, parsedAmount);
        console.log("Transaction sent:", tx.hash);
        const receipt = await tx.wait();
        if (!receipt.status) throw new Error("Blockchain transaction failed.");
        console.log("Transaction confirmed.");
const res = await fetch("/api/user/withdraw-request/updateStatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: detail._id, status }),
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Failed to update status");
      }

      // Refresh the withdrawals list to show updated status
      await fetchWithdrawals();
      
      // Show success message
      alert(`Withdrawal ${status.toLowerCase()} successfully!`);


      }else if(status.toLowerCase() === "accepted" && type === "tokens"){
      // const contract = new Contract(SGToken, SGTokenAbi, signer);
      // const parsedAmount = ethers.parseUnits(
        //   detail?.withdrawAmount.toString(),
        //   18
        // );
        // const tx = await contract.transfer(detail?.from, parsedAmount);
        // updated Code
      const tokenAmount = ethers.parseUnits(detail?.withdrawAmount.toString(), 18);
        console.log("tokenAmount",tokenAmount)
           const tokenContract = new ethers.Contract(SGToken, SGTokenAbi, signer);
           console.log("Approving token transfer...");
           const Tokentx = await tokenContract.approve(
    transferSGTokenFromContract, // spender (yani aapka main contract)
   tokenAmount
  );
   await Tokentx.wait();
   console.log("✅ Allowance given to AdminTransferToUser contract");
  
   const contract = new Contract(transferSGTokenFromContract, transferSGTokenFromContractAbi, signer);
      console.log("SG transferring...");
        const tx = await contract.approveAndSend(detail?.from, tokenAmount);    
        console.log("Transaction sent:", tx.hash);
        const receipt = await tx.wait();
        if (!receipt.status) throw new Error("Blockchain transaction failed.");
        console.log("Transaction confirmed.");
        const res = await fetch("/api/user/withdraw-request/updateStatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: detail._id, status }),
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Failed to update status");
      }

      // Refresh the withdrawals list to show updated status
      await fetchWithdrawals();
      
      // Show success message
      alert(`Withdrawal ${status.toLowerCase()} successfully!`);
      }else if(status.toLowerCase() === "rejected" && type === "usdt"){
const res = await fetch("/api/user/withdraw-request/updateStatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: detail._id, status }),
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Failed to update status");
      }

      // Refresh the withdrawals list to show updated status
      await fetchWithdrawals();
      
      // Show success message
      alert(`Withdrawal ${status.toLowerCase()} successfully!`);
      }else if(status.toLowerCase() === "rejected" && type === "tokens"){
const res = await fetch("/api/user/withdraw-request/updateStatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: detail._id, status }),
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Failed to update status");
      }

      // Refresh the withdrawals list to show updated status
      await fetchWithdrawals();
      
      // Show success message
      alert(`Withdrawal ${status.toLowerCase()} successfully!`);
      }

      
      
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      // Reset loading states
      setDisabledButtons((prev) => ({ ...prev, [detail._id]: false }));
      setLoadingButtons((prev) => ({ ...prev, [detail._id]: null }));
    }
  };

  // Sorting
  const sortedData = [...withdrawals].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "withdrawAmount") {
      aVal = parseFloat(aVal || 0);
      bVal = parseFloat(bVal || 0);
    }

    return sortConfig.direction === "asc"
      ? aVal > bVal
        ? 1
        : -1
      : aVal < bVal
      ? 1
      : -1;
  });

  // Stats for USDT
  const totalUsers = new Set(withdrawals.map((w) => w.userId)).size;
  const totalAmount = withdrawals.reduce(
    (sum, w) => sum + parseFloat(w.withdrawAmount || 0),
    0
  );
  const approvedCount = withdrawals.filter(
    (w) => w.status.toLowerCase() === "accepted"
  ).length;
  const rejectedCount = withdrawals.filter(
    (w) => w.status.toLowerCase() === "rejected"
  ).length;

  // Dummy Stats for Staking
  const stakingStats = {
    totalStakingUsers: stakingUsers,
    totalStakingAmount: totalWithdraw,
    activeStakingContracts: acceptedStaking,
    pendingStakingWithdrawals: rejectedStaking,
    completedStakingWithdrawals: 37,
    averageStakingDuration: rejectedStaking
  };

  // Dummy Staking Withdrawals Data
  const stakingWithdrawals = [
    {
      _id: "staking_1",
      userId: "user_stk_001",
      withdrawAmount: "1250.50",
      from: "0x742d35Cc6634C0532925a3b8Doe456f7eA2c7d8f",
      status: "pending",
      type: "staking",
      createdAt: "2024-01-15T10:30:00.000Z"
    },
    {
      _id: "staking_2",
      userId: "user_stk_002",
      withdrawAmount: "850.25",
      from: "0x842d35Cc6634C0532925a3b8Doe456f7eA2c7d9g",
      status: "accepted",
      type: "staking",
      createdAt: "2024-01-12T14:20:00.000Z"
    },
    {
      _id: "staking_3",
      userId: "user_stk_003",
      withdrawAmount: "2200.75",
      from: "0x942d35Cc6634C0532925a3b8Doe456f7eA2c7d0h",
      status: "pending",
      type: "staking",
      createdAt: "2024-01-10T09:15:00.000Z"
    },
    {
      _id: "staking_4",
      userId: "user_stk_004",
      withdrawAmount: "500.00",
      from: "0xa42d35Cc6634C0532925a3b8Doe456f7eA2c7d1i",
      status: "rejected",
      type: "staking",
      createdAt: "2024-01-08T16:45:00.000Z"
    },
    {
      _id: "staking_5",
      userId: "user_stk_005",
      withdrawAmount: "1750.30",
      from: "0xb42d35Cc6634C0532925a3b8Doe456f7eA2c7d2j",
      status: "accepted",
      type: "staking",
      createdAt: "2024-01-05T11:30:00.000Z"
    }
  ];

  if (loading) return <p className="p-4 text-white">Loading withdrawals...</p>;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with Toggle Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B98AC]">
            {activeTab === "usdt" ? "USDT Withdrawals" : "Staking Withdrawals"}
          </h1>
          
          {/* Toggle Buttons */}
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("usdt")}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
                activeTab === "usdt"
                  ? "bg-[#0B98AC] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              USDT
            </button>
            <button
              onClick={() => setActiveTab("staking")}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
                activeTab === "staking"
                  ? "bg-[#0B98AC] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Staking
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "usdt" ? (
          <USDTWithdrawalsContent 
            withdrawals={withdrawals}
            sortedData={sortedData}
            totalUsers={totalUsers}
            totalAmount={totalAmount}
            approvedCount={approvedCount}
            rejectedCount={rejectedCount}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            disabledButtons={disabledButtons}
            loadingButtons={loadingButtons}
            updateWithdrawStatus={updateWithdrawStatus}
          />
        ) : (
          <StakingWithdrawalsContent
            stakingStats={stakingStats}
            stakingWithdrawals={stakingWithdrawl}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            updateWithdrawStatus={updateWithdrawStatus}
          />
        )}
      </div>
    </div>
  );
}

// USDT Withdrawals Content Component
const USDTWithdrawalsContent = ({ 
  withdrawals, 
  sortedData, 
  totalUsers, 
  totalAmount, 
  approvedCount, 
  rejectedCount, 
  sortConfig, 
  setSortConfig, 
  disabledButtons, 
  loadingButtons, 
  updateWithdrawStatus 
}) => {
  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBox
          icon={<FiUsers />}
          label="Total Users"
          value={totalUsers}
          color="text-gray-300"
        />
        <StatBox
          icon={<FaMoneyCheckAlt />}
          label="Total Withdraw"
          value={`$${totalAmount.toFixed(2)} `}
          color="text-gray-300"
        />
        <StatBox
          icon={<FiCheckCircle />}
          label="Approved"
          value={approvedCount}
          color="text-gray-300"
        />
        <StatBox
          icon={<FiXCircle />}
          label="Rejected"
          value={rejectedCount}
          color="text-gray-300"
        />
      </div>

      {/* Withdrawals Table */}
      <div className="bg-[#1c1c1c] rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-cyan-400 text-sm">
          <thead className="bg-[#0B98AC]">
            <tr>
              {[
                { key: "userId", label: "User ID" },
                { key: "withdrawAmount", label: "Amount" },
                { key: "from", label: "Wallet Address" },
                { key: "status", label: "Status" },
              ].map(({ key, label }) => (
                <th
                  key={key}
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
                  className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    {label}
                    <span className="ml-2 flex flex-col">
                      <FaSortUp
                        className={`${
                          sortConfig.key === key &&
                          sortConfig.direction === "asc"
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                        size={10}
                      />
                      <FaSortDown
                        className={`${
                          sortConfig.key === key &&
                          sortConfig.direction === "desc"
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                        size={10}
                      />
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs sm:text-sm text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-400 bg-white">
            {sortedData.length > 0 ? (
              sortedData.map((w) => (
                <tr
                  key={w._id}
                  className="transition-all duration-300 h-[64px]"
                >
                  <td className="px-4 py-2 text-gray-400">{w.userId}</td>
                  <td className="px-4 py-2 text-yellow-400 font-semibold">
                    {parseFloat(w.withdrawAmount).toFixed(2)} $
                  </td>
                  <td className="px-4 py-2 text-gray-400 truncate">
                    {w.from}
                  </td>
                  <td
                    className={`px-4 py-2 capitalize ${
                      w.status.toLowerCase() === "accepted"
                        ? "text-green-400"
                        : w.status.toLowerCase() === "rejected"
                        ? "text-red-400"
                        : "text-orange-400"
                    }`}
                  >
                    {w.status}
                  </td>
                  <td className="px-4 py-2">
                    {w.status.toLowerCase() === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateWithdrawStatus(w, "accepted","usdt")}
                          disabled={disabledButtons[w._id]}
                          className={`px-3 py-1 rounded-md text-sm hover:shadow-[0_0_15px_rgba(0,255,150,0.6)] transition flex items-center justify-center min-w-[80px] ${
                            disabledButtons[w._id]
                              ? "bg-green-600 cursor-not-allowed opacity-70"
                              : "bg-green-700 text-gray-200 hover:bg-green-600"
                          }`}
                        >
                          {loadingButtons[w._id] === "accepted" ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          onClick={() => updateWithdrawStatus(w, "rejected", "usdt")}
                          disabled={disabledButtons[w._id]}
                          className={`px-3 py-1 rounded-md text-sm hover:shadow-[0_0_15px_rgba(255,0,100,0.6)] transition flex items-center justify-center min-w-[80px] ${
                            disabledButtons[w._id]
                              ? "bg-red-600 cursor-not-allowed opacity-70"
                              : "bg-red-700 text-gray-200 hover:bg-red-600"
                          }`}
                        >
                          {loadingButtons[w._id] === "rejected" ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            "Reject"
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No USDT withdrawal records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Staking Withdrawals Content Component
const StakingWithdrawalsContent = ({ 
  stakingStats, 
  stakingWithdrawals, 
  sortConfig, 
  setSortConfig ,
  updateWithdrawStatus
}) => {
  return (
    <>
      {/* Staking Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBox
          icon={<FiUsers />}
          label="Staking Users"
          value={stakingStats.totalStakingUsers}
          color="text-gray-300"
        />
        <StatBox
          icon={<FiDollarSign />}
          label="Total withdraw"
          value={`${stakingStats.totalStakingAmount.toFixed(2)} tokens`}
          color="text-gray-300"
        />
        <StatBox
          icon={<FiTrendingUp />}
          label="Approve Withdrawals"
          value={stakingStats.activeStakingContracts}
          color="text-gray-300"
        />
        <StatBox
          icon={<FiClock />}
          label="Rejected Withdrawals"
          value={stakingStats.averageStakingDuration}
          color="text-gray-300"
        />
      </div>

      {/* Additional Staking Stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0B98AC] p-4 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-3 transition">
          <FiCheckCircle className="text-green-400" />
          <div>
            <h3 className="text-xs text-white">Completed Staking Withdrawals</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 text-gray-300">
              {stakingStats.completedStakingWithdrawals}
            </p>
          </div>
        </div>
        <div className="bg-[#0B98AC] p-4 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-3 transition">
          <FiClock className="text-yellow-400" />
          <div>
            <h3 className="text-xs text-white">Pending Staking Withdrawals</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1 text-gray-300">
              {stakingStats.pendingStakingWithdrawals}
            </p>
          </div>
        </div>
      </div> */}

      {/* Staking Withdrawals Table */}
      <div className="bg-[#1c1c1c] rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-cyan-400 text-sm">
          <thead className="bg-[#0B98AC]">
            <tr>
              {[
                { key: "userId", label: "User ID" },
                { key: "withdrawAmount", label: "Staking Amount" },
                { key: "from", label: "Wallet Address" },
                { key: "status", label: "Status" },
              ].map(({ key, label }) => (
                <th
                  key={key}
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
                  className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    {label}
                    <span className="ml-2 flex flex-col">
                      <FaSortUp
                        className={`${
                          sortConfig.key === key &&
                          sortConfig.direction === "asc"
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                        size={10}
                      />
                      <FaSortDown
                        className={`${
                          sortConfig.key === key &&
                          sortConfig.direction === "desc"
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                        size={10}
                      />
                    </span>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs sm:text-sm text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-400 bg-white">
            {stakingWithdrawals.length > 0 ? (
              stakingWithdrawals.map((w) => (
                <tr
                  key={w._id}
                  className="transition-all duration-300 h-[64px]"
                >
                  <td className="px-4 py-2 text-gray-400">{w.userId}</td>
                  <td className="px-4 py-2 text-yellow-400 font-semibold">
                    {parseFloat(w.withdrawAmount).toFixed(2)} SG
                  </td>
                  <td className="px-4 py-2 text-gray-400 truncate">
                    {w.from}
                  </td>
                  <td
                    className={`px-4 py-2 capitalize ${
                      w.status.toLowerCase() === "accepted"
                        ? "text-green-400"
                        : w.status.toLowerCase() === "rejected"
                        ? "text-red-400"
                        : "text-orange-400"
                    }`}
                  >
                    {w.status}
                  </td>
                  <td className="px-4 py-2">
                    {w.status.toLowerCase() === "pending" ? (
                      <div className="flex gap-2" >
                        <button
                        onClick={() => updateWithdrawStatus(w, "accepted","tokens")}
                          className="px-3 py-1 rounded-md text-sm bg-green-700 text-gray-200 hover:bg-green-600 hover:shadow-[0_0_15px_rgba(0,255,150,0.6)] transition flex items-center justify-center min-w-[80px]"
                        >
                          Approve
                        </button>
                        <button
                         onClick={() => updateWithdrawStatus(w, "rejected","tokens")}
                          className="px-3 py-1 rounded-md text-sm bg-red-700 text-gray-200 hover:bg-red-600 hover:shadow-[0_0_15px_rgba(255,0,100,0.6)] transition flex items-center justify-center min-w-[80px]"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No staking withdrawal records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ✅ Stat Box Component
const StatBox = ({ icon, label, value, color }) => (
  <div className="bg-[#0B98AC] p-4 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center gap-3 transition">
    {icon}
    <div>
      <h3 className="text-xs text-white">{label}</h3>
      <p className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 ${color}`}>
        {value}
      </p>
    </div>
  </div>
);