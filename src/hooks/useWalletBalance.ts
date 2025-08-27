import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWalletAccount } from "./useWalletAccount";

export const useWalletBalance = () => {
  const [balance, setBalance] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { account, isConnected } = useWalletAccount();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!isConnected || !account || !window.klaytn) {
        setBalance("0");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const provider = new ethers.BrowserProvider(window.klaytn as any);
        const balanceWei = await provider.getBalance(account);
        const balanceEther = ethers.formatEther(balanceWei);

        // 소수점 4자리까지만 표시
        const formattedBalance = parseFloat(balanceEther).toFixed(4);
        setBalance(formattedBalance);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
        setError("밸런스 조회 실패");
        setBalance("--");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [account, isConnected]);

  return { balance, loading, error };
};
