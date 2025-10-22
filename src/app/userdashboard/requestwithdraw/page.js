// 'use client';

// import { useState, Fragment, useEffect, useContext } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { fetchChildCommissions } from '@/lib/utils/getChildCommision';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { WalletContext } from '@/context/WalletContext';

// export default function WithdrawalPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [personalCommission, setPersonalCommission] = useState();
//   const [childCommission, setChildCommission] = useState();
//   const [clientId, setClientId] = useState('');
//   const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
//   const [completedWithdrawals, setCompletedWithdrawals] = useState([]);
//   const [withdrawHistory, setWithdrawHistory] = useState([]);
//   const [businessCommission, setBusinessCommission] = useState();
//   const [loading, setLoading] = useState(true);
//   const [dataLoading, setDataLoading] = useState({
//     summary: true,
//     history: true,
//     business: true
//   });
//   const [activeTab, setActiveTab] = useState("usdt"); // "usdt" or "staking"

//   const fetchUserBusinessCommission = async (userId) => {
//     try {
//       if (!userId) {
//         console.error("❌ userId is required to fetch commission");
//         return { success: false, message: "userId is required" };
//       }

//       const response = await axios.get(`/api/user/business-commission?userId=${userId}`);

//       if (response.data.success) {
//         console.log("✅ Business commission fetched successfully:", response.data.data);
//         setBusinessCommission(response.data?.totalAmount);
//       } else {
//         console.warn("⚠️ No commission found for this user:", response.data.message);
//         return [];
//       }
//     } catch (error) {
//       console.error("❌ Error fetching user commission:", error);
//       return [];
//     } finally {
//       setDataLoading(prev => ({ ...prev, business: false }));
//     }
//   };

//   const saveBusinessCommission = async (userId, percent, amount) => {
//     try {
//       console.log("🔹Sending business commission data:", {
//         userId,
//         percent,
//         amount,
//       });

//       const response = await axios.post("/api/user/business-commission", {
//         userId,
//         percent,
//         amount,
//       });

//       if (response.data.success) {
//         console.log("✅ Commission saved successfully:", response.data.data);
//         return {
//           success: true,
//           message: response.data.message,
//           data: response.data.data,
//         };
//       } else {
//         console.warn("⚠️ Commission save failed:", response.data.message);
//         return {
//           success: false,
//           message: response.data.message,
//         };
//       }
//     } catch (error) {
//       console.error("❌ Error while saving business commission:", error);
//       return {
//         success: false,
//         message: error.response?.data?.error || "Something went wrong.",
//       };
//     }
//   };

//   const fetchCommision = async (userId, code) => {
//     console.log("🔹 Fetching commission for user:", userId, "with code:", code);

//     try {
//       const url = userId
//         ? `/api/user/child-commission?userId=${userId}`
//         : `/api/commission`;

//       const res = await axios.get(url);
//       const commissions = res.data?.commission || [];
//       console.log("✅ Commission data received:", commissions);

//       const totalAmount = commissions.reduce(
//         (sum, item) => sum + (Number(item.amount) || 0),
//         0
//       );
//       setPersonalCommission(totalAmount);
//       console.log("💰 Total personal commission:", totalAmount);

//       const data = await fetchChildCommissions(code);
//       if (data) {
//         console.log("👶 Child Commission data:", data);
//         setChildCommission(data);

//         let totalChild = 0;

//         if (typeof data === "number") {
//           totalChild = data;
//         } else if (Array.isArray(data)) {
//           totalChild = data.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
//         } else if (typeof data === "object" && data.total) {
//           totalChild = Number(data.total);
//         }
//         console.log("👶 Total Child Commission:", totalChild);

