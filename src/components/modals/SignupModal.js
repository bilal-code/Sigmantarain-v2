"use client";
import Modal from "./Modal";
import Loader from "../loader";
import { FaEye } from "react-icons/fa";
import { IoEyeOffOutline, IoClose } from "react-icons/io5"; // ✳️ Close icon
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  isLoading,
  onSwitchToLogin,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showcnfrmPassword, setShowcnfrmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.ConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/auth/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.error || "Signup failed");
        return;
      }

      alert("Signup successful!");
      if (result?.token) localStorage.setItem("token", result.token);

      if (result?.user?.role === "admin") router.push("/admindashboard");
      else router.push("/userdashboard");

      onClose?.();
    } catch (err) {
      // console.error("Error during signup:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="relative space-y-4 bg-black text-white rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.6)] border border-cyan-400/30 p-6 sm:p-8">

          {/* ❌ Close Button */}
          <button
            onClick={onClose}
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
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-cyan-400 font-semibold hover:underline hover:text-cyan-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
