import React, { useState, useEffect } from "react";
import useConnectWallet from "../../hooks/useConnect";
import useDisconnectWallet from "../../hooks/useDisconnectWallet";
import useOnboard from "../../hooks/useOnboard";
import {
  getConnectedWallet,
  type ConnectedWallet,
} from "../../utils/ConnectedWallet";

const ConnectButton = () => {
  const onboard = useOnboard();
  const connectWallet = useConnectWallet();
  const disconnectWallet = useDisconnectWallet();
  const [connectedWallet, setConnectedWallet] =
    useState<ConnectedWallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // onboard는 App.tsx에서 이미 초기화됨

  // 지갑 상태 구독
  useEffect(() => {
    if (!onboard) return;

    const subscription = onboard.state
      .select("wallets")
      .subscribe((wallets) => {
        const wallet = getConnectedWallet(wallets);
        setConnectedWallet(wallet);
      });

    return () => subscription.unsubscribe();
  }, [onboard]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Disconnection failed:", error);
    }
  };

  if (connectedWallet) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-green-gray-600">
          Connected: {connectedWallet.address.slice(0, 6)}...
          {connectedWallet.address.slice(-4)}
        </p>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};

export default ConnectButton;