//         let response;
//         if (totalChild >= 100000) {
//           response = await saveBusinessCommission(userId, 5, 100000 * 0.05);
//           if (response) {
//             console.log("✅ Bonus saved successfully:", response);
//           }
//         } else if (totalChild >= 60000) {
//           response = await saveBusinessCommission(userId, 5, 60000 * 0.05);
//           if (response) {
//             console.log("✅ Bonus saved successfully:", response);
//           }
//         } else if (totalChild >= 40000) {
//           response = await saveBusinessCommission(userId, 5, 40000 * 0.05);
//           if (response) {
//             console.log("✅ Bonus saved successfully:", response);
//           }
//         } else if (totalChild >= 25000) {
//           response = await saveBusinessCommission(userId, 5, 25000 * 0.05);
//           if (response) {
//             console.log("✅ Bonus saved successfully:", response);
//           }
//         } else if (totalChild >= 10000) {
//           response = await saveBusinessCommission(userId, 5, 10000 * 0.05);
//           if (response) {
//             console.log("✅ Bonus saved successfully:", response);
//           }
//         } else {
//           console.log("❌ You will not get the 5% bonus yet.");
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error fetching commissions:", error.message);
//     } finally {
//       setDataLoading(prev => ({ ...prev, summary: false }));
//     }
//   };

//   const fetchWithdrawals = async (userId) => {
//     try {
//       const res = await fetch("/api/user/withdraw-request", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userId}`,
//         },
//         cache: "no-store",
//       });
//       const data = await res.json();
//       setWithdrawHistory(data?.data || []);
//       console.log("withdrawals data", data);

//       const pending = data?.data.filter((w) => w.status === "pending");
//       const accepted = data?.data.filter((w) => w.status === "accepted");
//       const pendingSum = pending.reduce(
//         (sum, w) => sum + Number(w.withdrawAmount || 0),
//         0
//       );
//       const acceptedSum = accepted.reduce(
//         (sum, w) => sum + Number(w.withdrawAmount || 0),
//         0
//       );
//       console.log("Pending Withdrawals Total:", pendingSum);
//       console.log("Accepted Withdrawals Total:", acceptedSum);
//       setPendingWithdrawals(pendingSum);
//       setCompletedWithdrawals(acceptedSum);
//     } catch (err) {
//       alert("Error fetching withdrawal data:", err);
//     } finally {
//       setDataLoading(prev => ({ ...prev, history: false }));
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       if (token) {
//         const decoded = jwtDecode(token);
//         if (decoded?.id) {
//           console.log("set client id", decoded.id);
//           setClientId(decoded?.id);
//           await Promise.all([
//             fetchCommision(decoded?.id, decoded?.code),
//             fetchUserBusinessCommission(decoded?.id),
//             fetchWithdrawals(decoded?.id)
//           ]);
//         }
//       }
//     };

//     fetchAllData();
//   }, []);

//   const { walletAddress } = useContext(WalletContext);

//   let personal =
//     personalCommission +
//     (businessCommission > 0 ? businessCommission : 0) -
//     (pendingWithdrawals > 0 ? pendingWithdrawals : 0);

//   const summaryData = [
//     {
//       title: 'Personal Commission',
//       amount: `$${(personal - completedWithdrawals).toFixed(2) || 0} `,
//       icon: '💰',
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       title: 'Child Commission',
//       amount: `$${(childCommission) || 0} `,
//       icon: '👥',
//       color: 'from-green-500 to-emerald-500'
//     },
//     {
//       title: 'Withdraw Pending',
//       amount: `$${(pendingWithdrawals) || 0} `,
//       icon: '⏳',
//       color: 'from-yellow-500 to-orange-500'
//     },
//     {
//       title: 'Total Withdrawn',
//       amount: `$${(completedWithdrawals) || 0} `,
//       icon: '✅',
//       color: 'from-purple-500 to-pink-500'
//     },
//   ];

//   const handleWithdrawRequest = async (e) => {
//     e.preventDefault();
//     if (!withdrawAmount || !walletAddress || !clientId) {
//       alert("Please enter a valid amount, wallet address, and client ID.");
//       return;
//     }
//     if(withdrawAmount > personal) {
//       alert("Insufficient balance");
//       return;
//     }
//     try {
//       const response = await axios.post('/api/user/withdraw-request', {
//         userId: clientId,
//         withdrawAmount,
//         from: walletAddress,
//         status: 'pending',
//       });
//       console.log(response);
//       setIsModalOpen(false);
//       setWithdrawAmount('');
//       // Refresh data after successful withdrawal request
//       fetchWithdrawals(clientId);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // Loader Component
//   const Loader = ({ size = 'medium' }) => (
//     <div className={`flex items-center justify-center ${
//       size === 'small' ? 'py-2' : size === 'medium' ? 'py-8' : 'py-16'
//     }`}>
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B98AC]"></div>
//     </div>
//   );

