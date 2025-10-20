const Ecosystem = () => {
  return (
    <div className="min-h-screen w-full text-white px-4 py-20 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-purple-800/20 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700/10 blur-[120px] rounded-full z-0" />

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(88,101,242,0.4)] z-10">
        SIGMANTA ECOSYSTEM
      </h1>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl mt-4 font-light text-center text-gray-200 z-10">
        Earn{" "}
        <span className="bg-cyan-400 bg-clip-text text-transparent font-semibold drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
          Sigmanta
        </span>{" "}
        Today!
      </h2>

      {/* Description */}
      <p className="text-lg md:text-xl mt-4 text-center text-gray-400 z-10">
        Earn SIGMANTA through:
      </p>

      {/* Cards Container */}
      <div className="flex flex-wrap gap-10 mt-14 justify-center w-full max-w-7xl z-10">
        {[
          {
            title: "Game",
            description:
              "Earn while playing engaging games in the Sigmantarian ecosystem.",
          },
          {
            title: "Affiliate Programs",
            description:
              "Build your network and earn rewards through our affiliate system.",
          },
          {
            title: "Referral Rewards",
            description:
              "Get rewarded for bringing others into the Sigmantarian community.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="w-full sm:w-80 md:w-96 p-6 rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-[#0a0a1a] via-[#101030] to-[#121232] shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(88,101,242,0.3)] hover:scale-[1.03] transition-all duration-300 backdrop-blur-md"
          >
            <button
              className="
                relative w-full h-12 rounded-full bg-gray-200 font-semibold text-lg tracking-wide
                shadow-[0_0_20px_rgba(255,255,255,0.15)] 
                hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] 
                hover:scale-[1.02]
                transition-all duration-300
              "
            >
              <span className="bg-gradient-to-b from-[#0a0a1a] via-[#101030] to-[#121232] bg-clip-text text-transparent">
                {card.title}
              </span>
            </button>

            <p className="text-gray-300 text-md md:text-lg mt-4 text-center leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
        <img
        src="./0006-removebg-preview.png"
        className="absolute left-20 top-16 w-20 md:w-40 lg:w-56 opacity-30 animate-spin-slow"
      />
      </div>
    </div>
  );
};

export default Ecosystem;
