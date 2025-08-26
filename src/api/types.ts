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
