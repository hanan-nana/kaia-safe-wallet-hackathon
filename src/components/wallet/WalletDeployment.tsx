import { useState } from "react";
import { useWalletDeployment } from "../../hooks/useWalletDeployment";
import { useWalletAccount } from "../../hooks/useWalletAccount";

interface WalletDeploymentProps {
  onSuccess?: () => void;
}

export const WalletDeployment = ({ onSuccess }: WalletDeploymentProps) => {
  const [walletName, setWalletName] = useState("");
  const [destructAddress, setDestructAddress] = useState("");
  const [duration, setDuration] = useState(3600); // 1시간 기본값

  const { account, isConnected } = useWalletAccount();
  const { deploymentStatus, deployContract, resetDeploymentStatus } =
    useWalletDeployment();

  const handleDeploy = async () => {
    if (!isConnected) {
      alert("지갑을 먼저 연결해주세요");
      return;
    }

    if (!walletName.trim()) {
      alert("지갑 이름을 입력해주세요");
      return;
    }

    if (!destructAddress) {
      alert("Destruct 지갑 주소를 입력해주세요");
      return;
    }

    const result = await deployContract(
      destructAddress,
      duration,
      account,
      walletName.trim()
    );
    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="wallet-deployment">
      <h2>새 Safe 지갑 배포</h2>

      {/* Connected Account Display */}
      <div className="form-group">
        <label>연결된 계정:</label>
        <div className="connected-account">
          {isConnected && account ? (
            <div className="account-info">
              <span className="account-address">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <span className="status-badge connected">연결됨</span>
            </div>
          ) : (
            <div className="account-info">
              <span className="account-address">연결되지 않음</span>
              <span className="status-badge disconnected">연결 해제</span>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>지갑 이름 *</label>
        <input
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="지갑 이름을 입력하세요"
          required
        />
      </div>

      <div className="form-group">
        <label>Destruct 지갑 주소:</label>
        <input
          type="text"
          value={destructAddress}
          onChange={(e) => setDestructAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>

      <div className="form-group">
        <label>최소 지연 시간 (초):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <button
        onClick={handleDeploy}
        disabled={
          deploymentStatus.isDeploying || !isConnected || !walletName.trim()
        }
        className="btn-primary"
      >
        {deploymentStatus.isDeploying
          ? "배포 중..."
          : !isConnected
          ? "배포하려면 지갑을 연결하세요"
          : "계약 배포"}
      </button>

      {deploymentStatus.txHash && (
        <div className="status-info">
          <p>
            <strong>트랜잭션 해시:</strong> {deploymentStatus.txHash}
          </p>
          <a
            href={`https://baobab.scope.klaytn.com/tx/${deploymentStatus.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            익스플로러에서 보기
          </a>
        </div>
      )}

      {deploymentStatus.deployedAddress && (
        <div className="success-info">
          <h3>✅ 성공적으로 배포되었습니다!</h3>
          <p>
            <strong>새 지갑 주소:</strong> {deploymentStatus.deployedAddress}
          </p>
        </div>
      )}

      {deploymentStatus.error && (
        <div className="error-info">
          <p style={{ color: "red" }}>{deploymentStatus.error}</p>
          <button onClick={resetDeploymentStatus}>오류 지우기</button>
        </div>
      )}
    </div>
  );
};
