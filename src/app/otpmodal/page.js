// app/otpmodal/page.js
"use client";
import { Suspense } from "react";
import OtpModal from "@/components/modals/OtpModal";

// Client component that uses useSearchParams
function OtpContent() {
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();
  
  const handleClose = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }
  };

  const formData = {
    email: searchParams.get('email') || "",
    referralCode: searchParams.get('referralCode') || "",
    name: searchParams.get('name') || "",
    contactNo: searchParams.get('contactNo') || "",
    password: searchParams.get('password') || "",
    ConfirmPassword: searchParams.get('ConfirmPassword') || "",
  };

  return (
    <OtpModal 
      isOpen={true}
      onClose={handleClose}
      formData={formData}
    />
  );
}

// Main page component with Suspense
export default function OtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verification...</p>
        </div>
      </div>
    }>
      <OtpContent />
    </Suspense>
  );
}