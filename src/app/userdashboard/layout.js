// "use client";
// import React, { useState } from "react";
// import Sidebar from "@/components/sidebar";
// import Header from "@/components/header";

// export default function DefaultLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex">
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className="flex flex-col flex-1">
//         <Header setSidebarOpen={setSidebarOpen} />
        
//         <main
//           className="transition-all duration-300 flex-1 overflow-y-auto"
//           style={{ 
//             marginLeft: sidebarOpen ? "225px" : "60px",
//             marginTop: "64px" 
//           }}
//         >
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/LargescreenLayoutjs";
import SmallscreenLayout from "@/components/SmallscreenLayout";

export default function AdminResponsiveLayout({ children }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [key, setKey] = useState(0); 

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newIsSmallScreen = width < 768;
      if (newIsSmallScreen !== isSmallScreen) {
        setIsSmallScreen(newIsSmallScreen);
        setKey(prev => prev + 1);
      }
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isSmallScreen]);

  return isSmallScreen ? (
    <SmallscreenLayout key={`small-${key}`}>{children}</SmallscreenLayout>
  ) : (
    <DefaultLayout key={`large-${key}`}>{children}</DefaultLayout>
  );
}