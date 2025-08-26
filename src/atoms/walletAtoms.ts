import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 배포된 지갑들을 저장하는 atom (localStorage에 지속)
export const deployedWalletsAtom = atomWithStorage<{
  [chainId: string]: {
    [address: string]: {
      name: string;
      creator: string;
      deployedAt: number;
      txHash: string;
      destructAddress?: string;
      duration?: number;
    };
  };
}>("deployedWallets", {});

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

// 특정 체인의 배포된 지갑들만 가져오는 derived atom
export const deployedWalletsByChainAtom = atom((get) => {
  const deployedWallets = get(deployedWalletsAtom);
  return (chainId: string) => deployedWallets[chainId] || {};
});

// 배포된 지갑 추가하는 write atom
export const addDeployedWalletAtom = atom(
  null,
  (
    get,
    set,
    wallet: {
      chainId: string;
      address: string;
      name: string;
      creator: string;
      txHash: string;
      destructAddress?: string;
      duration?: number;
    }
  ) => {
    const current = get(deployedWalletsAtom);
    const { chainId, address, ...walletData } = wallet;

    set(deployedWalletsAtom, {
      ...current,
      [chainId]: {
        ...current[chainId],
        [address]: {
          ...walletData,
          deployedAt: Date.now(),
        },
      },
    });
  }
);
