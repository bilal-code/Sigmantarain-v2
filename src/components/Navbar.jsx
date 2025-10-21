// "use client";
// import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import Web3Modal from "web3modal";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import LoginModal from "./modals/LoginModal";
// import SignupModal from "./modals/SignupModal";
// import ForgotPasswordModal from "./modals/ForgetPassModal";
// import OtpModal from "./modals/OtpModal";

// const providerOptions = {
//   coinbasewallet: {
//     package: CoinbaseWalletSDK,
//     options: {
//       appName: "Sigmantarian Web3",
//       infuraId: "https://holesky.infura.io/v3/9895237f42014040a287074373c0700a",
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
//   { name: "Home", href: "/" },
//   { name: "Packages", href: "/packages" },
//   { name: "Staking Plan", href: "/compensationplan" },
//   { name: "Contact Us", href: "/contactus" },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navbar({ autoSignupData }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
//   const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [inputOtp, setInputOtp] = useState(["", "", "", ""]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpChecking, setOtpChecking] = useState(false);

//   const [formData, setFormData] = useState({
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

//   // In your Navbar component, add this useEffect for debugging
// useEffect(() => {
//   console.log("Current modal state:", { 
//     isModalOpen, 
//     isSignUp, 
//     formData: formData.referralCode 
//   });
// }, [isModalOpen, isSignUp, formData.referralCode]);

//   // NEW: Check URL parameters on component mount and when autoSignupData changes
//   useEffect(() => {
//     const ref = searchParams.get('ref');
//     const autoSignup = searchParams.get('autoSignup');
    
//     console.log("Navbar URL check:", { ref, autoSignup, autoSignupData });
    
//     // Method 1: If autoSignupData is passed from layout
//     if (autoSignupData?.shouldOpenSignup) {
//       console.log("Opening modal via autoSignupData");
//       openSignupModalWithReferral(autoSignupData.referralCode);
//     }
//     // Method 2: Direct URL parameters (fallback)
//     else if (ref && autoSignup === 'true') {
//       console.log("Opening modal via direct URL parameters");
//       openSignupModalWithReferral(ref);
//     }
//   }, [autoSignupData, searchParams]);

//   const openSignupModalWithReferral = (referralCode) => {
//     console.log("Setting up signup modal with referral:", referralCode);
//     setIsModalOpen(true);
//     setIsSignUp(true);
    
//     // Pre-fill the referral code
//     setFormData(prev => ({
//       ...prev,
//       referralCode: referralCode
//     }));

//     // Clean URL without page reload
//     const cleanUrl = window.location.origin + window.location.pathname;
//     window.history.replaceState({}, document.title, cleanUrl);
//   };

//   const handleNavigation = (href, e) => {
//     e.preventDefault();
//     router.push(href);
//   };

//   const Authlogin = () => {
//     router.push("/login");
//   }

//   const openModal = () => {
//     setIsModalOpen(true);
//     setIsSignUp(false);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     // Clean URL when closing modal
//     const cleanUrl = window.location.origin + window.location.pathname;
//     window.history.replaceState({}, document.title, cleanUrl);
//   };

//   const saveTokenToLocalStorage = (token) => {
//     localStorage.setItem("authToken", token);
//   };

//   // ===============================
//   // Forgot Password + OTP functions
//   // ===============================
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
//       await axios.post("/api/auth/forgot-password", { email });
//       setIsEmailVerified(true);
//       setForgotPasswordEmail(email);
//       alert("OTP sent for password reset!");
//     } catch {
//       alert("Failed to send OTP!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (email, otp) => {
//     setIsLoading(true);
//     try {
//       await axios.post("/api/auth/verify-otp", { email, otp });
//       setIsOtpVerified(true);
//       setOtpError("");
//     } catch {
//       setOtpError("Invalid OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async (email, newPassword, confirmPassword) => {
//     if (newPassword !== confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await axios.post("/api/auth/reset-password", { email, newPassword });
//       alert("Password updated successfully!");
//       setIsForgotPasswordOpen(false);
//     } catch {
//       alert("Error updating password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ===============================
//   // Signup + OTP verification
//   // ===============================
//   const handleOTPChange = (e, index) => {
//     const value = e.target.value;
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...inputOtp];
//     newOtp[index] = value;
//     setInputOtp(newOtp);
//   };

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     if (!formData.email || formData.password !== formData.ConfirmPassword) {
//       alert("Invalid email or password mismatch");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await axios.post("/api/auth/sendotp", {
//         email: formData.email,
//         referralCode: formData.referralCode,
//       });
//       alert("OTP sent successfully!");
//       setIsModalOpen(false);
//       setIsOtpModalOpen(true);
//     } catch {
//       alert("Failed to send OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateAccount = async (e) => {
//     e.preventDefault();
//     setOtpChecking(true);
//     try {
//       const res = await axios.post("/api/auth/create-account", formData);
//       alert("Account created successfully!");
//       saveTokenToLocalStorage(res.data.token);
//       router.push(res.data.user.role === "admin" ? "/admindashboard" : "/userdashboard");
//     } catch {
//       alert("Signup failed, try again");
//     } finally {
//       setOtpChecking(false);
//     }
//   };

//   // ===============================
//   // Login function
//   // ===============================
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const res = await axios.post("/api/auth/login", loginFormData);
//       saveTokenToLocalStorage(res.data.token);
//       alert("Login successful!");
//       router.push(res.data.user.role === "admin" ? "/admindashboard" : "/userdashboard");
//     } catch {
//       alert("Invalid credentials");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Disclosure as="nav">
//       {({ open }) => (
//         <>
//           <div className="fixed top-0 left-0 w-full bg-[#030014]/80 backdrop-blur-md border-b border-[#16f2b3]/40 z-50 px-4 md:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               {/* Logo */}
//               <div className="flex items-center">
//                 <Link href="/" onClick={(e) => handleNavigation("/", e)} className="flex items-center">
//                   <img
//                     src="/logoo.png"
//                     alt="Sigmantarian Logo"
//                     className="w-14 h-14 md:w-16 md:h-16 drop-shadow-[0_0_20px_rgba(22,242,179,0.6)]"
//                   />
//                   <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#00f5d4] via-[#00b4d8] to-[#7209b7] bg-clip-text text-transparent">
//                     SIGMANTARIAN
//                   </span>
//                 </Link>
//               </div>

//               {/* Links */}
//               <div className="hidden lg:flex flex-1 justify-center space-x-2">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     onClick={(e) => handleNavigation(item.href, e)}
//                     className={classNames(
//                       pathname === item.href
//                         ? "text-[#00f5d4] border-b-2 border-[#00f5d4]"
//                         : "text-gray-300 hover:text-[#00f5d4]",
//                       "px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>

//               {/* Buttons */}
//               <div className="hidden lg:flex items-center gap-3">
//                 <button
//                   onClick={()=>{router.push('/login')}}
//                   className=" text-sky-600 bg-white font-semibold px-5 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300"
//                 >
//                   Login / Signup
//                 </button>
//               </div>

//               {/* Mobile toggle */}
//               <div className="absolute right-0 flex lg:hidden">
//                 <Disclosure.Button className="p-2 text-gray-300 hover:text-[#00f5d4] focus:outline-none">
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu */}
//           <Disclosure.Panel className="lg:hidden bg-[#030014]/80 border-t border-[#16f2b3]/40 mt-16">
//             <div className="px-4 pb-3 space-y-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) => handleNavigation(item.href, e)}
//                   className={classNames(
//                     pathname === item.href
//                       ? "text-[#00f5d4]"
//                       : "text-gray-300 hover:text-[#00f5d4]",
//                     "block px-3 py-2 rounded-md text-base font-medium"
//                   )}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <button
//                 onClick={openModal}
//                 className="w-full mt-3 text-sky-600 bg-white font-semibold px-4 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300"
//               >
//                 Login / Signup
//               </button>
//             </div>
//           </Disclosure.Panel>

//           {/* Modals */}
//           {isSignUp ? (
//             <SignupModal
//               isOpen={isModalOpen}
//               onClose={closeModal}
//               formData={formData}
//               onFormChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//               onSubmit={handleSendOTP}
//               isLoading={isLoading}
//               onSwitchToLogin={() => setIsSignUp(false)}
//             />
//           ) : (
//             <LoginModal
//               isOpen={isModalOpen}
//               onClose={closeModal}
//               formData={loginFormData}
//               onFormChange={(e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })}
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
//             onClose={() => setIsOtpModalOpen(false)}
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
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "Staking Plan", href: "/compensationplan" },
  { name: "Contact Us", href: "/contactus" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href, e) => {
    e.preventDefault();
    router.push(href);
  };

  const handleAuthClick = () => {
    router.push("/login");
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
                  onClick={handleAuthClick}
                  className="text-sky-600 bg-white font-semibold px-5 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300"
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
                onClick={handleAuthClick}
                className="w-full mt-3 text-sky-600 bg-white font-semibold px-4 py-2 rounded-lg hover:shadow-[0_0_25px_rgba(0,245,212,0.6)] transition-all duration-300"
              >
                Login / Signup
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}