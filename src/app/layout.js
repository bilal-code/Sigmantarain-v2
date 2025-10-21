

// "use client";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { usePathname, useSearchParams } from "next/navigation";
// import { ThirdwebProvider } from "thirdweb/react";
// import { WalletProvider } from "@/context/WalletContext";
// import Navbar from "@/components/Navbar";
// import LoaderWrapper from "@/components/loader/wrapper";
// import { useEffect, useState } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [autoSignupData, setAutoSignupData] = useState(null);

//   // ✅ Hide navbar only on admin and user dashboards
//   const hideNavbar =
//     pathname?.startsWith("/admindashboard") ||
//     pathname?.startsWith("/userdashboard");

//   // Check for auto-signup parameters when the page loads
//   useEffect(() => {
//     const ref = searchParams.get('ref');
//     const autoSignup = searchParams.get('autoSignup');
    
//     console.log("URL Parameters detected:", { ref, autoSignup });
    
//     if (ref && autoSignup === 'true') {
//       setAutoSignupData({
//         referralCode: ref,
//         shouldOpenSignup: true
//       });
//     }
//   }, [searchParams, pathname]);

//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
//         {/* ✅ Conditionally render Navbar with auto-signup data */}
//         {!hideNavbar && (
//           <Navbar autoSignupData={autoSignupData} />
//         )}

//         <WalletProvider>
//           <LoaderWrapper>
//             {children}
//           </LoaderWrapper>
//         </WalletProvider>
//       </body>
//     </html>
//   );
// }




import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { WalletProvider } from "@/context/WalletContext";
import NavbarWrapper from "@/components/NavbarWrapper";
import LoaderWrapper from "@/components/loader/wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProvider>
          <LoaderWrapper>
            {/* ✅ Only this wrapper uses client hooks */}
            <NavbarWrapper />
            {children}
          </LoaderWrapper>
        </WalletProvider>
      </body>
    </html>
  );
}
