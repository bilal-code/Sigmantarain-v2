// const Footer = () => {
//     return (
//       <div className="bg-[#01204c]">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-2  p-9 gap-4 text-center text-white font-medium">
//             <div>
//               <ul className="leading-8">
//                 <li className="text-2xl font-bold text-white">SIGMANTARIAN</li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Twitter
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Instagram
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Medium
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Facebook
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <ul className="leading-8">
//                 <li className="text-2xl font-bold text-white">PRODUCT</li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Wallet
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Exchange{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Explorer{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Pay{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Institutional{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Earn{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Card{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Learn{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Prices{" "}
//                 </li>
//                 <li className="cursor-pointer hover:bg-blue-900 hover:underline">
//                   Charts{" "}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className=" bg-blue-950 border-t-2 border-white text-white p-5 text-center">
//           <a href="#">Sigmantarian.com</a> Copyright 2024. Powdered  by {" "}
//           <a href="https://www.bawdicsoft.com/" target="_blank">
//             Bawdicsoft
//           </a>
//         </div>
//       </div>
//     );
//   };
//   export default Footer;
  

// import { Twitter, Instagram, Github } from 'lucide-react';
// import { MessageCircle } from 'lucide-react'; // Using MessageCircle instead of Discord

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className="relative font-mono py-12 border-[1px] mt-10 border-t-amber-50 border-x-[#01204c] overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-[#01204c] to-blue-900 opacity-90"></div>
//         <div className="absolute w-[400px] h-[400px] rounded-full bg-sigma-glow top-[-10%] right-[-10%] opacity-20"></div>
//       </div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div className="mb-6 md:mb-0">
//             <h2 className="text-2xl font-bold font-serif gradient-text mb-2">SIGMANTARIAN</h2>
//             <p className="text-white/60 max-w-md">The future of financial freedom through innovative NFT technology and ecosystem rewards.</p>
//           </div>
          
//           <div className="flex space-x-4">
//             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sigma-purple transition-all duration-300 hover:scale-110 hover:shadow-glow">
//               <Twitter size={20} />
//             </a>
//             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sigma-purple transition-all duration-300 hover:scale-110 hover:shadow-glow">
//               <Instagram size={20} />
//             </a>
//             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sigma-purple transition-all duration-300 hover:scale-110 hover:shadow-glow">
//               <MessageCircle size={20} /> {/* Replaced Discord with MessageCircle */}
//             </a>
//             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sigma-purple transition-all duration-300 hover:scale-110 hover:shadow-glow">
//               <Github size={20} />
//             </a>
//           </div>
//         </div>
        
//         <div className="border-t border-white/10 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-white/60 text-sm mb-4 md:mb-0">
//                Sigmantarian.com Copyright 2024. Powdered  by   <a href="https://www.bawdicsoft.com/" target="_blank">             Bawdicsoft
//           </a>
//             </p>
            
//             <div className="flex space-x-6">
//               <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
//               <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
//               <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">Contact</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client";
import { Twitter, Instagram, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative font-mono bg-[#011b3b] text-white overflow-hidden border-t border-white/10">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#01204c] via-[#011b3b] to-[#00152d]" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 animate-pulse" />

      <div className="relative z-10 container mx-auto px-6 py-14">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-20">
          {/* Left: Logo + Description */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-4xl font-extrabold font-serif tracking-wide bg-gradient-to-r from-blue-400 via-purple-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(96,165,250,0.4)]">
              SIGMANTARIAN
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed text-sm md:text-base">
              The future of <span className="text-blue-400 font-semibold">financial freedom</span> through innovative NFT technology and ecosystem rewards.
            </p>
            <p className="mt-2 text-white/50 text-xs italic">
              Empowering traders, investors & creators worldwide.
            </p>
          </div>

          {/* Right: Navigation + Icons */}
          <div className="flex flex-col md:items-end items-center gap-6">
            {/* Social Links */}
            <div className="flex space-x-4">
              {[Twitter, Instagram, MessageCircle, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm mt-4">
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-300">
                Markets
              </a>
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-300">
                Staking
              </a>
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-300">
                NFT Vault
              </a>
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-white/60 text-xs md:text-sm">
            © {currentYear} Sigmantarian.com | Powered by{" "}
            <a
              href="https://www.bawdicsoft.com/"
              target="_blank"
              className="text-blue-300 hover:text-purple-300 underline transition-colors"
            >
              Bawdicsoft
            </a>
          </p>

          <div className="flex space-x-8 text-xs md:text-sm">
            <a
              href="#"
              className="text-white/60 hover:text-blue-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-blue-300 transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-blue-300 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom animated glow line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent animate-[shine_6s_linear_infinite]" />

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
