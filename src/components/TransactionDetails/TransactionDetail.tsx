import React from "react";
import { Copy, ExternalLink } from "lucide-react";
import { AddressInfo } from "../../data/mockTransactions";

interface TransactionDetailProps {
  creator: AddressInfo;
  factory: AddressInfo;
  mastercopy: AddressInfo;
  transactionHash: string;
  createdAt: string;
  borderColor: string;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  creator,
  factory,
  mastercopy,
  transactionHash,
  createdAt,
  borderColor,
}) => {
  const AddressCard: React.FC<{ label: string; info: AddressInfo }> = ({
    label,
    info,
  }) => (
    <div className="mb-4">
      <div className="text-xs font-medium text-gray-700 mb-2">{label}:</div>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
        <div
          className={`w-8 h-8 ${info.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
        >
          {info.avatar}
        </div>
        <div className="flex-1">
          {info.name && (
            <div className="text-sm font-medium text-gray-900 mb-0.5">
              {info.name}
            </div>
          )}
          <div className="text-xs font-mono text-gray-600">{info.address}</div>
        </div>
        <div className="flex gap-2">
          <button className="w-7 h-7 border border-gray-300 bg-white rounded flex items-center justify-center text-xs hover:bg-gray-50">
            <Copy size={12} />
          </button>
          <button className="w-7 h-7 border border-gray-300 bg-white rounded flex items-center justify-center text-xs hover:bg-gray-50">
            <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`px-4 pb-4 border-t ${borderColor} bg-white`}>
      <div className="pt-4">
        {/* Creator */}
        <AddressCard label="Creator" info={creator} />

        {/* Factory */}
        <AddressCard label="Factory" info={factory} />

        {/* Mastercopy */}
        <AddressCard label="Mastercopy" info={mastercopy} />

        {/* Transaction Meta */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className="text-gray-600">Transaction hash:</span>
            <span className="text-gray-900 font-mono">{transactionHash}</span>
            <button className="w-7 h-7 border border-gray-300 bg-white rounded flex items-center justify-center text-xs hover:bg-gray-50">
              <Copy size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-600">Created:</span>
            <span className="text-gray-900">{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
