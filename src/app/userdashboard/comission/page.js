// "use client";
// import { jwtDecode } from "jwt-decode";
// import { useEffect, useState } from "react";
// import { useData } from "@/context/DashboardContext";
// import axios from "axios";

// function Commission() {
//   const [clientId, setClientId] = useState("");
//   const [validationData, setValidationData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [companyCommission, setCompanyCommission] = useState([]);
//   const [referralCommission, setReferralCommission] = useState([]);
//   const [all, setAll] = useState([]);
//   const [view, setView] = useState("list");
//   const { totalCommission, setTotalCommission } = useData();

//   useEffect(() => {
//     const getReferralDetail = async (code, id) => {
//       try {
//         const res = await axios.get("/api/user/get-parents", {
//           headers: {
//             Authorization: `Bearer ${code}`,
//             "x-user-id": id,
//           },
//         });
//         setValidationData(res.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     const GetCompanyCommission = async (id) => {
//       try {
//         const res = await axios.get("/api/user/get-company-commission", {
//           headers: {
//             "x-user-id": id,
//           },
//         });
//         setCompanyCommission(res.data?.data || []);
//       } catch (error) {
//         console.log("error", error.message);
//         setCompanyCommission([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const GetReferralCommission = async (id) => {
//       try {
//         const res = await axios.get("/api/user/get-Commissions", {
//           headers: {
//             "x-user-id": id,
//           },
//         });
//         setReferralCommission(res.data?.data || []);
//       } catch (error) {
//         console.log("error", error.message);
//         setReferralCommission([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const token = localStorage.getItem("authToken");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded?.id && decoded?.code) {
//           setClientId(decoded.id);
//           getReferralDetail(decoded.code, decoded.id);
//           GetCompanyCommission(decoded.id);
//           GetReferralCommission(decoded.id);
//         }
//       } catch (err) {
//         console.error("Invalid token:", err);
//       }
//     }
//   }, [clientId]);

//   useEffect(() => {
//     const processCommissionPairs = async () => {
//       if (!validationData?.getDirectCommision?.length) return;

//       const commissions = validationData.getDirectCommision;

//       for (let i = 0; i < commissions.length - 1; i += 2) {
//         const data1 = commissions[i];
//         const data2 = commissions[i + 1];

//         const amount1 = parseFloat(data1.packageAmount || 0);
//         const amount2 = parseFloat(data2.packageAmount || 0);

//         if (amount1 === 0 && amount2 === 0) continue;
//         let commissionAmount = 0;

//         if (amount1 === amount2 && amount1 !== 0) {
//           commissionAmount = (amount1 * 0.1).toFixed(2);
//         } else {
//           commissionAmount = (Math.max(amount1, amount2) * 0.1).toFixed(2);
//         }

//         const toUserId = clientId;

//         try {
//           await axios.post("/api/user/save-company-commission", {
//             user1: data1.userId,
//             user2: data2.userId,
//             toUserId,
//             commissionAmount,
//           });
//         } catch (err) {
//           console.error("Error saving commission:", err);
//         }
//       }
//     };

//     if (validationData && clientId) {
//       processCommissionPairs();
//     }

//     const allCommission = [companyCommission, referralCommission].filter(
//       (arr) => arr?.length
//     );
//     setAll(allCommission.flat());

//     const total = allCommission.flat().reduce((acc, e) => {
//       if (!e) return acc;
//       const amount = parseFloat(e.amount || e.CommissionAmount || 0);
//       return acc + (isNaN(amount) ? 0 : amount);
//     }, 0);

//     setTotalCommission(total.toFixed(2));
//   }, [validationData, clientId, companyCommission, referralCommission]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-10">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6">
//           {[...Array(4)].map((_, index) => (
//             <div
//               key={index}
//               className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700 animate-pulse"
//             >
//               <div className="h-4 w-2/3 bg-gray-700 rounded mb-2"></div>
//               <div className="h-6 w-1/2 bg-gray-700 rounded"></div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 bg-[#272727] border border-gray-700 rounded-lg p-4 animate-pulse">
//           <div className="h-6 w-48 bg-gray-800 rounded mb-4"></div>
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="h-4 bg-gray-800 rounded w-full mb-3"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-2 sm:p-6 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-4">
//           <div className="flex items-center mb-4 md:mb-0">
//             <h1 className="text-2xl mt-4 sm:mt-0 sm:text-3xl font-bold text-[var(--themeColor)]">
//               Commission
//             </h1>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-2 sm:gap-4 mb-6 sm:mb-4">
//           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
//             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
//               Company Add Commission
//             </h3>
//             <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-1">
//               {loading
//                 ? "..."
//                 : `$${companyCommission
//                     .reduce(
//                       (acc, e) => acc + parseFloat(e?.CommissionAmount || 0),
//                       0
//                     )
//                     .toFixed(2)}`}
//             </div>
//           </div>

//           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
//             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
//               Indirect Referral Commission
//             </h3>
//             <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
//               {loading
//                 ? "..."
//                 : `$${referralCommission
//                     .filter((e) => e?.type === "indirect")
//                     .reduce((acc, e) => acc + parseFloat(e?.amount || 0), 0)
//                     .toFixed(2)}`}
//             </div>
//           </div>

//           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
//             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
//               Direct Referral Commission
//             </h3>
//             <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1">
//               {loading
//                 ? "..."
//                 : `$${referralCommission
//                     .filter((e) => e?.type === "direct")
//                     .reduce((acc, e) => acc + parseFloat(e?.amount || 0), 0)
//                     .toFixed(2)}`}
//             </div>
//           </div>
//           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
//             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
//               Total Commissions
//             </h3>
//             <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
//               {loading
//                 ? "..."
//                 : `$${all
//                     .reduce((acc, e) => {
//                       if (!e) return acc;
//                       const amount = parseFloat(
//                         e.amount || e?.CommissionAmount || 0
//                       );
//                       return acc + (isNaN(amount) ? 0 : amount);
//                     }, 0)
//                     .toFixed(2)}`}
//             </div>
//           </div>
//         </div>

//         {/* List/Table View */}
//         {view === "list" && (
//           <div className="bg-[#272727] rounded-lg sm:rounded-xl border border-gray-700 -mt-3 sm:-mt-1 overflow-hidden w-full">
//             <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
//               <h3 className="text-lg font-medium leading-6 text-white">
//                 Commission History
//               </h3>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-700">
//                 <thead className="bg-gray-800">
//                   <tr>
//                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
//                       Commission Amount
//                     </th>
//                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
//                       Commission %
//                     </th>
//                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
//                       Credited At
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-[#272727] divide-y divide-gray-700">
//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="text-center py-6 text-gray-400 text-sm"
//                       >
//                         Loading...
//                       </td>
//                     </tr>
//                   ) : all.length > 0 ? (
//                     all.map((e, index) => (
//                       <tr key={index}>
//                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
//                           ${e?.CommissionAmount || e?.amount || "0"}
//                         </td>
//                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
//                           {e?.percent || "10"}%
//                         </td>
//                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
//                           {e?.type || "Company"}
//                         </td>
//                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
//                           {e?.createdAt
//                             ? new Date(e.createdAt).toISOString().split("T")[0]
//                             : "-"}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="text-center py-6 text-gray-400 text-sm"
//                       >
//                         No commission history found.
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
// }

// export default Commission;


export default function Comission () {
  return(
    <></>
  )
}