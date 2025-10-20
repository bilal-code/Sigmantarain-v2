const Tokenomics = () => {
    return (
      <div id="tokenomics" className="min-h-screen bg-[#01204c] flex flex-col justify-center items-center px-4 py-12">
        <div className="absolute -left-12 -top-20 custom-radial-gradient3 opacity-60"></div>
        <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-30"></div>
        <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-white font-semibold font-serif leading-snug max-w-[90%]">
          Tokenomics
        </h1>
  
  
  
  
        <div className="w-full overflow-x-auto mt-10">
          <table className="w-full text-black max-w-2xl md:max-w-4xl mx-auto border-separate border-spacing-3 md:border-spacing-6">
            <tbody>
              {[
                { label: "Burning", value: "20%", color: "bg-blue-400" },
                { label: "Ecosystem Reward", value: "50%", color: "bg-blue-200" },
                { label: "Ecosystem Development", value: "5%", color: "bg-blue-200" },
                { label: "Marketing & Partnerships", value: "10%", color: "bg-blue-200" },
                { label: "Team & Developer", value: "10%", color: "bg-blue-200" },
                { label: "Liquidity Pool", value: "5%", color: "bg-blue-200" },
              ].map((row, index) => (
                <tr key={index}>
                  <td className={`px-6 py-4 text-center font-mono text-sm md:text-lg lg:text-xl ${row.color}`}>
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-sm md:text-lg lg:text-xl bg-white">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Tokenomics;
  