//   const SkeletonLoader = () => (
//     <div className="animate-pulse">
//       <div className="bg-gray-200 rounded-xl h-6 mb-2"></div>
//       <div className="bg-gray-200 rounded-lg h-4 w-3/4"></div>
//     </div>
//   );

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 sm:p-6 space-y-8 font-sans">
//       {/* Header Section */}
//       <div className="text-center space-y-4">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0B98AC] to-blue-600 bg-clip-text text-transparent">
//           {activeTab === "usdt" ? "USDT Withdrawals" : "Staking Withdrawals"}
//         </h1>
//         <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
//           Manage your earnings and withdraw your commissions securely
//         </p>

//         {/* Toggle Buttons */}
//         <div className="flex justify-center">
//           <div className="flex bg-gray-200 rounded-lg p-1">
//             <button
//               onClick={() => setActiveTab("usdt")}
//               className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
//                 activeTab === "usdt"
//                   ? "bg-[#0B98AC] text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               USDT
//             </button>
//             <button
//               onClick={() => setActiveTab("staking")}
//               className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
//                 activeTab === "staking"
//                   ? "bg-[#0B98AC] text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               Staking
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content based on active tab */}
//       {activeTab === "usdt" ? (
//         <USDTWithdrawalsContent
//           dataLoading={dataLoading}
//           summaryData={summaryData}
//           withdrawHistory={withdrawHistory}
//           setIsModalOpen={setIsModalOpen}
//           SkeletonLoader={SkeletonLoader}
//           Loader={Loader}
//         />
//       ) : (
//         <StakingWithdrawalsContent
//          dataLoading={dataLoading}
//           summaryData={summaryData}
//           withdrawHistory={withdrawHistory}
//           setIsModalOpen={setIsModalOpen}
//           SkeletonLoader={SkeletonLoader}
//           Loader={Loader}
//         />
//       )}

//       {/* Withdrawal Modal */}
//       <Transition show={isModalOpen} as={Fragment}>
//         <Dialog onClose={() => setIsModalOpen(false)} className="relative z-50">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-200"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-150"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
//           </Transition.Child>

//           <div className="fixed inset-0 flex items-center justify-center p-4">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-200"
//               enterFrom="opacity-0 scale-90"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-150"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-90"
//             >
//               <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-xl">
//                 <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
//                   Withdraw Funds
//                 </Dialog.Title>
//                 <p className="text-gray-600 text-sm mb-6">
//                   Enter the amount you wish to withdraw to your connected wallet
//                 </p>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700">Withdrawal Amount</label>
//                     <input
//                       type="number"
//                       placeholder="Enter Tokens amount "
//                       value={withdrawAmount}
//                       onChange={(e) => setWithdrawAmount(e.target.value)}
//                       className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B98AC] focus:border-transparent transition-all duration-200"
//                     />
//                   </div>

//                   <div className="bg-blue-50 rounded-lg p-3">
//                     <p className="text-sm text-blue-700">
//                       <strong>Connected Wallet:</strong> {walletAddress || 'Not connected'}
//                     </p>
//                   </div>

//                   <button
//                     onClick={handleWithdrawRequest}
//                     className="w-full py-3 bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
//                   >
//                     Submit Withdrawal Request
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>

//       {/* Global Loader */}
//       {loading && (
//         <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0B98AC] mx-auto mb-4"></div>
//             <p className="text-gray-600 font-semibold">Loading withdrawal data...</p>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// // USDT Withdrawals Content Component
// const USDTWithdrawalsContent = ({
//   dataLoading,
//   summaryData,
//   withdrawHistory,
//   setIsModalOpen,
//   SkeletonLoader,
//   Loader
// }) => {
//   return (
//     <>
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
//         {dataLoading.summary ? (
//           // Skeleton loaders for summary cards
//           Array(4).fill(0).map((_, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               <SkeletonLoader />
//             </div>
//           ))
//         ) : (
//           summaryData.map((box, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 group"
//             >
//               <div className={`w-12 h-12 bg-gradient-to-r ${box.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-lg group-hover:scale-110 transition-transform duration-300`}>
//                 {box.icon}
//               </div>
//               <h3 className="text-sm font-semibold text-gray-600 mb-1">
//                 {box.title}
//               </h3>
//               <p className="text-xl font-bold text-gray-800 group-hover:text-[#0B98AC] transition-colors duration-200">
//                 {box.amount}
//               </p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Transactions Section */}
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//             <h2 className="text-2xl font-bold text-[#0B98AC]">
//               Transaction History
//             </h2>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-6 py-3 bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 shadow-md"
//             >
//               Request Withdrawal
//             </button>
//           </div>

