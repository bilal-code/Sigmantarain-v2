'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [autoSignupData, setAutoSignupData] = useState(null);

  // Hide navbar on dashboards
  const hideNavbar =
    pathname?.startsWith("/admindashboard") ||
    pathname?.startsWith("/userdashboard");

  useEffect(() => {
    const ref = searchParams.get('ref');
    const autoSignup = searchParams.get('autoSignup');

    if (ref && autoSignup === 'true') {
      setAutoSignupData({
        referralCode: ref,
        shouldOpenSignup: true
      });
    }
  }, [searchParams, pathname]);

  if (hideNavbar) return null;

  return <Navbar autoSignupData={autoSignupData} />;
}
