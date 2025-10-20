// "use client";
// import React from "react";
// import Footer from "@/components/Newfooter";

// export default function IncomeStreams() {
//   const levels = [
//     { level: "Level 1", percent: "15%" },
//     { level: "Level 2", percent: "10%" },
//     { level: "Level 3", percent: "10%" },
//     { level: "Level 4", percent: "10%" },
//     { level: "Level 5", percent: "10%" },
//     { level: "Level 6", percent: "8%" },
//     { level: "Level 7", percent: "8%" },
//     { level: "Level 8", percent: "8%" },
//     { level: "Level 9", percent: "10%" },
//     { level: "Level 10", percent: "11%" },
//   ];

//   return (
//     <>
//       <div
//         className="min-h-screen bg-gold-gradient text-white py-16 px-6 flex flex-col items-center justify-center"
//         style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
//       >
//         {/* Section Heading */}
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-10 mb-6 text-center">
//           Staking Plan
//         </h2>

//         {/* Description */}
//         <div className="max-w-3xl text-center text-gray-300 mb-10 space-y-3">
//           <p className="text-sm sm:text-base">
//             When staked by the user, the ROI will be between{" "}
//             <span className="text-cyan-400 font-semibold">
//               0.7% ~ 1.1% daily
//             </span>{" "}
//             of the staked amount.
//           </p>
//           <p className="text-sm sm:text-base">
//             The{" "}
//             <span className="text-cyan-400 font-semibold">
//               15% of earned ROI
//             </span>{" "}
//             will be distributed among{" "}
//             <span className="text-cyan-400 font-semibold">
//               10 levels (Upline)
//             </span>{" "}
//             as follows:
//           </p>
//         </div>

//         {/* Levels Breakdown */}
//         {/* <div className="w-full max-w-lg bg-[#111] rounded-2xl border border-cyan-400/30 shadow-[0_0_30px_rgba(253,199,0,0.15)] overflow-hidden">
//           <div className="bg-cyan-400 text-black font-bold text-lg py-3 text-center">
//             ROI Distribution
//           </div>

//           <div className="divide-y divide-gray-700">
//             {levels.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center px-6 py-3 hover:bg-[var(--themeColor)]/10 transition-all duration-300"
//               >
//                 <span className="text-gray-300 font-medium">{item.level}</span>
//                 <span className="text-cyan-400 font-semibold">
//                   {item.percent}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div> */}
//         <div className="">
//           <img src="/roiDistribution-removebg-preview.png" height={300} width={300} alt="Staking Plan" />
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

"use client";
import React from "react";
import Footer from "@/components/Newfooter";

export default function IncomeStreams() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="md:h-screen bg-gold-gradient text-white flex flex-col items-center justify-center px-6"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-5xl  w-full flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left Content */}
          <div className="flex-1 mt-18 md:mt-0 text-center md:text-left space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Staking Plan
            </h2>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Maximize your earnings by staking your tokens and enjoy consistent
              daily rewards. Earn{" "}
              <span className="text-cyan-400 font-semibold">
                0.7% – 1.1% daily ROI
              </span>{" "}
              on your staked balance with transparent growth.
            </p>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Additionally,{" "}
              <span className="text-cyan-400 font-semibold">15% of total ROI</span>{" "}
              is distributed across{" "}
              <span className="text-cyan-400 font-semibold">10 levels</span>,
              rewarding our growing network and community.
            </p>

            <div className="pt-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300">
                Start Staking
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="/staking-pic.png"
              alt="Staking Plan"
              className="w-[500px] sm:w-[550px] lg:w-[600px] h-[400px] sm:h-[480px] animate-spin-slow transition-transform duration-500 lg:h-[520px] object-contain drop-shadow-[0_0_35px_rgba(0,255,255,0.4)]"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

