import {
  QueueApiResponse,
  DeleteQueueItemResponse,
  QueueItem,
  QueueItemRaw,
} from "./types";

// Base API URL - 실제 환경에서는 환경변수로 관리
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Mock API 사용 여부 설정
const USE_MOCK_API = true; // false로 변경하면 실제 API 사용

/**
 * riskScore를 type으로 분류하는 함수
 * @param riskScore -1(pending) 또는 0-100 사이의 점수
 * @returns "pending" | "safe" | "risky" | "dangerous"
 */
export const classifyRiskScore = (riskScore: number): QueueItem["type"] => {
  if (riskScore === -1) return "pending";
  if (riskScore >= 0 && riskScore <= 30) return "safe";
  if (riskScore >= 31 && riskScore <= 70) return "risky";
  if (riskScore >= 71 && riskScore <= 100) return "dangerous";
  return "pending"; // fallback
};

/**
 * Raw API 응답을 UI용 데이터로 변환
 * @param rawItems API에서 받은 원본 데이터
 * @returns UI에서 사용할 QueueItem 배열
 */
export const transformQueueItems = (rawItems: QueueItemRaw[]): QueueItem[] => {
  return rawItems.map((item) => ({
    ...item,
    type: classifyRiskScore(item.riskScore),
  }));
};

/**
 * 특정 Safe Wallet 주소의 거래 큐를 조회합니다
 * @param walletAddress Safe Wallet 주소
 * @returns 거래 큐 목록
 *
 * @example
 * // 요청 URL 예시:
 * // GET http://example.com/api/queue?walletAddress=0x742d35Cc6874C41532CF90
 *
 * // 응답 예시:
 * // {
 * //   "data": [
 * //     { "index": 0, "riskScore": 15, "description": "Transfer 100 KAIA to trusted address" },
 * //     { "index": 1, "riskScore": 85, "description": "Approve token spending for DeFi protocol" },
 * //     { "index": 2, "riskScore": -1, "description": "Pending transaction analysis" }
 * //   ]
 * // }
 */
export const fetchQueue = async (
  walletAddress: string
): Promise<QueueApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/queue?walletAddress=${encodeURIComponent(
        walletAddress
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch queue:", error);
    throw new QueueApiError({
      message: error instanceof Error ? error.message : "Failed to fetch queue",
      status: error instanceof Response ? error.status : undefined,
    });
  }
};

/**
 * 특정 Safe Wallet의 거래 큐에서 개별 항목을 삭제합니다
 * @param walletAddress Safe Wallet 주소
 * @param index 삭제할 거래의 인덱스
 * @returns 삭제 결과
 *
 * @example
 * // 요청 URL 예시:
 * // DELETE http://example.com/api/queue/0?walletAddress=0x742d35Cc6874C41532CF90
 *
 * // 서버 응답: 204 No Content (응답 본문 없음)
 */
export const deleteQueueItem = async (
  walletAddress: string,
  index: number
): Promise<DeleteQueueItemResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/queue/${index}?walletAddress=${encodeURIComponent(
        walletAddress
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 삭제 성공 시 응답 본문 없이 성공 응답 반환
    return {
      success: true,
      message: `Queue item ${index} deleted successfully`,
    };
  } catch (error) {
    console.error("Failed to delete queue item:", error);
    throw new QueueApiError({
      message:
        error instanceof Error ? error.message : "Failed to delete queue item",
      status: error instanceof Response ? error.status : undefined,
    });
  }
};

// Mock API 함수들 (실제 서버가 없을 때 테스트용)
// 자동 분기 함수들 - USE_MOCK_API 설정에 따라 자동 선택
/**
 * 큐 조회 API - Mock/실제 API 자동 분기
 * @param walletAddress Safe Wallet 주소
 * @returns 거래 큐 목록 (UI용으로 변환된 데이터)
 *
 * @description
 * USE_MOCK_API = true: Mock 데이터 반환 (개발용)
 * USE_MOCK_API = false: 실제 API 호출
 * 실제 API URL: GET {API_BASE_URL}/api/queue?walletAddress={walletAddress}
 */
export const fetchQueueAuto = async (
  walletAddress: string
): Promise<QueueItem[]> => {
  const rawResponse = USE_MOCK_API
    ? await fetchQueueMock(walletAddress)
    : await fetchQueue(walletAddress);

  return transformQueueItems(rawResponse.data);
};

/**
 * 큐 항목 삭제 API - Mock/실제 API 자동 분기
 * @param walletAddress Safe Wallet 주소
 * @param index 삭제할 거래의 인덱스
 * @returns 삭제 결과
 *
 * @description
 * USE_MOCK_API = true: Mock 성공 응답 반환 (개발용)
 * USE_MOCK_API = false: 실제 API 호출
 * 실제 API URL: DELETE {API_BASE_URL}/api/queue/{index}?walletAddress={walletAddress}
 */
export const deleteQueueItemAuto = async (
  walletAddress: string,
  index: number
): Promise<DeleteQueueItemResponse> => {
  return USE_MOCK_API
    ? deleteQueueItemMock(walletAddress, index)
    : deleteQueueItem(walletAddress, index);
};

export const fetchQueueMock = async (
  _walletAddress: string
): Promise<QueueApiResponse> => {
  // 실제 API 서버가 없을 때 사용할 목업 데이터
  await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

  const mockData: QueueItemRaw[] = [
    {
      index: 0,
      riskScore: 15, // safe (0-30)
      description: "Transfer 100 KAIA to trusted address",
    },
    {
      index: 1,
      riskScore: 55, // risky (31-70)
      description: "Approve token spending for DeFi protocol",
    },
    {
      index: 2,
      riskScore: 45, // risky (31-70)
      description: "Swap 50 KAIA for USDT",
    },
    {
      index: 3,
      riskScore: 85, // dangerous (71-100)
      description: "Mint NFT from suspicious contract",
    },
    {
      index: 4,
      riskScore: 20, // safe (0-30)
      description: "Send transaction to multisig wallet",
    },
    {
      index: 5,
      riskScore: -1, // pending
      description: "Analyzing transaction risk...",
    },
  ];

  return {
    data: mockData,
  };
};

export const deleteQueueItemMock = async (
  _walletAddress: string,
  index: number
): Promise<DeleteQueueItemResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // 네트워크 지연 시뮬레이션

  return {
    success: true,
    message: `Queue item ${index} deleted successfully`,
  };
};

class QueueApiError extends Error {
  code?: string;
  status?: number;

  constructor({
    message,
    code,
    status,
  }: {
    message: string;
    code?: string;
    status?: number;
  }) {
    super(message);
    this.name = "QueueApiError";
    this.code = code;
    this.status = status;
  }
}
