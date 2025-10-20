"use client";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
// import { ContextProvider } from "../ContextAPi";

const getLibrary = async (provider) => {
  return new Web3Provider(provider);
};

export default function MyProvider({ children }) {
  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        {/* <ContextProvider> */}
        {children}
        {/* </ContextProvider> */}
      </Web3ReactProvider>
    </div>
  );
}
