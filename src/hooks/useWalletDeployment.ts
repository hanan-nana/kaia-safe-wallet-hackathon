import { useAtom } from "jotai";
import { useCallback } from "react";
import {
  deploymentStatusAtom,
  addDeployedWalletAtom,
} from "../atoms/walletAtoms";
import { SAFE_WALLET_FACTORY } from "../constants/contracts";
import Caver from "caver-js";

export const useWalletDeployment = () => {
  const [deploymentStatus, setDeploymentStatus] = useAtom(deploymentStatusAtom);
  const [, addDeployedWallet] = useAtom(addDeployedWalletAtom);

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
        const caver = new Caver(window.klaytn as any);
        const factoryContract = new caver.klay.Contract(
          SAFE_WALLET_FACTORY.ABI as any,
          SAFE_WALLET_FACTORY.ADDRESS
        );

        // 1. 트랜잭션 전송
        const data = factoryContract.methods
          .deployContract(destruct_address, duration)
          .encodeABI();
        const txParams = {
          from: account,
          to: SAFE_WALLET_FACTORY.ADDRESS,
          data: data,
          gas: "0x4c4b40",
        };

        const hash = await window.klaytn.request({
          method: "eth_sendTransaction",
          params: [txParams],
        });

        // 트랜잭션 해시 업데이트
        setDeploymentStatus((prev) => ({
          ...prev,
          txHash: hash,
        }));

        // 2. 트랜잭션 완료 대기
        const receipt = await waitForTransactionReceipt(caver, hash);

        if (receipt.status) {
          // 3. 배포된 주소 추출
          const deployedAddress = getDeployedAddressFromLogs(
            receipt.logs,
            factoryContract
          );

          // 4. Jotai store에 추가
          addDeployedWallet({
            chainId,
            address: deployedAddress,
            name: `Custom Wallet ${deployedAddress.slice(
              0,
              6
            )}...${deployedAddress.slice(-4)}`,
            creator: account,
            txHash: hash,
            destructAddress: destruct_address,
            duration,
          });

          // 최종 상태 업데이트
          setDeploymentStatus({
            isDeploying: false,
            txHash: hash,
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
    [setDeploymentStatus, addDeployedWallet]
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
const waitForTransactionReceipt = async (
  caver: any,
  txHash: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const checkReceipt = async () => {
      try {
        const receipt = await caver.klay.getTransactionReceipt(txHash);
        if (receipt) {
          resolve(receipt);
        } else {
          setTimeout(checkReceipt, 1000);
        }
      } catch (error) {
        reject(error);
      }
    };
    checkReceipt();
  });
};

const getDeployedAddressFromLogs = (
  logs: any[],
  factoryContract: any
): string => {
  for (const log of logs) {
    try {
      const decodedLog = factoryContract.decodeLog(
        "ContractDeployed",
        log.data,
        log.topics
      );
      return decodedLog.newContractAddress;
    } catch (e) {
      continue;
    }
  }
  throw new Error("Deployed contract address not found in logs");
};
