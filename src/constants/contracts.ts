// Safe Wallet Factory Contract Constants
export const SAFE_WALLET_FACTORY = {
  // Klaytn Baobab Testnet
  ADDRESS: "0x725C7A0e548481b80314bE54939dD1c3654f8462",
  ABI: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newContractAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "creator",
          type: "address",
        },
      ],
      name: "ContractDeployed",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_destructWallet",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_minDelayTime",
          type: "uint256",
        },
      ],
      name: "deployContract",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;

// Legacy exports for backward compatibility
export const Factory_Address = SAFE_WALLET_FACTORY.ADDRESS;
export const Factory_ABI = SAFE_WALLET_FACTORY.ABI;
