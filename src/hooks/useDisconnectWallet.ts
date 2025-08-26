import { useCallback } from "react";
import useOnboard from "./useOnboard";
import { getConnectedWallet } from "./utils";

const useDisconnectWallet = () => {
  const onboard = useOnboard();

  return useCallback(async () => {
    if (!onboard) {
      console.warn("Onboard not initialized");
      return;
    }

    try {
      const currentWallets = onboard.state.get().wallets;
      const connectedWallet = getConnectedWallet(currentWallets);

      if (connectedWallet) {
        await onboard.disconnectWallet({ label: connectedWallet.label });
      }
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      throw error;
    }
  }, [onboard]);
};

export default useDisconnectWallet;
