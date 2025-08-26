export const CHAINS = [
  {
    id: "0x2019", // 8217 (Kaia 메인넷)
    token: "KAIA",
    label: "Kaia Mainnet",
    rpcUrl: "https://public-en.node.kaia.io",
  },
  {
    id: "0x3e9", // 1001 (Kairos 테스트넷)
    token: "KAIA",
    label: "Kaia Kairos Testnet",
    rpcUrl: "https://public-en-kairos.node.kaia.io",
  },
];

// 체인 ID로 체인 정보 찾기
export const getChainById = (chainId: string) => {
  return CHAINS.find((chain) => chain.id === chainId);
};

// 현재 지원하는 체인 ID 목록
export const SUPPORTED_CHAIN_IDS = CHAINS.map((chain) => chain.id);

// 메인넷과 테스트넷 구분
export const KAIA_MAINNET = CHAINS[0];
export const KAIA_TESTNET = CHAINS[1];
