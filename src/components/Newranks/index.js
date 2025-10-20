// const Ranks = () => {
//   return (
//     <div
//       id="ranks"
//       className="relative text-white flex flex-col items-center px-4 py-10"
//     >
//       <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center font-serif text-[#FDC700]">
//         Ranks and Rewards
//       </h1>

//       {/* Wrapping div to enable horizontal scrolling */}
//       <div className="w-full overflow-x-auto mt-10">
//         <table className="min-w-max md:w-10/12 mx-auto table-auto border-collapse border border-[#FDC700] font-mono shadow-[0_0_20px_rgba(253,199,0,0.2)]">
//           <thead>
//             <tr>
//               {["Ranks", "Badges", "Target", "Reward", "Line"].map((heading, index) => (
//                 <th
//                   key={index}
//                   className="border-[2px] border-[#FDC700] bg-gradient-to-r from-[#FDC700] via-yellow-400 to-[#FDC700] text-black px-2 md:px-6 lg:px-12 py-3 md:py-4 font-bold text-xs md:text-lg lg:text-xl whitespace-nowrap uppercase tracking-wide"
//                 >
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {[
//               { rank: "Bronze", badge: "🥉", target: "$10,000", reward: "$500", line: "3 Distinct Line" },
//               { rank: "Silver", badge: "🥈", target: "$25,000", reward: "$1,250", line: "3 Distinct Line" },
//               { rank: "Gold", badge: "🥇", target: "$40,000", reward: "$2,000", line: "3 Distinct Line" },
//               { rank: "Platinum", badge: "💎", target: "$60,000", reward: "$2,000", line: "3 Distinct Line" },
//               { rank: "Diamond", badge: "🔷", target: "$100,000", reward: "$5,000", line: "3 Distinct Line" },
//             ].map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-[2px] border-[#FDC700] hover:bg-[#FDC700]/10 transition-all duration-300"
//               >
//                 <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap text-[#FDC700] font-semibold">
//                   {item.rank}
//                 </td>
//                 <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap text-white">
//                   {item.badge}
//                 </td>
//                 <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap text-gray-300">
//                   {item.target}
//                 </td>
//                 <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap text-[#FDC700] font-semibold">
//                   {item.reward}
//                 </td>
//                 <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap text-gray-300">
//                   {item.line}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Decorative glow effect */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDC700]/10 to-transparent pointer-events-none" />
//     </div>
//   );
// };

// export default Ranks;

const Ranks = () => {
  return (
    <div
      id="ranks"
      className="relative text-white flex flex-col items-center px-4 py-16 overflow-hidden"
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center font-sans bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
        Ranks and Rewards
      </h1>

      {/* Table Wrapper */}
      <div className="w-full rounded-2xl overflow-x-auto mt-12">
        <table className="min-w-max md:w-10/12 mx-auto table-auto border-collapse font-mono bg-[#0f0f1a]/70 backdrop-blur-sm rounded-2xl border border-purple-600/30 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
          <thead>
            <tr>
              {["Ranks", "Badges", "Target", "Reward", "Line"].map((heading, index) => (
                <th
                  key={index}
                  className="border border-purple-600/30 bg-white text-[#101030] px-3 md:px-6 py-3 text-xs md:text-md lg:text-lg font-bold uppercase tracking-wide whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-center">
            {[
              { rank: "Bronze", badge: "🥉", target: "$10,000", reward: "$500", line: "3 Distinct Line" },
              { rank: "Silver", badge: "🥈", target: "$25,000", reward: "$1,250", line: "3 Distinct Line" },
              { rank: "Gold", badge: "🥇", target: "$40,000", reward: "$2,000", line: "3 Distinct Line" },
              { rank: "Platinum", badge: "💎", target: "$60,000", reward: "$2,000", line: "3 Distinct Line" },
              { rank: "Diamond", badge: "🔷", target: "$100,000", reward: "$5,000", line: "3 Distinct Line" },
            ].map((item, index) => (
              <tr
                key={index}
                className="border border-purple-700/30 hover:bg-gradient-to-r hover:from-[#1a1a2e] hover:via-[#2a1e55] hover:to-[#1a1a2e] transition-all duration-300"
              >
                <td className="px-3 md:px-6 py-3 text-sm md:text-md lg:text-lg font-semibold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                  {item.rank}
                </td>
                <td className="px-3 md:px-6 py-3 text-lg md:text-xl lg:text-2xl text-purple-300">
                  {item.badge}
                </td>
                <td className="px-3 md:px-6 py-3 text-slate-300 text-sm md:text-md lg:text-lg">
                  {item.target}
                </td>
                <td className="px-3 md:px-6 py-3 text-cyan-400 font-semibold text-sm md:text-md lg:text-lg">
                  {item.reward}
                </td>
                <td className="px-3 md:px-6 py-3 text-slate-400 text-sm md:text-md lg:text-lg">
                  {item.line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subtle Glow Background */}
      <div className="absolute -z-10 inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
    </div>
  );
};

export default Ranks;
