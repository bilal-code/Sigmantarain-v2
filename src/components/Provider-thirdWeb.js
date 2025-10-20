"use client";

import { ActiveChain, clientId } from "../component/Constants";
import MyProvider from "./Provider";

export default function ThirdWebProvider({ children }) {
  return (
    <ThirdwebProvider activeChain={ActiveChain} clientId={clientId}>
      <MyProvider>
      {children}
      </MyProvider>
    </ThirdwebProvider>
  );
}
