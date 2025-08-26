import { useState } from "react";
import TransactionQueue from "../components/TransactionQueue/TransactionQueue";
import { mockTransactionQueue } from "../data/mockTransactionQueue";

type TabType = "queue" | "history" | "messages";

interface Tab {
  id: TabType;
  label: string;
}

const TransactionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("history");

  // Queue count for tab display
  const queueCount = mockTransactionQueue.length;

  const tabs: Tab[] = [
    { id: "queue", label: "Queue" },
    { id: "history", label: "History" },
    // { id: "messages", label: "Messages" },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
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
