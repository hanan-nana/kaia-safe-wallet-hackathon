import { useState, useEffect } from "react";
import { useOnboard } from "./useOnboard";
import { getConnectedWallet } from "./utils";

export const useWalletAccount = () => {
  const [account, setAccount] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const onboard = useOnboard();

  useEffect(() => {
    if (!onboard) {
      // onboard가 초기화되지 않았으면 초기화 상태로
      setAccount("");
      setIsConnected(false);
      return;
    }

    const updateWalletState = () => {
      const wallets = onboard.state.get().wallets;
      const connectedWallet = getConnectedWallet(wallets);

      if (connectedWallet) {
        setAccount(connectedWallet.address);
        setIsConnected(true);
      } else {
        setAccount("");
        setIsConnected(false);
      }
    };

    // 초기 상태 확인
    updateWalletState();

    // onboard 상태 변경 구독
    const unsubscribe = onboard.state
      .select("wallets")
      .subscribe(updateWalletState);

    return () => {
      if (unsubscribe && typeof unsubscribe.unsubscribe === "function") {
        unsubscribe.unsubscribe();
      }
    };
  }, [onboard]);

  return { account, isConnected };
};
