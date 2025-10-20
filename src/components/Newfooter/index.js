// import Link from "next/link";
// import React from "react";
// import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
// import Image from "next/image";
// import logo from "../../../public/logoo.png";

// const Footer = () => {
//   return (
//     <footer className="relative bg-black text-white px-6 pt-4 border-t border-[#FDC700]/40">
//       <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row flex-wrap justify-between gap-8">
//         {/* Logo and company info */}
//         <aside className="flex-1 min-w-[200px]">
//           <div className="flex items-center gap-2">
//             <Image
//               width={100}
//               height={100}
//               alt="Hashfor"
//               src={logo}
//               className="h-10 w-auto drop-shadow-[0_0_10px_rgba(253,199,0,0.4)]"
//             />
//             <p className="text-[#FDC700] text-xl font-bold font-serif tracking-wide">
//               Sigmantarian
//             </p>
//           </div>
//           <p className="text-sm mt-2 max-w-xs text-gray-300">
//             The next generation DeFi platform for trading, earning, and growing
//             your digital assets.
//           </p>
//           <div className="flex gap-4 text-2xl mt-4">
//             <FaTwitter className="hover:text-[#FDC700] transition-all duration-300 cursor-pointer hover:scale-110" />
//             <FaGithub className="hover:text-[#FDC700] transition-all duration-300 cursor-pointer hover:scale-110" />
//             <FaDiscord className="hover:text-[#FDC700] transition-all duration-300 cursor-pointer hover:scale-110" />
//           </div>
//         </aside>

//         {/* Platform Links */}
//         <nav className="flex-1 min-w-[150px]">
//           <h6 className="text-[#FDC700] text-lg font-semibold mb-3 font-serif">
//             Platform
//           </h6>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li>
//               <Link href="/" className="hover:text-[#FDC700] transition-all duration-300">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/packages" className="hover:text-[#FDC700] transition-all duration-300">
//                 Packages
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Company Links */}
//         <nav className="flex-1 min-w-[150px]">
//           <h6 className="text-[#FDC700] text-lg font-semibold mb-3 font-serif">
//             Company
//           </h6>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li>
//               <Link href="/aboutus" className="hover:text-[#FDC700] transition-all duration-300">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/t&c" className="hover:text-[#FDC700] transition-all duration-300">
//                 Terms & Conditions
//               </Link>
//             </li>
//             <li>
//               <Link href="/rules" className="hover:text-[#FDC700] transition-all duration-300">
//                 Rules
//               </Link>
//             </li>
//             <li>
//               <Link href="/contactus" className="hover:text-[#FDC700] transition-all duration-300">
//                 Contact Us
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Learn Links */}
//         <nav className="flex-1 min-w-[150px]">
//           <h6 className="text-[#FDC700] text-lg font-semibold mb-3 font-serif">
//             Learn
//           </h6>
//           <ul className="space-y-2 text-sm text-gray-300">
//             <li>
//               <Link href="/vision" className="hover:text-[#FDC700] transition-all duration-300">
//                 Vision
//               </Link>
//             </li>
//             <li>
//               <Link href="/compensationplan" className="hover:text-[#FDC700] transition-all duration-300">
//                 Compensation Plan
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Bottom bar */}
//       <div className="border-t border-[#FDC700]/30 text-center py-4 text-sm text-gray-400">
//         © {new Date().getFullYear()}{" "}
//         <span className="text-[#FDC700] font-semibold">Sigmantarian</span>. All rights reserved.
//       </div>

//       {/* Subtle glow overlay */}
//       <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#FDC700]/5 via-transparent to-transparent" />
//     </footer>
//   );
// };

// export default Footer;
import Link from "next/link";
import React from "react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/logoo.png";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white px-6 pt-10 border-t border-[#00FFE0]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pb-12 flex flex-col sm:flex-row flex-wrap justify-between gap-10">

        {/* LOGO + DESCRIPTION */}
        <aside className="flex-1 min-w-[230px]">
          <div className="flex items-center gap-3">
            <Image
              width={100}
              height={100}
              alt="Sigmantarian"
              src={logo}
              className="h-12 w-auto drop-shadow-[0_0_12px_rgba(0,255,224,0.5)]"
            />
            <p className="text-xl font-bold bg-gradient-to-r from-[#00FFE0] via-[#3c68ff] to-[#a74bff] bg-clip-text text-transparent font-sans tracking-wide">
              Sigmantarian
            </p>
          </div>
          <p className="text-sm mt-3 max-w-xs text-gray-400">
            The next generation DeFi platform for trading, earning, and growing your digital assets.
          </p>
          <div className="flex gap-5 text-2xl mt-5">
            <FaTwitter className="hover:text-[#00FFE0] transition-all duration-300 hover:scale-110 cursor-pointer" />
            <FaGithub className="hover:text-[#00FFE0] transition-all duration-300 hover:scale-110 cursor-pointer" />
            <FaDiscord className="hover:text-[#00FFE0] transition-all duration-300 hover:scale-110 cursor-pointer" />
          </div>
        </aside>

        {/* PLATFORM */}
        <nav className="flex-1 min-w-[150px]">
          <h6 className="text-[#00FFE0] text-lg font-semibold mb-3 font-sans">Platform</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-[#00FFE0] transition duration-300">Home</Link></li>
            <li><Link href="/packages" className="hover:text-[#00FFE0] transition duration-300">Packages</Link></li>
          </ul>
        </nav>

        {/* COMPANY */}
        <nav className="flex-1 min-w-[150px]">
          <h6 className="text-[#00FFE0] text-lg font-semibold mb-3 font-sans">Company</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/aboutus" className="hover:text-[#00FFE0] transition duration-300">About Us</Link></li>
            <li><Link href="/t&c" className="hover:text-[#00FFE0] transition duration-300">Terms & Conditions</Link></li>
            <li><Link href="/rules" className="hover:text-[#00FFE0] transition duration-300">Rules</Link></li>
            <li><Link href="/contactus" className="hover:text-[#00FFE0] transition duration-300">Contact Us</Link></li>
          </ul>
        </nav>

        {/* LEARN */}
        <nav className="flex-1 min-w-[150px]">
          <h6 className="text-[#00FFE0] text-lg font-semibold mb-3 font-sans">Learn</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/vision" className="hover:text-[#00FFE0] transition duration-300">Vision</Link></li>
            <li><Link href="/compensationplan" className="hover:text-[#00FFE0] transition duration-300">Compensation Plan</Link></li>
          </ul>
        </nav>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-[#00FFE0]/20 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#00FFE0] font-semibold">Sigmantarian</span>. All rights reserved.
      </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#00FFE0]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-[#00FFE0]/20 blur-[100px] rounded-full -z-10 opacity-20 animate-pulse" />
    </footer>
  );
};

export default Footer;
