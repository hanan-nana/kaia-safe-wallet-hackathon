import { useState } from "react";
import { useWalletDeployment } from "../../hooks/useWalletDeployment";
import { useWalletAccount } from "../../hooks/useWalletAccount";

interface WalletDeploymentProps {
  onSuccess?: () => void;
}

export const WalletDeployment = ({ onSuccess }: WalletDeploymentProps) => {
  const [destructAddress, setDestructAddress] = useState("");
  const [duration, setDuration] = useState(3600); // 1시간 기본값

  const { account, isConnected } = useWalletAccount();
  const { deploymentStatus, deployContract, resetDeploymentStatus } =
    useWalletDeployment();

  const handleDeploy = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!destructAddress) {
      alert("Please fill in the destruct wallet address");
      return;
    }

    const result = await deployContract(destructAddress, duration, account);
    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="wallet-deployment">
      <h2>Deploy New Wallet</h2>

      {/* Connected Account Display */}
      <div className="form-group">
        <label>Connected Account:</label>
        <div className="connected-account">
          {isConnected && account ? (
            <div className="account-info">
              <span className="account-address">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <span className="status-badge connected">Connected</span>
            </div>
          ) : (
            <div className="account-info">
              <span className="account-address">Not connected</span>
              <span className="status-badge disconnected">Disconnected</span>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Destruct Wallet Address:</label>
        <input
          type="text"
          value={destructAddress}
          onChange={(e) => setDestructAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>

      <div className="form-group">
        <label>Min Delay Time (seconds):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <button
        onClick={handleDeploy}
        disabled={deploymentStatus.isDeploying || !isConnected}
        className="btn-primary"
      >
        {deploymentStatus.isDeploying
          ? "Deploying..."
          : !isConnected
          ? "Connect Wallet to Deploy"
          : "Deploy Contract"}
      </button>

      {deploymentStatus.txHash && (
        <div className="status-info">
          <p>
            <strong>Transaction Hash:</strong> {deploymentStatus.txHash}
          </p>
          <a
            href={`https://baobab.scope.klaytn.com/tx/${deploymentStatus.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
          </a>
        </div>
      )}

      {deploymentStatus.deployedAddress && (
        <div className="success-info">
          <h3>✅ Successfully Deployed!</h3>
          <p>
            <strong>New Wallet Address:</strong>{" "}
            {deploymentStatus.deployedAddress}
          </p>
        </div>
      )}

      {deploymentStatus.error && (
        <div className="error-info">
          <p style={{ color: "red" }}>{deploymentStatus.error}</p>
          <button onClick={resetDeploymentStatus}>Clear Error</button>
        </div>
      )}
    </div>
  );
};
