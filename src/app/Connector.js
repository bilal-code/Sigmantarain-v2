import React, { createContext, useState } from "react";

// Create the context
export const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  return (
    <WalletContext.Provider
      value={{ walletAddress, setWalletAddress, signer, setSigner }}
    >
      {children}
    </WalletContext.Provider>
  );
};