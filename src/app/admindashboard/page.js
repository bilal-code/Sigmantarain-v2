"use client";
import AdminHoverDevCards from "@/components/admindashboard";
import AdminProductValuationChart from "@/components/admindashboard/chartone";
import dynamic from "next/dynamic";
import AdminTransactionHistory from "@/components/admindashboard/tableone";
import AdminSalesPerformanceCard from "@/components/admindashboard/chartThree";

const AdminPerformanceChart = dynamic(() => import("@/components/admindashboard/chartTwo"), {
  ssr: false,
});

function Userdash() {
  return (
    <>
      <div className="p-2 sm:p-3 bg-white flex flex-col gap-3 sm:gap-3">
         <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B98AC]">
              Admin Dashboard
            </h1>
          </div>
        <div className="w-full">
          <AdminHoverDevCards />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="w-full md:w-[100%] lg:w-[60%] xl:w-[65%]">
            <AdminPerformanceChart />
          </div>
          <div className="w-full md:w-[100%] lg:w-[40%] xl:w-[35%]">
            <AdminProductValuationChart />
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row gap-3 xs:gap-3 w-full h-full overflow-hidden">
           <div className="w-full md:w-[45%] lg:w-[40%] h-full">
            <AdminSalesPerformanceCard />
          </div>
          <div className="w-full md:w-[55%] lg:w-[60%] h-full">
            <AdminTransactionHistory />
          </div>
        </div> */}

       
      </div>
    </>
  );
}

export default Userdash;
