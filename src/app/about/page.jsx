import Navbar from "../../components/Navbar";
import Mission from "../../components/Mission";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
    <div className="bg-[#01204c] overflow-hidden">
      <Navbar />
      <Mission />

      <div className="relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20 py-12">
        <div className="absolute -left-20 -top-20 custom-radial-gradient3 z-30 opacity-60 w-full"></div>
        <div className="absolute right-0 -bottom-10 custom-radial-gradient-purpleWhiteSmall opacity-60 z-30 w-full"></div>

        <img
          src="./0006-removebg-preview.png"
          className="w-24 sm:w-32 md:w-60 lg:w-96 z-30 opacity-30 animate-spin-slow2 absolute top-10 right-2 sm:right-4"
        />

        <div className="max-w-2xl text-white text-center md:text-left space-y-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
            <img className="w-64 sm:w-72 md:w-80 h-40 md:h-48 max-w-full" src="/aboutUs.png" />

            <div className="text-center md:text-left">
              <h1 className="text-lg sm:text-xl md:text-2xl font-mono font-semibold leading-snug">
                MR. John Burten
              </h1>
              <h1 className="text-sm sm:text-md md:text-lg font-mono font-thin leading-snug">
                Head Developer
              </h1>
              <h1 className="text-sm text-gray-400 sm:text-md font-mono font-thin leading-snug">
                14 years of industry experience creating, developing business including Space X, Starlink.
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-md lg:text-lg font-extralight font-serif leading-relaxed">
            This Ecosystem is designed to make you free from financial worries. It is designed to entertain more and more people in the ecosystem. Active members and leaders are going to have big perks, and this will continue in our family.
          </p>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
};

export default About;