//           {dataLoading.history ? (
//             <Loader />
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {withdrawHistory.length > 0 ? (
//                     withdrawHistory.map((row, index) => (
//                       <tr key={row.id || index} className="hover:bg-gray-50 transition-colors duration-150">
//                         <td className="py-3 px-4 text-sm text-gray-600">
//                           {new Date(row.createdAt).toLocaleDateString()}
//                         </td>
//                         <td className="py-3 px-4 text-sm font-medium text-gray-900">
//                           ${row.withdrawAmount}
//                         </td>
//                         <td className="py-3 px-4">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                             row.status === 'accepted'
//                               ? 'bg-green-100 text-green-800'
//                               : row.status === 'pending'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="py-8 text-center text-gray-500">
//                         No withdrawal history found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const StakingWithdrawalsContent = ({
//   dataLoading,
//   summaryData,
//   withdrawHistory,
//   setIsModalOpen,
//   SkeletonLoader,
//   Loader
// }) => {
//   return (
//     <>
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
//         {dataLoading.summary ? (
//           // Skeleton loaders for summary cards
//           Array(4).fill(0).map((_, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               <SkeletonLoader />
//             </div>
//           ))
//         ) : (
//           summaryData.map((box, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 group"
//             >
//               <div className={`w-12 h-12 bg-gradient-to-r ${box.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-lg group-hover:scale-110 transition-transform duration-300`}>
//                 {box.icon}
//               </div>
//               <h3 className="text-sm font-semibold text-gray-600 mb-1">
//                 {box.title}
//               </h3>
//               <p className="text-xl font-bold text-gray-800 group-hover:text-[#0B98AC] transition-colors duration-200">
//                 {box.amount}
//               </p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Transactions Section */}
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//             <h2 className="text-2xl font-bold text-[#0B98AC]">
//               Transaction History
//             </h2>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="px-6 py-3 bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 shadow-md"
//             >
//               Request Withdrawal
//             </button>
//           </div>

//           {dataLoading.history ? (
//             <Loader />
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
//                     <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {withdrawHistory.length > 0 ? (
//                     withdrawHistory.map((row, index) => (
//                       <tr key={row.id || index} className="hover:bg-gray-50 transition-colors duration-150">
//                         <td className="py-3 px-4 text-sm text-gray-600">
//                           {new Date(row.createdAt).toLocaleDateString()}
//                         </td>
//                         <td className="py-3 px-4 text-sm font-medium text-gray-900">
//                           ${row.withdrawAmount}
//                         </td>
//                         <td className="py-3 px-4">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                             row.status === 'accepted'
//                               ? 'bg-green-100 text-green-800'
//                               : row.status === 'pending'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="py-8 text-center text-gray-500">
//                         No withdrawal history found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

"use client";

import { useState, Fragment, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { fetchChildCommissions } from "@/lib/utils/getChildCommision";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

export default function WithdrawalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [personalCommission, setPersonalCommission] = useState();
  const [childCommission, setChildCommission] = useState();
  const [clientId, setClientId] = useState("");
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [completedWithdrawals, setCompletedWithdrawals] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [businessCommission, setBusinessCommission] = useState();
  const [loading, setLoading] = useState(true);
  const [stakingData, setStakingData] = useState([]);
  const [pendingSGToken, setPendingSGToken] = useState([]);
  const [acceptedSGToken, setAcceptedSGToken] = useState([]);
  const [SGTokenHistory, setSGTokenHistory] = useState([]);

  const [dataLoading, setDataLoading] = useState({
    summary: true,
    history: true,
    business: true,
  });
  const [activeTab, setActiveTab] = useState("usdt"); // "usdt" or "staking"

  const fetchUserBusinessCommission = async (userId) => {
    try {
      if (!userId) {
        console.error("❌ userId is required to fetch commission");
        return { success: false, message: "userId is required" };
      }

      const response = await axios.get(
        `/api/user/business-commission?userId=${userId}`
      );

      if (response.data.success) {
        console.log(
          "✅ Business commission fetched successfully:",
          response.data.data
        );
        setBusinessCommission(response.data?.totalAmount);
      } else {
        console.warn(
          "⚠️ No commission found for this user:",
          response.data.message
        );
        return [];
      }
    } catch (error) {
      console.error("❌ Error fetching user commission:", error);
      return [];
    } finally {
      setDataLoading((prev) => ({ ...prev, business: false }));
    }
  };

  const saveBusinessCommission = async (userId, percent, amount) => {
    try {
      console.log("🔹Sending business commission data:", {
        userId,
        percent,
        amount,
      });

      const response = await axios.post("/api/user/business-commission", {
        userId,
        percent,
        amount,
      });

      if (response.data.success) {
        console.log("✅ Commission saved successfully:", response.data.data);
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      } else {
        console.warn("⚠️ Commission save failed:", response.data.message);
        return {
          success: false,
          message: response.data.message,
        };
      }
    } catch (error) {
      console.error("❌ Error while saving business commission:", error);
      return {
        success: false,
        message: error.response?.data?.error || "Something went wrong.",
      };
    }
  };

  const fetchCommision = async (userId, code) => {
    console.log("🔹 Fetching commission for user:", userId, "with code:", code);

    try {
      const url = userId
        ? `/api/user/child-commission?userId=${userId}`
        : `/api/commission`;

      const res = await axios.get(url);
      const commissions = res.data?.commission || [];
      console.log("✅ Commission data received:", commissions);

      const totalAmount = commissions.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
      );
      setPersonalCommission(totalAmount);
      console.log("💰 Total personal commission:", totalAmount);

      const data = await fetchChildCommissions(code);
      if (data) {
        console.log("👶 Child Commission data:", data);
        setChildCommission(data);

        let totalChild = 0;

        if (typeof data === "number") {
          totalChild = data;
        } else if (Array.isArray(data)) {
          totalChild = data.reduce(
            (sum, item) => sum + (Number(item.amount) || 0),
            0
          );
        } else if (typeof data === "object" && data.total) {
          totalChild = Number(data.total);
        }
        console.log("👶 Total Child Commission:", totalChild);

        let response;
        if (totalChild >= 100000) {
          response = await saveBusinessCommission(userId, 5, 100000 * 0.05);
          if (response) {
            console.log("✅ Bonus saved successfully:", response);
          }
        } else if (totalChild >= 60000) {
          response = await saveBusinessCommission(userId, 5, 60000 * 0.05);
          if (response) {
            console.log("✅ Bonus saved successfully:", response);
          }
        } else if (totalChild >= 40000) {
          response = await saveBusinessCommission(userId, 5, 40000 * 0.05);
          if (response) {
            console.log("✅ Bonus saved successfully:", response);
          }
        } else if (totalChild >= 25000) {
          response = await saveBusinessCommission(userId, 5, 25000 * 0.05);
          if (response) {
            console.log("✅ Bonus saved successfully:", response);
          }
        } else if (totalChild >= 10000) {
          response = await saveBusinessCommission(userId, 5, 10000 * 0.05);
          if (response) {
            console.log("✅ Bonus saved successfully:", response);
          }
        } else {
          console.log("❌ You will not get the 5% bonus yet.");
        }
      }
    } catch (error) {
      console.error("❌ Error fetching commissions:", error.message);
    } finally {
      setDataLoading((prev) => ({ ...prev, summary: false }));
    }
  };

  const fetchWithdrawals = async (userId) => {
    try {
      const res = await fetch("/api/user/withdraw-request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        cache: "no-store",
      });
      const data = await res.json();
      console.log("Withdrawals data:", data);
      setWithdrawHistory(data?.data.filter((w) => w.type === "usdt") || []);
      setSGTokenHistory(data?.data.filter((w) => w.type === "tokens") || []);
      console.log("withdrawals data", data);

      const pendingUsdt = data?.data.filter(
        (w) => w.status === "pending" && w.type === "usdt"
      );
      const acceptedUsdt = data?.data.filter(
        (w) => w.status === "accepted" && w.type === "usdt"
      );
      const pendingSgt = data?.data.filter(
        (w) => w.status === "pending" && w.type === "tokens"
      );
      const acceptedSgt = data?.data.filter(
        (w) => w.status === "accepted" && w.type === "tokens"
      );
      const pendingSum = pendingUsdt.reduce(
        (sum, w) => sum + Number(w.withdrawAmount || 0),
        0
      );
      const acceptedSum = acceptedUsdt.reduce(
        (sum, w) => sum + Number(w.withdrawAmount || 0),
        0
      );
      const pendingSGSum = pendingSgt.reduce(
        (sum, w) => sum + Number(w.withdrawAmount || 0),
        0
      );
      const acceptedSSum = acceptedSgt.reduce(
        (sum, w) => sum + Number(w.withdrawAmount || 0),
        0
      );
      console.log("Pending Withdrawals Total:", pendingSum);
      console.log("Accepted Withdrawals Total:", acceptedSum);
      console.log("Pending SGT Withdrawals Total:", pendingSGSum);
      console.log("Accepted SGT Withdrawals Total:", acceptedSSum);
      setPendingWithdrawals(pendingSum);
      setCompletedWithdrawals(acceptedSum);
      setPendingSGToken(pendingSGSum);
      setAcceptedSGToken(acceptedSSum);
    } catch (err) {
      alert("Error fetching withdrawal data:", err);
    } finally {
      setDataLoading((prev) => ({ ...prev, history: false }));
      setLoading(false);
    }
  };

  //stking functions
  const fetchStakingData = async (userId) => {
    try {
      const res = await axios.get(
        `/api/user/stakingWithdrawlData?userId=${userId}`
      );
      console.log("staking Data ", res.data.data);
      setStakingData(res.data.data);
    } catch (err) {
      console.error("Error fetching user earnings:", err);
      setError("Something went wrong while fetching data");
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          console.log("set client id", decoded.id);
          setClientId(decoded?.id);
          await Promise.all([
            fetchCommision(decoded?.id, decoded?.code),
            fetchUserBusinessCommission(decoded?.id),
            fetchWithdrawals(decoded?.id),
            fetchStakingData(decoded?.id),
          ]);
        }
      }
    };

    fetchAllData();
  }, []);

  const { walletAddress } = useContext(WalletContext);

  let personal =
    personalCommission +
    (businessCommission > 0 ? businessCommission : 0) -
    (pendingWithdrawals > 0 ? pendingWithdrawals : 0);

  let usdtTotal = personal - completedWithdrawals;
  // USDT Summary Data (Remains Same)
  const usdtSummaryData = [
    {
      title: "Referral Commission",
      amount: `$${personalCommission || 0} `,
      icon: "💰",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Downward Commission",
      amount: `$${childCommission || 0} `,
      icon: "👥",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Commission",
      amount: `$${usdtTotal.toFixed(2) || 0} `,
      icon: "👥",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Withdraw Pending",
      amount: `$${pendingWithdrawals || 0} `,
      icon: "⏳",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Total Withdrawn",
      amount: `$${completedWithdrawals || 0} `,
      icon: "✅",
      color: "from-purple-500 to-pink-500",
    },
  ];

  let stakingCommission =
    stakingData?.totalUplineCommission +
    (stakingData?.totalDailyRoi > 0 ? stakingData?.totalDailyRoi : 0) -
    (pendingSGToken > 0 ? pendingSGToken : 0);
  // Staking Summary Data (Dummy Data)
  let total =
    stakingData?.totalUplineCommission +
    stakingData?.totalDailyRoi -
    pendingSGToken -
    acceptedSGToken;
  const stakingSummaryData = [
    {
      title: "Total Upline Commission",
      amount: `${stakingData?.totalUplineCommission} tokens` || 0,
      icon: "📈",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Staking Rewards",
      amount: `${stakingData?.totalDailyRoi} tokens` || 0,
      icon: "💰",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Total Rewards",
      amount: `${total.toFixed(2)} tokens` || 0,
      icon: "💰",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Staking Pending",
      amount: `${pendingSGToken} tokens` || 0,
      icon: "⏳",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Total Staking Withdrawn",
      amount: `${acceptedSGToken} tokens` || 0,
      icon: "✅",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  // Staking Dummy Transaction History
  const handleWithdrawRequest = async (e) => {
    e.preventDefault();

    if (!withdrawAmount || !walletAddress || !clientId) {
      showErrorToast("⚠️ Please Connect your wallet and enter a valid amount.");
      return;
    }

    if (withdrawAmount > personal) {
      showErrorToast("❌ Insufficient balance for withdrawal.");
      return;
    }

    try {
      const response = await axios.post("/api/user/withdraw-request", {
        userId: clientId,
        withdrawAmount,
        from: walletAddress,
        status: "pending",
        type: "usdt",
      });

      console.log(response);
      setIsModalOpen(false);
      setWithdrawAmount("");

      showSuccessToast("🎉 Withdrawal request submitted successfully!");
      fetchWithdrawals(clientId); // Refresh data
    } catch (error) {
      console.error("Withdraw request failed:", error);
      showErrorToast(
        "Something went wrong while submitting withdrawal request."
      );
    }
  };

  const handleStakingWithdrawRequest = async (e) => {
    e.preventDefault();

    if (!withdrawAmount || !walletAddress || !clientId) {
      showErrorToast("⚠️ Please Connect your wallet and enter a valid amount.");
      return;
    }

    if (withdrawAmount > total) {
      showErrorToast("❌ Insufficient staking balance for withdrawal.");
      return;
    }

    try {
      const response = await axios.post("/api/user/withdraw-request", {
        userId: clientId,
        withdrawAmount,
        from: walletAddress,
        status: "pending",
        type: "tokens",
      });

      console.log(response);
      setIsModalOpen(false);
      setWithdrawAmount("");

      showSuccessToast("🎉 Staking withdrawal request submitted successfully!");
      fetchWithdrawals(clientId); // Refresh data
    } catch (error) {
      console.error("Staking withdraw request failed:", error);
      showErrorToast(
        "Something went wrong while submitting staking withdrawal request."
      );
    }
  };

  // Loader Component
  const Loader = ({ size = "medium" }) => (
    <div
      className={`flex items-center justify-center ${
        size === "small" ? "py-2" : size === "medium" ? "py-8" : "py-16"
      }`}
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B98AC]"></div>
    </div>
  );

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl h-6 mb-2"></div>
      <div className="bg-gray-200 rounded-lg h-4 w-3/4"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 sm:p-6 space-y-8 font-sans">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-[#0B98AC] bg-clip-text text-transparent">
          {activeTab === "usdt" ? "USDT Withdrawals" : "Staking Withdrawals"}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {activeTab === "usdt"
            ? "Manage your USDT earnings and withdraw commissions securely"
            : "Manage your staking rewards and withdraw earnings securely"}
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center">
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("usdt")}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
                activeTab === "usdt"
                  ? "bg-[#0B98AC] text-white shadow-md"
                  : "text-gray-600 cursor-pointer hover:text-gray-800"
              }`}
            >
              USDT
            </button>
            <button
              onClick={() => setActiveTab("staking")}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
                activeTab === "staking"
                  ? "bg-[#0B98AC] text-white shadow-md"
                  : "text-gray-600 cursor-pointer hover:text-gray-800"
              }`}
            >
              Staking
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "usdt" ? (
        <USDTWithdrawalsContent
          dataLoading={dataLoading}
          summaryData={usdtSummaryData}
          withdrawHistory={withdrawHistory}
          setIsModalOpen={setIsModalOpen}
          SkeletonLoader={SkeletonLoader}
          Loader={Loader}
          usdtTotal={usdtTotal}
        />
      ) : (
        <StakingWithdrawalsContent
          dataLoading={dataLoading}
          summaryData={stakingSummaryData}
          withdrawHistory={SGTokenHistory}
          setIsModalOpen={setIsStakingModalOpen}
          SkeletonLoader={SkeletonLoader}
          Loader={Loader}
          total={total}
        />
      )}

      {/* usdt Withdrawal Modal */}
      <Transition show={isModalOpen} as={Fragment}>
        <Dialog onClose={() => setIsModalOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-xl">
                <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                  Withdraw Funds
                </Dialog.Title>
                <p className="text-gray-600 text-sm mb-6">
                  Enter the amount you wish to withdraw to your connected wallet
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Withdrawal Amount
                    </label>
                    <input
                      type="number"
                      placeholder="Enter usdt amount "
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B98AC] focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      <strong>Connected Wallet:</strong>{" "}
                      {walletAddress || "Not connected"}
                    </p>
                  </div>

                  <button
                    onClick={handleWithdrawRequest}
                    className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Submit Withdrawal Request
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/* Staking Withdraw Modal */}
      <Transition show={isStakingModalOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsStakingModalOpen(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-xl">
                <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                  Withdraw Funds
                </Dialog.Title>
                <p className="text-gray-600 text-sm mb-6">
                  Enter the amount you wish to withdraw to your connected wallet
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Withdrawal Amount
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Tokens amount "
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B98AC] focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      <strong>Connected Wallet:</strong>{" "}
                      {walletAddress || "Not connected"}
                    </p>
                  </div>

                  <button
                    onClick={handleStakingWithdrawRequest}
                    className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Submit Withdrawal Request
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Global Loader */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0B98AC] mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">
              Loading withdrawal data...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

