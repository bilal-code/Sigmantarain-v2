// "use client";
// import HoverDevCards from "@/components/ecommerce";
// import ProductValuationChart from "@/components/charts/chartone";
// import dynamic from "next/dynamic";
// import TransactionHistory from "@/components/charts/tableone";
// import SalesPerformanceCard from "@/components/charts/chartThree";

// const PerformanceChart = dynamic(() => import("@/components/charts/chartTwo"), {
//   ssr: false,
// });

// function Userdash() {
//   return (
//     <>
//       <div className="p-2 sm:p-3 bg-black flex flex-col gap-2 sm:gap-3">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
//             User Dashboard
//           </h1>
//           {/* <p className="text-gray-400 mt-1">
//               Request withdrawal of your earnings.
//             </p> */}
//         </div>
//         <div className="w-full">
//           <HoverDevCards />
//         </div>

//         <div className="flex flex-col lg:flex-row gap-3 w-full">
//           <div className="w-full md:w-[100%] lg:w-[60%] xl:w-[65%]">
//             <PerformanceChart />
//           </div>
//           <div className="w-full md:w-[100%] lg:w-[40%] xl:w-[35%]">
//             <ProductValuationChart />
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-3 w-full h-full overflow-hidden">
//           <div className="w-full md:w-[45%] lg:w-[40%] h-full">
//             <SalesPerformanceCard />
//           </div>
//            <div className="w-full md:w-[55%] lg:w-[60%] h-full">
//             <TransactionHistory />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Userdash;

"use client";

import HoverDevCards from "@/components/ecommerce";
import ProductValuationChart from "@/components/charts/chartone";
import dynamic from "next/dynamic";
import TransactionHistory from "@/components/charts/tableone";
import SalesPerformanceCard from "@/components/charts/chartThree";
import { Divide } from "lucide-react";

const PerformanceChart = dynamic(() => import("@/components/charts/chartTwo"), {
  ssr: false,
});

function Userdash() {
  return (
    <div className="p-2 sm:p-3 bg-white flex flex-col gap-3 sm:gap-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl pt-4 ml-6 sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-[#0B98AC] drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          User Dashboard
        </h1>
      </div>

      {/* TOP CARDS */}
      <div className="w-full -mt-4">
        <HoverDevCards />
      </div>

      <div className="flex w-full -mt-2 justify-center gap-8">
        <div className="w-[63%]">
          <PerformanceChart />
        </div>
        <div className="w-[30%]">
          <ProductValuationChart />
        </div>
      </div>

      {/* SALES & TRANSACTION HISTORY */}
      {/* <section className="flex flex-col md:flex-row gap-6 w-full mt-2">     
        <div className="w-full md:w-[45%] lg:w-[40%] bg-gradient-to-br from-[#1a1a3d] to-[#0e0e26] border border-purple-500/30 rounded-2xl shadow-lg hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 p-6 backdrop-blur-lg">
          <div className="rounded-xl bg-black/10 p-2">
            <SalesPerformanceCard />
          </div>
        </div>

        
        <div className="w-full md:w-[55%] lg:w-[60%] bg-gradient-to-br from-[#1a1a3d] to-[#0e0e26] border border-purple-500/30 rounded-2xl shadow-lg hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 p-6 backdrop-blur-lg overflow-hidden">

          <div className="rounded-xl bg-black/10 p-2">
            <TransactionHistory />
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Userdash;
