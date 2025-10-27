// src/app/login/page.jsx
"use client";
import Loader from "@/components/loader";
import { FaEye } from "react-icons/fa";
import { IoEyeOffOutline, IoClose } from "react-icons/io5";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showSuccessToast,showErrorToast } from "@/lib/toast";

export default function LoginPage() {
   const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Initialize formData with empty values
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });

  // Handle form input changes
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

//  const fetchBoughtData = async (userId) => {
//   try {
//     let url = "/api/user/buy-package";
//     if (userId) url += `?userId=${userId}`;

//     const res = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("Bought Packages Data:", data);

//     return data; // ✅ return kar diya data

//   } catch (error) {
//     console.error("Error fetching user data:", error.message);
//     return null; // ❗ error case me null return karein
//   }
// };


//   // ✅ Handle Login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);


//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userID: formData.userID,
//           password: formData.password,
//         }),
//       });

//       const result = await response.json();
//       console.log("login result",result);
//       console.log("userId",result?.user?._id)
//       console.log("Date",result?.user?.createdAt)
//       const createdAt = result?.user?.createdAt; // e.g. "2025-10-18T12:30:00Z"
// if (result?.user?.role === "user") {
// if (createdAt) {
//   const createdDate = new Date(createdAt);
//   const currentDate = new Date();

//   // Difference in milliseconds
//   const diffMs = currentDate - createdDate;

//   // Convert milliseconds → days
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   console.log(`Account created ${diffDays} days ago.`);

//   if (diffDays >= 5) {
//     console.log("✅ Account is 5 or more days old.");
//     const boughtData = await fetchBoughtData(result?.user?._id);
//     console.log("Bought Packages Data:", boughtData?.boughtPackages);
//     console.log("Bought Packages Count:", boughtData?.boughtPackages?.length);
//     if (boughtData?.boughtPackages?.length > 0) {
//   console.log("User Have bought package:", boughtData?.boughtPackages?.length);
// } else {
//   console.log("Your account has blocked because you haven't bought any packages.");
// }
//   } else {
//     console.log("⏳ Account is less than 5 days old.");
//   }
// }
// }


     
//       if (!response.ok) {
//         showErrorToast(result.error || "Invalid credentials. Please try again.");
//         setIsLoading(false);
//         return;
//       }

//       // ✅ Login success
//       showSuccessToast("Login successful!");
//       localStorage.setItem("token", result.token);
//       localStorage.setItem("user", JSON.stringify(result.user));

//       // Redirect based on role
//       // if (result.user.role === "admin" || result.user.role === "sub-admin") router.push("/admindashboard");
//       // else router.push("/userdashboard");

//     } catch (error) {
//       console.error("Login error:", error);
//       showErrorToast("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

const fetchBoughtData = async (userId) => {
  try {
    let url = "/api/user/buy-package";
    if (userId) url += `?userId=${userId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (error) {
    // console.error("Error fetching user data:", error.message);
    return null;
  }
};

// ✅ Handle Login
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: formData.userID,
        password: formData.password,
      }),
    });

    const result = await response.json();
    // console.log("login result", result);

    if (!response.ok) {
      showErrorToast(result.error || "Invalid credentials. Please try again.");
      setIsLoading(false);
      return;
    }

    // ✅ Admin & Sub-admins can login directly (no restrictions)
    if (result?.user?.role === "admin" || result?.user?.role === "sub-admin") {
      showSuccessToast("Welcome Admin!");
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      router.push("/admindashboard");
      return;
    }

    // ✅ Regular user login logic
    const createdAt = result?.user?.createdAt;
    if (createdAt && result?.user?.status === "active") {
      const createdDate = new Date(createdAt);
      const currentDate = new Date();
      const diffMs = currentDate - createdDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // console.log(`Account created ${diffDays} days ago.`);

      // ✅ If 5 or more days old → check packages
      if (diffDays >= 5) {
        const boughtData = await fetchBoughtData(result?.user?._id);
        const boughtCount = boughtData?.boughtPackages?.length || 0;

        // console.log("Bought Packages Count:", boughtCount);

        if (boughtCount > 0) {
          // console.log("✅ User has bought packages, allow login.");
          showSuccessToast("Login successful!");
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          router.push("/userdashboard");
        } else {
          // console.log("🚫 Account blocked — no package purchased.");
       const inactiveUser=await fetch("/api/auth/login", {
             method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: result?.user?._id, status: "inactive" }),
});
if(inactiveUser.status === 200){
 showErrorToast("Your account has been blocked because you haven’t bought any packages.");
}else{
  showErrorToast("Failed to update user status.");
}

        }
      } else {
        // console.log("⏳ Account is less than 5 days old — allow login.");
        showSuccessToast("Login successful!");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        router.push("/userdashboard");
      }
    }else{
      showErrorToast("Your account is inactive. Please contact support.");
    }

  } catch (error) {
    // console.error("Login error:", error);
    showErrorToast("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    router.push("/");
  };

  const handleForgotPassword = () => {
    router.push("/forgetpassmodal");
  };
  return (
    <>
      {isLoading && <Loader />}

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative space-y-4 bg-black text-white rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.6)] p-6 sm:p-8 max-w-md w-full border border-cyan-400/30">

          {/* ❌ Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-cyan-400 transition"
          >
            <IoClose size={24} />
          </button>

          {/* 🟡 Header */}
          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            Login
          </h1>

          {/* 📝 Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User ID */}
            <div>
              <label className="block text-sm font-medium mb-1 text-cyan-400">
                User ID
              </label>
              <input
                type="text"
                name="userID"
                value={formData.userID}
                onChange={onFormChange}
                placeholder="Enter your User ID"
                className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                required
              />
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
                placeholder="Enter your Password"
                className="w-full p-2 rounded bg-[#111] text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition"
              >
                {showPassword ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-cyan-400 cursor-pointer text-sm font-medium hover:underline hover:text-cyan-300 transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md font-semibold transition-all duration-300 flex justify-center items-center ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "bg-cyan-400 text-black hover:bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] cursor-pointer"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Switch to Sign Up */}
            <div className="text-center text-sm text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}