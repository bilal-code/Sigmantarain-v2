// const Supply = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden pt-10 px-4 text-white">
//       {/* Title */}
//       <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-semibold font-sans leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
//         Sigma’s total supply is 1B with 20% burning of total supply
//       </h1>

//       {/* Levels & Percentages */}
//       <div className="flex flex-wrap justify-center text-center gap-6 md:gap-16 mt-16">
//         {/* Group 1 */}
//         <div className="flex gap-3.5">
//           <div className="space-y-6 text-2xl md:text-3xl font-bold font-sans">
//             {["Level 1", "Level 2"].map((level, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex  shadow-[0_0_25px_rgba(0,255,255,0.1)] items-center justify-center text-white font-semibold hover:shadow-[0_0_35px_rgba(0,255,255,0.1)] hover:scale-105 transition-all duration-300"
//               >
//                 {level}
//               </div>
//             ))}
//           </div>

//           <div className="space-y-6 text-xl md:text-2xl font-mono">
//             {["5%", "3%"].map((percent, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border border-[#a74bff]/50 shadow-[0_0_25px_rgba(167,75,255,0.2)] text-white font-semibold hover:brightness-110 hover:shadow-[0_0_35px_rgba(167,75,255,0.2)] hover:scale-105 transition-all duration-300"
//               >
//                 {percent}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Group 2 */}
//         <div className="flex gap-3.5">
//           <div className="space-y-6 text-2xl md:text-3xl font-bold font-sans">
//             {["Level 3", "Level 4"].map((level, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex shadow-[0_0_25px_rgba(0,255,255,0.1)] items-center justify-center text-white font-semibold hover:shadow-[0_0_35px_rgba(60,104,255,0.1)] hover:scale-105 transition-all duration-300"
//               >
//                 {level}
//               </div>
//             ))}
//           </div>

//           <div className="space-y-6 text-xl md:text-2xl font-mono">
//             {["1%", "0.5%"].map((percent, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border border-[#3c68ff]/50 shadow-[0_0_25px_rgba(60,104,255,0.4)] text-white font-semibold hover:brightness-110 hover:shadow-[0_0_35px_rgba(60,104,255,0.5)] hover:scale-105 transition-all duration-300"
//               >
//                 {percent}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Group 3 */}
//         <div className="flex gap-3.5 justify-center mt-7">
//           <div className="space-y-6 text-2xl md:text-3xl font-bold font-sans">
//             {["Level 5"].map((level, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex shadow-[0_0_25px_rgba(0,255,255,0.1)] items-center justify-center text-white font-semibold hover:shadow-[0_0_35px_rgba(167,75,255,0.5)] hover:scale-105 transition-all duration-300"
//               >
//                 {level}
//               </div>
//             ))}
//           </div>

//           <div className="space-y-6 text-xl md:text-2xl font-mono">
//             {["0.5%"].map((percent, i) => (
//               <div
//                 key={i}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border border-[#a74bff]/50 shadow-[0_0_25px_rgba(167,75,255,0.4)] text-white font-semibold hover:brightness-110 hover:shadow-[0_0_35px_rgba(167,75,255,0.5)] hover:scale-105 transition-all duration-300"
//               >
//                 {percent}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Supply;

"use client";
import { motion } from "framer-motion";

const Supply = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6 text-white">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-400/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[160px] rounded-full" />
      </div>

      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-4xl text-center font-bold font-sans leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-100 to-purple-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
      >
        Sigma’s Total Supply —{" "}
        <span className="bg-cyan-400 text-transparent bg-clip-text">
          1 Billion Tokens
        </span>
        <br />
        <span className="text-base sm:text-lg text-gray-300 font-medium">
          (20% of the total supply will be{" "}
          <span className="bg-cyan-400 text-transparent bg-clip-text">
            burned
          </span>
          <span>🔥</span>
          )
        </span>
      </motion.h1>

      {/* Image with Animation and Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex justify-center mt-6"
      >
        {/* Glow behind image */}
        <div className="absolute inset-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full animate-pulse" />
        
        {/* Floating animation */}
        <motion.img
          src="/supply-pic.png"
          alt="Supply Visualization"
          className="relative w-[420px] md:w-[500px] lg:w-[600px] drop-shadow-[0_0_35px_rgba(0,255,255,0.3)]"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Subtle particle glow animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl rounded-full -translate-x-1/2" />
      </motion.div>
    </section>
  );
};

export default Supply;

{
  /* Cards */
}
{
  /* <div className="mt-16 flex flex-wrap justify-center gap-8 z-10 relative">
        {levels.map((item, i) => (
          <div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative group bg-gradient-to-b from-[#0a0a1a] via-[#101030] to-[#121232] backdrop-blur-md border border-white/10 rounded-3xl p-6 w-64 text-center shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all duration-500"
          >
           
            <div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-[#cfcfff] tracking-wide">
                {item.level}
              </h2>
              <p className="mt-3 text-lg font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:text-[#00C6FF] transition-all duration-300">
                {item.percent}
              </p>
            </div>
          </div>
        ))}
      </div> */
}
{
  /* <img
  src="./0002-removebg-preview.png"
  className="absolute top-16 right-10 w-20 md:w-40 lg:w-56 opacity-30 animate-spin-slow"
/> */
}
