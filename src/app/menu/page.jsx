// "use client";
// import { useContext } from "react";
// import WalletNavbar from "../../components/WalletNavbar";
// import { WalletContext } from "../Connector";
// // import { ethers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import Link from "next/link";


// const providerOptions = {
//   coinbasewallet: {
//     package: CoinbaseWalletSDK,
//     options: {
//       appName: "Web3Modal Demo",
//       infuraId: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a", // Replace with the correct RPC URL if needed
//     },
//   },

//   walletconnect: {
//     package: WalletConnectProvider,
//     options: {
//       rpc: {
//         4002: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a", // Replace with the correct RPC URL
//       },
//       bridge: "https://bridge.walletconnect.org", // Default WalletConnect bridge
//       qrcode: true, // Show QR code for connection
//     },
//   },
// };

// const RegistrationDashboard = () => {
//   const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
//   const connectWallet = async () => {
//     if (walletAddress) {
//       // Disconnect wallet
//       setWalletAddress("");
//       setSigner(null);
//       console.log("Wallet disconnected");
//       return;
//     }
//     try {
//       const web3Modal = new Web3Modal({
//         cacheProvider: false,
//         providerOptions,
//       });
  
//       const web3modalInstance = await web3Modal.connect();
//       // const web3modalProvider = new  ethers.providers.Web3Provider(
//       //   web3modalInstance
//       // );

//       const signer = web3modalProvider.getSigner();
//       // const signer = signers;
//       console.log("this is signer:",signer);
//       setSigner(signer);
  
//       const walletAddres = await signer.getAddress();
//       console.log("from wallet navbar",walletAddres);
//       // Update state with wallet details
//       setWalletAddress(walletAddres);
  
//       web3modalInstance.on("accountsChanged", (accounts) => {
//         if (accounts.length > 0) {
//           const updatedAddress = accounts[0];
//           setWalletAddress(updatedAddress);
//           setSigner(web3modalProvider.getSigner());
//           console.log("Wallet updated:", updatedAddress);
//         } else {
//           // Handle case where all accounts are disconnected
//           setWalletAddress("");
//           setSigner(null);
//           console.log("Wallet disconnected");
//         }
//       });
  
//       // Listen for chain changes (optional)
//       web3modalInstance.on("chainChanged", (chainId) => {
//         console.log("Chain changed:", chainId);
//         window.location.reload();
//       });
//       // setLoading(false);
//     } catch (error) {
//       console.log("Error connecting wallet:", error);
//     }
//   };
//   return (
//     <>
//     <WalletNavbar />
//     <div className="h-[120%] w-auto bg-[#01204c]">

//       <div className="grid grid-cols-1 md:flex gap-5 justify-center bg-[#01204c] py-10 px-4  md:px-0">
//         {/* {
//           (walletAddress) ?
//           <Link 
//           //  href={}
//           >
//            Page
//           </Link> : */}
//           <div className="flex flex-col flex-wrap justify-center items-center text-center gap-2 md:gap-10 border-t-4 border-b-4 border-l-4 w-full md:w-[40%] md:my-10 py-10 rounded-lg text-white px-3">
//             <h1 className="text-lg md:text-3xl font-semibold text-[#2563EB]">
//               Login To Your Personal Account
//             </h1>
//             <p className="text-md md:text-xl">
//               For access to all the functions of your personal account use automatic
//               login
//             </p>
//             <div>
              
                
//               <button
//                 className="border border-teal-400 hover:bg-teal-400 px-4 py-[10px] text-gray-200 hover:text-[#01204C] font-semibold md:text-lg rounded-lg"
//                 onClick={connectWallet}

//               >
                
//                 Connect Wallet{" "}
//               </button>
              
//             </div>
//           </div>
//         {/* // } */}
        

//         <div className="hidden md:block h-80 border mt-10"></div>

//         <div className="flex flex-col flex-wrap justify-center items-center text-center gap-2 border-t-4 border-b-4 border-r-4 w-full md:w-[40%] md:my-10 py-10 rounded-lg text-white">
//           <h1 className="text-lg md:text-3xl md:mb-[70px]   font-semibold text-[#2563EB]">
//             To View Your Account Specify ID
//           </h1>

//           <div className="flex items-center justify-center flex-col gap-4">
//             <input
//               type="text"
//               placeholder="ID:"
//               className="border w-[70%] md:w-60 px-6 py-1 md:py-3 text-gray-500 rounded-full"
//             />
//             <div>
//               <button>
//                   <div
//                     className="relative w-full md:w-60 inline-flex items-center justify-center p-4 px-6 py-1 md:py-3 overflow-hidden font-medium text-[#caa8f5] transition duration-300 ease-out border-2 border-[#2563EB] rounded-full shadow-md group"
//                   >
//                     <div className="flex justify-center items-center">
//                         Viewing

//                       <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 ">
//                       <span className="relative invisible"> Viewing-</span>
//                       </span>
//                     </div>
//                   </div>
//                 </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     </>
//   );
// };

// export default RegistrationDashboard;




export default function Menu () {
  return(
    <></>
  )
}