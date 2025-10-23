// "use client";
// import React, { useEffect, useState } from "react";
// import { FaSortUp, FaSortDown } from "react-icons/fa";
// import axios from "axios";

// const PackageDetailsPage = () => {
//   const [packageData, setPackageData] = useState([]);
//   const [view, setView] = useState("list");
//   const [loading, setLoading] = useState(true);
//   const [expandedIdIndex, setExpandedIdIndex] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   useEffect(() => {
//     const fetchPackageDetails = async () => {
//       try {
//         const response = await axios.get("/api/user/get-package");
//         setPackageData(response.data.packages || []);
//       } catch (error) {
//         alert("Error fetching package details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackageDetails();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-2 sm:p-6 min-h-screen bg-white animate-pulse">
//         <div className="max-w-7xl mx-auto space-y-4">
//           <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white p-3 rounded-lg border border-white h-24"></div>
//             ))}
//           </div>
//           <div className="bg-rounded-lg border border-white h-64"></div>
//         </div>
//       </div>
//     );
//   }

//   const getArrowClass = (key, direction) => {
//     const isActive = sortConfig.key === key && sortConfig.direction === direction;
//     return `h-3 w-3 transition-colors duration-200 ${
//       isActive ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]" : "text-gray-500"
//     }`;
//   };

//   return (
//     <div className="p-2 sm:p-6 min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-6">
//           <h1 className="text-xl sm:text-2xl font-bold text-[#0B98AC] mt-4 sm:mt-0">
//             Package Details
//           </h1>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
//           <div className="bg-[#0B98AC] p-4 rounded-xl border border-[#0B98AC] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition transform hover:scale-103">
//             <h3 className="text-xs sm:text-sm font-medium text-white">Total Packages</h3>
//             <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mt-1">{packageData.length}</p>
//           </div>

//           <div className="bg-[#0B98AC] p-4 rounded-xl border border-[#0B98AC] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition transform hover:scale-103 ">
//             <h3 className="text-xs sm:text-sm font-medium text-white">Active</h3>
//             <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300">{packageData.filter((pkg) => pkg.status === "active").length}</p>
//           </div>
//         </div>

//         {/* Table */}
//         {view === "list" && (
// <div className="bg-[#1c1c1c] rounded-xl border border-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] overflow-hidden">
//   <div className="overflow-x-auto">
//     <table className="min-w-full divide-y divide-cyan-400">
//       <thead className="bg-[#0B98AC]">
//         <tr>
//           {["ID", "Package", "Amount", "Daily %", "Created"].map((head, idx) => {
//             const keyMap = ["_id", "packageName", "packageAmount", "packageDailyPercentage", "createdAt"];
//             const key = keyMap[idx];
//             return (
//               <th
//                 key={idx}
//                 className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-white uppercase tracking-wider cursor-pointer select-none"
//                 onClick={() =>
//                   setSortConfig({
//                     key,
//                     direction:
//                       sortConfig.key === key && sortConfig.direction === "asc"
//                         ? "desc"
//                         : "asc",
//                   })
//                 }
//               >
//                 <span className="flex items-center">
//                   {head}
//                   <span className="ml-1 flex flex-col">
//                     <FaSortUp className={getArrowClass(key, "asc")} />
//                     <FaSortDown className={getArrowClass(key, "desc")} />
//                   </span>
//                 </span>
//               </th>
//             );
//           })}
//         </tr>
//       </thead>

//       <tbody className="bg-white divide-y divide-cyan-400">
//         {packageData.length > 0 ? (
//           packageData
//             .sort((a, b) => {
//               if (!sortConfig.key) return 0;
//               let aVal = a[sortConfig.key];
//               let bVal = b[sortConfig.key];
//               if (sortConfig.key === "packageAmount" || sortConfig.key === "packageDailyPercentage") {
//                 aVal = parseFloat(aVal);
//                 bVal = parseFloat(bVal);
//               }
//               if (sortConfig.key === "createdAt") {
//                 aVal = new Date(aVal).getTime();
//                 bVal = new Date(bVal).getTime();
//               }
//               if (sortConfig.direction === "asc") return aVal < bVal ? -1 : 1;
//               return aVal > bVal ? -1 : 1;
//             })
//             .map((pkg, index) => (
//               <tr
//                 key={index}
//                 className="transition-all duration-300"
//               >
//                 <td
//                   className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800 cursor-pointer hover:text-black"
//                   onClick={() =>
//                     setExpandedIdIndex(expandedIdIndex === index ? null : index)
//                   }
//                   title="Click to toggle full ID"
//                 >
//                   <span className="block lg:hidden">
//                     {pkg._id ? (expandedIdIndex === index ? pkg._id : `${pkg._id.slice(0, 6)}...`) : `#PKG${index + 1}`}
//                   </span>
//                   <span className="hidden lg:block">
//                     {pkg._id || `#PKG${index + 1}`}
//                   </span>
//                 </td>
//                 <td className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800">{pkg.packageName}</td>
//                 <td className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800">${parseFloat(pkg.packageAmount).toFixed(2)}</td>
//                 <td className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-800">{pkg.packageDailyPercentage}%</td>
//                 <td className="px-3 py-2 text-xs sm:text-sm text-gray-800">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : "-"}</td>
//               </tr>
//             ))
//         ) : (
//           <tr>
//             <td colSpan={5} className="text-center py-6 text-gray-400 text-sm">No packages found.</td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//         )}
//       </div>
//     </div>
//   );
// };

// export default PackageDetailsPage;






"use client";
import React, { useEffect, useState } from "react";
import { FaSortUp, FaSortDown, FaBox, FaCheckCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";

const PackageDetailsPage = () => {
  const [packageData, setPackageData] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [expandedIdIndex, setExpandedIdIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get("/api/user/get-package");
        setPackageData(response.data.packages || []);
      } catch (error) {
        console.error("Error fetching package details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackageDetails();
  }, []);

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

  const sortedPackages = [...packageData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    if (sortConfig.key === "packageAmount" || sortConfig.key === "packageDailyPercentage") {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }
    if (sortConfig.key === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    
    if (sortConfig.direction === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const totalPackages = packageData.length;
  const activePackages = packageData.filter((pkg) => pkg.status === "active").length;
  const totalAmount = packageData.reduce((sum, pkg) => sum + parseFloat(pkg.packageAmount || 0), 0);
  const avgDailyPercentage = packageData.length > 0 
    ? (packageData.reduce((sum, pkg) => sum + parseFloat(pkg.packageDailyPercentage || 0), 0) / packageData.length).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Package Management</h1>
            <p className="text-gray-600">Manage and monitor all investment packages</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <span className="text-sm text-gray-500">Total: {totalPackages} packages</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalPackages}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBox className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{activePackages}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">${totalAmount.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-purple-600">$</span>
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Daily %</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{avgDailyPercentage}%</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-orange-600">%</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Table */}
        {view === "list" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Packages</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { key: "_id", label: "ID" },
                      { key: "packageName", label: "Package" },
                      { key: "packageAmount", label: "Amount" },
                      { key: "packageDailyPercentage", label: "Tokens" },
                      { key: "createdAt", label: "Created" }
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                        onClick={() =>
                          setSortConfig({
                            key,
                            direction:
                              sortConfig.key === key && sortConfig.direction === "asc"
                                ? "desc"
                                : "asc",
                          })
                        }
                      >
                        <span className="flex items-center space-x-1">
                          <span>{label}</span>
                          <span className="flex flex-col">
                            <FaSortUp className={getArrowClass(key, "asc")} />
                            <FaSortDown className={getArrowClass(key, "desc")} />
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedPackages.length > 0 ? (
                    sortedPackages.map((pkg, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-150"
                            onClick={() =>
                              setExpandedIdIndex(expandedIdIndex === index ? null : index)
                            }
                            title="Click to toggle full ID"
                          >
                            {pkg._id ? (
                              expandedIdIndex === index ? (
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{pkg._id}</code>
                              ) : (
                                `${pkg._id.slice(0, 8)}...`
                              )
                            ) : (
                              `#PKG${index + 1}`
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{pkg.packageName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            ${parseFloat(pkg.packageAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-blue-600">
                            {pkg.packageDailyPercentage} tokens
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
                          <FaBox className="h-12 w-12 mb-3 opacity-50" />
                          <p className="text-lg font-medium">No packages found</p>
                          <p className="text-sm mt-1">Create your first package to get started</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailsPage;