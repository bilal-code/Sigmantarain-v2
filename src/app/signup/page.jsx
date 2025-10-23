// // src/app/signup/page.jsx
// "use client";
// import Loader from "@/components/loader";
// import { FaEye } from "react-icons/fa";
// import { IoEyeOffOutline, IoClose } from "react-icons/io5";
// import React, { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// export default function SignupPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [showcnfrmPassword, setShowcnfrmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Initialize formData with referral code from URL if available
//   const [formData, setFormData] = useState({
//     referralCode: searchParams.get('ref') || "", // Get referral code from URL
//     name: "",
//     email: "",
//     contactNo: "",
//     password: "",
//     ConfirmPassword: "",
//   });

//   // Handle form input changes
//   const onFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (formData.password !== formData.ConfirmPassword) {
//       alert("Passwords do not match!");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/auth/create-account", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         alert(result.error || "Signup failed");
//         setIsLoading(false);
//         return;
//       }

//       alert("Signup successful!");
//       if (result?.token) localStorage.setItem("token", result.token);

//       if (result?.user?.role === "admin") router.push("/admindashboard");
//       else router.push("/userdashboard");

//     } catch (err) {
//       console.error("Error during signup:", err);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClose = () => {
//     router.push("/");
//   };

//   return (
//     <>
//       {isLoading && <Loader />}

//       {/* Background Overlay */}
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//         <div className="relative space-y-4 bg-black text-white rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.6)] border border-cyan-400/30 p-6 sm:p-8 max-w-md w-full">

//           {/* ❌ Close Button */}
//           <button
//             onClick={handleClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
//           >
//             <IoClose size={24} />
//           </button>

//           {/* 🟦 Header */}
//           <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
//             Create Account
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Referral Code */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-cyan-400">
//                   Referral Code
//                 </label>
//                 <input
//                   type="text"
//                   name="referralCode"
//                   value={formData.referralCode}
//                   onChange={onFormChange}
//                   placeholder="Optional"
//                   className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
//                 />
//               </div>

//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-cyan-400">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={onFormChange}
//                   placeholder="Enter your name"
//                   className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-cyan-400">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={onFormChange}
//                   placeholder="Enter your email"
//                   className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
//                   required
//                 />
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label className="block text-sm font-medium mb-1 text-cyan-400">
//                   Contact Number
//                 </label>
//                 <input
//                   type="text"
//                   name="contactNo"
//                   value={formData.contactNo}
//                   onChange={onFormChange}
//                   placeholder="Enter your number"
//                   className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <label className="block text-sm font-medium mb-1 text-cyan-400">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={onFormChange}
//                 placeholder="Create password"
//                 className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition"
//               >
//                 {showPassword ? <IoEyeOffOutline size={18} /> : <FaEye size={18} />}
//               </button>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <label className="block text-sm font-medium mb-1 text-cyan-400">
//                 Confirm Password
//               </label>
//               <input
//                 type={showcnfrmPassword ? "text" : "password"}
//                 name="ConfirmPassword"
//                 value={formData.ConfirmPassword}
//                 onChange={onFormChange}
//                 placeholder="Confirm password"
//                 className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowcnfrmPassword((prev) => !prev)}
//                 className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition"
//               >
//                 {showcnfrmPassword ? (
//                   <IoEyeOffOutline size={18} />
//                 ) : (
//                   <FaEye size={18} />
//                 )}
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-2 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${
//                 isLoading
//                   ? "opacity-70 cursor-not-allowed"
//                   : "bg-cyan-400 text-black hover:bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] cursor-pointer"
//               }`}
//             >
//               {isLoading ? "Creating Account..." : "Create Account"}
//             </button>

//             {/* Switch to Login */}
//             <div className="text-center text-sm text-gray-300">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300"
//               >
//                 Login
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }









// src/app/signup/page.jsx
"use client";
import Loader from "@/components/loader";
import { FaEye } from "react-icons/fa";
import { IoEyeOffOutline, IoClose } from "react-icons/io5";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showSuccessToast,showErrorToast } from "@/lib/toast";

// Create a separate component that uses useSearchParams
function SignupForm() {
   const router = useRouter();
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showcnfrmPassword, setShowcnfrmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize formData with referral code from URL if available
  const [formData, setFormData] = useState({
    referralCode: searchParams.get("ref") || "", // Get referral code from URL
    name: "",
    email: "",
    contactNo: "",
    password: "",
    ConfirmPassword: "",
  });

  // Handle form input changes
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 🧩 Password mismatch validation
    if (formData.password !== formData.ConfirmPassword) {
      showErrorToast("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // ❌ Server-side or validation error
      if (!response.ok) {
        showErrorToast(result.error || "Signup failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // ✅ Success
      showSuccessToast("Signup successful!");
      if (result?.token) localStorage.setItem("token", result.token);

      // Redirect based on role
      if (result?.user?.role === "admin") router.push("/admindashboard");
      else router.push("/userdashboard");

    } catch (err) {
      // console.error("Error during signup:", err);
      showErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <>
      {isLoading && <Loader />}

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative space-y-4 bg-black text-white rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.6)] border border-cyan-400/30 p-6 sm:p-8 max-w-md w-full">

          {/* ❌ Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
          >
            <IoClose size={24} />
          </button>

          {/* 🟦 Header */}
          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Referral Code */}
              <div>
                <label className="block text-sm font-medium mb-1 text-cyan-400">
                  Referral Code
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={onFormChange}
                  placeholder="Optional"
                  className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-cyan-400">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onFormChange}
                  placeholder="Enter your name"
                  className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-cyan-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onFormChange}
                  placeholder="Enter your email"
                  className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium mb-1 text-cyan-400">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={onFormChange}
                  placeholder="Enter your number"
                  className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-cyan-400">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onFormChange}
                placeholder="Create password"
                className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition"
              >
                {showPassword ? <IoEyeOffOutline size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-cyan-400">
                Confirm Password
              </label>
              <input
                type={showcnfrmPassword ? "text" : "password"}
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={onFormChange}
                placeholder="Confirm password"
                className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowcnfrmPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition"
              >
                {showcnfrmPassword ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "bg-cyan-400 text-black hover:bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] cursor-pointer"
              }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Switch to Login */}
            <div className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Main page component with Suspense
export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}