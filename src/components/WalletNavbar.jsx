// "use client";
// import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// // import { client } from "../client";
// // import { ConnectButton } from "thirdweb/react";
// // import { createWallet} from "thirdweb/wallets";
// import Web3Modal from "web3modal";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { useContext, useEffect, useState } from "react";
// import { WalletContext } from "@/app/Connector";
// import { ethers } from "ethers";

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

// // const wallets = [
// //   createWallet("io.metamask"),
// //   createWallet("com.coinbase.wallet"),
// //   createWallet("com.safepal"),
// //   createWallet("me.rainbow"),
// //   createWallet("io.rabby"),
// //   createWallet("io.zerion.wallet"),
// // ];

// export default function WalletNavbar() {
//   const router = useRouter();
//   const { walletAddress, setWalletAddress, signer, setSigner }  = useContext(WalletContext);
  
  
//   function dashboard() {
//     router.push("../maindash");
//   }
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
//       const web3modalProvider = new  ethers.providers.Web3Provider(
//         web3modalInstance
//       );

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
//   function shortenAddress(address) {
//     if (!address) return "";
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   }


//   return (
//     <Disclosure as="nav" className="border-b-[1px] border-[#888888] bg-[#01204c] sm:px-5">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 md:py-3 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button */}
//                 <Disclosure.Button className="z-50 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#78428d] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
//                 </Disclosure.Button>
//               </div>

//               {/* Logo */}
//               <div className="flex flex-1 items-center justify-center sm:justify-start">
//                 <Link href="/">
//                   <img src="./logoo.png" alt="Logo" className="w-20 z-40 hidden md:block" />
//                 </Link>
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex items-center justify-center gap-3">
//                 <button onClick={dashboard} className="bg-blue-900 hidden md:block border border-white px-4 py-[10px] text-gray-200 font-semibold md:text-lg rounded-lg">
//                   Your Dashboard
//                 </button>
//                 <button className="bg-blue-900 hidden md:block border border-white px-4 py-[10px] text-gray-200 font-semibold md:text-lg rounded-lg">
//                   Statistics
//                 </button>

//                 {/* Connect Wallet Button (Now Fixed) */}
//                 <div className="flex items-center gap-3">
//                   {/* <WalletInfo /> */}
//                   {/* <ConnectButton  client={client} 
//                     wallets={wallets}
//                     connectModal={{
//                       size: "compact",
//                       title: "Sigmantarian",
//                       showThirdwebBranding: false,
//                     }} 
//                   /> */}
//                   <button
//                       className="text-white border border-white py-2 px-4 sm:px-2 rounded-lg"
//                       onClick={connectWallet}
//                 >
//                       {walletAddress ? shortenAddress(walletAddress) : "Connect Wallet"}
//                   </button>
//                 </div>
//               </div>

//               {/* Mobile Logo */}
//               <Link href="/">
//                 <img src="./logoo.png" alt="Logo" className="w-20 block sm:hidden" />
//               </Link>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="px-2 pb-3 pt-2 z-50 bg-[#7d35a7] absolute w-full">
//               <div className="flex justify-center items-center gap-4">
//                 <button onClick={dashboard} className="bg-[#80299d] block border border-teal-400 px-4 py-[12px] text-gray-200 font-semibold text-sm rounded-lg">
//                   Your Dashboard
//                 </button>
//                 <button className="bg-[#80299d] border border-teal-400 px-4 py-[10px] text-gray-200 font-semibold md:text-lg rounded-lg">
//                   Statistics
//                 </button>
//               </div>
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }
