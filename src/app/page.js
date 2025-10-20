// "use client"
// import Navbar from "../components/Navbar";
// import Hero from "../components/HeroSection";
// import Mission from "../components/Mission";
// import Feature from "../components/Keyfeatures";
// import Tokenomics from "../components/Tokenomics";
// import Ecosystem1 from "../components/Ecosystem";
// import Roadmap from "../components/Roadmap";
// import Supply from "../components/Supply";
// import Ranks from "../components/Ranks";
// import Benefits1 from "../components/Benefits";
// import Footer from "../components/Footer";
// import Ganache from "../components/Ganache";
// import { walletConnect } from "thirdweb/wallets";
// import { Route } from "lucide-react";
// import Registration from "./registration/[id]/page";
// import { useContext } from "react";
// import { WalletContext } from "./Connector";


// export default function Home() {
  
//   return (
//     <>
//     <div className="overflow-hidden">
//       <div className="relative">
//         <div className="absolute w-full z-20">
//           <Navbar />
//         </div>
//           <div className="z-0">
//           <Hero />
//           <Ecosystem1 />
//           <Benefits1 />
//           <Supply />
//           <Ranks />
//           <Footer />
//           </div>
//       </div>
//       </div>  
//     </>
//   );
// }








import ParticleRing from "@/components/NewTesthero";
import Ecosystem from "@/components/Newecosystem";
import Footer from "@/components/Newfooter";
import Benefits from "@/components/Newbenefits";
import Supply from "@/components/Newsupply";
import Ranks from "@/components/Newranks";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
      {/* Hero Section */}
      <section className="min-h-screen w-full snap-start">
        <ParticleRing />
      </section>

      {/* Main Content with Gradient Background */}
      <div
        className="bg-gold-gradient"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Membership Section */}
        <section className="min-h-screen w-full snap-start">
          <Ecosystem />
        </section>

        {/* Flag Component Section */}
        <section className="min-h-screen w-full snap-start">
          <Benefits />
        </section>

        {/* Our Fleet Section */}
        <section className="min-h-screen w-full snap-start">
          <Supply />
        </section>

        {/* Source of Income Section */}
        <section className="min-h-screen w-full snap-start">
          <Ranks />
        </section>

        {/* <section className="min-h-screen w-full snap-start">
          <Upcoming />
        </section> */}

        {/* Footer Section */}
        <section className="w-full snap-start">
          <Footer />
        </section>
      </div>
    </main>
  );
}
