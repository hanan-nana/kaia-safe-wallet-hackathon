import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
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
