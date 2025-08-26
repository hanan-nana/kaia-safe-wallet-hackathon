import { useEffect, useSyncExternalStore } from "react";
import { type OnboardAPI } from "@web3-onboard/core";

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

// onboard 초기화 함수 (MVP)
export const initOnboard = async (config: {
  chains: Array<{
    id: string;
    label: string;
    rpcUrl: string;
    token: string;
  }>;
  wallets: any[];
  appMetadata?: {
    name: string;
    icon: string;
    description: string;
  };
}) => {
  // 이미 초기화됐으면 리턴
  if (getStore()) return getStore();

  try {
    // 동적 import로 Onboard 가져오기
    const { default: Onboard } = await import("@web3-onboard/core");

    const onboard = Onboard({
      wallets: config.wallets,
      chains: config.chains,
      accountCenter: {
        mobile: { enabled: false },
        desktop: { enabled: false },
      },
      notify: {
        enabled: false,
      },
      appMetadata: config.appMetadata || {
        name: "Web3 App",
        icon: "",
        description: "Web3 Application",
      },
      connect: {
        removeWhereIsMyWalletWarning: true,
        autoConnectLastWallet: false,
      },
    });

    setStore(onboard);
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
export const useInitOnboard = (config: Parameters<typeof initOnboard>[0]) => {
  const onboard = useStore();

  useEffect(() => {
    if (!onboard) {
      initOnboard(config).catch(console.error);
    }
  }, [onboard, config]);

  return onboard;
};

export { getStore as getOnboard };
export default useOnboard;
