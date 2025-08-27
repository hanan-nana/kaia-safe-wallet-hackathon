import type { WalletInit } from "@web3-onboard/common";
import { createEIP1193Provider } from "@web3-onboard/common";
// import Caver from "caver-js"; // TODO: caver-js 설치 필요

const KAIAWALLET_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72">
  <rect width="72" height="72" rx="12" fill="#1a73e8"/>
  <path d="M18 24h36c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H18c-2.2 0-4-1.8-4-4V28c0-2.2 1.8-4 4-4z" fill="white"/>
  <circle cx="46" cy="36" r="3" fill="#1a73e8"/>
  <text x="36" y="58" text-anchor="middle" fill="white" font-family="Arial" font-size="8" font-weight="bold">KAIA</text>
</svg>`;

function kaiaWallet(): WalletInit {
  return () => {
    return {
      label: "KaiaWallet",
      injectedNamespace: "klaytn",
      getIcon: async () => KAIAWALLET_SVG,
      getInterface: async (_interfaceData: any) => {
        const provider: any = window.klaytn;
        if (!provider) {
          throw new Error("Please install KaiaWallet");
        }

        // TODO: caver-js 관련 코드 주석처리
        // const chains = interfaceData.chains;
        // const externalChainsCaver: any = {};
        // for (let i = 0; i < chains.length; i++) {
        //   externalChainsCaver[chains[i].id] = new Caver(chains[i].publicRpcUrl);
        // }

        // const walletCaver = new Caver(provider);

        return Promise.resolve({
          provider: createEIP1193Provider(provider, {
            // TODO: caver-js 의존성 해결 후 구현
            eth_sendTransaction: async ({ params }: any) => {
              // 임시로 기본 provider 사용
              return provider.request({
                method: "eth_sendTransaction",
                params,
              });
            },
            eth_getBalance: async ({ params }: any) => {
              // 임시로 기본 provider 사용
              return provider.request({
                method: "eth_getBalance",
                params,
              });
            },
          }),
        });
      },
    };
  };
}

export default kaiaWallet;
