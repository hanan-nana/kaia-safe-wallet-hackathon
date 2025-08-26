import { useState, useEffect } from "react";
import { Shield, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import {
  QueuedTransaction,
  mockTransactionQueue,
} from "../../data/mockTransactionQueue";

const TransactionQueue = () => {
  const [queuedTransactions, setQueuedTransactions] = useState<
    QueuedTransaction[]
  >([]);

  useEffect(() => {
    // Load initial mock data with analysis results already complete
    setQueuedTransactions(mockTransactionQueue);
  }, []);

  const getStatusIcon = (status: QueuedTransaction["status"]) => {
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

  const getStatusColor = (status: QueuedTransaction["status"]) => {
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

  const getStatusText = (status: QueuedTransaction["status"]) => {
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

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  if (queuedTransactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
        <div className="text-center">
          <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p>No transactions in queue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Queue List */}
      <div className="space-y-3">
        {queuedTransactions.map((tx) => (
          <div
            key={tx.id}
            className={`border rounded-lg p-4 transition-all ${getStatusColor(
              tx.status
            )}`}
          >
            <div className="flex items-start justify-between">
              {/* Left side - Transaction info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-500">
                    #{tx.id}
                  </span>
                  {getStatusIcon(tx.status)}
                  <span
                    className={`text-sm font-medium ${
                      tx.status === "safe"
                        ? "text-green-700"
                        : tx.status === "risky"
                        ? "text-yellow-700"
                        : tx.status === "dangerous"
                        ? "text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    {getStatusText(tx.status)}
                  </span>
                </div>

                <p className="text-gray-900">{tx.description}</p>
              </div>

              {/* Right side - Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <div className="flex flex-col gap-1">
                  <button className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                    실행
                  </button>
                  <button className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                    차단
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
