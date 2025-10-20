"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ThirdwebProvider } from "thirdweb/react";
import { WalletProvider } from "@/context/WalletContext";
import Navbar from "@/components/Navbar";
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
  const pathname = usePathname();

  // ✅ Hide navbar only on admin and user dashboards
  const hideNavbar =
    pathname?.startsWith("/admindashboard") ||
    pathname?.startsWith("/userdashboard");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* ✅ Conditionally render Navbar */}
        {!hideNavbar && <Navbar />}

        <WalletProvider>
          <LoaderWrapper>
          {children}
          </LoaderWrapper>
        </WalletProvider>
      </body>
    </html>
  );
}
