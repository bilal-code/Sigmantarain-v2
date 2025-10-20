// "use client";
// import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import Web3Modal from "web3modal";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import { usePathname, useRouter } from "next/navigation";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { useContext, useRef } from "react";
// // import { WalletContext } from "@/app/Connector";
// import LoginModal from "./modals/LoginModal";
// import SignupModal from "./modals/SignupModal";
// import ForgotPasswordModal from "./modals/ForgetPassModal";
// import OtpModal from "./modals/OtpModal";
// import { useState } from "react";
// // import { ethers } from "ethers";
// import { BrowserProvider } from "ethers";
// import { WalletContext } from "@/context/WalletContext";

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
//         4002: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a", 
//       },
//       bridge: "https://bridge.walletconnect.org", 
//       qrcode: true, 
//     },
//   },
// };



// const navigation = [
//   { name: "Home", href: "/", current: true },
//   { name: "About", href: "/about", current: false },
//   { name: "Tokenomics", href: "/tokenomics", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
  
// }

// // New Logic
//  const openModal = () => {
//     setIsModalOpen(true);
//     setIsSignUp(false);
//   };


// export default function Navbar() {

// const pathname = usePathname();

//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

//   const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const router = useRouter();
//   function saveTokenToLocalStorage(token) {
//     localStorage.setItem("authToken", token);
//   }

//   const handleForgotPasswordClick = () => {
//     setIsModalOpen(false);
//     setIsForgotPasswordOpen(true);
//     setIsEmailVerified(false);
//     setIsOtpVerified(false);
//     setForgotPasswordEmail("");
//   };
  
//   const handleVerifyEmail = async (email) => {
//     setIsLoading(true);
//     try {
//       const res = await axios.post("/api/auth/forgot-password", { email });

//       setIsEmailVerified(true);
//       setForgotPasswordEmail(email);
//       showSuccessToast("OTP sent for password reset!");
//     } catch (error) {
//       const errorMsg = error.response?.data?.error || "Failed to send OTP!";
//       showErrorToast(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//    const handleResetPassword = async (email, newPassword, confirmPassword) => {
//     if (newPassword !== confirmPassword) {
//       showErrorToast("Passwords don't match");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const res = await axios.post("/api/auth/reset-password", {
//         email,
//         newPassword,
//       });

//       showSuccessToast("Password updated successfully!");

//       // ✅ Reset all states
//       setIsForgotPasswordOpen(false);
//       setIsEmailVerified(false);
//       setIsOtpVerified(false);
//       setInputOtp(["", "", "", "", "", ""]);
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.error || "Error in updating password";
//       showErrorToast(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//    const handleVerifyOtp = async (email, otp) => {
//     setIsLoading(true);

//     try {
//       const res = await axios.post("/api/auth/verify-otp", {
//         email,
//         otp,
//       });

//       setIsOtpVerified(true);
//       setOtpError("");
//     } catch (error) {
//       const errorMsg = error.response?.data?.error || "Invalid OTP";
//       setOtpError(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//    const [formData, setFormData] = useState({
//     referralCode: "",
//     name: "",
//     email: "",
//     contactNo: "",
//     password: "",
//     ConfirmPassword: "",
//   });
//   const [loginFormData, setLoginFormData] = useState({
//     userID: "",
//     password: "",
//   });
//   const [inputOtp, setInputOtp] = useState(["", "", "", ""]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpChecking, setOtpChecking] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLoginChange = (e) => {
//     setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
//   };

//   const handleOTPChange = (e, index) => {
//     const value = e.target.value;
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...inputOtp];
//     newOtp[index] = value;
//     setInputOtp(newOtp);

//     const nextInput = e.target.nextElementSibling;
//     if (value && nextInput) nextInput.focus();
//   };

//    const handleSendOTP = async (e) => {
//     e.preventDefault();

//     if (!formData.email || formData.password !== formData.ConfirmPassword) {
//       showErrorToast("Please enter a valid email and matching passwords");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await axios.post("/api/auth/sendotp", {
//         email: formData.email,
//         referralCode: formData.referralCode,
//       });

