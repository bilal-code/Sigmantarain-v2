// "use client";
// import { useEffect } from "react";
// import Modal from "./Modal";
// import Loader from "../loader";

// export default function OtpModal({
//   isOpen,
//   onClose,
//   otp,
//   onOtpChange,
//   onSubmit,
//   isLoading,
// }) {
//   return (
//     <>
//       {/* Full-screen loader */}
//       {isLoading && <Loader />}

//       <Modal isOpen={isOpen && !isLoading} onClose={onClose}>
//         <div className="space-y-6">
//           <h1 className="text-2xl font-bold text-center text-[var(--themeColor)]">
//             OTP Verification
//           </h1>
//           <p className="text-center text-gray-300">
//             Please enter the OTP sent to your email address.
//           </p>

//           <div className="flex justify-center gap-3">
//             {[0, 1, 2, 3].map((index) => (
//               <input
//                 key={index}
//                 type="text"
//                 maxLength="1"
//                 value={otp[index] || ""}
//                 onChange={(e) => onOtpChange(e, index)}
//                 className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 focus:border-[var(--themeColor)] focus:outline-none"
//                 disabled={isLoading}
//               />
//             ))}
//           </div>

//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               type="button"
//               onClick={async (e) => {
//                 onClose(); // Close modal immediately
//                 await onSubmit(e); // Then trigger verification
//               }}
//               disabled={isLoading}
//               className="bg-[var(--themeColor)] text-black font-bold py-2 px-6 rounded hover:bg-purple-600 transition min-w-32 h-12 flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <span className="inline-flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Verifying...
//                 </span>
//               ) : (
//                 "Verify"
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isLoading}
//               className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-500 transition min-w-32 h-12"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }





"use client";
import { useState } from "react";
import Modal from "./Modal";
import Loader from "../loader";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OtpModal({
  isOpen,
  onClose,
  formData, // Receive form data from signup
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  // Save token to localStorage
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Handle account creation with OTP verification
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const enteredOtp = otp.join("");
      
      if (enteredOtp.length !== 4) {
        showErrorToast("Please enter 4-digit OTP");
        setIsLoading(false);
        return;
      }

      // Combine form data with entered OTP
      const payload = {
        ...formData,
        otp: enteredOtp
      };

      const res = await axios.post("/api/auth/create-account", payload);
      
      showSuccessToast("Account created successfully!");
      saveTokenToLocalStorage(res.data.token);

      // Redirect based on user role
      if (res.data.user.role === "admin") {
        router.push("/admindashboard");
      } else {
        router.push("/userdashboard");
      }

      // Reset and close modal
      resetStates();
      onClose();

    } catch (error) {
      const errorMsg = error.response?.data?.error || "OTP verification failed";
      showErrorToast(errorMsg);
      setIsLoading(false);
    }
  };

  // Resend OTP functionality
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/sendotp", {
        email: formData.email,
        referralCode: formData.referralCode,
      });

      showSuccessToast("OTP sent successfully!");
      setOtp(["", "", "", ""]); // Reset OTP fields
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to send OTP";
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset states
  const resetStates = () => {
    setOtp(["", "", "", ""]);
  };

  const handleClose = () => {
    resetStates();
    onClose();
  };

  return (
    <>
      {/* Full-screen loader */}
      {isLoading && <Loader />}

      <Modal isOpen={isOpen && !isLoading} onClose={handleClose}>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-yellow-400">
            OTP Verification
          </h1>
          <p className="text-center text-gray-300">
            Please enter the OTP sent to your email address.
          </p>

          <form onSubmit={handleCreateAccount}>
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 text-white focus:border-yellow-400 focus:outline-none"
                  disabled={isLoading}
                />
              ))}
            </div>

            {/* Resend OTP link */}
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-yellow-400 hover:text-yellow-300 text-sm underline disabled:opacity-50"
              >
                Didn't receive OTP? Resend
              </button>
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-300 transition min-w-32 h-12 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify"
                )}
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-500 transition min-w-32 h-12"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}