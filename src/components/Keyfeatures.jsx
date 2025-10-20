const Feature = () => {
    return (
      <div className="relative min-h-screen bg-[#01204c] flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-12">
        <div className="absolute -left-12 -top-20 custom-radial-gradient3 opacity-60"></div>
        <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-30"></div>
  
        <img
          src="./0006-removebg-preview.png"
          className="w-32 md:w-60 lg:w-96 opacity-30 animate-spin-slow2 absolute top-14 right-4"
        />
  
        <div className="max-w-4xl text-white text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8">
            Key Features
          </h1>
  
          <div className="text-lg md:text-xl lg:text-2xl font-extralight font-mono leading-relaxed space-y-3">
            <h1>• Crypto-based affiliate system.</h1>
            <h1>• 15-level upline rewards.</h1>
            <h1>• Automated smart contract-based payouts.</h1>
            <h1>• Liquidity pool-backed Sigma token stability.</h1>
            <h1>• GameFi projects will enable Pool income.</h1>
            <h1>• 25% monthly profit on every plan return in Sigma Token.</h1>
            <h1>• Token staking & governance in future phases.</h1>
          </div>
        </div>
      </div>
    );
  };
  
  export default Feature;
  