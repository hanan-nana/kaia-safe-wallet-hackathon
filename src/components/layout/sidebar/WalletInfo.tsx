import { Copy, Check, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { lineAccountAtom, isLineConnectedAtom } from "../../../atoms/lineAtoms";
import { useWalletAccount } from "../../../hooks/useWalletAccount";
import { useWalletBalance } from "../../../hooks/useWalletBalance";
import useDisconnectWallet from "../../../hooks/useDisconnectWallet";
import LineConnectModal from "../../LineConnectModal";
import { getLineAccountStatus } from "../../../api/line";

const WalletInfo = () => {
  const { account, walletLabel, chainId, isConnected } = useWalletAccount();
  const { balance, loading } = useWalletBalance();
  const disconnect = useDisconnectWallet();
  const [copied, setCopied] = useState(false);
  const [showLineModal, setShowLineModal] = useState(false);
  const [lineAccount, setLineAccount] = useAtom(lineAccountAtom);
  const [isLineConnected, setIsLineConnected] = useAtom(isLineConnectedAtom);

  // 컴포넌트 마운트 시 로컬 스토리지에서 라인 계정 상태 불러오기
  useEffect(() => {
    const loadLineAccountStatus = async () => {
      if (account) {
        try {
          const storedLineAccount = await getLineAccountStatus(account);
          if (storedLineAccount) {
            setLineAccount(storedLineAccount);
            setIsLineConnected(true);
          }
        } catch (error) {
          console.error("Failed to load line account status:", error);
        }
      }
    };

    loadLineAccountStatus();
  }, [account, setLineAccount, setIsLineConnected]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 원래 상태로 복원
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
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
        <div className="text-center">
          {/* 아바타 */}
          <div className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
            {(walletLabel || "W").charAt(0).toUpperCase()}
          </div>

          {/* 지갑 정보 */}
          <div>
            <div className="text-lg font-semibold text-green-gray-900">
              {walletLabel || "Connected Wallet"}
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="text-sm font-regular text-green-gray-600">
                {account.slice(0, 8)}...{account.slice(-6)}
              </div>
              <button
                onClick={() => copyToClipboard(account)}
                className="p-1.5 hover:bg-black/10 rounded-md transition-colors"
                title={copied ? "복사됨" : "주소 복사"}
              >
                {copied ? (
                  <Check className="w-3 h-3 text-primary-dark" />
                ) : (
                  <Copy className="w-3 h-3 text-green-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="space-y-1">
        {/* 네트워크 */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-green-gray-600">네트워크</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-gray-700">
              {getNetworkName(chainId)}
            </span>
          </div>
        </div>

        {/* 잔액 */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-green-gray-600">잔액</span>
          <span className="text-sm font-medium text-green-gray-700">
            {loading ? "..." : `${balance} KAIA`}
          </span>
        </div>

        {/* 라인 계정 */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-green-gray-600">라인 계정</span>
          {isLineConnected && lineAccount ? (
            <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
              연결됨
            </span>
          ) : (
            <button
              onClick={() => setShowLineModal(true)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Plus className="w-3 h-3" />
              연결하기
            </button>
          )}
        </div>
      </div>

      {/* 라인 연결 모달 */}
      <LineConnectModal
        isOpen={showLineModal}
        onClose={() => setShowLineModal(false)}
      />
    </div>
  );
};

export default WalletInfo;
