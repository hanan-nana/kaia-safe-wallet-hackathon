import { useEffect, useSyncExternalStore } from "react";
import { type OnboardAPI } from "@web3-onboard/core";
import { CHAINS } from "../constants";

// 간단한 외부 스토어
class ExternalStore<T> {
  private store: T | undefined;
  private listeners: Set<() => void> = new Set();

  getStore = () => this.store;

  setStore = (value: T | undefined) => {
    if (value !== this.store) {
      this.store = value;
      this.listeners.forEach((listener) => listener());
    }
  };

  private subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  useStore = () => {
    return useSyncExternalStore(this.subscribe, this.getStore, this.getStore);
  };
}

// OnboardAPI 싱글톤 스토어
const { getStore, setStore, useStore } = new ExternalStore<OnboardAPI>();

// onboard 초기화 함수 (Kaia 설정 포함)
export const initOnboard = async () => {
  // 이미 초기화됐으면 리턴
  if (getStore()) return getStore();

  try {
    // 동적 import로 필요한 모듈들 가져오기
    const { default: Onboard } = await import("@web3-onboard/core");
    const { default: injectedModule } = await import(
      "@web3-onboard/injected-wallets"
    );
    const { default: walletConnectModule } = await import(
      "@web3-onboard/walletconnect"
    );

    // 지갑 모듈 설정 - Kaia Wallet 포함
    const injected = injectedModule({
      custom: [
        {
          label: "Kaia Wallet",
          injectedNamespace: "klaytn" as any,
          platforms: ["desktop", "mobile"],
          getIcon:
            async () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72">
            <rect width="72" height="72" rx="12" fill="#1a73e8"/>
            <path d="M18 24h36c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H18c-2.2 0-4-1.8-4-4V28c0-2.2 1.8-4 4-4z" fill="white"/>
            <circle cx="46" cy="36" r="3" fill="#1a73e8"/>
            <text x="36" y="58" text-anchor="middle" fill="white" font-family="Arial" font-size="8" font-weight="bold">KAIA</text>
          </svg>`,
          checkProviderIdentity: ({ provider }) =>
            Boolean(provider?.isKaikas) ||
            typeof (window as any).klaytn !== "undefined",
          getInterface: async () => {
            const provider = (window as any).klaytn;
            if (!provider) throw new Error("Kaia Wallet not found");
            return { provider };
          },
        },
      ],
    });

    const walletConnect = walletConnectModule({
      projectId: "your-walletconnect-project-id", // WalletConnect v2 project ID가 필요합니다
      requiredChains: [1001, 8217], // Kaia Kairos, Kaia Mainnet
    });

    const onboard = Onboard({
      wallets: [injected, walletConnect],
      chains: CHAINS,
      accountCenter: {
        mobile: { enabled: false },
        desktop: { enabled: false },
      },
      notify: {
        enabled: false,
      },
      appMetadata: {
        name: "Kaia Hackathon App",
        icon: "https://docs.kaia.io/img/favicon.ico",
        description: "Kaia blockchain application for hackathon",
      },
      connect: {
        removeWhereIsMyWalletWarning: true,
        autoConnectLastWallet: false,
      },
    });

    setStore(onboard);
    console.log("Onboard initialized successfully");
    return onboard;
  } catch (error) {
    console.error("Failed to initialize onboard:", error);
    throw error;
  }
};

// useOnboard 훅 (MVP with init)
export const useOnboard = () => {
  return useStore();
};

// 초기화와 함께 사용하는 훅
export const useInitOnboard = () => {
  const onboard = useStore();

  useEffect(() => {
    if (!onboard) {
      initOnboard().catch(console.error);
    }
  }, [onboard]);

  return onboard;
};

export { getStore as getOnboard };
export default useOnboard;
