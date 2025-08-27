import {
  WalletApiResponse,
  CreateWalletRequest,
  CreateWalletResponse,
  Wallet,
} from "./types";

// Base API URL - 실제 환경에서는 환경변수로 관리
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Mock API 사용 여부 설정
const USE_MOCK_API = true; // false로 변경하면 실제 API 사용

// localStorage 키
const WALLETS_STORAGE_KEY = "mockWallets";

// localStorage에서 Mock 데이터 로드/저장 함수들
const loadMockWalletsFromStorage = (): {
  [chainId: string]: { [address: string]: Wallet };
} => {
  try {
    const stored = localStorage.getItem(WALLETS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load wallets from localStorage:", error);
  }

  // 기본 데이터
  return {
    "1001": {
      "0x742d35Cc6874C41532CF90": {
        address: "0x742d35Cc6874C41532CF90",
        name: "My Safe Wallet",
        creator: "0x123...",
        deployedAt: Date.now() - 86400000,
        txHash: "0xabc123...",
        destructAddress: "0x456...",
        duration: 86400,
        chainId: "1001",
      },
    },
  };
};

const saveMockWalletsToStorage = (wallets: {
  [chainId: string]: { [address: string]: Wallet };
}) => {
  try {
    localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(wallets));
  } catch (error) {
    console.error("Failed to save wallets to localStorage:", error);
  }
};

/**
 * 특정 체인의 Safe Wallet 목록을 조회합니다
 * @param chainId 체인 ID (예: "1001" for Kaia Kairos)
 * @param creator 지갑 생성자 주소 (선택사항)
 * @returns Safe Wallet 목록
 *
 * @example
 * // 요청 URL 예시:
 * // GET http://example.com/api/wallets?chainId=1001&creator=0x123...
 *
 * // 응답 예시:
 * // {
 * //   "data": {
 * //     "0x742d35Cc6874C41532CF90": {
 * //       "address": "0x742d35Cc6874C41532CF90",
 * //       "name": "My Safe Wallet",
 * //       "creator": "0x123...",
 * //       "deployedAt": 1234567890,
 * //       "txHash": "0xabc123...",
 * //       "destructAddress": "0x456...",
 * //       "duration": 86400,
 * //       "chainId": "1001"
 * //     }
 * //   }
 * // }
 */
export const fetchWallets = async (
  chainId: string,
  creator?: string
): Promise<WalletApiResponse> => {
  if (USE_MOCK_API) {
    return fetchWalletsMock(chainId, creator);
  }

  try {
    const params = new URLSearchParams({ chainId });
    if (creator) {
      params.append("creator", creator);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/wallets?${params.toString()}`,
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
    console.error("Failed to fetch wallets:", error);
    throw new WalletApiError({
      message:
        error instanceof Error ? error.message : "Failed to fetch wallets",
      status: error instanceof Response ? error.status : undefined,
    });
  }
};

/**
 * 새로운 Safe Wallet을 생성합니다
 * @param walletData 생성할 지갑 정보
 * @returns 생성된 지갑 정보
 *
 * @example
 * // 요청 URL 예시:
 * // POST http://example.com/api/wallets
 * // Body: {
 * //   "chainId": "1001",
 * //   "name": "My New Wallet",
 * //   "creator": "0x123...",
 * //   "txHash": "0xdef456...",
 * //   "destructAddress": "0x789...",
 * //   "duration": 86400
 * // }
 *
 * // 응답 예시:
 * // {
 * //   "data": {
 * //     "address": "0x987...",
 * //     "name": "My New Wallet",
 * //     "creator": "0x123...",
 * //     "deployedAt": 1234567890,
 * //     "txHash": "0xdef456...",
 * //     "destructAddress": "0x789...",
 * //     "duration": 86400,
 * //     "chainId": "1001"
 * //   }
 * // }
 */
export const createWallet = async (
  walletData: CreateWalletRequest & { address?: string }
): Promise<CreateWalletResponse> => {
  if (USE_MOCK_API) {
    return createWalletMock(walletData);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/wallets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create wallet:", error);
    throw new WalletApiError({
      message:
        error instanceof Error ? error.message : "Failed to create wallet",
      status: error instanceof Response ? error.status : undefined,
    });
  }
};

// Mock API Functions
const fetchWalletsMock = async (
  chainId: string,
  creator?: string
): Promise<WalletApiResponse> => {
  // 실제 API 호출 시뮬레이션을 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 300));

  // localStorage에서 지갑 데이터 로드
  const mockWallets = loadMockWalletsFromStorage();
  const chainWallets = mockWallets[chainId] || {};

  // creator가 지정된 경우 필터링
  const filteredWallets = creator
    ? Object.fromEntries(
        Object.entries(chainWallets).filter(
          ([, wallet]) => wallet.creator.toLowerCase() === creator.toLowerCase()
        )
      )
    : chainWallets;

  return {
    data: filteredWallets,
  };
};

const createWalletMock = async (
  walletData: CreateWalletRequest & { address?: string }
): Promise<CreateWalletResponse> => {
  // 실제 API 호출 시뮬레이션을 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 실제 배포된 주소가 있으면 사용, 없으면 랜덤 생성 (테스트용)
  const newAddress =
    walletData.address || `0x${Math.random().toString(16).substring(2, 42)}`;

  const newWallet: Wallet = {
    address: newAddress,
    name: walletData.name,
    creator: walletData.creator,
    deployedAt: Date.now(),
    txHash: walletData.txHash,
    destructAddress: walletData.destructAddress,
    duration: walletData.duration,
    chainId: walletData.chainId,
  };

  // localStorage에서 현재 데이터 로드
  const mockWallets = loadMockWalletsFromStorage();

  // Mock 데이터에 추가
  if (!mockWallets[walletData.chainId]) {
    mockWallets[walletData.chainId] = {};
  }
  mockWallets[walletData.chainId][newAddress] = newWallet;

  // localStorage에 저장
  saveMockWalletsToStorage(mockWallets);

  return {
    data: newWallet,
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
