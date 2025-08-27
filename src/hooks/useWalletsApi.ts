import { useCallback } from "react";
import { useAtom } from "jotai";
import {
  walletsAtom,
  walletsLoadingAtom,
  walletsErrorAtom,
} from "../atoms/walletAtoms";
import { fetchWallets, createWallet } from "../api/wallets";
import { CreateWalletRequest, Wallet } from "../api/types";

export const useWalletsApi = () => {
  const [wallets, setWallets] = useAtom(walletsAtom);
  const [loading, setLoading] = useAtom(walletsLoadingAtom);
  const [error, setError] = useAtom(walletsErrorAtom);

  // 지갑 목록 조회
  const loadWallets = useCallback(
    async (chainId: string, creator?: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchWallets(chainId, creator);
        setWallets(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load wallets");
        console.error("Failed to load wallets:", err);
      } finally {
        setLoading(false);
      }
    },
    [setWallets, setLoading, setError]
  );

  // 새 지갑 생성
  const addWallet = useCallback(
    async (
      walletData: CreateWalletRequest & { address?: string }
    ): Promise<Wallet | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await createWallet(walletData);
        const newWallet = response.data;

        // 로컬 상태에 새 지갑 추가
        setWallets((prev) => ({
          ...prev,
          [newWallet.address]: newWallet,
        }));

        return newWallet;
      } catch (err: any) {
        setError(err.message || "Failed to create wallet");
        console.error("Failed to create wallet:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setWallets, setLoading, setError]
  );

  // 에러 초기화
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    wallets,
    loading,
    error,
    loadWallets,
    addWallet,
    clearError,
  };
};
