// "use client";
// import React, { useContext, useEffect, useRef } from "react";
// import { useState } from "react";
// import { FiCopy } from "react-icons/fi";
// import { TiTick } from "react-icons/ti";
// import { WalletContext } from "../Connector";
// import { sigmav3ABI } from "@/lib/utils/sigmav3ABI";
// import { ethers } from "ethers";
// import ClipboardJS from "clipboard";
// import WalletNavbar from "@/components/WalletNavbar";
// // import Link from "next/link";

// const sigmaV3 = "0x5d212DB791464804a5005d1968C9AE973A4BA581"
// function shortenAddress(address) {
//   if (!address) return "";
//   return `${address.slice(0, 8)}...${address.slice(-8)}`;
// }

// function WeiToEth(n){
// //  const m = ethers.utils.formatEther(n);
// ethers.utils.formatEther 
//  return m;
// }
// const WalletDashboardMain = () => {
//   const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
//   const sigm = new ethers.Contract(sigmaV3,sigmav3ABI,signer);
//   const [totalEarn, setEarnReward] = useState(0.0);
//   const [id, setId] = useState(0);
//   const [userEarn, setUserEarn] = useState(0);
//   const [clipboard, setClipboard] = useState(null);
//   const [Reff, SetReff] = useState(0)
//   const clipboardRef = useRef(null); // Store ClipboardJS instance
//   const referralLink = `http://localhost:3000/registration/${id}`;
//   const [copied, setCopied] = useState(false);

//   // get smart contract data 
//   useEffect(()=>{
//     async function run(){
//       const [one, two, three, four] = await sigm.userDetails(walletAddress)
//       const [dref, earned, d, e] = await sigm.user(walletAddress)
      
//       const on = (one).toString()
//       const onn = WeiToEth(on)
//       const the = (three).toString()
//       const Earnedd = (earned).toString()
//       const Earned = WeiToEth(Earnedd)
//       const refff = (dref).toString()
//       setUserEarn(Earned)
//       setId(the)
//       setEarnReward(onn)
//       SetReff(refff)
//     }
//     if(walletAddress){
//       run()
//     }
//   },[ walletAddress])

//   // copy button for wallet address 
//   useEffect(() => {
//     clipboardRef.current = new ClipboardJS("#wallet_ad_btn");

//     clipboardRef.current.on("success", () => {
//       alert("Copied to clipboard!");
//     });

//     return () => {
//       if (clipboardRef.current) {
//         clipboardRef.current.destroy();
//       }
//     };
//   }, []);


//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);
//     alert("Link is copied!!")
//     setTimeout(() => setCopied(false), 1500);
//   };
//   // {copied ? "Copied!" : "Copy Link"}
  

//   return (
//     <div className=" flex flex-col gap-5 px-4">
//       <div className="flex flex-col gap-5  border p-5 rounded-2xl bg-[#01204c] text-white">
//         <ul className="flex justify-between">
//           <li className="text-xl font-bold">TOTAL EARNING:</li>
//           <li className="text-xl font-bold">{userEarn}</li>
//         </ul>
//         <div className="text-lg font-bold">CLAIMABLES:</div>
//         <ul className="flex justify-between">
//           <li className="text-base font-bold"> Downline reward</li>
//           <li className="text-base font-bold">
//             $ <a className="text-base font-bold">{totalEarn}</a> 
//           </li>
//         </ul>

//         <ul className="flex justify-between">
//           <li className="text-base font-bold">Reward</li>
//           <li className="text-base font-bold">SG <a className="text-base font-bold">32.0</a></li>
//         </ul>

//         <ul className="flex flex-col justify-between">
//           <li className="text-xl font-bold"> Affiliate link</li>
//           <li>
//             <div className="flex items-center justify-between space-x-4 border w-full p-1">
//               <a
//                 href="0x93a33efC878C6Ee5E8960B47Eb93f4296288b978"
//                 className="text-gray-500 hover:underline"
//               >
//                {id}
//               </a>
//               <button
//                 className="flex items-center justify-center bg-[#1C398E] text-white rounded-full h-8 w-8 focus:outline-none"
//                 data-clipboard-target = "#AffToCopy"
//                 id="aff_btn"
//                 onClick={handleCopy}
//               >
//                 {/* {copied ? "Copied!" : "Copy Link"} */}
//                 <FiCopy />
//               </button>
//             </div>
//           </li>{" "}
//         </ul>
//         <ul className="flex flex-col justify-between">
//           <li className="text-xl font-bold">WALLET ADDRESS</li>
//           <li>
//             <div className=" grid grid-cols-2 items-center justify-between border md:w-full p-1">
//               <a 
//                 id="user_wallet"
//                 className="opacity-100"
//               >
//                 {shortenAddress(walletAddress)}
//               </a>
//               {/* <a
//                 href={walletAddress}
//                 className="text-gray-500 hover:underline -ml-20"
//               >
//                 {id}
//               </a> */}
//                <textarea
//                   id="walletAddressToCopy"
//                   value={walletAddress}
//                   style={{ position: 'absolute', left: '-9999px' }}
//                   readOnly
//                 />
//               <button
//                 className=" wallet_ad_btn flex items-center justify-center bg-[#1C398E] text-white rounded-full h-8 w-8 focus:outline-none ml-22"
//                 data-clipboard-target = "#walletAddressToCopy"
//                 id="wallet_ad_btn"
//               >
//                 {/* {setAddess()} */}
//                 <FiCopy />
//               </button>

//             </div>
//           </li>{" "}
//         </ul>
//         <ul className="flex flex-col justify-between">
//           <li className="text-xl font-bold">MY UPLINE</li>
//           <li>
//             <div className="flex justify-between items-center space-x-4 w-full border p-1 ">
//               <a href="8" className="text-gray-200 hover:underline">
//                {Reff}
//               </a>
//               <button
//                 className="flex items-center justify-center bg-[#1C398E] text-white rounded-full h-8 w-8 focus:outline-none"
//               >
//                 <TiTick />
//               </button>
//             </div>
//           </li>{" "}
//         </ul>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-2 gap-3 justify-between">
//         <div>
//         <button
//           className="bg-[#1C398E] md:col-span-2 rounded-lg border md:px-3 md:py-2 px-4 py-3 text-white font-semibold text-xs md:text-base"
//         >
//           Claim Rewards
//         </button>
//         </div>

//           <div> <button
//           className="bg-[#1C398E] rounded-lg border md:px-3 md:py-2 px-4 py-3 text-white font-semibold text-xs md:text-base"
//         >
//          You are upgraded
//         </button></div>
//       </div>
//       {/* <Link
//         href="https://discord.gg/WfPyvAr6"
//         className="bg-[#1C398E] border  text-center px-2 py-[8px] text-white font-semibold md:text-lg rounded-lg"
//       >
//         Generate Add Rewards{" "}
//       </Link>{" "} */}
//     </div>
//   );
// };
// export default WalletDashboardMain;
function Dashcomp () {
  return(
    <></>
  )
}

export default Dashcomp;