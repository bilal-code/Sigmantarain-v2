// "use client";
// import React, { useState } from "react";
// import PackageCard from "@/components/Packagecard";
// import { FiAlertCircle, FiX } from "react-icons/fi";
// import Footer from "@/components/Newfooter";

// const packages2 = [
//   { img: "image-4.jpeg", rate: "0.7%", id: 4 },
//   { img: "image-1.png", rate: "0.7%", id: 1 },
//   { img: "image-2.jpeg", rate: "0.8%", id: 2 },
//   { img: "image-3.jpeg", rate: "0.8%", id: 3 },
//   { img: "image-5.jpeg", rate: "0.9%", id: 5 },
//   { img: "image-6.jpeg", rate: "0.9%", id: 6 },
//   { img: "image-7.jpeg", rate: "1%", id: 7 },
//   { img: "image-8.jpeg", rate: "1%", id: 8 },
// ];

// const EducationPackages = () => {
//   const [showLoginAlert, setShowLoginAlert] = useState(false);

//   const handleClick = () => {
//     setShowLoginAlert(true);
//   };

//   return (
//     <>
//       {/* Background & Section */}
//       <div
//         className="relative z-0 bg-gold-gradient min-h-screen px-6 py-16 text-white overflow-hidden"
//         style={{
//           backgroundSize: "cover",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         {/* Subtle radial glow */}
//         <div className="absolute inset-0 bg-gradient-radial from-[#00FFC6]/10 via-transparent to-transparent opacity-20 pointer-events-none" />

//         {/* Modal */}
//         {showLoginAlert && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//             <div className="bg-[#1f1f1f] border border-[#00FFC6] rounded-xl p-6 max-w-md w-full relative shadow-[0_0_30px_rgba(0,255,198,0.3)]">
//               <button
//                 onClick={() => setShowLoginAlert(false)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-white"
//               >
//                 <FiX className="w-5 h-5" />
//               </button>
//               <div className="flex flex-col items-center text-center">
//                 <div className="w-16 h-16 bg-[#00FFC6]/10 rounded-full flex items-center justify-center mb-4">
//                   <FiAlertCircle className="text-[#00FFC6] text-3xl" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Login Required</h3>
//                 <p className="text-gray-300 mb-6">
//                   Please login to purchase packages and access all features.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Heading */}
//         <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-white drop-shadow-[0_0_15px_rgba(0,255,198,0.3)] mb-12 mt-10">
//           SIGMANTARIAN PACKAGES
//         </h2>

//         {/* Packages Grid */}
//         <div className="flex flex-wrap justify-center gap-10">
//           {packages2.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="w-full max-w-[320px] hover:scale-[1.03] transition-transform duration-300"
//             >
//               <PackageCard pkg={pkg} onBuyClick={handleClick} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// };

// export default EducationPackages;



"use client";
import React, { useState } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import Footer from "@/components/Newfooter";

const packages2 = [
  { name: "Basic", amount: "30", estimated: "3000", id: 1 },
  { name: "Apprentice", amount: "50", estimated: "5000", id: 2 },
  { name: "Trading", amount: "100", estimated: "10000", id: 3 },
  { name: "Blockchain", amount: "250", estimated: "25000", id: 4 },
  { name: "Professional", amount: "500", estimated: "50000", id: 5 },
];

const EducationPackages = () => {
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleClick = () => {
    setShowLoginAlert(true);
  };

  return (
    <>
      {/* Background & Section */}
      <div
        className="relative z-0 bg-gold-gradient min-h-screen px-6 py-16 text-white overflow-hidden"
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#00FFC6]/10 via-transparent to-transparent opacity-20 pointer-events-none" />

        {/* Modal */}
        {showLoginAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1f1f1f] border border-[#00FFC6] rounded-xl p-6 max-w-md w-full relative shadow-[0_0_30px_rgba(0,255,198,0.3)]">
              <button
                onClick={() => setShowLoginAlert(false)}
                className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#00FFC6]/10 rounded-full flex items-center justify-center mb-4">
                  <FiAlertCircle className="text-[#00FFC6] text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Login Required</h3>
                <p className="text-gray-300 mb-6">
                  Please login to purchase packages and access all features.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-white drop-shadow-[0_0_15px_rgba(0,255,198,0.3)] mb-12 mt-10">
          SIGMANTARIAN PACKAGES
        </h2>

        {/* Packages Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          {packages2.map((pkg) => (
            <div
              key={pkg.id}
              className="w-full max-w-[320px] bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:scale-[1.03] transition-transform duration-300 p-6 shadow-[0_0_25px_rgba(0,255,198,0.15)]"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#00FFC6] mb-2">
                  ${pkg.amount}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {pkg.name}
                </h3>
                <p className="text-gray-300 text-sm mb-2">One-time payment</p>

                {/* 💎 Estimated Tokens Label */}
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-[#00FFC6]">
                    Estimated Tokens:
                  </span>{" "}
                  {pkg.estimated} SG
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleClick}
                  className="bg-[#00FFC6] hover:bg-[#00e6b2] cursor-pointer text-black font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,255,198,0.3)]"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}

          {/* Three dots divider */}
          <div className="flex items-center justify-center w-full my-6">
            <span className="text-4xl tracking-widest text-gray-400">. . .</span>
          </div>

          {/* 💎 VIP / Ultimate Package */}
          <div className="w-full max-w-[320px] bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:scale-[1.03] transition-transform duration-300 p-6 shadow-[0_0_25px_rgba(0,255,198,0.15)]">
            <div className="text-center mb-6">
              <div className="text-4xl font-extrabold text-[#00FFC6] mb-2">
                $10,000
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Elite Package
              </h3>
              <p className="text-gray-300 text-sm mb-2">One-time payment</p>

              {/* Estimated Tokens */}
              <div className="text-sm text-gray-400">
                <span className="font-medium text-[#00FFC6]">
                  Estimated Tokens:
                </span>{" "}
                1,000,000 SG
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleClick}
                className="bg-[#00FFC6] cursor-pointer hover:bg-[#00e6b2] text-black font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,255,198,0.4)]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default EducationPackages;
