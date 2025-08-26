import { useAtomValue } from "jotai";
import { deployedWalletsByChainAtom } from "../../atoms/walletAtoms";

interface DeployedWalletsListProps {
  chainId: string;
}

export const DeployedWalletsList = ({ chainId }: DeployedWalletsListProps) => {
  const deployedWalletsByChain = useAtomValue(deployedWalletsByChainAtom);
  const wallets = deployedWalletsByChain(chainId);

  if (Object.keys(wallets).length === 0) {
    return (
      <div className="empty-state">
        <p>No deployed wallets found</p>
      </div>
    );
  }

  return (
    <div className="deployed-wallets-list">
      <h3>Deployed Wallets ({Object.keys(wallets).length})</h3>

      {Object.entries(wallets).map(([address, wallet]) => (
        <div key={address} className="wallet-card">
          <div className="wallet-header">
            <h4>{wallet.name}</h4>
            <span className="wallet-address">{address}</span>
          </div>

          <div className="wallet-details">
            <p>
              <strong>Creator:</strong> {wallet.creator}
            </p>
            <p>
              <strong>Deployed:</strong>{" "}
              {new Date(wallet.deployedAt).toLocaleString()}
            </p>
            {wallet.destructAddress && (
              <p>
                <strong>Destruct Address:</strong> {wallet.destructAddress}
              </p>
            )}
            {wallet.duration && (
              <p>
                <strong>Duration:</strong> {wallet.duration} seconds
              </p>
            )}
          </div>

          <div className="wallet-actions">
            <a
              href={`https://baobab.scope.klaytn.com/tx/${wallet.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Transaction
            </a>
            <a
              href={`https://baobab.scope.klaytn.com/account/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Contract
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
