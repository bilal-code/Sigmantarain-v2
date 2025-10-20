"use client";
const Benefits = () => {
    return (
        <div className="relative overflow-hidden text-white min-h-screen bg-[#01204c] flex flex-col items-center px-4">
            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center font-serif mt-10">
                SIGMANTARIAN BENEFITS
            </h1>

            <div className="flex justify-center items-center mt-10 w-full">
                <div className="card rounded-3xl flex flex-col font-mono justify-center lg:card-side border border-[#8B5CF6] w-11/12 sm:w-10/12 md:w-8/12 shadow-sm">
                    <div className="card-body space-y-8 flex flex-col items-center">

                        {/* Centered Buttons */}
                        <div className="flex flex-col items-center space-y-6 w-full">
                            <button className="btn btn-primary w-full sm:w-4/5 md:w-3/5 h-12 rounded-full bg-[#5074F4] text-sm sm:text-md md:text-md lg:text-lg px-4 whitespace-nowrap">
                                25% PROFIT MONTHLY IN SIGMA
                            </button>
                            <button className="btn btn-primary w-full sm:w-4/5 md:w-3/5 h-12 rounded-full bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800 text-sm sm:text-md md:text-md lg:text-lg px-4 whitespace-nowrap">
                                BONUS UPTO LEVEL-15 UPLINE
                            </button>
                            <button className="btn btn-primary w-full sm:w-4/5 md:w-3/5 h-12 rounded-full bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800 text-sm sm:text-md md:text-md lg:text-lg px-4 whitespace-nowrap">
                                GET 3X OF YOUR INVESTMENT
                            </button>
                        </div>

                        {/* Centered Text */}
                        <div className="card-actions flex flex-col items-center text-center px-2">
                            <h1 className="text-md sm:text-lg mt-6">
                                Join the future of digital assets with Sigmantarian NFTs and unlock unparalleled financial opportunities.
                            </h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Benefits;
