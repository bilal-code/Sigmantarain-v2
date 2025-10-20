"use client";
import React, { useContext, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReferralModal from "../referralModal/ReferralModal";
import { FaCopy } from "react-icons/fa";
import { getUserData } from "@/lib/utils/getUserData";
import { jwtDecode } from "jwt-decode";
import Web3Modal from "web3modal";
import { BrowserProvider } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import { WalletConnectProvider } from "@walletconnect/web3-provider";
import { WalletContext } from "@/context/WalletContext";
import { fetchChildCommissions } from "@/lib/utils/getChildCommision";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Sigmentarian Wallet",
      infuraId: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a",
    },
  },
  walletconnect: {
    // package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    },
  },
};

const Header = (props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userData, setUserData] = useState([]);
  const [childCommission, setChildCommission] = useState();
  const dropdownRef = useRef(null);
  const { walletAddress, setWalletAddress, setSigner } = useContext(WalletContext);
  const web3ModalRef = useRef(null);

  const connectWallet = async () => {
    try {
      if (!web3ModalRef.current) {
        web3ModalRef.current = new Web3Modal({
          cacheProvider: false,
          providerOptions,
        });
      }
      const instance = await web3ModalRef.current.connect();
      const provider = new BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setSigner(signer);
      console.log("Wallet connected:", address);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      getUserData(decodedToken?.id).then((data) => setUserData(data));
      fetchChildCommissions(decodedToken?.code).then((data) => {
        if (data) setChildCommission(data);
      });
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  function handleLogout() {
    setIsLoggingOut(true);
    localStorage.removeItem("token");
    router.push("../");
  }

  const profile = {
    name: userData?.name || "",
    email: userData?.email || "",
    code: userData?.code || "",
  };

  const shortenAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 w-full
        bg-[#0B98AC]
        backdrop-blur-md border-b border-[#0B98AC]
        shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-500"
      >
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-12 h-16">
          {/* Sidebar toggle */}
          <button
            aria-controls="sidebar"
            onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
            className="block lg:hidden rounded-md p-2 hover:bg-[#2a003f]/40 transition"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute block w-full h-0.5 bg-[#0B98AC] top-1" />
              <span className="absolute block w-full h-0.5 bg-[#0B98AC] top-2" />
              <span className="absolute block w-full h-0.5 bg-[#0B98AC] top-3" />
            </span>
          </button>

          {/* Wallet Connect */}
          <div className="ml-auto mr-4">
            {!walletAddress ? (
              <button
                onClick={connectWallet}
                  className="px-4 py-2 text-sm font-semibold
                bg-[#0B98AC] border border-white/40
                text-white rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.4)]
                hover:scale-105 transition-all"
              >
                Connect Wallet
              </button>
            ) : (
              <div
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold
                bg-[#1a0029] border border-[#0B98AC] text-[#0B98AC] rounded-lg
                shadow-[0_0_8px_rgba(168,85,247,0.3)]"
              >
                <span>💼 {shortenAddress(walletAddress)}</span>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative flex items-center gap-3">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-11 h-11 rounded-full ring ring-white ring-offset-2 ring-offset-gray-200
              overflow-hidden bg-[#0B98AC] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-14 z-[999] 
                bg-white backdrop-blur-lg text-white 
                border border-[#0B98AC] rounded-2xl w-72 p-5 
                shadow-[0_0_20px_rgba(168,85,247,0.4)] space-y-3 animate-fadeIn"
              >
                <div className="text-center space-y-1">
                  <p className="font-semibold text-base text-cyan-600">
                    {profile.name.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-400">{profile.email}</p>
                  <button
                    onClick={() => {
                      const textToCopy = `WebsiteLink: https://sigmentarian.com\nReferralCode: ${profile?.code}`;
                      navigator.clipboard.writeText(textToCopy);
                    }}
                    className="w-full flex items-center justify-center gap-2 
                    bg-[#0B98AC] text-white 
                    font-semibold text-sm py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    <FaCopy className="text-sm" />
                    Copy Referral Code
                  </button>
                </div>

                <button
                  onClick={() => {
                    setOpenModal(true);
                    setDropdownOpen(false);
                  }}
                 className="w-full font-medium py-2 rounded-lg 
                  bg-[#0B98AC] text-white hover:opacity-90 transition"
                >
                  Send Referral Code
                </button>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`w-full py-2 rounded-lg font-medium
                    bg-[#0B98AC] text-white 
                    shadow-[0_0_10px_rgba(168,85,247,0.4)]
                    transition-all ${
                      isLoggingOut
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:scale-105"
                    }`}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ReferralModal
        open={openModal}
        senderEmail={profile.email}
        referralCode={profile.code}
        onClose={() => setOpenModal(false)}   
      />
    </>
  );
};

export default Header;
