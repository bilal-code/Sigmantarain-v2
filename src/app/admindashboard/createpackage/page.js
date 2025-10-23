// "use client";
// import axios from "axios";
// import { useState } from "react";
// import { showSuccessToast,showErrorToast } from "@/lib/toast";

// function CreatePackage() {
//   const [packageName, setPackageName] = useState("");
//   const [packageAmount, setPackageAmount] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
// let packageDailyPercentage = packageAmount * 100;
// console.log("Package Daily Percentage:", packageDailyPercentage);
//     try {
//       const res = await axios.post("/api/admin/create-package", {
//         packageName,
//         packageAmount,
//         packageDailyPercentage,
//       });

//       if (res.status === 201) {
//         setPackageName("");
//         setPackageAmount("");
//       } else {
//         alert("Failed to create package.");
//       }
//     } catch (error) {
//       alert("Error creating package:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white px-4 py-12">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-[#0B98AC] rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.25)] border border-[#0B98AC] p-8 transition-all hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]"
//       >
//         <h1 className="text-3xl font-bold text-center text-white mb-8">
//           📦 Create Package
//         </h1>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-300 mb-2">
//             Package Name
//           </label>
//           <input
//             type="text"
//             className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 border border-gray-500 transition duration-200"
//             placeholder="Enter package Name"
//             value={packageName}
//             onChange={(e) => setPackageName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-300 mb-2">
//             Package Amount
//           </label>
//           <input
//             type="text"
//             className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 border border-gray-500 transition duration-200"
//             placeholder="Enter package amount"
//             value={packageAmount}
//             onChange={(e) => setPackageAmount(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-3 rounded-xl bg-cyan-300 hover:bg-cyan-400 text-gray-600 font-semibold hover:opacity-90 transition duration-200 shadow-md"
//         >
//           Create Package
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreatePackage;






"use client";
import axios from "axios";
import { useState } from "react";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

function CreatePackage() {
  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    let packageDailyPercentage = packageAmount * 100;
    console.log("Package Daily Percentage:", packageDailyPercentage);
    
    try {
      const res = await axios.post("/api/admin/create-package", {
        packageName,
        packageAmount,
        packageDailyPercentage,
      });

      if (res.status === 201) {
        setPackageName("");
        setPackageAmount("");
        showSuccessToast("Package created successfully! 🎉");
      } else {
        showErrorToast("Failed to create package. Please try again.");
      }
    } catch (error) {
      console.error("Error creating package:", error);
      showErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Package</h1>
          <p className="text-gray-600">Add a new investment package to your platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-[#0B98AC] px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="text-2xl">📦</span>
              Package Information
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full text-black px-4 py-3 rounded-lg border border-[#0B98AC] focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-gray-400"
                  placeholder="e.g., Starter Pack, Premium Plan"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Amount ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full text-black px-4 py-3 rounded-lg border border-[#0B98AC] focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-gray-400"
                  placeholder="Enter package amount"
                  value={packageAmount}
                  onChange={(e) => setPackageAmount(e.target.value)}
                  required
                  disabled={isLoading}
                />
                {packageAmount && (
                  <p className="text-sm text-gray-500 mt-2">
                    Daily Percentage: <span className="font-semibold text-cyan-600">{packageAmount * 100}%</span>
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#0B98AC] hover:bg-cyan-600 cursor-pointer text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Package...</span>
                </div>
              ) : (
                "Create Package"
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Fill in all required fields to create a new investment package</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePackage;