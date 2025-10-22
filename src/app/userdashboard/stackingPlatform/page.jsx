// "use client";

// import { useState, Fragment, useEffect, useContext } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { jwtDecode } from "jwt-decode";
// import { WalletContext } from "@/context/WalletContext";
// import { Contract, ethers } from "ethers";
// import { adminAddress, SGToken, SGTokenAbi } from "@/content/data";
// import axios from "axios";

// const uplineLevels = [
//   { level: 1, percent: 15 },
//   { level: 2, percent: 10 },
//   { level: 3, percent: 10 },
//   { level: 4, percent: 10 },
//   { level: 5, percent: 10 },
//   { level: 6, percent: 8 },
//   { level: 7, percent: 8 },
//   { level: 8, percent: 8 },
//   { level: 9, percent: 10 },
//   { level: 10, percent: 11 },
// ];

// export default function StackingPlatformPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [stackAmount, setStackAmount] = useState("");
//   const [roi, setRoi] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [stakingData, setStakingData] = useState([]);
//   const { walletAddress, signer } = useContext(WalletContext);

//   // Fetch user staking data
//   const FetchStackingData = async (userId) => {
//     try {
//       const response = await axios.get(`/api/user/staking?userId=${userId}`);
//       if (response.data.success) {
//         setStakingData(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching staking data:", error);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken?.id);
//       FetchStackingData(decodedToken?.id);
//     }
//   }, []);

//   // Handle staking action
//   const handleStack = async () => {
//     if (!walletAddress || !signer) {
//       alert("Please connect your wallet.");
//       return;
//     }
//     if (!stackAmount || isNaN(stackAmount) || Number(stackAmount) <= 0) {
//       alert("Please enter a valid stack amount.");
//       return;
//     }

//     const contract = new Contract(SGToken, SGTokenAbi, signer);
//     const parsedAmount = ethers.parseUnits(stackAmount.toString(), 18);
//     console.log("parsedAmount",parsedAmount)
//     const tx = await contract.transfer(adminAddress, parsedAmount);
//     const receipt = await tx.wait();

//     if (!receipt.status) throw new Error("Blockchain transaction failed");

//     const res = await axios.post("/api/user/staking", { userId, stackAmount });
//     if (res) {
//       setIsModalOpen(true);
//       FetchStackingData(userId);
//     }
//   };

//   // Calculate ROI for stat card
//   const minRoi = stackAmount ? 0.007 * Number(stackAmount) : 0;
//   const maxRoi = stackAmount ? 0.011 * Number(stackAmount) : 0;

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-[#0b0017] via-[#1a0033] to-[#0b0017] text-white p-6 space-y-10 font-sans">
//       <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-center mb-8">
//         Stacking Platform
//       </h1>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <StatBox label="Entered Amount" value={`${stackAmount || 0} Tokens`} color="text-yellow-400" />
//         <StatBox label="Estimated ROI Min" value={`${minRoi.toFixed(2)} Tokens`} color="text-green-400" />
//         <StatBox label="Estimated ROI Max" value={`${maxRoi.toFixed(2)} Tokens`} color="text-blue-400" />
//         <StatBox label="Upline Levels" value={uplineLevels.length} color="text-purple-400" />
//       </div>

//       {/* Stack Input Section */}
//       <section className="bg-[#1c1c35]/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-600/40 p-6 space-y-6">
//         <p className="text-purple-200 text-center">
//           Stake your amount and earn <b className="text-blue-400">0.7% ~ 1.1% daily ROI</b>.
//           <br />
//           <b className="text-purple-400">15% of your ROI</b> will be distributed to your 10-level upline.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
//           <input
//             type="number"
//             placeholder="Enter stack amount"
//             value={stackAmount}
//             onChange={(e) => setStackAmount(e.target.value)}
//             className="w-full sm:w-1/2 bg-[#272747] text-white border border-purple-500/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//           />
//           <button
//             onClick={handleStack}
//             className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_12px_rgba(147,51,234,0.4)]"
//           >
//             Stack Now
//           </button>
//         </div>

//         {/* Upline Table */}
//         <div className="overflow-x-auto mt-6">
//           <table className="w-full text-sm border-separate border-spacing-y-2">
//             <thead>
//               <tr className="text-purple-300 border-b border-purple-500/20">
//                 <th className="px-4 py-3 text-left">Level</th>
//                 <th className="px-4 py-3 text-left">Upline Share (%)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {uplineLevels.map((lvl) => (
//                 <tr
//                   key={lvl.level}
//                   className="bg-[#1f1f3a]/80 hover:bg-[#292952] transition-all rounded-lg shadow-inner"
//                 >
//                   <td className="px-4 py-3 text-center">Level {lvl.level}</td>
//                   <td className="px-4 py-3 text-center">{lvl.percent}%</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Staking History Table */}
//       {stakingData.length > 0 && (
//         <section className="bg-[#1c1c35]/80 rounded-2xl shadow-xl border border-blue-500/30 p-6">
//           <h2 className="text-2xl font-semibold text-blue-300 mb-4 text-center">Your Staking History</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border-separate border-spacing-y-2">
//               <thead>
//                 <tr className="text-blue-200 border-b border-blue-500/30">
//                   <th className="px-4 py-3">Amount</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Start Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stakingData.map((stake, idx) => (
//                   <tr key={idx} className="bg-[#272747]/80 hover:bg-[#3929a2] rounded-lg">
//                     <td className="px-4 py-3 text-center">{stake.stakedAmount} Tokens</td>
//                     <td className="px-4 py-3 text-center">{stake.isActive ? "✅ Active" : "❌ Inactive"}</td>
//                     <td className="px-4 py-3 text-center">{new Date(stake.startDate).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       )}

//       {/* ROI Modal */}
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
//               <Dialog.Panel className="w-full max-w-md rounded-2xl bg-[#141428] border border-purple-600/30 p-6 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
//                 <Dialog.Title className="text-xl font-bold text-purple-300 mb-4 text-center">
//                   Estimated Daily ROI
//                 </Dialog.Title>
//                 <div className="space-y-4 text-center">
//                   <p className="text-lg text-blue-300">You will earn approximately:</p>
//                   <p className="text-2xl font-bold text-blue-400">{minRoi.toFixed(2)} ~ {maxRoi.toFixed(2)} Tokens/day</p>
//                   <p className="text-sm text-gray-400">(15% of this ROI will be shared with your upline.)</p>
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_10px_rgba(147,51,234,0.4)]"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </main>
//   );
// }

