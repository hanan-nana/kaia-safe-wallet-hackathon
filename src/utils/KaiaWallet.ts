import type { WalletInit } from "@web3-onboard/common";
import { createEIP1193Provider } from "@web3-onboard/common";
import Caver from "caver-js";

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
      getInterface: async (interfaceData: any) => {
        const provider: any = window.klaytn;
        if (!provider) {
          throw new Error("Please install KaiaWallet");
        }

        const chains = interfaceData.chains;
        const externalChainsCaver: any = {};
        for (let i = 0; i < chains.length; i++) {
          externalChainsCaver[chains[i].id] = new Caver(chains[i].publicRpcUrl);
        }

        const walletCaver = new Caver(provider);

        return Promise.resolve({
          provider: createEIP1193Provider(provider, {
            eth_sendTransaction: async ({ params }: any) => {
              let txninput: any = {
                from: params[0].from,
                to: params[0].to,
                gas: params[0].gas,
              };
              if (params[0].data) txninput["data"] = params[0].data;
              if (params[0].value) txninput["value"] = params[0].value;

              let txndata = await walletCaver.klay.sendTransaction(txninput);
              return txndata.transactionHash as string;
            },
            eth_getBalance: async ({ params }: any) => {
              let networkVersion = walletCaver.utils.toHex(
                provider.networkVersion
              );
              let selectedAddress = params?.[0] || "";
              let balance = await externalChainsCaver[
                networkVersion
              ].klay.getBalance(selectedAddress);
              return balance;
            },
          }),
        });
      },
    };
  };
}

export default kaiaWallet;
