import { useState } from "react";
import { ChevronRight, Copy, Plus, X } from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
import {
  selectedWalletAtom,
  deployedWalletsByChainAtom,
} from "../../../atoms/walletAtoms";
import { WalletDeployment } from "../../wallet";
import { useWalletAccount } from "../../../hooks/useWalletAccount";
import useConnectWallet from "../../../hooks/useConnect";

const ConnectStatus = () => {
  const [selectedWallet, setSelectedWallet] = useAtom(selectedWalletAtom);
  const deployedWalletsByChain = useAtomValue(deployedWalletsByChainAtom);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // 실제 지갑 연결 상태 확인
  const { isConnected } = useWalletAccount();
  const connectWallet = useConnectWallet();

  const chainId = "1001"; // Klaytn Baobab testnet
  const wallets = deployedWalletsByChain(chainId);
  const walletEntries = Object.entries(wallets);

  const handleWalletSelect = (address: string, walletData: any) => {
    setSelectedWallet({
      chainId,
      address,
      ...walletData,
    });
    setShowWalletList(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 지갑이 연결되지 않은 경우 - 연결을 먼저 유도
  if (!isConnected) {
    return (
      <div className="p-4 bg-glass-dark-secondary rounded-xl">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Copy className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="font-semibold text-green-gray-900 mb-2">
            Wallet Not Connected
          </h3>
          <p className="text-sm text-green-gray-600 mb-4">
            Please connect your wallet to view and manage Safe wallets
          </p>
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  // 지갑은 연결되었지만 Safe wallet이 없는 경우
  if (!selectedWallet && walletEntries.length === 0) {
    return (
      <>
        <div className="p-4 bg-glass-dark-secondary rounded-xl">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-green-gray-900 mb-2">
              No Safe Wallets
            </h3>
            <p className="text-sm text-green-gray-600 mb-4">
              Deploy your first Safe wallet to get started
            </p>
            <button
              onClick={() => setShowDeployModal(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              Deploy Safe Wallet
            </button>
          </div>
        </div>

        {/* Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Deploy Safe Wallet</h2>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <WalletDeployment onSuccess={() => setShowDeployModal(false)} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // 지갑이 연결되었고 Safe wallet 목록이 있지만 선택되지 않은 경우
  if (isConnected && !selectedWallet && walletEntries.length > 0) {
    return (
      <>
        <div className="p-4 bg-glass-dark-secondary rounded-xl">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-gray-900">
                Select a Safe Wallet
              </h3>
              <button
                onClick={() => setShowDeployModal(true)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Deploy new wallet"
              >
                <Plus className="w-4 h-4 text-green-gray-600" />
              </button>
            </div>
            <p className="text-sm text-green-gray-600 mb-4">
              Choose from your deployed wallets
            </p>
          </div>

          <div className="space-y-2">
            {walletEntries.map(([address, wallet]) => (
              <button
                key={address}
                onClick={() => handleWalletSelect(address, wallet)}
                className="w-full p-3 bg-white/50 hover:bg-white/70 rounded-lg transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#132F2B] flex items-center justify-center text-white font-bold text-xs">
                    {wallet.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-gray-900 truncate">
                      {wallet.name}
                    </p>
                    <p className="text-xs text-green-gray-600 truncate">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-green-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Deploy Safe Wallet</h2>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <WalletDeployment onSuccess={() => setShowDeployModal(false)} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // 지갑이 연결되었고 Safe wallet이 선택된 경우
  if (!isConnected || !selectedWallet) return null; // 추가 안전장치

  return (
    <div>
      {/* Main Content */}
      <div className="p-4 bg-glass-dark-secondary rounded-xl">
        {/* Wallet Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#132F2B] flex items-center justify-center text-white font-bold text-sm">
                {selectedWallet.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Wallet Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-green-gray-900">
                {selectedWallet.name}
              </h3>
              <div className="flex items-center gap-1">
                <p className="text-sm text-green-gray-600 truncate">
                  kairos:{selectedWallet.address.slice(0, 6)}...
                  {selectedWallet.address.slice(-4)}
                </p>
                <button
                  onClick={() => copyToClipboard(selectedWallet.address)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Copy className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {/* Deploy New Wallet Button */}
            <button
              onClick={() => setShowDeployModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Deploy new wallet"
            >
              <Plus className="w-4 h-4 text-green-gray-600" />
            </button>

            {/* Change Wallet Button */}
            {walletEntries.length > 1 && (
              <button
                onClick={() => setShowWalletList(!showWalletList)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Switch wallet"
              >
                <ChevronRight
                  className={`w-4 h-4 text-green-gray-600 transition-transform ${
                    showWalletList ? "rotate-90" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Wallet List (when expanded) */}
        {showWalletList && walletEntries.length > 1 && (
          <div className="mb-4 space-y-2">
            {walletEntries
              .filter(([address]) => address !== selectedWallet.address)
              .map(([address, wallet]) => (
                <button
                  key={address}
                  onClick={() => handleWalletSelect(address, wallet)}
                  className="w-full p-2 bg-white/30 hover:bg-white/50 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#132F2B] flex items-center justify-center text-white font-bold text-xs">
                      {wallet.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-gray-900 truncate">
                        {wallet.name}
                      </p>
                      <p className="text-xs text-green-gray-600 truncate">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs text-black/50 mb-1">Total Balance</p>
          <p className="text-xl font-bold text-gray-800">0.00 USD</p>
        </div>
      </div>

      {/* Deploy Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Deploy Safe Wallet</h2>
              <button
                onClick={() => setShowDeployModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <WalletDeployment onSuccess={() => setShowDeployModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectStatus;
