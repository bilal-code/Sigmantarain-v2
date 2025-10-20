// "use client";
// import React, { useEffect, useState } from "react";
// import { FiPackage } from "react-icons/fi";
// import { FaThList, FaThLarge } from "react-icons/fa";
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";

// const DailyEarningPage = () => {
//   const [dailyearning, setdailyearning] = useState([]);
//   const [view, setView] = useState("list");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [loading, setLoading] = useState(true);

//   const { user, token } = useAuth();
//   const userId = user?.id || user?._id;

//   useEffect(() => {
//     const fetchDailyEarnings = async () => {
//       if (!userId || !token) return;
//       try {
//         const response = await axios.get("/api/user/daily-earning", {
//           headers: {
//             Authorization: `Bearer ${userId}`,
//           },
//         });
//         setdailyearning(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching daily earnings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDailyEarnings();
//   }, [userId, token]);

//  if (loading) {
//   return (
//     <div className="p-2 sm:p-6 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 sm:mb-6">
//           <div className="flex items-center mb-3 xs:mb-0">
//             <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
//               Daily Earning
//             </h1>
//           </div>
//         </div>

//         {/* Stats Loading Placeholder */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:w-full xs:gap-3 sm:gap-4 mb-4 sm:mb-6">
//           {[...Array(4)].map((_, index) => (
//             <div key={index} className="bg-[#272727] p-3 sm:p-4 rounded-lg sm:w-8/12 md:w-full lg:w-full border border-gray-700">
//               <div className="animate-pulse">
//                 <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
//                 <div className="h-6 w-1/2 bg-gray-700 rounded mt-2"></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Table Skeleton Loading */}
//         <div className="bg-[#272727] w-full rounded-lg border border-gray-700 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-800">
//                 <tr>
//                   {[
//                     "Package Name",
//                     "Package Amount",
//                     "Daily %",
//                     "Today Earning",
//                     "Total Earning",
//                     "Credited At",
//                   ].map((head, i) => (
//                     <th
//                       key={i}
//                       className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-left text-[10px] xs:text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
//                     >
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-[#272727] divide-y divide-gray-700">
//                 {[...Array(5)].map((_, i) => (
//                   <tr key={i} className="animate-pulse">
//                     {Array(6).fill().map((_, j) => (
//                       <td
//                         key={j}
//                         className="px-2 py-3 xs:px-3 sm:px-4 text-white text-xs xs:text-sm"
//                       >
//                         <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//   return (
//     <div className="p-2 sm:p-6 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col justify-between items-start mb-4 sm:mb-6">
//           <div className="flex items-center mb-3 xs:mb-0">
//             <h1 className="text-xl mt-4 sm:mt-0 xs:text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
//               Daily Earning
//             </h1>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 sm:gap-4 mb-4 sm:mb-6">
//           <StatCard
//             title="Today's Earnings"
//             color="text-yellow-500"
//             loading={loading}
//             amount={dailyearning
//               .filter(
//                 (e) =>
//                   new Date(e.creditedAt).toDateString() ===
//                   new Date().toDateString()
//               )
//               .reduce((acc, e) => acc + (e.earningAmount || 0), 0)}
//           />
//           <StatCard
//             title="This Week Earnings"
//             color="text-green-500"
//             loading={loading}
//             amount={dailyearning
//               .filter((e) => {
//                 const now = new Date();
//                 const startOfWeek = new Date(
//                   now.setDate(now.getDate() - now.getDay())
//                 );
//                 return new Date(e.creditedAt) >= startOfWeek;
//               })
//               .reduce((acc, e) => acc + (e.earningAmount || 0), 0)}
//           />
//           <StatCard
//             title="This Month Earnings"
//             color="text-red-500"
//             loading={loading}
//             amount={dailyearning
//               .filter((e) => {
//                 const now = new Date();
//                 const date = new Date(e.creditedAt);
//                 return (
//                   date.getMonth() === now.getMonth() &&
//                   date.getFullYear() === now.getFullYear()
//                 );
//               })
//               .reduce((acc, e) => acc + (e.earningAmount || 0), 0)}
//           />
//           <StatCard
//             title="Total Earnings"
//             color="text-indigo-500"
//             loading={loading}
//             amount={dailyearning.reduce(
//               (acc, e) => acc + (e.earningAmount || 0),
//               0
//             )}
//           />
//         </div>

//         {/* View Toggle */}
//         {/* <div className="flex gap-2 mb-4 justify-end mt-2">
//           <ToggleButton view={view} setView={setView} />
//         </div> */}

//         {/* Card View */}
//         {view === "card" && (
//           <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//             {dailyearning.length > 0 ? (
//               (() => {
//                 let totalTillNow = 0;
//                 return dailyearning.map((e, index) => {
//                   totalTillNow += e.earningAmount || 0;
//                   return (
//                     <div
//                       key={index}
//                       className="bg-[#272727] rounded-lg border border-gray-700 p-3 sm:p-4 flex flex-col shadow hover:shadow-lg transition-shadow"
//                     >
//                       <div className="flex items-center mb-2">
//                         <FiPackage className="text-base sm:text-lg text-indigo-500 mr-2" />
//                         <span className="text-sm sm:text-base font-semibold text-white">
//                           {e.packageName}
//                         </span>
//                       </div>
//                       <div className="text-xs text-gray-400 mb-1">
//                         Amount:{" "}
//                         <span className="text-white">${e.packageAmount}</span>
//                       </div>
//                       <div className="text-xs text-gray-400 mb-1">
//                         Daily %:{" "}
//                         <span className="text-white">{e.percentage}%</span>
//                       </div>
//                       <div className="text-xs text-gray-400 mb-1">
//                         Earning:{" "}
//                         <span className="text-white">${e.earningAmount}</span>
//                       </div>
//                       <div className="text-xs text-gray-400 mb-1">
//                         Total Till Now:{" "}
//                         <span className="text-white">
//                           ${totalTillNow.toFixed(2)}
//                         </span>
//                       </div>
//                       <div className="text-xs text-gray-400 mb-1">
//                         Credited At:{" "}
//                         <span className="text-white">
//                           {e.creditedAt
//                             ? new Date(e.creditedAt).toLocaleDateString()
//                             : "-"}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 });
//               })()
//             ) : (
//               <div className="col-span-full text-center text-gray-400 py-6 sm:py-8">
//                 No earnings found.
//               </div>
//             )}
//           </div>
//         )}

//         {/* List/Table View */}
//         {view === "list" && (
//           <div className="bg-[#272727] w-full -mt-1 rounded-lg border border-gray-700 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-800">
//                   <tr>
//                     {[
//                       "Package Name",
//                       "Package Amount",
//                       "Daily %",
//                       "Today Earning",
//                       "Total Earning",
//                       "Credited At",
//                     ].map((head, i) => (
//                       <th
//                         key={i}
//                         className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-left text-[10px] xs:text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
//                       >
//                         {head}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#272727] divide-y divide-gray-700">
//                   {dailyearning.length > 0 ? (
//                     (() => {
//                       let totalTillNow = 0;
//                       return dailyearning.map((e, index) => {
//                         totalTillNow += e.earningAmount || 0;
//                         return (
//                           <tr key={index} className="hover:bg-gray-800">
//                             <td className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-white text-xs xs:text-sm">
//                               {e.packageName}
//                             </td>
//                             <td className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-white text-xs xs:text-sm">
//                               ${e.packageAmount}
//                             </td>
//                             <td className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-white text-xs xs:text-sm">
//                               {e.percentage}%
//                             </td>
//                             <td className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-white text-xs xs:text-sm">
//                               ${e.earningAmount}
//                             </td>
//                             <td className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-white text-xs xs:text-sm">
//                               ${totalTillNow.toFixed(2)}
//                             </td>
//                             <td className="px-2 py-2 xs:px-3 sm:px-4 xs:py-2 sm:py-3 text-gray-400 text-xs xs:text-sm">
//                               {e.creditedAt
//                                 ? new Date(e.creditedAt).toLocaleDateString()
//                                 : "-"}
//                             </td>
//                           </tr>
//                         );
//                       });
//                     })()
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="text-center py-4 sm:py-6 text-gray-400 text-xs xs:text-sm"
//                       >
//                         No earnings found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, amount, color, loading }) => (
//   <div className="bg-[#272727] p-3 sm:p-4 rounded-lg w-full border border-gray-700">
//     <h3 className="text-xs sm:text-sm font-medium text-gray-400">{title}</h3>
//     <p
//       className={`text-lg sm:text-xl md:text-2xl font-bold ${color} mt-1`}
//     >
//       {loading ? "..." : `$${amount.toFixed(2)}`}
//     </p>
//   </div>
// );

// const ToggleButton = ({ view, setView }) => (
//   <>
//     <button
//       className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
//         view === "list"
//           ? "bg-yellow-500 text-white border-yellow-500"
//           : "bg-gray-800 text-gray-300 border-gray-700"
//       }`}
//       onClick={() => setView("list")}
//     >
//       <FaThList className="mr-1" /> List
//     </button>
//     <button
//       className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
//         view === "card"
//           ? "bg-yellow-500 text-white border-yellow-500"
//           : "bg-gray-800 text-gray-300 border-gray-700"
//       }`}
//       onClick={() => setView("card")}
//     >
//       <FaThLarge className="mr-1" /> Card
//     </button>
//   </>
// );

// export default DailyEarningPage;

export default function Earning () {
  return(
    <></>
  )
}



