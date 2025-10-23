"use client";
import Modal from "./Modal";
import Loader from "../loader";
import { FaEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // ✳️ Close Icon
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSwitchToSignup,
  onForgotPassword,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
      if (!response.ok) {
        alert(result.error || "Login failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      if (result.user.role === "admin") router.push("/admindashboard");
      else router.push("/userdashboard");
    } catch (error) {
      // console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="relative space-y-4 bg-black text-white rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.6)] p-6 sm:p-8 border border-cyan-400/30">

          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition"
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
                onClick={onForgotPassword}
                className="text-cyan-400 text-sm font-medium hover:underline hover:text-cyan-300 transition"
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
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
