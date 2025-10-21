// 'use client';

// import { usePathname, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "./Navbar";

// export default function NavbarWrapper() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [autoSignupData, setAutoSignupData] = useState(null);

//   // Hide navbar on dashboards
//   const hideNavbar =
//     pathname?.startsWith("/admindashboard") ||
//     pathname?.startsWith("/userdashboard");

//   useEffect(() => {
//     const ref = searchParams.get('ref');
//     const autoSignup = searchParams.get('autoSignup');

//     if (ref && autoSignup === 'true') {
//       setAutoSignupData({
//         referralCode: ref,
//         shouldOpenSignup: true
//       });
//     }
//   }, [searchParams, pathname]);

//   if (hideNavbar) return null;

//   return <Navbar autoSignupData={autoSignupData} />;
// }






'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Navbar from "./Navbar";

// Create a separate component that uses useSearchParams
function NavbarWrapperContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [autoSignupData, setAutoSignupData] = useState(null);

  // Hide navbar on dashboards
  const hideNavbar =
    pathname?.startsWith("/admindashboard") ||
    pathname?.startsWith("/userdashboard");

  useEffect(() => {
    const ref = searchParams.get('ref');
    const autoSignup = searchParams.get('autoSignup');

    if (ref && autoSignup === 'true') {
      setAutoSignupData({
        referralCode: ref,
        shouldOpenSignup: true
      });
    }
  }, [searchParams, pathname]);

  if (hideNavbar) return null;

  return <Navbar autoSignupData={autoSignupData} />;
}

// Main component with Suspense boundary
export default function NavbarWrapper() {
  return (
    <Suspense fallback={
      // You can show a simplified navbar or loading state while Suspense loads
      <div className="fixed top-0 left-0 w-full bg-[#030014]/80 backdrop-blur-md border-b border-[#16f2b3]/40 z-50 px-4 md:px-8 h-16">
        {/* Simple loading navbar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="ml-3 w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    }>
      <NavbarWrapperContent />
    </Suspense>
  );
}