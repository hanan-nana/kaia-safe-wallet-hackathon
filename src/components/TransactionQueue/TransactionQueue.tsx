import { Shield, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { useAtomValue } from "jotai";
import { selectedWalletAtom } from "../../atoms/walletAtoms";
import { useQueueApi } from "../../hooks/useQueueApi";
import { QueueItem } from "../../api/types";

const TransactionQueue = () => {
  const selectedWallet = useAtomValue(selectedWalletAtom);
  const { queue, loading, error, deleteItem, deleteLoading } = useQueueApi(
    selectedWallet?.address || null
  );

  const getStatusIcon = (status: QueueItem["type"]) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "risky":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "dangerous":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: QueueItem["type"]) => {
    switch (status) {
      case "safe":
        return "bg-green-50 border-green-200";
      case "risky":
        return "bg-yellow-50 border-yellow-200";
      case "dangerous":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: QueueItem["type"]) => {
    switch (status) {
      case "safe":
        return "Safe";
      case "risky":
        return "Risky";
      case "dangerous":
        return "Dangerous";
      default:
        return "Unknown";
    }
  };

  // Safe Wallet이 선택되지 않은 경우
  if (!selectedWallet) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
        <div className="text-center">
          <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p>Safe Wallet을 선택해주세요</p>
        </div>
      </div>
    );
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
        <div className="text-center">
          <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-pulse" />
          <p>거래 큐를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-red-600 text-sm">
        <div className="text-center">
          <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p>에러: {error}</p>
        </div>
      </div>
    );
  }

  // 빈 큐 상태
  if (queue.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
        <div className="text-center">
          <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p>대기 중인 거래가 없습니다</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (index: number) => {
    const success = await deleteItem(index);
    if (!success) {
      // 에러는 이미 useQueueApi에서 처리됨
      console.log("거래 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Queue List */}
      <div className="space-y-3">
        {queue.map((item) => (
          <div
            key={item.index}
            className={`border rounded-lg p-4 transition-all ${getStatusColor(
              item.type
            )}`}
          >
            <div className="flex items-start justify-between">
              {/* Left side - Transaction info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-500">
                    #{item.index}
                  </span>
                  {getStatusIcon(item.type)}
                  <span
                    className={`text-sm font-medium ${
                      item.type === "safe"
                        ? "text-green-700"
                        : item.type === "risky"
                        ? "text-yellow-700"
                        : item.type === "dangerous"
                        ? "text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    {getStatusText(item.type)}
                  </span>
                </div>

                <p className="text-gray-900">{item.description}</p>
              </div>

              {/* Right side - Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <div className="flex flex-col gap-1">
                  <button className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    실행
                  </button>
                  <button
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDelete(item.index)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "삭제중..." : "차단"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionQueue;
