"use client";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "@/client";

export default function WalletInfo() {
  const account = useActiveAccount();

  if (!account) {
    return <p>Please connect your wallet</p>; // Prevents errors if not connected
  }

  const { data: balance } = useWalletBalance({
    client,
    chain: "ethereum", // Change this to your desired chain (e.g., "polygon")
    address: account.address,
  });

  return (
    <div>
      <p>Wallet address: {account.address}</p>
      <p>Wallet balance: {balance?.displayValue} {balance?.symbol}</p>
    </div>
  );
}
