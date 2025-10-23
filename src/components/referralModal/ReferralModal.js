"use client";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FiSend, FiX, FiCheckCircle, FiMail, FiUserPlus } from "react-icons/fi";
import { showErrorToast } from "@/lib/toast";

const ReferralModal = ({ open, onClose, referralCode, senderEmail }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/sendReferralCode", {
        senderEmail,
        email,
        referralCode,
        website: "https://sigmantarian-new2.vercel.app/",
      });
      // console.log("Response from server:", res.data);
      // console.log("Sending referral code...", senderEmail, email, referralCode);
      setEmail("");
      setLoading(false);
      setShowSuccess(true);
      
      // Auto close success popup after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      setLoading(false);
      showErrorToast("Failed to send referral code. Please try again.");
      onClose();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-green-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">
              Referral code has been sent successfully to{" "}
              <span className="font-semibold text-[#0B98AC]">{email}</span>
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="w-full bg-[#0B98AC] text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 relative animate-scale-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#0B98AC] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiUserPlus className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Share Referral Code
            </h2>
            <p className="text-gray-600 text-sm">
              Invite friends to join using your referral code
            </p>
          </div>

          {/* Referral Code Display */}
          <div className="bg-gradient-to-r from-[#0B98AC]/10 to-blue-600/10 rounded-xl p-4 mb-6 border border-[#0B98AC]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">YOUR REFERRAL CODE</p>
                <p className="text-lg font-bold text-[#0B98AC] font-mono">
                  {referralCode}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#0B98AC] rounded-full flex items-center justify-center text-white">
                <FiMail size={18} />
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={sendEmail}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Friend's Email Address
              </label>
              <input
                type="email"
                placeholder="Enter friend's email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0B98AC] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                loading || !email
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#0B98AC] to-blue-600 hover:from-blue-600 hover:to-[#0B98AC] hover:shadow-lg transform hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Send Invitation
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Your friend will receive an email with your referral code and signup link
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default ReferralModal;