"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/adminLayout";
import AdminSmallscreenLayout from "@/components/adminsmallLayout";

export default function AdminResponsiveLayout({ children }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [key, setKey] = useState(0); 

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newIsSmallScreen = width < 768;
      if (newIsSmallScreen !== isSmallScreen) {
        setIsSmallScreen(newIsSmallScreen);
        setKey(prev => prev + 1);
      }
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isSmallScreen]);

  return isSmallScreen ? (
    <AdminSmallscreenLayout key={`small-${key}`}>{children}</AdminSmallscreenLayout>
  ) : (
    <AdminLayout key={`large-${key}`}>{children}</AdminLayout>
  );
}