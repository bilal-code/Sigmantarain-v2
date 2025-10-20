// "use client"
// import WalletDashboardMain from "../dashboardcomp/page";
// import WalletDashboardHeading from "../../components/WalletDashboard";
// import Statistics from "../../components/statistics";
// import WalletNavbar from "../../components/WalletNavbar";
// import Matrix from "@/components/Matrix";
// import { useContext, useEffect, useRef, useState } from "react";
// import nextImage from '/public/next.png';
// import MatrixLoading from "@/components/MatrixLoading";
// import { WalletContext } from "../Connector";
// import { ethers } from "ethers";
// import { usdtABI } from "@/lib/utils/usdtABI";
// import { sigmav3ABI } from "@/lib/utils/sigmav3ABI";




// const Page = () => {
//   const [numbers, setNumbers] = useState([]);
//   const [NumberOfMatrix , setNumberOfMatrix] = useState(0);
//   const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
//   const USDTTok = "0xE4d93a06ec1Cd73FeE37e3fa189D04f455cfA6A8"
//   // const sigmaToken = "0xE4d93a06ec1Cd73FeE37e3fa189D04f455cfA6A8"
//   const sigmaV3 = "0x5d212DB791464804a5005d1968C9AE973A4BA581"
//   useEffect(()=>{
//     const fetchedNumbers = [1, 5, 10, 15, 20, 55, 90, 101, 102, 103, 104, 105, 112, 114, 120];
//     const usdt = new ethers.Contract(USDTTok,usdtABI,signer);
//     const sigm = new ethers.Contract(sigmaV3,sigmav3ABI,signer);
//     console.log("this is token", walletAddress);
//       async function run(){
//         const [one, two, three, four] = await sigm.userDetails(walletAddress)
//         const on = (one).toString()
//         const tw = (two).toString()
//         const thre = (three).toString()
//         const fou = (four).toString()
//         setNumberOfMatrix(fou)
//         let tol = await sigm.teamlist(walletAddress,1)
//         let tol2 = [];
//             for(let i = 0; i<(fou+1); i++){
//               if(tol[i] > 0){
//                 let num = (tol[i]).toString()
//                 tol2.push(num)

//                 // console.log("this is team list1:",tol);
//                 // console.log("this is team list:",tol2);
//               }
//             }
//               setNumbers(tol2)
//               console.log(`this is User: ${on},${tw},${thre},${fou}`);
//       }
//           if(walletAddress){
//             run()
//           }
//         },[signer,walletAddress])

//         const scrollableDivRef = useRef(null);

//         const scrollUp = () => {
//           if (scrollableDivRef.current) {
//             scrollableDivRef.current.scrollTop -= 50; // Adjust scroll distance
//           }
//         };

//         const scrollDown = () => {
//           if (scrollableDivRef.current) {
//             scrollableDivRef.current.scrollTop += 50; // Adjust scroll distance
//           }
//         };
//     return (
//       <div className="bg-[#01204c] ">
//         <WalletNavbar />
//         {
//           walletAddress?
//         <>
//           <WalletDashboardHeading />
//           <div className="flex justify-center items-center pb-10 ">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5  md:gap-0 lg:grid-cols-3 w-[1000px]">
//               <div className="">
//                 <WalletDashboardMain />
//               </div>
//                 <div className=" flex grid-cols-2 gap-2 lg:col-span-2 px-8 h-80">
//                   <div>
//                     <Statistics />
//                   </div>
//                   <div className="flex flex-col justify-center h-[100%] md:h-96 rounded-xl  bg-[#1C398E] text-center border border-white lg:p-4">
//                     <h4 className="font-bold ">{NumberOfMatrix}</h4>
//                     <div className=" grid grid-cols-2  mb-2 place-items-center">
//                       <button>
//                         <img src={nextImage.src} className="h-6 w-auto -scale-x-100 " alt="Next.js Logo" />
//                       </button>
//                       <button>
//                         <img src={nextImage.src} className="h-6 w-auto" alt="Next.js Logo" />
//                       </button>
//                     </div>
//                       <button
//                         className="border-2 border-solid rounded-lg bg-[#00204c] p-2 mb-2 text-white"
//                         onClick={scrollUp}
//                       >
//                         Up
//                       </button>
//                       <div
//                         ref={scrollableDivRef}
//                         className=" max-h-64 pl-3 overflow-y-auto"
//                       >
//                         {numbers.length > 0 ? <Matrix numbers={numbers} /> : <MatrixLoading />}
//                       </div>
//                       <button
//                         className="border-2 border-solid rounded-lg bg-[#00204c] p-2 mt-2 text-white"
//                         onClick={scrollDown}
//                       >
//                         Down
//                       </button>
                  
//                   </div>
//                 </div>
//             </div>
//           </div>
//         </> : 
//         <div className=" text-7xl text-white p-72 text-center">Please Connect Wallet </div>
//         }
//       </div>
//     );
//   };
  
//   export default Page;
  


export default function Maindash () {
  return(
    <></>
  )
}