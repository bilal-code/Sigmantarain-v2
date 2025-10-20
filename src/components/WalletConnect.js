// components/WalletConnect.js
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected ,walletconnect} from '../app/Connector';

// import { injected,  } from '../connectors';
function WalletConnect() {
  const { activate, deactivate, active, account } = useWeb3React();

  useEffect(() => {
    // Attempt to connect to injected wallet on mount
    activate(injected);
  }, [activate]);

  const handleConnectInjected = () => {
    activate(injected);
  };

  const handleConnectWalletConnect = () => {
    activate(walletconnect);
  };

  const handleDisconnect = () => {
    deactivate();
  };

  return (
    <div>
      {active ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={handleConnectInjected}>Connect MetaMask</button>
          <button onClick={handleConnectWalletConnect}>Connect WalletConnect</button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;