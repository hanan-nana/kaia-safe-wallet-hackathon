// Queue API Types
export interface QueueItem {
  index: number;
  type: "safe" | "risky" | "dangerous";
  description: string;
}

export interface QueueApiResponse {
  data: QueueItem[];
}

export interface DeleteQueueItemResponse {
  success: boolean;
  message?: string;
}

export interface QueueApiError {
  message: string;
  code?: string;
  status?: number;
}

// Wallet API Types
export interface Wallet {
  address: string;
  name: string;
  creator: string;
  deployedAt: number;
  txHash: string;
  destructAddress?: string;
  duration?: number;
  chainId: string;
}

export interface WalletApiResponse {
  data: { [address: string]: Wallet };
}

export interface CreateWalletRequest {
  chainId: string;
  name: string;
  creator: string;
  txHash: string;
  destructAddress?: string;
  duration?: number;
}

export interface CreateWalletResponse {
  data: Wallet;
}
