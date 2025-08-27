import { useState } from "react";
import { useAtomValue } from "jotai";
import TransactionQueue from "../components/TransactionQueue/TransactionQueue";
import { selectedWalletAtom, walletsAtom } from "../atoms/walletAtoms";
import { useQueueApi } from "../hooks/useQueueApi";
import { WalletDeployment } from "../components/wallet";
import { X } from "lucide-react";

type TabType = "queue" | "history" | "messages";

interface Tab {
  id: TabType;
  label: string;
}

const TransactionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("queue");
  const [showDeployModal, setShowDeployModal] = useState(false);
  const selectedWallet = useAtomValue(selectedWalletAtom);
  const allWallets = useAtomValue(walletsAtom);

  // Queue count for tab display - API에서 가져온 실제 큐 개수
  const { queue } = useQueueApi(selectedWallet?.address || null);
  const queueCount = queue.length;

  const tabs: Tab[] = [
    { id: "queue", label: "Queue" },
    { id: "history", label: "History" },
    // { id: "messages", label: "Messages" },
  ];

  // Safe Wallet이 없을 때 안내 메시지만 표시
  if (allWallets.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h3 className="font-semibold text-green-gray-600 mb-1 text-lg">
            No Safe Wallets
          </h3>
          <p className="text-sm text-green-gray-400 mb-4">
            우선 Safe Wallet을 생성해주세요
          </p>
          <button
            onClick={() => setShowDeployModal(true)}
            className="px-8 py-2 bg-primary hover:bg-primary-dark text-white rounded-full transition-colors font-medium"
          >
            Create Account
          </button>
        </div>

        {/* Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Safe 지갑 배포</h2>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <WalletDeployment
                  onSuccess={() => {
                    setShowDeployModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-green-gray-700">
          Transactions
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-900"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center gap-2">
              <span>{tab.label}</span>
              {tab.id === "queue" && queueCount > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {queueCount}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "history" && (
          <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
            <div className="text-center">
              <p>No transaction history</p>
            </div>
          </div>
        )}
        {activeTab === "queue" && <TransactionQueue />}
        {activeTab === "messages" && (
          <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
            No messages
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
