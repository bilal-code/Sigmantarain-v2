const Supply = () => {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#01204c] pt-10 px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-center text-white font-semibold font-serif leading-tight">
          Sigma’s total supply is 1B with 20% burning of total supply
        </h1>
  
        <div className="flex flex-wrap justify-center text-center text-white gap-4 md:gap-16 mt-16">
          <div className="flex gap-3.5">
          <div className="space-y-6 text-2xl md:text-3xl font-bold font-serif">
            {["Level 1", "Level 2"].map((level, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex border-[3px] border-white items-center justify-center">
                {level}
              </div>
            ))}
          </div>

          
  
          <div className="space-y-6 text-xl md:text-2xl font-mono">
            {["5%", "3%",].map((percent, i) => (
              <div key={i} className="bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border-[3px] border-white">
                {percent}
              </div>
            ))}
          </div>
          </div>

           <div className="flex gap-3.5">
          <div className="space-y-6 text-2xl md:text-3xl font-bold font-serif">
            {["Level 3", "Level 4"].map((level, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex border-[3px] border-white items-center justify-center">
                {level}
              </div>
            ))}
          </div>

          
  
          <div className="space-y-6 text-xl md:text-2xl font-mono">
            {["1%", "0.5%",].map((percent, i) => (
              <div key={i} className="bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border-[3px] border-white">
                {percent}
              </div>
            ))}
          </div>
          </div>

           



          {/* <div className="space-y-6 text-2xl md:text-3xl font-bold font-serif">
            {["Level 3", "Level 4" ].map((level, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex border-[3px] border-white items-center justify-center">
                {level}
              </div>
            ))}
          </div>

          <div className="space-y-6 text-xl md:text-2xl font-mono">
            {["12%", "10%",].map((percent, i) => (
              <div key={i} className="bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border-[3px] border-white">
                {percent}
              </div>
            ))}
          </div> */}
         
  
          {/* <div className="w-[2px] bg-white hidden md:block"></div>
  
        <div  className="flex gap-3.5">
        <div className="space-y-4 md:space-y-6 text-lg md:text-xl font-bold font-serif">
            {["Level 4", "Level 5"].map((level, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 rounded-2xl w-28 md:w-36 h-8 md:h-10 flex items-center justify-center border-[2px] border-white">
                {level}
              </div>
            ))}
          </div>
  
          <div className="space-y-4 md:space-y-6 text-lg md:text-xl font-mono font-bold">
            {["10%", "6%",].map((percent, i) => (
              <div key={i} className="bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 rounded-lg h-8 md:h-10 w-16 md:w-20 flex items-center justify-center border-[2px] border-white">
                {percent}
              </div>
            ))}
          </div>
        </div> */}
          
  
          {/* <div className="w-[2px] bg-white hidden md:block"></div>
  
         <div  className="flex gap-3.5">
         <div className="space-y-4 md:space-y-6 text-lg md:text-xl font-bold font-serif">
            {["Level 10", "Level 11", "Level 12", "Level 13", "Level 14", "Level 15"].map((level, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 rounded-2xl w-28 md:w-36 h-8 md:h-10 flex items-center justify-center border-[2px] border-white">
                {level}
              </div>
            ))}
          </div>
  
          <div className="space-y-4 md:space-y-6 text-lg md:text-xl font-mono font-bold">
            {["1.5%", "1.5%", "1.5%", "1.5%", "1.5%", "2%"].map((percent, i) => (
              <div key={i} className="bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 rounded-lg h-8 md:h-10 w-16 md:w-20 flex items-center justify-center border-[2px] border-white">
                {percent}
              </div>
            ))}
          </div>
         </div> */}
        
        </div>

        <div className="flex gap-3.5 justify-center mt-7">
          <div className="space-y-6 text-2xl md:text-3xl font-bold font-serif">
            {["Level 5"].map((level, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 rounded-full w-36 md:w-44 h-16 md:h-24 flex border-[3px] border-white items-center justify-center">
                {level}
              </div>
            ))}
          </div>

          
  
          <div className="space-y-6 text-xl md:text-2xl font-mono">
            {["0.5%"].map((percent, i) => (
              <div key={i} className="bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 rounded-full w-20 md:w-28 h-16 md:h-24 flex items-center justify-center border-[3px] border-white">
                {percent}
              </div>
            ))}
          </div>
          </div>
      </div>
    );
  };
  
  export default Supply;
  