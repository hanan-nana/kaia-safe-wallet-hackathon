import ConnectStatus from "./ConnectStatus.tsx";
import WalletInfo from "./WalletInfo.tsx";
import useDisconnectWallet from "../../../hooks/useDisconnectWallet";
import { Power } from "lucide-react";

const Sidebar = () => {
  const disconnect = useDisconnectWallet();

  return (
    <div className="w-64 flex flex-col mb-4">
      {/* Header Section - Logo only */}
      <div className="mb-2">
        {/* Logo */}
        <div
          className="text-lg font-bold text-left py-3 pl-4 text-primary"
          style={{
            fontFamily: "Boldonse, sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: "1.4",
          }}
        >
          HOHO Wallet
        </div>
      </div>

      {/* Wallet Info Summary */}
      <div className="mb-6">
        <WalletInfo />
      </div>

      {/* Safe Wallet Management */}
      <div className="mb-8">
        <ConnectStatus />

        {/* New Transaction Button */}
        {/* <Button variant="primary" size="lg" fullWidth>
          New transaction
        </Button> */}
      </div>

      {/* Navigation */}
      {/* <nav className="flex flex-col gap-1 mb-6">
        <NavigationItem to="/">Home</NavigationItem>
        <NavigationItem to="/">Transactions</NavigationItem>
      </nav> */}

      {/* Disconnect Button at bottom */}
      <div className="mt-auto">
        <button
          onClick={disconnect}
          className="w-full text-sm text-green-gray-400 p-4 py-3 font-semibold hover:bg-black/5 rounded-lg transition-colors flex items-center gap-2"
        >
          <Power className="w-4 h-4" />
          연결 해제
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
