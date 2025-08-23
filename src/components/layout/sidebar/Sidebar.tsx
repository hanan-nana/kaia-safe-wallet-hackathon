import React from "react";
import Button from "../../button/Button.tsx";
import ServerInfo from "../header/ServerInfo.tsx";
import NavigationItem from "./NavigationItem.tsx";
import { ChevronRight } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 bg-glass-primary border-r border-gray-200 flex flex-col p-4">
      {/* Logo */}
      <div className="mb-6">
        <div className="flex items-center gap-1 text-xl font-semibold">
          <span className="text-lime-500">Duho's</span>
          <span className="text-black">Wallet</span>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="mb-8">
        {/* Network Badge */}
        <div className="flex items-center p-3 bg-gray-800 rounded-lg mb-4 text-white">
          <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center font-bold text-white mr-3">
            KN
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-0.5">KAIROS Safe Net</div>
            <div className="text-xs text-gray-400 mb-0.5">
              kairos:0xf166...42b6
            </div>
            <div className="text-xs text-gray-400">0.00 USD</div>
          </div>
          <ChevronRight size={16} />
        </div>

        {/* New Transaction Button */}
        <Button variant="primary" size="lg" fullWidth>
          New transaction
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-6">
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/transactions">Transactions</NavigationItem>
      </nav>

      {/* Server Info at bottom */}
      <div className="mt-auto">
        <ServerInfo />
      </div>
    </div>
  );
};

export default Sidebar;