//       const data = await res.data;
//       showSuccessToast("OTP sent:");
//       setIsLoading(false); // First stop loading
//       setIsModalOpen(false); // Then close signup modal
//       setIsOtpModalOpen(true); // Finally open OTP modal
//     } catch (error) {
//       console.log(`Error of vercel is ${error}`);
//       showErrorToast(`Failed to send vercel OTP:${error} `);
//       setIsLoading(false);
//     }
//   };

//    const handleCreateAccount = async (e) => {
//     e.preventDefault();
//     setOtpChecking(true); // Trigger loader

//     try {
//       const enteredOtp = inputOtp.join("");
//       // Combine form data with entered OTP
//       const payload = {
//         ...formData,
//       };

//       const res = await axios.post("/api/auth/create-account", payload);

//       showSuccessToast("Account created successfully:");
//       saveTokenToLocalStorage(res.data.token);

//       if (res.data.user.role === "admin") {
//         router.push("/admindashboard");
//       } else {
//         router.push("/userdashboard");
//       }

//       // No need to stop loading manually — navigation will take over
//     } catch (error) {
//       const errorMsg = error.response?.data?.error || "OTP verification failed";
//       showErrorToast(errorMsg);
//       setOtpChecking(false); // Stop loading only on error
//     }
//   };

//    const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await axios.post("/api/auth/login", loginFormData);
// console.log("page.js handleLogin",res.data)
//       saveTokenToLocalStorage(res.data.token);

//       if (res.data.user.role === "admin") {
//         showSuccessToast("Admin Login Successfully!");
//         router.push("/admindashboard");
//       } else {
//         showSuccessToast("User Login Successfully!");
//         router.push("/userdashboard");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       const errorMsg =
//         error.response?.data?.error ||
//         "An unexpected error occurred. Please try again.";
//       showErrorToast(errorMsg);
//     }
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//     setIsSignUp(false);
//   };

//   const { walletAddress, setWalletAddress, setSigner }  = useContext(WalletContext);
 
//   const web3ModalRef = useRef(null);
//     const connectWallet = async () => {
//     try {
//       if (!web3ModalRef.current) {
//         web3ModalRef.current = new Web3Modal({
//           cacheProvider: false,
//           providerOptions,
//         });
//       }

