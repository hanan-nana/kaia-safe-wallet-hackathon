import { Copy } from "lucide-react";
import { useWalletAccount } from "../../../hooks/useWalletAccount";
import { useWalletBalance } from "../../../hooks/useWalletBalance";
import useDisconnectWallet from "../../../hooks/useDisconnectWallet";

const WalletInfo = () => {
  const { account, walletLabel, chainId, isConnected } = useWalletAccount();
  const { balance, loading } = useWalletBalance();
  const disconnect = useDisconnectWallet();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: 토스트 메시지 추가 가능
  };

  const getNetworkName = (chainId: string) => {
    switch (chainId) {
      case "1001":
        return "Kairos";
      case "8217":
        return "Kaia Mainnet";
      default:
        return "Unknown";
    }
  };

  if (!isConnected || !account) {
    return null;
  }

  return (
    <div className="bg-glass-dark-secondary rounded-xl p-4">
      {/* 지갑 이름과 주소 */}
      <div className="mb-4">
        <div className="text-sm font-semibold text-green-gray-900 mb-1">
          {walletLabel || "Connected Wallet"}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-green-gray-600 truncate">
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(account)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="주소 복사"
          >
            <Copy className="w-3 h-3 text-green-gray-600" />
          </button>
        </div>
      </div>

      {/* 네트워크 정보와 잔액 */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-gray-600">
              {getNetworkName(chainId)}
            </span>
          </div>

          {/* 잔액 정보 */}
          <div className="text-right">
            <div className="text-xs text-green-gray-600">잔액</div>
            <div className="text-sm font-semibold text-green-gray-900">
              {loading ? "..." : `${balance} KAIA`}
            </div>
          </div>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex gap-2">
        <button
          onClick={disconnect}
          className="flex-1 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          연결 해제
        </button>
      </div>
    </div>
  );
};

export default WalletInfo;
