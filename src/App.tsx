import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import { useInitOnboard } from "./hooks/useOnboard";

function App() {
  // onboard 초기화
  useInitOnboard();

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <Router>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<TransactionsPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
