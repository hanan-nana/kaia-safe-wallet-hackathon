import React from "react";
import Button from "../../button/Button.tsx";
import ServerInfo from "../header/ServerInfo.tsx";
import NavigationItem from "./NavigationItem.tsx";
import { ChevronRight } from "lucide-react";
import ConnectStatus from "./ConnectStatus.tsx";

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 flex flex-col">
      {/* Wallet Info */}
      <div className="mb-8">
        {/* Network Badge */}
        <ConnectStatus />

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
