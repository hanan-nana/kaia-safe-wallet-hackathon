import React, { useState } from "react";
import TransactionDetails from "../components/TransactionDetails/TransactionDetails.tsx";
import ServerInfo from "../components/ServerInfo/ServerInfo.tsx";
import { Filter } from "lucide-react";

type TabType = "queue" | "history" | "messages";

interface Tab {
  id: TabType;
  label: string;
}

const TransactionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("history");

  const tabs: Tab[] = [
    { id: "queue", label: "Queue" },
    { id: "history", label: "History" },
    { id: "messages", label: "Messages" },
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
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "history" && <TransactionDetails />}
        {activeTab === "queue" && (
          <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
            No pending transactions
          </div>
        )}
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
