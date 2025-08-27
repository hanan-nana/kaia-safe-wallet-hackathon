import ConnectStatus from "./ConnectStatus.tsx";
import WalletInfo from "./WalletInfo.tsx";
import SecurityNotice from "./SecurityNotice.tsx";
import LineConnectModal from "../../LineConnectModal";
import useDisconnectWallet from "../../../hooks/useDisconnectWallet";
import { Power } from "lucide-react";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { isLineConnectedAtom } from "../../../atoms/lineAtoms";

const Sidebar = () => {
  const disconnect = useDisconnectWallet();
  const [showLineModal, setShowLineModal] = useState(false);
  const isLineConnected = useAtomValue(isLineConnectedAtom);

  return (
    <div className="w-72 flex flex-col mb-4 mx-2">
      {/* Header Section - Logo and Disconnect */}
      <div className="mb-2">
        <div className="flex items-center justify-between py-3 pl-4">
          {/* Logo */}
          <div
            className="text-lg font-bold text-primary"
            style={{
              fontFamily: "Boldonse, sans-serif",
              letterSpacing: "-0.04em",
              lineHeight: "1.4",
            }}
          >
            HOHO Wallet
          </div>

          {/* Disconnect Button - 아이콘만 */}
          <button
            onClick={disconnect}
            className="p-2 text-green-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="연결 해제"
          >
            <Power className="w-5 h-5 stroke-2" />
          </button>
        </div>
      </div>

      {/* Wallet Info Summary - 최상단으로 이동 */}
      <div className="mb-4">
        <WalletInfo />
      </div>

      {/* Line Account Security Notice - 라인 계정이 연결되지 않았을 때만 표시 */}
      {!isLineConnected && (
        <SecurityNotice onConnect={() => setShowLineModal(true)} />
      )}

      {/* Safe Wallet Management - 나머지 공간을 모두 차지 */}
      <div className="flex-1 mb-4">
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

      {/* Line Connect Modal */}
      <LineConnectModal
        isOpen={showLineModal}
        onClose={() => setShowLineModal(false)}
      />
    </div>
  );
};

export default Sidebar;
