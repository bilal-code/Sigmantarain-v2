const Ranks = () => {
  return (
    <div id="ranks" className="relative bg-[#01204c] text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold text-center font-serif">
        Ranks and Rewards
      </h1>

      {/* Wrapping div to enable horizontal scrolling */}
      <div className="w-full overflow-x-auto mt-10">
        <table className="min-w-max md:w-10/12 mx-auto table-auto border-collapse border border-white font-mono">
          <thead>
            <tr>
              {["Ranks", "Badges", "Target", "Reward", "Line"].map((heading, index) => (
                <th
                  key={index}
                  className="border-[2px] border-white bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 text-[#01204C] px-2 md:px-6 lg:px-12 py-3 md:py-4 font-bold text-xs md:text-lg lg:text-xl whitespace-nowrap"
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
              <tr key={index} className="border-[3px] border-white border-t-white">
                <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap">{item.rank}</td>
                <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap">{item.badge}</td>
                <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap">{item.target}</td>
                <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap">{item.reward}</td>
                <td className="md:px-6 py-3 text-xs md:text-md lg:text-lg whitespace-nowrap">{item.line}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranks;
