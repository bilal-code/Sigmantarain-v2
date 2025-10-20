// "use client";
// import React, { useState } from "react";
// import PackageCard from "@/components/Packagecard";
// import { FiAlertCircle, FiX } from "react-icons/fi";
// import Footer from "@/components/foot";

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
//     <div
//       className="text-white bg-gold-gradient z-0 px-6 py-16 min-h-screen"
//       style={{
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Login Alert Modal */}
//       {showLoginAlert && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#272727] border border-[var(--themeColor)] rounded-xl p-6 max-w-md w-full relative">
//             <button
//               onClick={() => setShowLoginAlert(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//             >
//               <FiX className="w-5 h-5" />
//             </button>

//             <div className="flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle className="text-[var(--themeColor)] text-3xl" />
//               </div>

//               <h3 className="text-xl font-bold text-white mb-2">
//                 Login Required
//               </h3>
//               <p className="text-gray-300 mb-6">
//                 Please login to purchase packages and access all features.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center my-8 text-[var(--themeColor)]">
//           Packages
//         </h2>

//         {/* Flex container for cards */}
//         <div className="flex flex-wrap justify-center gap-8">
//           {packages2.map((pkg) => (
//             <div key={pkg.id} className="w-full max-w-[350px]">
//               <PackageCard
//                 pkg={pkg}
//                 onBuyClick={handleClick}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default EducationPackages;
"use client";
import React, { useState } from "react";
import PackageCard from "@/components/Packagecard";
import { FiAlertCircle, FiX } from "react-icons/fi";
import Footer from "@/components/Newfooter";

const packages2 = [
  { img: "image-4.jpeg", rate: "0.7%", id: 4 },
  { img: "image-1.png", rate: "0.7%", id: 1 },
  { img: "image-2.jpeg", rate: "0.8%", id: 2 },
  { img: "image-3.jpeg", rate: "0.8%", id: 3 },
  { img: "image-5.jpeg", rate: "0.9%", id: 5 },
  { img: "image-6.jpeg", rate: "0.9%", id: 6 },
  { img: "image-7.jpeg", rate: "1%", id: 7 },
  { img: "image-8.jpeg", rate: "1%", id: 8 },
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
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
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
              className="w-full max-w-[320px] hover:scale-[1.03] transition-transform duration-300"
            >
              <PackageCard pkg={pkg} onBuyClick={handleClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default EducationPackages;
