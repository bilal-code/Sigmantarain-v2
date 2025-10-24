// app/otpmodal/page.js
"use client";
import { useSearchParams } from "next/navigation";
import OtpModal from "@/components/modals/OtpModal";

export default function OtpPage() {
  const searchParams = useSearchParams();
  
  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/"; // Fallback to home page
    }
  };

  // Get form data from URL params
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