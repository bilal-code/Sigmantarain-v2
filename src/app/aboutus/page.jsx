import FlagComponent from "@/components/Flagcomponent";
import ReactorMessage from "@/components/RectorMessage";
import Footer from "@/components/Newfooter";

function WhyChooseHashfor() {
  return (
    <>
    <div 
    className=" bg-gold-gradient"
   style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
    <FlagComponent />
    <ReactorMessage />
    <Footer />
    </div>
    </>
  );
}

export default WhyChooseHashfor;
