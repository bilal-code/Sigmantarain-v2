"use client";
import { useEffect, useState } from "react";
import provider from "../lib/utils/provider";

export default function Ganache() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function getAccounts() {
      try {
        const accountsList = await provider.listAccounts();
        setAccounts(accountsList);
        console.log("Ganache Accounts:", accountsList);
      } catch (error) {
        console.error("Error connecting to Ganache:", error);
      }
    }
    getAccounts();
  }, []);

  return (
    <div>
      <h1>Connected Accounts</h1>
      <ul>
        {accounts.map((acc, index) => (
          <li key={index}>{acc}</li>
        ))}
      </ul>
    </div>
  );
}
