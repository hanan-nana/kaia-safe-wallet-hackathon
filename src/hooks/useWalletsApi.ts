import { useCallback } from "react";
import { useAtom } from "jotai";
import {
  walletsAtom,
  walletsLoadingAtom,
  walletsErrorAtom,
} from "../atoms/walletAtoms";
import { fetchWallets } from "../api/wallets";

export const useWalletsApi = () => {
  const [wallets, setWallets] = useAtom(walletsAtom);
  const [loading, setLoading] = useAtom(walletsLoadingAtom);
  const [error, setError] = useAtom(walletsErrorAtom);

  // 지갑 목록 조회
  const loadWallets = useCallback(async (account : string) => {
    setLoading(true);
    setError(null);
    console.log("Loading wallets for account:", account);
    try {
      const response = await fetchWallets(account);
      setWallets(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to load wallets");
      console.error("Failed to load wallets:", err);
    } finally {
      setLoading(false);
    }
  }, [setWallets, setLoading, setError]);

  // 에러 초기화
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    wallets,
    loading,
    error,
    loadWallets,
    clearError,
  };
};
