import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { initOnboard } from "./hooks/useOnboard";

function App() {
  useEffect(() => {
    const initializeOnboard = async () => {
      try {
        // 동적 import로 지갑 모듈들 가져오기
        const { default: injectedModule } = await import(
          "@web3-onboard/injected-wallets"
        );
        const { default: walletConnectModule } = await import(
          "@web3-onboard/walletconnect"
        );

        const injected = injectedModule();
        const walletConnect = walletConnectModule({
          projectId: "your-walletconnect-project-id", // WalletConnect v2 project ID가 필요합니다
          requiredChains: [1001, 8217], // Kaia Kairos, Kaia Mainnet
        });

        await initOnboard({
          chains: [
            {
              id: "0x3e9", // 1001 in hex - Kaia Kairos Testnet
              label: "Kaia Kairos Testnet",
              rpcUrl: "https://public-en-kairos.node.kaia.io",
              token: "KAIA",
            },
            {
              id: "0x2019", // 8217 in hex - Kaia Mainnet
              label: "Kaia Mainnet",
              rpcUrl: "https://public-en-cypress.klaytn.net",
              token: "KAIA",
            },
          ],
          wallets: [injected, walletConnect],
          appMetadata: {
            name: "Kaia Hackathon App",
            icon: "https://docs.kaia.io/img/favicon.ico",
            description: "Kaia blockchain application for hackathon",
          },
        });

        console.log("Onboard initialized successfully");
      } catch (error) {
        console.error("Failed to initialize onboard:", error);
      }
    };

    initializeOnboard();
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
