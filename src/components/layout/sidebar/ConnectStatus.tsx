import React, { useState } from "react";
import { ChevronRight, Copy } from "lucide-react";

const ConnectStatus = () => {
  const [walletName, setWalletName] = useState("KAIROS Safe Net");

  return (
    <div>
      {/* Main Content */}
      <div className="p-4 bg-glass-dark-secondary rounded-xl">
        {/* Wallet Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar with 1/1 badge */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#132F2B] flex items-center justify-center text-white font-bold text-sm">
                {walletName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Wallet Details */}
            <div>
              <h3 className="font-semibold text-green-gray-900">
                {walletName}
              </h3>
              <div className="flex items-center gap-1">
                <p className="text-sm text-green-gray-600">
                  kairos:0x1166...42b6
                </p>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-black/50 mb-1">Total Balance</p>
          <p className="text-xl font-bold text-gray-800">0.00 USD</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectStatus;
