import { useCallback } from "react";
import useOnboard from "./useOnboard";

const useConnectWallet = () => {
  const onboard = useOnboard();

  return useCallback(async () => {
    if (!onboard) {
      console.warn("Onboard not initialized");
      return Promise.resolve(undefined);
    }

    try {
      return await onboard.connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  }, [onboard]);
};

export default useConnectWallet;
