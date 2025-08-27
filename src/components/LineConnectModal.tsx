import { useState } from "react";
import { X } from "lucide-react";
import { useAtom } from "jotai";
import { lineAccountAtom, isLineConnectedAtom } from "../atoms/lineAtoms";
import { connectLineAccount } from "../api/line";
import { useWalletAccount } from "../hooks/useWalletAccount";

interface LineConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LineConnectModal = ({ isOpen, onClose }: LineConnectModalProps) => {
  const [lineId, setLineId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [, setLineAccount] = useAtom(lineAccountAtom);
  const [, setIsLineConnected] = useAtom(isLineConnectedAtom);
  const { account } = useWalletAccount();

  const handleConnect = async () => {
    if (!lineId.trim() || !account) {
      setError("라인 ID를 입력해주세요.");
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      await connectLineAccount(account, lineId.trim());
      
      // 성공 시 전역 상태 업데이트
      const newLineAccount = {
        lineId: lineId.trim(),
        walletId: account,
        connectedAt: new Date(),
      };
      
      setLineAccount(newLineAccount);
      setIsLineConnected(true);
      onClose();
    } catch (error) {
      setError("라인 계정 연결에 실패했습니다. 다시 시도해주세요.");
      console.error("Line connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConnect();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">라인 계정 연결</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <label htmlFor="lineId" className="block text-sm font-medium text-gray-700 mb-2">
              라인 ID
            </label>
            <input
              id="lineId"
              type="text"
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="라인 ID를 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isConnecting}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="text-xs text-gray-500">
            지갑과 라인 계정을 1:1로 연결합니다. 연결 후에는 변경할 수 없습니다.
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            disabled={isConnecting}
          >
            취소
          </button>
          <button
            onClick={handleConnect}
            disabled={isConnecting || !lineId.trim()}
            className="flex-1 px-4 py-2 text-sm text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? "연결 중..." : "연결"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineConnectModal;
