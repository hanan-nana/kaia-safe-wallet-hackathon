export interface AddressInfo {
  name?: string;
  address: string;
  avatar: string;
  color: string;
}

export interface Transaction {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "success" | "pending" | "failed";
  creator: AddressInfo;
  factory: AddressInfo;
  mastercopy: AddressInfo;
  transactionHash: string;
  createdAt: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    title: "Safe Account created",
    description: "Safe Account created by 0x4C3d_0F30",
    time: "5:41 PM",
    status: "success",
    creator: {
      address: "kairos:0x4C3d048F8A9Ab2e28e99b0cADb0f808E3be710F30",
      avatar: "AADD",
      color: "bg-blue-500",
    },
    factory: {
      name: "SafeProxyFactory 1.3.0",
      address: "kairos:0xC22834581EbC8527d4F8Alc97E1bEA4EF910BC",
      avatar: "SF",
      color: "bg-green-500",
    },
    mastercopy: {
      name: "SafeL2 1.3.0",
      address: "kairos:0xfb1bfFC9739b5d739BBD520Da6769B1EA",
      avatar: "SL",
      color: "bg-yellow-500",
    },
    transactionHash: "0x7a4c...50ee",
    createdAt: "8/22/2025, 5:41:04 PM",
  },
  {
    id: "tx2",
    title: "Token Transfer",
    description: "Sent 100 KAIA to 0x1234...5678",
    time: "3:25 PM",
    status: "pending",
    creator: {
      address: "kairos:0x4C3d048F8A9Ab2e28e99b0cADb0f808E3be710F30",
      avatar: "AADD",
      color: "bg-blue-500",
    },
    factory: {
      name: "SafeProxyFactory 1.3.0",
      address: "kairos:0xC22834581EbC8527d4F8Alc97E1bEA4EF910BC",
      avatar: "SF",
      color: "bg-green-500",
    },
    mastercopy: {
      name: "SafeL2 1.3.0",
      address: "kairos:0xfb1bfFC9739b5d739BBD520Da6769B1EA",
      avatar: "SL",
      color: "bg-yellow-500",
    },
    transactionHash: "0x9b3e...41df",
    createdAt: "8/22/2025, 3:25:12 PM",
  },
  {
    id: "tx3",
    title: "Contract Interaction Failed",
    description: "Failed to execute contract call",
    time: "1:15 PM",
    status: "failed",
    creator: {
      address: "kairos:0x4C3d048F8A9Ab2e28e99b0cADb0f808E3be710F30",
      avatar: "AADD",
      color: "bg-blue-500",
    },
    factory: {
      name: "SafeProxyFactory 1.3.0",
      address: "kairos:0xC22834581EbC8527d4F8Alc97E1bEA4EF910BC",
      avatar: "SF",
      color: "bg-green-500",
    },
    mastercopy: {
      name: "SafeL2 1.3.0",
      address: "kairos:0xfb1bfFC9739b5d739BBD520Da6769B1EA",
      avatar: "SL",
      color: "bg-yellow-500",
    },
    transactionHash: "0x5a7c...89bd",
    createdAt: "8/22/2025, 1:15:45 PM",
  },
];
