import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { deploymentStatusAtom, selectedWalletAtom } from "../atoms/walletAtoms";
import { useWalletsApi } from "./useWalletsApi";
import { SAFE_WALLET_FACTORY } from "../constants/contracts";
import { ethers } from "ethers";

export const useWalletDeployment = () => {
  const [deploymentStatus, setDeploymentStatus] = useAtom(deploymentStatusAtom);
  const setSelectedWallet = useSetAtom(selectedWalletAtom);
  const { addWallet } = useWalletsApi();

  const deployContract = useCallback(
    async (
      destruct_address: string,
      duration: number,
      account: string,
      chainId: string = "1001"
    ) => {
      // 초기 상태 설정
      setDeploymentStatus({
        isDeploying: true,
        txHash: null,
        error: null,
        deployedAddress: null,
      });

      if (!window.klaytn || !account) {
        setDeploymentStatus((prev) => ({
          ...prev,
          isDeploying: false,
          error: "Please connect your wallet first.",
        }));
        return;
      }

      try {
        // ethers.js를 사용하여 Klaytn과 상호작용
        const provider = new ethers.BrowserProvider(window.klaytn as any);
        const signer = await provider.getSigner();

        const factoryContract = new ethers.Contract(
          SAFE_WALLET_FACTORY.ADDRESS,
          SAFE_WALLET_FACTORY.ABI,
          signer
        );

        // 1. 트랜잭션 전송
        const tx = await factoryContract.deployContract(
          destruct_address,
          duration,
          {
            gasLimit: 5000000, // 0x4c4b40 in decimal
          }
        );

        // 트랜잭션 해시 업데이트
        setDeploymentStatus((prev) => ({
          ...prev,
          txHash: tx.hash,
        }));

        // 2. 트랜잭션 완료 대기
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          // 3. 배포된 주소 추출
          const deployedAddress = getDeployedAddressFromLogs(
            receipt.logs,
            factoryContract
          );

          // 4. API를 통해 지갑 추가 (실제 배포된 주소 포함)
          const walletData = {
            chainId,
            name: `Custom Wallet ${deployedAddress.slice(
              0,
              6
            )}...${deployedAddress.slice(-4)}`,
            creator: account,
            txHash: tx.hash,
            destructAddress: destruct_address,
            duration,
            address: deployedAddress, // 실제 배포된 주소 추가
          };

          const newWallet = await addWallet(walletData);

          // 5. 새로 배포된 지갑을 자동으로 선택
          if (newWallet) {
            setSelectedWallet(newWallet);
          }

          // 최종 상태 업데이트
          setDeploymentStatus({
            isDeploying: false,
            txHash: tx.hash,
            error: null,
            deployedAddress,
          });

          return deployedAddress;
        }
      } catch (err: any) {
        setDeploymentStatus({
          isDeploying: false,
          txHash: null,
          error: `Contract deployment failed: ${err.message}`,
          deployedAddress: null,
        });
      }
    },
    [setDeploymentStatus, addWallet, setSelectedWallet]
  );

  const resetDeploymentStatus = useCallback(() => {
    setDeploymentStatus({
      isDeploying: false,
      txHash: null,
      error: null,
      deployedAddress: null,
    });
  }, [setDeploymentStatus]);

  return {
    deploymentStatus,
    deployContract,
    resetDeploymentStatus,
  };
};

// 헬퍼 함수들
const getDeployedAddressFromLogs = (
  logs: any[],
  factoryContract: ethers.Contract
): string => {
  for (const log of logs) {
    try {
      const parsedLog = factoryContract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "ContractDeployed") {
        return parsedLog.args.newContractAddress;
      }
    } catch (e) {
      continue;
    }
  }
  throw new Error("Deployed contract address not found in logs");
};
