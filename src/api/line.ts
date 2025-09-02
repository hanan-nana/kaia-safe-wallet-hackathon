import { LineAccount } from "../atoms/lineAtoms";

// Base API URL - 실제 환경에서는 환경변수로 관리
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Mock API 사용 여부 설정
const USE_MOCK_API = false; // false로 변경하면 실제 API 사용

// 로컬 스토리지 키
const LINE_ACCOUNT_STORAGE_KEY = "line_account_data";

/**
 * 로컬 스토리지에서 라인 계정 정보를 가져옵니다
 * @param walletId 지갑 주소
 * @returns 저장된 라인 계정 정보 또는 null
 */
const getLineAccountFromStorage = (walletId: string): LineAccount | null => {
  try {
    const stored = localStorage.getItem(LINE_ACCOUNT_STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    return data[walletId] || null;
  } catch (error) {
    console.error("Failed to get line account from storage:", error);
    return null;
  }
};

/**
 * 로컬 스토리지에 라인 계정 정보를 저장합니다
 * @param walletId 지갑 주소
 * @param lineAccount 저장할 라인 계정 정보
 */
const saveLineAccountToStorage = (
  walletId: string,
  lineAccount: LineAccount
): void => {
  try {
    const stored = localStorage.getItem(LINE_ACCOUNT_STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : {};

    data[walletId] = lineAccount;
    localStorage.setItem(LINE_ACCOUNT_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save line account to storage:", error);
  }
};

/**
 * 지갑과 라인 계정을 연결합니다
 * @param walletId 지갑 주소
 * @param lineId 라인 ID
 * @returns Promise<void>
 *
 * @description
 * USE_MOCK_API = true: 로컬 스토리지에 저장 (개발용)
 * USE_MOCK_API = false: 실제 API 호출
 * 실제 API URL: POST {API_BASE_URL}/api/line/connect
 *
 * @example
 * // 요청 본문 예시:
 * // {
 * //   "walletId": "0x742d35Cc6874C41532CF90",
 * //   "lineId": "user123"
 * // }
 */
export const connectLineAccount = async (
  walletId: string,
  lineId: string
): Promise<void> => {
  if (USE_MOCK_API) {
    // Mock 모드: 로컬 스토리지에 저장
    await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

    const newLineAccount: LineAccount = {
      lineId,
      walletId,
      connectedAt: new Date(),
    };

    saveLineAccountToStorage(walletId, newLineAccount);
    console.log("Line account connected successfully (mock mode)");
    return;
  }

  // 실제 API 호출
  try {
    const response = await fetch(`${API_BASE_URL}/api/line/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        walletId,
        lineId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to connect line account: ${response.statusText}`);
    }

    console.log("Line account connected successfully");
  } catch (error) {
    console.error("Error connecting line account:", error);
    throw error;
  }
};

/**
 * 라인 계정 연결 상태를 조회합니다
 * @param walletId 지갑 주소
 * @returns 연결된 라인 계정 정보 또는 null
 *
 * @description
 * USE_MOCK_API = true: 로컬 스토리지에서 조회 (개발용)
 * USE_MOCK_API = false: 실제 API 호출
 * 실제 API URL: GET {API_BASE_URL}/api/line/status?walletId={walletId}
 *
 * @example
 * // 요청 URL 예시:
 * // GET http://example.com/api/line/status?walletId=0x742d35Cc6874C41532CF90
 *
 * // 응답 예시:
 * // {
 * //   "lineAccount": {
 * //     "lineId": "user123",
 * //     "walletId": "0x742d35Cc6874C41532CF90",
 * //   }
 * // }
 */
export const getLineAccountStatus = async (
  walletId: string
): Promise<LineAccount | null> => {
  if (USE_MOCK_API) {
    // Mock 모드: 로컬 스토리지에서 조회
    await new Promise((resolve) => setTimeout(resolve, 200)); // 네트워크 지연 시뮬레이션
    return getLineAccountFromStorage(walletId);
  }

  // 실제 API 호출 (구현 필요)
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/line/status?walletId=${encodeURIComponent(walletId)}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get line account status: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.lineAccount || null;
  } catch (error) {
    console.error("Error getting line account status:", error);
    return null;
  }
};
