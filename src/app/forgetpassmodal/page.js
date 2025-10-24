// app/forgetpassmodal/page.js
"use client";
import ForgotPasswordModal from "@/components/modals/ForgetPassModal";

export default function ForgotPasswordPage() {
  const handleClose = () => {
    // You can use router.back() or window.history.back()
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/"; // Fallback to home page
    }
  };

  return (
    <ForgotPasswordModal 
      isOpen={true}
      onClose={handleClose}
    />
  );
}