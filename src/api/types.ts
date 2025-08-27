// Queue API Types
export interface QueueItemRaw {
  index: number;
  riskScore: number; // 0-100 또는 -1 (pending)
  description: string;
}

export interface QueueItem {
  index: number;
  type: "safe" | "risky" | "dangerous" | "pending";
  riskScore: number;
  description: string;
}

export interface QueueApiResponse {
  data: QueueItemRaw[];
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
  deployedAt: number;
  destructAddress?: string;
  duration?: number;
}

export interface WalletApiResponse {
  data: Wallet[];
}