// // --- Stat Box Component ---
// function StatBox({ label, value, color }) {
//   return (
//     <div className="bg-[#1f1f3a]/90 rounded-xl shadow-lg border border-purple-600/30 p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
//       <p className={`text-sm font-semibold ${color}`}>{label}</p>
//       <p className="text-xl font-bold mt-2 text-white">{value}</p>
//     </div>
//   );
// }


"use client";

import { useState, Fragment, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import { Contract, ethers } from "ethers";
import { adminAddress, SGToken, SGTokenAbi } from "@/content/data";
import axios from "axios";

const uplineLevels = [
  { level: 1, percent: 15 },
  { level: 2, percent: 10 },
  { level: 3, percent: 10 },
  { level: 4, percent: 10 },
  { level: 5, percent: 10 },
  { level: 6, percent: 8 },
  { level: 7, percent: 8 },
  { level: 8, percent: 8 },
  { level: 9, percent: 10 },
  { level: 10, percent: 11 },
];

export default function StackingPlatformPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stackAmount, setStackAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [userId, setUserId] = useState(null);
  const [stakingData, setStakingData] = useState([]);
  const [stakingAmount, setStakingAmount] = useState(0);
  const [dailyROI, setDailyROI] = useState(0);


  const { walletAddress, signer } = useContext(WalletContext);
const getUserDailyROI = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to fetch Daily ROI data.");
    }

    // 🔹 API call
    const response = await axios.get(`/api/user/daily-roi?userId=${userId}`);
    console.log("User Daily ROI Data:", response.data);
    setDailyROI(response.data.data);
    // ✅ Success
    // return response.data;
  } catch (error) {
    console.error("❌ Error fetching user Daily ROI:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Something went wrong.",
    };
  }
};
  // Fetch user staking data
  const FetchStackingData = async (userId) => {
    try {
      const response = await axios.get(`/api/user/staking?userId=${userId}`);
      if (response.data.success) {
        let totalStaked = response.data.data;
        totalStaked = totalStaked.filter((stake) => stake.isActive);
        totalStaked = totalStaked.reduce((acc, stake) => acc + stake.stakedAmount, 0);
        console.log("Total Staked Amount:", totalStaked);
        setStakingAmount(totalStaked);
        setStakingData(response?.data?.data);
        // console.log("Fetched Staking Data:", totalStaked);
      }
    } catch (error) {
      console.error("Error fetching staking data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken?.id);
      FetchStackingData(decodedToken?.id);
      getUserDailyROI(decodedToken?.id);
    }
  }, []);

  function convertDurationToDate(duration) {
    const now = new Date();
    const match = duration.match(/([\d.]+)([ymdh])/i);
    if (!match) throw new Error("Invalid duration format");

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case "y":
        now.setFullYear(now.getFullYear() + value);
        break;
      case "m":
        now.setMonth(now.getMonth() + value);
        break;
      case "d":
        now.setDate(now.getDate() + value);
        break;
      case "h":
        now.setHours(now.getHours() + value);
        break;
      default:
        throw new Error("Unsupported duration unit");
    }

    return now.toISOString();
  }

  // ROI multiplier based on selected duration
  const getDurationMultiplier = () => {
    switch (duration) {
      case "6m":
        return 1;
      case "1y":
        return 1.2;
      case "1.5y":
        return 1.5;
      case "2y":
        return 2;
      default:
        return 1;
    }
  };

  // Calculate ROI
  const minRoi =
    stackAmount && duration
      ? 0.007 * Number(stackAmount) * getDurationMultiplier()
      : 0;
  const maxRoi =
    stackAmount && duration
      ? 0.011 * Number(stackAmount) * getDurationMultiplier()
      : 0;

  // Handle staking action
  const handleStack = async () => {
    if (!walletAddress || !signer) {
      alert("Please connect your wallet.");
      return;
    }
    if (!stackAmount || isNaN(stackAmount) || Number(stackAmount) <= 0) {
      alert("Please enter a valid stack amount.");
      return;
    }
    if (!duration) {
      alert("Please select staking duration.");
      return;
    }
    const durationDate = convertDurationToDate(duration);
    console.log("Duration Date:", durationDate);

    try {
      const contract = new Contract(SGToken, SGTokenAbi, signer);
      const parsedAmount = ethers.parseUnits(stackAmount.toString(), 18);

      console.log("Parsed Amount:", parsedAmount.toString());

      const tx = await contract.transfer(adminAddress, parsedAmount);
      const receipt = await tx.wait();

      if (!receipt.status) throw new Error("Blockchain transaction failed");
      console.log("duration Time:", durationDate);
      const res = await axios.post("/api/user/staking", {
        userId,
        stackAmount,
        durationDate,
      });

      if (res) {
        setIsModalOpen(true);
        FetchStackingData(userId);
        setStackAmount("");
        setDuration("");
      }
    } catch (error) {
      console.error("Error during staking:", error);
      alert("Staking failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 p-4 sm:p-6 space-y-8 font-sans">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-[#0B98AC] bg-clip-text text-transparent">
          Staking Platform
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Maximize your earnings by staking tokens and earning daily rewards with transparent, secure returns
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <StatBox 
          label="Daily ROI" 
          value="0.5% – 0.8%"
          icon="🚀"
        />
        <StatBox 
          label="Total Staking Tokens" 
          value={`${stakingAmount.toFixed(2)} Tokens`} 
          icon="📈"
        />
        <StatBox 
          label="Total Staking Commission" 
          value={`${dailyROI.toFixed(2)} Tokens`} 
          icon="💰"
        />
        <StatBox 
          label="Upline Levels" 
          value={uplineLevels.length} 
          icon="🏆"
        />
      </div>

      {/* Main Staking Section */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
     
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#0B98AC]">Start Staking</h2>
              <p className="text-gray-600 text-sm">
                Stake your tokens and earn <span className="font-semibold text-[#0B98AC]">0.5% ~ 0.8% daily ROI</span>
              </p>
              <p className="text-gray-500 text-xs">
                <span className="font-semibold">15% of your ROI</span> will be distributed to your 10-level upline
              </p>
            </div>

            {/* Input Section */}
            {/* <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Amount to Stake</label>
                <input
                  type="number"
                  placeholder="Enter stack amount in tokens"
                  value={stackAmount}
                  onChange={(e) => setStackAmount(e.target.value)}
                  className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B98AC] focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Staking Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B98AC] focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Duration</option>
                
                  <option value="1y">1 Year (1.2x Multiplier)</option>
               
                  <option value="2y">2 Years (2x Multiplier)</option>
                </select>
              </div>

              <button
                onClick={handleStack}
                disabled={!stackAmount || !duration}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Stake Now
              </button>
            </div> */}
          </div>

          {/* Staking History */}
          {stakingData.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[#0B98AC] mb-6 text-center">Your Staking History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">End Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Start Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stakingData.map((stake, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{stake.stakedAmount} Tokens</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(stake.endDate).toLocaleDateString() || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            stake.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {stake.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(stake.startDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Upline Levels */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit">
          <h2 className="text-2xl font-bold text-[#0B98AC] mb-6 text-center">Upline Rewards</h2>
          <div className="space-y-3">
            {uplineLevels.map((lvl) => (
              <div
                key={lvl.level}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#0B98AC] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {lvl.level}
                  </div>
                  <span className="font-semibold text-gray-700">Level {lvl.level}</span>
                </div>
                <span className="text-lg font-bold text-[#0B98AC]">{lvl.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Modal */}
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
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Estimated Daily ROI
                  </Dialog.Title>
                  <p className="text-gray-600">You will earn approximately:</p>
                  <div className="bg-gradient-to-r from-[#0B98AC] to-blue-600 text-white py-4 rounded-xl">
                    <p className="text-2xl font-bold">
                      {minRoi.toFixed(2)} ~ {maxRoi.toFixed(2)} Tokens/day
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    (15% of this ROI will be shared with your upline network)
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors duration-200"
                  >
                    Continue
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}

// Enhanced Stat Box Component
function StatBox({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300 group">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
      <p className="text-lg font-bold text-[#0B98AC] group-hover:text-blue-600 transition-colors duration-200">
        {value}
      </p>
    </div>
  );
}