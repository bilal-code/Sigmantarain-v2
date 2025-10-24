// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaSortUp, FaSortDown } from "react-icons/fa";

// const UserBoughtPackagesPage = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedIdIndex, setExpandedIdIndex] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/api/admin/getBoughtPackages");
//         setPackages(res.data.BoughtPackages || []);
//       } catch (err) {
//         alert("Error fetching packages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const sortedPackages = [...packages].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     let aVal = a[sortConfig.key];
//     let bVal = b[sortConfig.key];

//     if (sortConfig.key === "createdAt" || sortConfig.key === "buyDate" || sortConfig.key === "expiryDate") {
//       aVal = new Date(aVal).getTime();
//       bVal = new Date(bVal).getTime();
//     } else if (sortConfig.key === "packageName") {
//       aVal = (aVal || "").toLowerCase();
//       bVal = (bVal || "").toLowerCase();
//     } else {
//       aVal = parseFloat(aVal) || 0;
//       bVal = parseFloat(bVal) || 0;
//     }

//     if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//     if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   if (loading) {
//     return (
//       <div className="p-2 sm:p-6 min-h-screen bg-white animate-pulse">
//         <div className="max-w-7xl mx-auto space-y-4">
//           <div className="h-8 w-48 bg-white rounded mb-6"></div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white p-3 rounded-xl border border-white h-24"></div>
//             ))}
//           </div>
//           <div className="bg-white rounded-xl border border-white h-64"></div>
//         </div>
//       </div>
//     );
//   }

//   const getArrowClass = (key, direction) => {
//     const isActive = sortConfig.key === key && sortConfig.direction === direction;
//     return `h-3 w-3 transition-colors duration-200 ${
//       isActive ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]" : "text-gray-500"
//     }`;
//   };

//   const Card = ({ title, value, color }) => (
//     <div className="bg-[#0B98AC] p-4 rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition">
//       <h3 className="text-xs sm:text-sm font-medium text-white">{title}</h3>
//       <p className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mt-1`}>{value}</p>
//     </div>
//   );

//   return (
//     <div className="p-2 sm:p-6 min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <h1 className="text-xl sm:text-2xl font-bold text-[#0B98AC] mt-4 sm:mt-0">
//             User's Bought Packages
//           </h1>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6  ">
//           <Card title="Total Packages" value={packages.length} color="yellow " />
//           {/* <Card title="Active" value={packages.filter(p => p.status === "Active").length} color="green" /> */}
//           {/* <Card title="Expired" value={packages.filter(p => p.status === "Expired").length} color="red" /> */}
//           <Card title="Revenue" value={`$${packages.reduce((acc, p) => acc + parseFloat(p.packageAmount || 0), 0).toFixed(2)}`} color="indigo" />
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-cyan-400">
//               <thead className="bg-[#0B98AC]">
//                 <tr>
//                   {[
//                     { key: "_id", label: "ID" },
//                     { key: "packageName", label: "Package" },
//                     { key: "packageAmount", label: "Amount" },
//                     { key: "SGTokens", label: "SG Tokens" },
//                     { key: "createdAt", label: "Created" },
//                   ].map(({ key, label }) => (
//                     <th
//                       key={key}
//                       onClick={() => setSortConfig(prev => ({
//                         key,
//                         direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
//                       }))}
//                       className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer select-none"
//                     >
//                       <div className="flex items-center justify-between">
//                         {label}
//                         <span className="ml-2 flex flex-col">
//                           <FaSortUp className={getArrowClass(key, "asc")} />
//                           <FaSortDown className={getArrowClass(key, "desc")} />
//                         </span>
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-cyan-400">
//                 {sortedPackages.length > 0 ? (
//                   sortedPackages.map((pkg, idx) => (
//                     <tr key={idx} className="transition-all duration-300">
//                       <td
//                         className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800 cursor-pointer hover:text-black"
//                         onClick={() => setExpandedIdIndex(expandedIdIndex === idx ? null : idx)}
//                       >
//                         <span className="block lg:hidden">
//                           {pkg._id ? (expandedIdIndex === idx ? pkg._id : `${pkg._id.slice(0, 6)}...`) : `#PKG${idx + 1}`}
//                         </span>
//                         <span className="hidden lg:block">{pkg._id || `#PKG${idx + 1}`}</span>
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">{pkg.packageName}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">${parseFloat(pkg.packageAmount || 0).toFixed(2)}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800">{pkg.tokenRecieve}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-800">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : "-"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center py-6 text-gray-400 text-sm">
//                       No packages found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserBoughtPackagesPage;











"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSortUp, FaSortDown, FaBox, FaDollarSign, FaCoins, FaShoppingCart } from "react-icons/fa";

const UserBoughtPackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIdIndex, setExpandedIdIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/getBoughtPackages");
        setPackages(res.data.BoughtPackages || []);
      } catch (err) {
        // console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedPackages = [...packages].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "createdAt" || sortConfig.key === "buyDate" || sortConfig.key === "expiryDate") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else if (sortConfig.key === "packageName") {
      aVal = (aVal || "").toLowerCase();
      bVal = (bVal || "").toLowerCase();
    } else {
      aVal = parseFloat(aVal) || 0;
      bVal = parseFloat(bVal) || 0;
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Enhanced loading component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-4 lg:mb-0"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getArrowClass = (key, direction) => {
    const isActive = sortConfig.key === key && sortConfig.direction === direction;
    return `h-3 w-3 transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-gray-400"
    }`;
  };

  const totalPackages = packages.length;
  const totalRevenue = packages.reduce((acc, p) => acc + parseFloat(p.packageAmount || 0), 0);
  const totalTokens = packages.reduce((acc, p) => acc + parseFloat(p.tokenRecieve || 0), 0);
  const avgPackageValue = totalPackages > 0 ? totalRevenue / totalPackages : 0;

  const Card = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
        </div>
        <div className={`h-12 w-12 ${getBgColor(color)} rounded-lg flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getBgColor = (color) => {
    switch (color) {
      case "text-blue-600": return "bg-blue-500";
      case "text-green-600": return "bg-green-500";
      case "text-purple-600": return "bg-purple-500";
      case "text-yellow-600": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-center items-center text-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              User Purchased Packages
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {totalPackages} total purchases
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-[380px] sm:w-[580px] md:w-[470px] lg:w-full gap-6 mb-8">
          <Card 
            title="Total Packages" 
            value={totalPackages.toLocaleString()} 
            icon={FaShoppingCart}
            color="text-blue-600"
          />
          <Card 
            title="Total Revenue" 
            value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={FaDollarSign}
            color="text-green-600"
          />
          {/* <Card 
            title="Total SG Tokens" 
            value={totalTokens.toLocaleString()} 
            icon={FaCoins}
            color="text-purple-600"
          />
          <Card 
            title="Avg Package Value" 
            value={`$${avgPackageValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            icon={FaBox}
            color="text-yellow-600"
          /> */}
        </div>

        {/* Table */}
        <div className="bg-white w-[380px] sm:w-[580px] md:w-[470px] lg:w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Purchased Packages Details</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: "_id", label: "Purchase ID" },
                    { key: "packageName", label: "Package Name" },
                    { key: "packageAmount", label: "Amount" },
                    { key: "SGTokens", label: "SG Tokens" },
                    { key: "createdAt", label: "Purchase Date" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => setSortConfig(prev => ({
                        key,
                        direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
                      }))}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        <span className="flex flex-col">
                          <FaSortUp className={getArrowClass(key, "asc")} />
                          <FaSortDown className={getArrowClass(key, "desc")} />
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPackages.length > 0 ? (
                  sortedPackages.map((pkg, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-150"
                          onClick={() => setExpandedIdIndex(expandedIdIndex === idx ? null : idx)}
                          title="Click to toggle full ID"
                        >
                          {pkg._id ? (
                            expandedIdIndex === idx ? (
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{pkg._id}</code>
                            ) : (
                              `${pkg._id.slice(0, 8)}...`
                            )
                          ) : (
                            `#PKG${idx + 1}`
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{pkg.packageName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">
                          ${parseFloat(pkg.packageAmount || 0).toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-purple-600">
                          {pkg.tokenRecieve || "0"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : "-"}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaShoppingCart className="h-12 w-12 mb-3 opacity-50" />
                        <p className="text-lg font-medium">No purchased packages found</p>
                        <p className="text-sm mt-1">Users haven't purchased any packages yet</p>
                      </div>
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

export default UserBoughtPackagesPage;