// USDT Withdrawals Content Component
const USDTWithdrawalsContent = ({
  dataLoading,
  summaryData,
  withdrawHistory,
  setIsModalOpen,
  SkeletonLoader,
  usdtTotal,
  Loader,
}) => {
  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {dataLoading.summary
          ? // Skeleton loaders for summary cards
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                  <SkeletonLoader />
                </div>
              ))
          : summaryData.map((box, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${box.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {box.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  {box.title}
                </h3>
                <p className="text-xl font-bold text-gray-800 group-hover:text-[#0B98AC] transition-colors duration-200">
                  {box.amount}
                </p>
              </div>
            ))}
      </div>

      {/* Transactions Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-[#0B98AC]">
              USDT Transaction History
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={usdtTotal < 15}
              className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 shadow-md
    ${
      usdtTotal >= 15
        ? "bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white cursor-pointer hover:shadow-lg transform hover:scale-[1.02]"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }`}
            >
              {usdtTotal >= 15
                ? "Request USDT Withdrawal"
                : "Insufficient Balance"}
            </button>
          </div>

          {dataLoading.history ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount (USDT)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {withdrawHistory.length > 0 ? (
                    withdrawHistory.map((row, index) => (
                      <tr
                        key={row.id || index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(row.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          ${row.withdrawAmount}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              row.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : row.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {row.status.charAt(0).toUpperCase() +
                              row.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-8 text-center text-gray-500"
                      >
                        No USDT withdrawal history found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Staking Withdrawals Content Component
const StakingWithdrawalsContent = ({
  dataLoading,
  summaryData,
  withdrawHistory,
  setIsModalOpen,
  SkeletonLoader,
  Loader,
  total,
}) => {
  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {dataLoading.summary
          ? // Skeleton loaders for summary cards
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                  <SkeletonLoader />
                </div>
              ))
          : summaryData.map((box, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${box.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {box.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">
                  {box.title}
                </h3>
                <p className="text-xl font-bold text-gray-800 group-hover:text-[#0B98AC] transition-colors duration-200">
                  {box.amount}
                </p>
              </div>
            ))}
      </div>

      {/* Transactions Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-[#0B98AC]">
              Staking Withdrawal History
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={total < 1500}
              className={`relative px-6 py-3 font-semibold rounded-xl text-white transition-all duration-300 ${
                total >= 1500
                  ? "bg-gradient-to-r from-[#0B98AC] to-blue-600 cursor-pointer shadow-[0_0_15px_#0B98AC] hover:shadow-[0_0_25px_#0B98AC] hover:scale-[1.03]"
                  : "bg-gray-400 cursor-not-allowed opacity-70"
              }`}
            >
              {total >= 1500
                ? "Request Staking Withdrawal"
                : "Insufficient Balance"}
            </button>
          </div>

          {dataLoading.history ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount (Staking)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {withdrawHistory.length > 0 ? (
                    withdrawHistory.map((row, index) => (
                      <tr
                        key={row.id || index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(row.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {row.withdrawAmount} tokens
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              row.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : row.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {row.status.charAt(0).toUpperCase() +
                              row.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-8 text-center text-gray-500"
                      >
                        No staking withdrawal history found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
