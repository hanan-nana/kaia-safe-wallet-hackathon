import React from "react";
import TransactionItem from "./TransactionItem";
import { mockTransactions } from "../../data/mockTransactions";

const TransactionDetails: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Date Header */}
      <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        AUG 22, 2025
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            title={transaction.title}
            description={transaction.description}
            time={transaction.time}
            status={transaction.status}
            creator={transaction.creator}
            factory={transaction.factory}
            mastercopy={transaction.mastercopy}
            transactionHash={transaction.transactionHash}
            createdAt={transaction.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionDetails;
