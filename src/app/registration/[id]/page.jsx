"use client"
// import WalletDashboardMain from "../dashboardcomp/page";
// import WalletDashboardHeading from "../../components/WalletDashboard";
// import Statistics from "../../components/statistics";
// import nextImage from '/public/next.png';
// import MatrixLoading from "@/components/MatrixLoading";
// import Matrix from "@/components/Matrix";

import { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { usdtABI } from "@/lib/utils/usdtABI";
import { sigmav3ABI } from "@/lib/utils/sigmav3ABI";
import { useParams } from "next/navigation";
import { WalletContext } from "@/app/Connector";
import WalletNavbar from "@/components/WalletNavbar";

const Page = () => {
  const [numbers, setNumbers] = useState([]);
  const [NumberOfMatrix, setNumberOfMatrix] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { walletAddress, setWalletAddress, signer, setSigner } = useContext(WalletContext);
  const USDTTok = "0xE4d93a06ec1Cd73FeE37e3fa189D04f455cfA6A8";
  const sigmaV3 = "0x5d212DB791464804a5005d1968C9AE973A4BA581";
  const { id } = useParams();
  
//   console.log("ID from URL:", id);
  const dropdownOptions = ["$10","$20","$40","$80","$160","$320"];
  useEffect(() => {
    const usdt = new ethers.Contract(USDTTok, usdtABI, signer);
    const sigm = new ethers.Contract(sigmaV3, sigmav3ABI, signer);
    
    
    if (walletAddress) {
      // run();
    }
  }, [signer, walletAddress, id]);

  /// drop down
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log("you have chosen:",option);
    // if (onSelect) {
    // //   onSelect(option);
    // }
  };



  return (
    <div className="bg-[#01204c] ">
      <WalletNavbar />
      {walletAddress ? (
        <div className="py-28 flex justify-center items-center">
          <div className="flex flex-col justify-center h-[100%] md:h-96 rounded-xl bg-[#1C398E] text-center border border-white lg:p-4 p-10">
          <div className="p-20">
                <p className="text-2xl mb-6"> 
                    Please Select Amount To Register
                </p>
                <p className="text-xl mb-6"> 
                    Your Reffral ID: {id}
                </p>
                <div className="relative inline-block text-left">
                <div>
                    <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 px-10"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                    >
                    {selectedOption ? selectedOption : 'Select an Amount'}
                    <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </button>
                </div>
                <div className="mt-6 ">
                    <button className="bg-[#1C398E] text-amber-50 border border-amber-50 px-4 py-[10px] font-semibold md:text-lg rounded-lg  content-center">
                        Approve
                    </button>
                </div>
                {isOpen && (
                    <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mx-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    >
                    <div className="py-1 " role="none">
                        {dropdownOptions.map((option) => (
                        <button
                            key={option}
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </button>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div>  


          </div>
        </div>
      ) : (
        <div className="text-7xl text-white p-72 text-center">
          Please Connect Wallet
        </div>
      )}
    </div>
  );
};


// const [id] = () => {
//   const [numbers, setNumbers] = useState([]);
//   const [NumberOfMatrix , setNumberOfMatrix] = useState(0);
//   const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
//   const USDTTok = "0xE4d93a06ec1Cd73FeE37e3fa189D04f455cfA6A8"
//   const sigmaV3 = "0x5d212DB791464804a5005d1968C9AE973A4BA581"
//   const { id } = useParams();
//   console.log("first this: ",id);
//   // const sigmaToken = "0xE4d93a06ec1Cd73FeE37e3fa189D04f455cfA6A8"
//   useEffect(()=>{
//     const usdt = new ethers.Contract(USDTTok,usdtABI,signer);
//     const sigm = new ethers.Contract(sigmaV3,sigmav3ABI,signer);
//       async function run(){
//        console.log("this is ID from link:",id);
//       }
//           if(walletAddress){
//             run()
//           }
//     },[signer,walletAddress])


//     return (
//       <div className="bg-[#01204c] ">
//         <WalletNavbar />
//         {
//           walletAddress?
//           <>
//           <div className="py-28 flex justify-center items-center  ">
//             <div className="flex flex-col justify-center h-[100%] md:h-96 rounded-xl bg-[#1C398E] text-center border border-white lg:p-4 ">
//               <div className="flex flex-col px-32">
//                 <a className="text-lg mb-4">Registration</a>
//                 <input
//                   type="text"
//                   placeholder="Price"
//                   className="border w-[70%] md:w-60 px-6 py-1 md:py-3 text-gray-500 rounded-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </> : 
//         <div className=" text-7xl text-white p-72 text-center">Please Connect Wallet </div>
//         }
//       </div>
//     );
//   };
  
  export default Page;
  