//       const instance = await web3ModalRef.current.connect();
//       const provider = new BrowserProvider(instance);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
//       setWalletAddress(address);
//       setSigner(signer);
//       console.log("Wallet connected:", address);
//     } catch (err) {
//       console.error("Wallet connection failed:", err);
//     }
//   };
//   function shortenAddress(address) {
//     if (!address) return "";
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   }
//   return (
//     <Disclosure as="nav" className="">
//       {({ open }) => (
//         <>
//           <div className="mx-auto bg-[#01204c] px-2 md:py-3 m:px-6 lg:px-8 border-b-[1px] border-[#888888] sticky top-0 left-0 w-full text-white py-4 z-50">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 <Disclosure.Button className=" z-50 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#78428d] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <Link href="/">
//                     <img
//                       src="./logoo.png"
//                       alt=""
//                       srcSet=""
//                       className="w-20 z-40 hidden md:block"
//                     />
//                   </Link>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           item.current
//                             ? " text-white"
//                             : "text-gray-300 hover:bg-[#4b464d62] hover:text-white",
//                           "rounded-md px-3 py-2 text-sm font-medium"
//                         )}
//                         aria-current={item.current ? "page" : undefined}
//                       >
//                         {item.name}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* <button
//                       className="text-white border border-white py-2 px-4 sm:px-2 rounded-lg"
//                       onClick={connectWallet}
//                 >
//                       {walletAddress ? shortenAddress(walletAddress) : "Connect Wallet"}
//               </button> */}
//                 <a
//                   href="/menu"
//                   className="relative text-md  px-3 py-2 overflow-hidden font-bold text-[#541d69] bg-purple-500   rounded-lg shadow-inner group"
//                 >
//                   <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200   group-hover:w-full ease"></span>
//                   <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200  group-hover:w-full ease"></span>
//                   <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
//                   <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
//                   <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#752a92] opacity-0 group-hover:opacity-100"></span>
//                   <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
//                     MENU
//                   </span>
//                 </a>
//                 <button
//                   onClick={openModal}
//                   className="relative text-md  px-3 py-2 overflow-hidden font-bold text-[#541d69] bg-purple-500   rounded-lg shadow-inner group"
//                 >
//                   <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200   group-hover:w-full ease"></span>
//                   <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200  group-hover:w-full ease"></span>
//                   <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
//                   <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
//                   <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#752a92] opacity-0 group-hover:opacity-100"></span>
//                   <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
//                     Login / Signup
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2 z-50 bg-[#01204c] border border-white absolute w-full">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current
//                       ? "bg-[#5c247c] text-white"
//                       : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                     "block rounded-md px-3 py-2 text-base font-medium"
//                   )}
//                   aria-current={item.current ? "page" : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>

//            {isSignUp ? (
//             <SignupModal
//               isOpen={isModalOpen}
//               onClose={() => {
//                 setIsModalOpen(false);
//                 setIsLoading(false);
//               }}
//               formData={formData}
//               onFormChange={handleChange}
//               onSubmit={handleSendOTP}
//               isLoading={isLoading}
//               onSwitchToLogin={() => setIsSignUp(false)}
//             />
//           ) : (
//             <LoginModal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//               formData={loginFormData}
//               onFormChange={handleLoginChange}
//               onSubmit={handleLogin}
//               onSwitchToSignup={() => setIsSignUp(true)}
//               onForgotPassword={handleForgotPasswordClick}
//               isLoading={isLoading}
//             />
//           )}

//           <ForgotPasswordModal
//             isOpen={isForgotPasswordOpen}
//             onClose={() => setIsForgotPasswordOpen(false)}
//             onVerifyEmail={handleVerifyEmail}
//             onResetPassword={handleResetPassword}
//             isLoading={isLoading}
//             isEmailVerified={isEmailVerified}
//             isOtpVerified={isOtpVerified}
//             otp={inputOtp}
//             onVerifyOtp={handleVerifyOtp}
//             otpError={otpError}
//             onOtpChange={handleOTPChange}
//           />

//           <OtpModal
//             isOpen={isOtpModalOpen}
//             onClose={() => {
//               setIsOtpModalOpen(false);
//               setIsLoading(false);
//             }}
//             otp={inputOtp}
//             onOtpChange={handleOTPChange}
//             onSubmit={handleCreateAccount}
//             isLoading={otpChecking}
//           />

//         </>
//       )}
//     </Disclosure>
//   );
// }




"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { usePathname, useRouter } from "next/navigation";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from "react";
import axios from "axios";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import ForgotPasswordModal from "./modals/ForgetPassModal";
import OtpModal from "./modals/OtpModal";
// import { showSuccessToast, showErrorToast } from "@/utils/toast"; // optional utility if you already use toast
// import { WalletContext } from "@/context/WalletContext";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Sigmantarian Web3",
      infuraId: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a",
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    },
  },
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "Staking Plan", href: "/compensationplan" },
  // { name: "Vision", href: "/vision" },
  // { name: "About Us", href: "/aboutus" },
  { name: "Contact Us", href: "/contactus" },
  // { name: "T&C", href: "/t&c" },
  // { name: "Rules", href: "/rules" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const [inputOtp, setInputOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [otpChecking, setOtpChecking] = useState(false);

  const [formData, setFormData] = useState({
    referralCode: "",
    name: "",
    email: "",
    contactNo: "",
    password: "",
    ConfirmPassword: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    userID: "",
    password: "",
  });

  const handleNavigation = (href, e) => {
    e.preventDefault();
    router.push(href);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsSignUp(false);
  };

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("authToken", token);
  };

  // ===============================
  // Forgot Password + OTP functions
  // ===============================
  const handleForgotPasswordClick = () => {
    setIsModalOpen(false);
    setIsForgotPasswordOpen(true);
    setIsEmailVerified(false);
    setIsOtpVerified(false);
    setForgotPasswordEmail("");
  };

  const handleVerifyEmail = async (email) => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/forgot-password", { email });
      setIsEmailVerified(true);
      setForgotPasswordEmail(email);
      alert("OTP sent for password reset!");
    } catch {
      alert("Failed to send OTP!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (email, otp) => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/verify-otp", { email, otp });
      setIsOtpVerified(true);
      setOtpError("");
    } catch {
      setOtpError("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/api/auth/reset-password", { email, newPassword });
      alert("Password updated successfully!");
      setIsForgotPasswordOpen(false);
    } catch {
      alert("Error updating password");
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // Signup + OTP verification
  // ===============================
  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...inputOtp];
    newOtp[index] = value;
    setInputOtp(newOtp);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email || formData.password !== formData.ConfirmPassword) {
      alert("Invalid email or password mismatch");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/api/auth/sendotp", {
        email: formData.email,
        referralCode: formData.referralCode,
      });
      alert("OTP sent successfully!");
      setIsModalOpen(false);
      setIsOtpModalOpen(true);
    } catch {
      alert("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setOtpChecking(true);
    try {
      const res = await axios.post("/api/auth/create-account", formData);
      alert("Account created successfully!");
      saveTokenToLocalStorage(res.data.token);
      router.push(res.data.user.role === "admin" ? "/admindashboard" : "/userdashboard");
    } catch {
      alert("Signup failed, try again");
    } finally {
      setOtpChecking(false);
    }
  };

  // ===============================
  // Login function
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", loginFormData);
      saveTokenToLocalStorage(res.data.token);
      alert("Login successful!");
      router.push(res.data.user.role === "admin" ? "/admindashboard" : "/userdashboard");
    } catch {
      alert("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="fixed top-0 left-0 w-full bg-[#030014]/80 backdrop-blur-md border-b border-[#16f2b3]/40 z-50 px-4 md:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" onClick={(e) => handleNavigation("/", e)} className="flex items-center">
                  <img
                    src="/logoo.png"
                    alt="Sigmantarian Logo"
                    className="w-14 h-14 md:w-16 md:h-16 drop-shadow-[0_0_20px_rgba(22,242,179,0.6)]"
                  />
                  <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#00f5d4] via-[#00b4d8] to-[#7209b7] bg-clip-text text-transparent">
                    SIGMANTARIAN
                  </span>
                </Link>
              </div>

              {/* Links */}
              <div className="hidden lg:flex flex-1 justify-center space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className={classNames(
                      pathname === item.href
                        ? "text-[#00f5d4] border-b-2 border-[#00f5d4]"
                        : "text-gray-300 hover:text-[#00f5d4]",
                      "px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={openModal}
                  className=" text-sky-600 bg-white font-semibold px-5 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300"
                >
                  Login / Signup
                </button>
              </div>

              {/* Mobile toggle */}
              <div className="absolute right-0 flex lg:hidden">
                <Disclosure.Button className="p-2 text-gray-300 hover:text-[#00f5d4] focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="lg:hidden bg-[#030014]/80 border-t border-[#16f2b3]/40 mt-16">
            <div className="px-4 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavigation(item.href, e)}
                  className={classNames(
                    pathname === item.href
                      ? "text-[#00f5d4]"
                      : "text-gray-300 hover:text-[#00f5d4]",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={openModal}
                className="w-full mt-3 text-sky-600 bg-white font-semibold px-4 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300"
              >
                Login / Signup
              </button>
            </div>
          </Disclosure.Panel>

          {/* Modals */}
          {isSignUp ? (
            <SignupModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              formData={formData}
              onFormChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              onSubmit={handleSendOTP}
              isLoading={isLoading}
              onSwitchToLogin={() => setIsSignUp(false)}
            />
          ) : (
            <LoginModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              formData={loginFormData}
              onFormChange={(e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })}
              onSubmit={handleLogin}
              onSwitchToSignup={() => setIsSignUp(true)}
              onForgotPassword={handleForgotPasswordClick}
              isLoading={isLoading}
            />
          )}

          <ForgotPasswordModal
            isOpen={isForgotPasswordOpen}
            onClose={() => setIsForgotPasswordOpen(false)}
            onVerifyEmail={handleVerifyEmail}
            onResetPassword={handleResetPassword}
            isLoading={isLoading}
            isEmailVerified={isEmailVerified}
            isOtpVerified={isOtpVerified}
            otp={inputOtp}
            onVerifyOtp={handleVerifyOtp}
            otpError={otpError}
            onOtpChange={handleOTPChange}
          />

          <OtpModal
            isOpen={isOtpModalOpen}
            onClose={() => setIsOtpModalOpen(false)}
            otp={inputOtp}
            onOtpChange={handleOTPChange}
            onSubmit={handleCreateAccount}
            isLoading={otpChecking}
          />
        </>
      )}
    </Disclosure>
  );
}
