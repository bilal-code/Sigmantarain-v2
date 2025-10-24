// "use client";
// import { useState } from "react";
// import Modal from "./Modal";

// export default function ForgotPasswordModal({ 
//   isOpen, 
//   onClose,
//   onVerifyEmail,
//   onVerifyOtp,  // Add this new prop
//   onResetPassword,
//   isLoading,
//   isEmailVerified,
//   isOtpVerified,
//   otp,
//   onOtpChange,
//   otpError  // Add this for error display
// }) {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = (e) => {
//   e.preventDefault();
//   if (!isEmailVerified && !isOtpVerified) {
//     onVerifyEmail(email);
//   } else if (isEmailVerified && !isOtpVerified) {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 6) {
//       setOtpError("Please enter 6-digit OTP");
//       return;
//     }
//     onVerifyOtp(email, enteredOtp);
//   } else if (isOtpVerified) {
//     if (!newPassword || !confirmPassword) {
//     //   showErrorToast("Please fill in both password fields");
//       return;
//     }
//     onResetPassword(email, newPassword, confirmPassword);
//   }
// };
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold text-center text-[var(--themeColor)]">
//           {!isEmailVerified ? "Forgot Password" : 
//            !isOtpVerified ? "Verify OTP" : "Reset Password"}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isEmailVerified ? (
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-[var(--themeColor)] focus:outline-none"
//                 required
//               />
//             </div>
//           ) : !isOtpVerified ? (
//             <div className="space-y-4">
//               <p className="text-center text-gray-300">
//                 OTP sent to your email. Please enter it below.
//               </p>
//               <div className="flex justify-center gap-3">
//                 {[0, 1, 2, 3, 4, 5].map((index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     maxLength="1"
//                     value={otp[index] || ""}
//                     onChange={(e) => onOtpChange(e, index)}
//                     className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 focus:border-[var(--themeColor)] focus:outline-none"
//                   />
//                 ))}
//               </div>
//               {otpError && <p className="text-red-500 text-center">{otpError}</p>}
//             </div>
//           ) : (
//             <div className="space-y-4">
//                 {isOtpVerified && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">New Password</label>
//                 <input
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter new password"
//                   className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-[var(--themeColor)] focus:outline-none"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Confirm Password</label>
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Confirm new password"
//                   className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-[var(--themeColor)] focus:outline-none"
//                   required
//                 />
//               </div>
//             </div>
//           )}
//             </div>
//           )}

//            <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full bg-[var(--themeColor)] text-black font-bold py-2 px-4 rounded hover:bg-purple-600 transition ${
//               isLoading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading 
//               ? "Processing..." 
//               : !isEmailVerified 
//                 ? "Verify Email" 
//                 : !isOtpVerified 
//                   ? "Verify OTP" 
//                   : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// }



"use client";
import { useState } from "react";
import Modal from "./Modal";
import { showErrorToast,showSuccessToast } from "@/lib/toast";
import axios from "axios";

export default function ForgotPasswordModal({ 
  isOpen, 
  onClose 
}) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Handle OTP input change
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

  // Verify Email - Send OTP
  const handleVerifyEmail = async (email) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setIsEmailVerified(true);
      showSuccessToast("OTP sent for password reset!");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to send OTP!";
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (email, otp) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });
      setIsOtpVerified(true);
      setOtpError("");
      showSuccessToast("OTP verified successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Invalid OTP";
      setOtpError(errorMsg);
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      showErrorToast("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        newPassword,
      });

      showSuccessToast("Password updated successfully!");
      
      // Reset all states and close modal
      resetStates();
      onClose();
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error in updating password";
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all states
  const resetStates = () => {
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setOtp(["", "", "", "", "", ""]);
    setIsEmailVerified(false);
    setIsOtpVerified(false);
    setOtpError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isEmailVerified && !isOtpVerified) {
      handleVerifyEmail(email);
    } else if (isEmailVerified && !isOtpVerified) {
      const enteredOtp = otp.join("");
      if (enteredOtp.length !== 4) {
        showErrorToast("Please enter 6-digit OTP");
        return;
      }
      handleVerifyOtp(email, enteredOtp);
    } else if (isOtpVerified) {
      if (!newPassword || !confirmPassword) {
        showErrorToast("Please fill in both password fields");
        return;
      }
      handleResetPassword(email, newPassword, confirmPassword);
    }
  };

  const handleClose = () => {
    resetStates();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4 p-6 rounded-2xl bg-black/70 backdrop-blur-sm shadow-[0_0_25px_rgba(34,211,238,0.6)]  z-50 border border-cyan-400/30">
        <h1 className="text-2xl font-bold text-center text-cyan-400">
          {!isEmailVerified ? "Forgot Password" : 
           !isOtpVerified ? "Verify OTP" : "Reset Password"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEmailVerified ? (
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          ) : !isOtpVerified ? (
            <div className="space-y-4">
              <p className="text-center text-gray-300">
                OTP sent to <span className="text-cyan-400">{email}</span>. Please enter it below.
              </p>
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 text-white focus:border-cyan-400 focus:outline-none"
                    disabled={isLoading}
                  />
                ))}
              </div>
              {otpError && <p className="text-red-500 text-center text-sm">{otpError}</p>}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-cyan-400 text-black font-bold py-2 px-4 rounded hover:bg-cyan-500 cursor-pointer transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading 
              ? "Processing..." 
              : !isEmailVerified 
                ? "Verify Email" 
                : !isOtpVerified 
                  ? "Verify OTP" 
                  : "Reset Password"}
          </button>
        </form>

        {/* Cancel button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isLoading}
          className="w-full bg-gray-600 cursor-pointer text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}