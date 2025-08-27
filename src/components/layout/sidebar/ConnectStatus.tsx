import { useState, useCallback } from "react";
import { ChevronRight, Copy, Plus, X } from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
import { selectedWalletAtom, walletsAtom } from "../../../atoms/walletAtoms";
import { WalletDeployment } from "../../wallet";
import { useWalletAccount } from "../../../hooks/useWalletAccount";
import useConnectWallet from "../../../hooks/useConnect";

const ConnectStatus = () => {
  const [selectedWallet, setSelectedWallet] = useAtom(selectedWalletAtom);
  const allWallets = useAtomValue(walletsAtom);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // 실제 지갑 연결 상태 확인
  const { isConnected } = useWalletAccount();
  const connectWallet = useConnectWallet();

  // 모든 지갑 목록을 사용 (필터링 제거)
  const wallets = allWallets;

  // 새 지갑 배포 후 목록 갱신을 위한 함수 (Jotai는 자동으로 반응하므로 빈 함수)
  const handleWalletDeployed = useCallback(() => {
    // Jotai atom이 자동으로 업데이트되므로 별도 작업 불필요
  }, []);

  const handleWalletSelect = (_address: string, walletData: any) => {
    setSelectedWallet(walletData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 지갑이 연결되지 않은 경우
  if (!isConnected) return null;

  return (
    <div>
      {/* Main Content */}
      <div className="rounded-xl">
        {/* 상단 텍스트 버튼들 - 지갑이 있을 때만 표시 */}
        {wallets.length > 0 && (
          <div className="flex items-center justify-between mb-4 px-2">
            <button className="text-sm text-green-gray-500 font-semibold hover:text-green-gray-900 transition-colors">
              지갑 목록
            </button>
            <button
              onClick={() => setShowDeployModal(true)}
              className="flex items-center gap-1 text-sm text-green-gray-400 font-regular hover:text-green-gray-600 transition-colors"
            >
              <Plus className="w-3 h-3" />새 계좌 만들기
            </button>
          </div>
        )}

        {/* Safe Wallet이 없을 때 안내 메시지 */}
        {wallets.length === 0 && (
          <div className="text-center py-8">
            <h3 className="font-semibold text-green-gray-600 mb-1">
              No Safe Wallets
            </h3>
            <p className="text-sm text-green-gray-400 mb-4">
              Deploy your first Safe wallet to get started
            </p>
          </div>
        )}

        {/* Safe Wallet 목록 */}
        {wallets.length > 0 && (
          <div className="space-y-2 mb-4">
            {wallets.map((wallet) => (
              <button
                key={wallet.address}
                onClick={() => handleWalletSelect(wallet.address, wallet)}
                className={`w-full p-3 rounded-xl transition-colors text-left ${
                  selectedWallet && selectedWallet.address === wallet.address
                    ? "bg-glass-strong shadow-glass"
                    : "hover:bg-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                    {wallet.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-gray-900 truncate">
                      {wallet.name}
                    </p>
                    <p className="text-xs text-green-gray-600 truncate">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Deploy Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Safe 지갑 배포</h2>
              <button
                onClick={() => setShowDeployModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <WalletDeployment
                onSuccess={() => {
                  setShowDeployModal(false);
                  handleWalletDeployed();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectStatus;
