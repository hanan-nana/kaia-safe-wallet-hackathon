import { WalletApiResponse, Wallet } from "./types";

// Base API URL - 실제 환경에서는 환경변수로 관리
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Mock API 사용 여부 설정
const USE_MOCK_API = true; // false로 변경하면 실제 API 사용

/**
 * Safe Wallet 목록을 조회합니다
 * @returns Safe Wallet 목록
 *
 * @example
 * // 요청 URL 예시:
 * // GET http://example.com/api/wallets
 *
 * // 응답 예시:
 * // {
 * //   "data": [
 * //     {
 * //       "address": "0x742d35Cc6874C41532CF90",
 * //       "name": "My Safe Wallet",
 * //       "deployedAt": 1234567890,
 * //       "destructAddress": "0x456...",
 * //       "duration": 86400,
 * //     }
 * //   ]
 * // }
 */
export const fetchWallets = async (): Promise<WalletApiResponse> => {
  if (USE_MOCK_API) {
    return fetchWalletsMock();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/wallets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch wallets:", error);
    throw new WalletApiError({
      message:
        error instanceof Error ? error.message : "Failed to fetch wallets",
      status: error instanceof Response ? error.status : undefined,
    });
  }
};

// Mock API Functions
const fetchWalletsMock = async (): Promise<WalletApiResponse> => {
  // 실제 API 호출 시뮬레이션을 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock 데이터 - 실제로는 Jotai atom에서 가져옴
  const mockWallets: Wallet[] = [
    {
      address: "0x742d35Cc6874C41532CF90",
      name: "My Safe Wallet",
      deployedAt: Date.now() - 86400000,
      destructAddress: "0x456...",
      duration: 86400,
    },
  ];

  return {
    data: mockWallets,
  };
};

// 에러 클래스
class WalletApiError extends Error {
  public status?: number;

  constructor({ message, status }: { message: string; status?: number }) {
    super(message);
    this.name = "WalletApiError";
    this.status = status;
  }
}
