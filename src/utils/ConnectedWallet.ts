import { type WalletState } from "@web3-onboard/core";
import type { Eip1193Provider } from "ethers";
import { getAddress } from "ethers";

export type ConnectedWallet = {
  label: string;
  chainId: string;
  address: string;
  provider: Eip1193Provider;
  icon?: string;
};

// 연결된 지갑 정보 추출
export const getConnectedWallet = (
  wallets: WalletState[]
): ConnectedWallet | null => {
  if (!wallets || wallets.length === 0) return null;

  const primaryWallet = wallets[0];
  if (!primaryWallet) return null;

  const account = primaryWallet.accounts[0];
  if (!account) return null;

  try {
    const address = getAddress(account.address);
    return {
      label: primaryWallet.label,
      address,
      chainId: Number(primaryWallet.chains[0].id).toString(10),
      provider: primaryWallet.provider,
      icon: primaryWallet.icon,
    };
  } catch (e) {
    console.error("Invalid wallet address:", e);
    return null;
  }
};
