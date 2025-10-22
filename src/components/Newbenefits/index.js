"use client";

const Benefits = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center px-4 py-12 text-white">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-purple-800/20 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700/10 blur-[120px] rounded-full z-0" />

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-center mt-10 bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(88,101,242,0.4)] z-10">
        SIGMANTARIAN BENEFITS
      </h1>

      {/* Card Container */}
      <div className="flex justify-center items-center mt-10 w-full">
        <div className="card rounded-3xl flex flex-col font-mono justify-center lg:card-side border border-cyan-400/30 w-11/12 sm:w-10/12 md:w-8/12 shadow-[0_0_25px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#0a0a1a] via-[#101030] to-[#121232] hover:shadow-[0_0_40px_rgba(88,101,242,0.3)] transition-all duration-300 backdrop-blur-md">
          <div className="card-body space-y-10 flex flex-col items-center">
            
            {/* White Gradient Buttons */}
            <div className="flex flex-col items-center space-y-6 w-full">
              {[
                "18% - 20% PROFIT MONTHLY IN SIGMA",
                "BONUS UPTO LEVEL-10 UPLINE",
                "GET 3X OF YOUR INVESTMENT",
              ].map((text, i) => (
                <button
                  key={i}
                  className="
                    relative w-full sm:w-4/5 md:w-3/5 h-12 rounded-full bg-gray-200
                    font-semibold text-sm sm:text-md md:text-md lg:text-lg px-4
                    shadow-[0_0_20px_rgba(255,255,255,0.15)] 
                    hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] 
                    hover:scale-[1.03]
                    transition-all duration-300 cursor-pointer
                  "
                >
                  <span className="bg-gradient-to-b from-[#0a0a1a] via-[#101030] to-[#121232] bg-clip-text text-transparent">
                    {text}
                  </span>
                </button>
              ))}
            </div>

            {/* Centered Text */}
            <div className="card-actions flex flex-col items-center text-center px-4">
              <h1 className="text-md sm:text-lg mt-4 text-gray-300 leading-relaxed">
                Join the future of digital assets with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Sigmantarian NFTs
                </span>{" "}
                and unlock unparalleled financial opportunities.
              </h1>
            </div>
          </div>
        </div>
      </div>
       <img
  src="./0002-removebg-preview.png"
  className="absolute top-16 right-10 w-20 md:w-40 lg:w-56 opacity-30 animate-spin-slow"
/>
    </div>
  );
};

export default Benefits;
