import { useAtomValue } from "jotai";
import { deployedWalletsAtom } from "../../atoms/walletAtoms";

interface DeployedWalletsListProps {}

export const DeployedWalletsList = ({}: DeployedWalletsListProps) => {
  const wallets = useAtomValue(deployedWalletsAtom);

  if (wallets.length === 0) {
    return (
      <div className="empty-state">
        <p>No deployed wallets found</p>
      </div>
    );
  }

  return (
    <div className="deployed-wallets-list">
      <h3>Deployed Wallets ({wallets.length})</h3>

      {wallets.map((wallet) => (
        <div key={wallet.address} className="wallet-card">
          <div className="wallet-header">
            <h4>{wallet.name}</h4>
            <span className="wallet-address">{wallet.address}</span>
          </div>

          <div className="wallet-details">
            <p>
              <strong>Deployed</strong>{" "}
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
              href={`https://baobab.scope.klaytn.com/account/${wallet.address}`}
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
