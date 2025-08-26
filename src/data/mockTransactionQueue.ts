export interface QueuedTransaction {
  id: number;
  txHash: string;
  description: string;
  status: "safe" | "risky" | "dangerous";
  timestamp: number;
  value?: string;
  to?: string;
  from?: string;
  gasPrice?: string;
  riskScore?: number; // 0-100, higher is more risky
  riskFactors?: string[];
}

export const mockTransactionQueue: QueuedTransaction[] = [
  {
    id: 0,
    txHash:
      "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
    description: "Transfer 100 KAIA to 0x742d35Cc6874C41532CF90",
    status: "safe",
    timestamp: Date.now() - 30000, // 30 seconds ago
    value: "100",
    to: "0x742d35Cc6874C41532CF90",
    from: "0x8ba1f109551bD432803012645Hac136c",
    gasPrice: "25000000000",
    riskScore: 5,
    riskFactors: [],
  },
  {
    id: 1,
    txHash:
      "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3a",
    description: "Approve token spending for DeFi protocol",
    status: "risky",
    timestamp: Date.now() - 60000, // 1 minute ago
    value: "0",
    to: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    from: "0x8ba1f109551bD432803012645Hac136c",
    gasPrice: "30000000000",
    riskScore: 65,
    riskFactors: ["High token approval amount", "Unknown contract interaction"],
  },
  {
    id: 2,
    txHash:
      "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3a4b",
    description: "Swap 50 KAIA for USDT",
    status: "risky",
    timestamp: Date.now() - 120000, // 2 minutes ago
    value: "50",
    to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    from: "0x8ba1f109551bD432803012645Hac136c",
    gasPrice: "20000000000",
    riskScore: 15,
    riskFactors: [],
  },
  {
    id: 3,
    txHash:
      "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3a4b5c",
    description: "Mint NFT from suspicious contract",
    status: "dangerous",
    timestamp: Date.now() - 180000, // 3 minutes ago
    value: "0.1",
    to: "0xDeadBeefCafeBABE000000000000000000000000",
    from: "0x8ba1f109551bD432803012645Hac136c",
    gasPrice: "50000000000",
    riskScore: 95,
    riskFactors: [
      "Suspicious contract address",
      "High gas price",
      "Potential scam NFT mint",
      "Contract not verified",
    ],
  },
  {
    id: 4,
    txHash:
      "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3a4b5c6d",
    description: "Send transaction to multisig wallet",
    status: "safe",
    timestamp: Date.now() - 10000, // 10 seconds ago
    value: "25",
    to: "0x8ba1f109551bD432803012645Hac136c",
    from: "0x742d35Cc6874C41532CF90",
    gasPrice: "25000000000",
    riskScore: 10,
    riskFactors: [],
  },
];
