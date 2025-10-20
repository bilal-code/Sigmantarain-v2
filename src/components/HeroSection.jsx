const Hero = () => {
    return (
      <div className="relative min-h-screen bg-[#01204c] flex flex-col items-center justify-center text-center px-4 md:px-10 lg:px-20 pt-20">
        <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-30"></div>
  
        <div className="z-10 flex flex-col items-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-serif text-white">
            SIGMANTARIAN
          </h1>
  
          <h2 className="text-lg md:text-lg lg:text-xl xl:text-2xl font-bold font-mono text-red-600">
            <span className="text-purple-700">WHERE YOUR FINANCIAL FREEDOM</span> BEGINS
          </h2>
  
          <p className="max-w-[90%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[60%] font-mono text-sm md:text-lg lg:text-lg xl:text-xl text-white font-normal">
            A REVOLUTIONARY CRYPTO MAXIMUM REWARDS & SUSTAINABILITY
          </p>
          <button className="btn btn-primary font-mono w-2/5 h-10 text-md md:text-lg rounded-full bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800">Join The Community</button>
        </div>
  
        <img
          src="./0002-removebg-preview.png"
          className="absolute top-32 w-20 md:w-40 lg:w-52 opacity-30 animate-spin-slow"
        />
        <img
          src="./0003-removebg-preview.png"
          className="absolute bottom-10 right-5 w-20 md:w-48 lg:w-60 animate-spin-slow"
        />
      </div>
    );
  };
  
  export default Hero;
  