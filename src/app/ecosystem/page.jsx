const Ecosystem = () => {
    return (
        <div className="bg-[#01204c] overflow-hidden">

            <div className="relative overflow-hidden text-white min-h-screen bg-[#01204c] flex flex-col items-center justify-center px-4 py-12">
                <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-center font-serif">
                    SIGMANTA ECOSYSTEM
                </h1>

                <h1 className="text-2xl md:text-3xl font-extralight text-[#E7000B] mt-4 text-center font-mono">
                    Earn Sigmanta Today!
                </h1>
                <h1 className="text-xl md:text-2xl text-[#8200DB] font-medium mt-4 text-center font-mono">
                    Earn SIGMANTA through:
                </h1>

                {/* Responsive Cards Container */}
                <div className="flex flex-wrap gap-6 mt-12 justify-center w-full px-4">
                    <div className="card w-full sm:w-80 md:w-96 border border-[#8B5CF6] rounded-3xl shadow-sm">
                        <div className="card-body text-center">
                            <button className="btn btn-primary w-full h-12 rounded-full bg-[#5074F4] text-xl">
                                Game
                            </button>
                            <div className="md:text-lg text-md mt-4">
                                Earn while playing engaging games in the Sigmantarian ecosystem
                            </div>
                        </div>
                    </div>

                    <div className="card w-full sm:w-80 md:w-96 border border-[#8B5CF6] rounded-3xl shadow-sm">
                        <div className="card-body text-center">
                            <button className="btn btn-primary w-full text-xl h-12 rounded-full bg-gradient-to-r from-[#5074F4] via-blue-600 to-blue-800">
                                Affiliate Programs
                            </button>
                            <div className="md:text-lg text-md mt-4">
                                Build your network and earn rewards through our affiliate system
                            </div>
                        </div>
                    </div>

                    <div className="card w-full sm:w-80 md:w-96 border border-[#8B5CF6] rounded-3xl shadow-sm">
                        <div className="card-body text-center">
                            <button className="btn btn-primary w-full text-xl h-12 rounded-full bg-gradient-to-r from-blue-800 via-purple-500 to-purple-800">
                                Referral Rewards
                            </button>
                            <div className="md:text-lg text-md mt-4">
                                Get rewarded for bringing others into the Sigmantarian community
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Image */}
                {/* <img
                    src="./0003-removebg-preview.png"
                    className="absolute bottom-20 right-5 w-16 sm:w-24 md:w-48 lg:w-60 animate-spin-slow"
                    alt="Animated Graphic"
                /> */}
            </div>
        </div>
    );
}

export default Ecosystem;
