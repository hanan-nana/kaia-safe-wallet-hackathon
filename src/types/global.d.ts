/// <reference types="vite/client" />

declare global {
  interface Window {
    klaytn?: {
      isKaikas?: boolean;
      enable: () => Promise<string[]>;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (
        event: string,
        handler: (...args: any[]) => void
      ) => void;
      networkVersion: string;
      selectedAddress: string;
    };
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
