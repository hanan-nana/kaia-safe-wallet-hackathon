import React, { useState } from "react";
import { useWalletDeployment } from "../../hooks/useWalletDeployment";

export const WalletDeployment = () => {
  const [destructAddress, setDestructAddress] = useState("");
  const [duration, setDuration] = useState(3600); // 1시간 기본값
  const [account, setAccount] = useState("");

  const { deploymentStatus, deployContract, resetDeploymentStatus } =
    useWalletDeployment();

  const handleDeploy = async () => {
    if (!destructAddress || !account) {
      alert("Please fill in all fields");
      return;
    }

    await deployContract(destructAddress, duration, account);
  };

  return (
    <div className="wallet-deployment">
      <h2>Deploy New Wallet</h2>

      <div className="form-group">
        <label>Your Account Address:</label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="0x..."
        />
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
        disabled={deploymentStatus.isDeploying}
        className="btn-primary"
      >
        {deploymentStatus.isDeploying ? "Deploying..." : "Deploy Contract"}
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
