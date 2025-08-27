import { useState, useEffect, useCallback } from "react";
import { QueueItem } from "../api/types";
import { fetchQueueAuto, deleteQueueItemAuto } from "../api/queue";

interface UseQueueApiReturn {
  queue: QueueItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  deleteItem: (index: number) => Promise<boolean>;
  deleteLoading: boolean;
}

/**
 * Safe Wallet 주소 기반 Queue API를 관리하는 커스텀 훅
 * @param walletAddress Safe Wallet 주소
 */
export const useQueueApi = (
  walletAddress: string | null
): UseQueueApiReturn => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Queue 데이터 fetch 함수
  const fetchQueueData = useCallback(async () => {
    if (!walletAddress) {
      setQueue([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queueItems = await fetchQueueAuto(walletAddress);
      setQueue(queueItems);
    } catch (err) {
      setError("error Occurred");
      setQueue([]);
      console.error("Error fetching queue:", err);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  // 개별 아이템 삭제 함수
  const deleteItem = useCallback(
    async (index: number): Promise<boolean> => {
      if (!walletAddress) {
        setError("No wallet address provided");
        return false;
      }

      setDeleteLoading(true);
      setError(null);

      try {
        const response = await deleteQueueItemAuto(walletAddress, index);

        if (response.success) {
          // 로컬 상태에서 삭제된 아이템 제거
          setQueue((prevQueue) =>
            prevQueue.filter((item) => item.index !== index)
          );
          return true;
        } else {
          throw new Error(response.message || "Failed to delete queue item");
        }
      } catch (err) {
        setError("error Occurred");
        console.error("Error deleting queue item:", err);
        return false;
      } finally {
        setDeleteLoading(false);
      }
    },
    [walletAddress]
  );

  // walletAddress가 변경될 때마다 데이터 fetch
  useEffect(() => {
    fetchQueueData();
  }, [fetchQueueData]);

  return {
    queue,
    loading,
    error,
    refetch: fetchQueueData,
    deleteItem,
    deleteLoading,
  };
};
