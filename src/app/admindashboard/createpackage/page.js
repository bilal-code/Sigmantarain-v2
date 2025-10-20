"use client";
import axios from "axios";
import { useState } from "react";

function CreatePackage() {
  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  // const [packageDailyPercentage, setPackageDailyPercentage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        // setPackageDailyPercentage("");
        // showSuccessToast("Package created successfully!");
      } else {
        // showErrorToast("Failed to create package.");
      }
    } catch (error) {
      alert("Error creating package:", error);
      // showErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#0B98AC] rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.25)] border border-[#0B98AC] p-8 transition-all hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          📦 Create Package
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Package Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 border border-gray-500 transition duration-200"
            placeholder="Enter package Name"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Package Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 border border-gray-500 transition duration-200"
            placeholder="Enter package amount"
            value={packageAmount}
            onChange={(e) => setPackageAmount(e.target.value)}
            required
          />
        </div>

        {/* <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Package Daily Percentage
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black border border-gray-500 transition duration-200"
            placeholder="Enter package daily percentage"
            value={packageDailyPercentage}
            onChange={(e) => setPackageDailyPercentage(e.target.value)}
            required
          />
        </div> */}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-cyan-300 hover:bg-cyan-400 text-gray-600 font-semibold hover:opacity-90 transition duration-200 shadow-md"
        >
          Create Package
        </button>
      </form>
    </div>
  );
}

export default CreatePackage;
