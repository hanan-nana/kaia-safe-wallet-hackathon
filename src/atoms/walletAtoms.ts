import { atom } from "jotai";
import { Wallet } from "../api/types";

// 현재 배포 중인 상태
export const deploymentStatusAtom = atom<{
  isDeploying: boolean;
  txHash: string | null;
  error: string | null;
  deployedAddress: string | null;
}>({
  isDeploying: false,
  txHash: null,
  error: null,
  deployedAddress: null,
});

// API로부터 가져온 지갑들을 저장하는 atom
export const walletsAtom = atom<{ [address: string]: Wallet }>({});

// 지갑 로딩 상태
export const walletsLoadingAtom = atom<boolean>(false);

// 지갑 API 에러 상태
export const walletsErrorAtom = atom<string | null>(null);

// 특정 체인의 배포된 지갑들만 가져오는 derived atom
export const deployedWalletsByChainAtom = atom((get) => {
  const wallets = get(walletsAtom);
  return (chainId: string) =>
    Object.fromEntries(
      Object.entries(wallets).filter(([, wallet]) => wallet.chainId === chainId)
    );
});

// 선택된 지갑 atom
export const selectedWalletAtom = atom<Wallet | null>(null);
