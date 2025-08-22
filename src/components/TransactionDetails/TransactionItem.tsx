import React, { useState } from "react";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import TransactionDetail from "./TransactionDetail";
import { AddressInfo } from "../../data/mockTransactions";

interface TransactionItemProps {
  title: string;
  description: string;
  time: string;
  status: "success" | "pending" | "failed";
  creator: AddressInfo;
  factory: AddressInfo;
  mastercopy: AddressInfo;
  transactionHash: string;
  createdAt: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  description,
  time,
  status,
  creator,
  factory,
  mastercopy,
  transactionHash,
  createdAt,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-500",
      icon: <Check size={14} className="text-white" />,
      statusText: "Success",
      statusStyle: "text-green-700 bg-green-100",
      detailBorderColor: "border-green-200",
    },
    pending: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconBg: "bg-yellow-500",
      icon: <div className="w-2 h-2 bg-white rounded-full" />,
      statusText: "Pending",
      statusStyle: "text-yellow-700 bg-yellow-100",
      detailBorderColor: "border-yellow-200",
    },
    failed: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-500",
      icon: <div className="text-white text-xs">✕</div>,
      statusText: "Failed",
      statusStyle: "text-red-700 bg-red-100",
      detailBorderColor: "border-red-200",
    },
  };

  const config = statusConfig[status];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${config.bgColor} border ${config.borderColor} rounded-lg overflow-hidden`}
    >
      {/* Transaction Header */}
      <div className="flex items-center p-4 gap-3">
        <div
          className={`w-8 h-8 ${config.iconBg} rounded-full flex items-center justify-center`}
        >
          {config.icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 mb-0.5">
            {title}
          </div>
          <div className="text-xs text-gray-600">{description}</div>
        </div>
        <div className="text-xs text-gray-600 mr-3">{time}</div>
        <div
          className={`text-xs font-medium px-2 py-1 rounded ${config.statusStyle}`}
        >
          {config.statusText}
        </div>
        <button
          onClick={handleToggle}
          className="text-gray-400 text-base ml-2 p-1 hover:text-gray-600"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <TransactionDetail
          creator={creator}
          factory={factory}
          mastercopy={mastercopy}
          transactionHash={transactionHash}
          createdAt={createdAt}
          borderColor={config.detailBorderColor}
        />
      )}
    </div>
  );
};

export default TransactionItem;
