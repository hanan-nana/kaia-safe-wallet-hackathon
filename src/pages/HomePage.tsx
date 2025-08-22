import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Kaia Wallet
          </h1>
          <p className="text-gray-600">
            Manage your Kaia blockchain transactions and explore DeFi
            opportunities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  1,234.56 KAIA
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Transactions
                </p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Positions
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly P&L</p>
                <p className="text-2xl font-bold text-green-600">+12.34%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <span className="text-3xl mb-2">📤</span>
                <span className="text-sm font-medium text-gray-700">Send</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <span className="text-3xl mb-2">📥</span>
                <span className="text-sm font-medium text-gray-700">
                  Receive
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <span className="text-3xl mb-2">🔄</span>
                <span className="text-sm font-medium text-gray-700">Swap</span>
              </button>
              <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
                <span className="text-3xl mb-2">🏦</span>
                <span className="text-sm font-medium text-gray-700">Stake</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">📥</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Received KAIA
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +50.00
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">🔄</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Swapped KAIA
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  -25.50
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">🏦</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Staking Rewards
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +2.15
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🔶</div>
              <h3 className="font-medium text-gray-900">KAIA</h3>
              <p className="text-2xl font-bold text-gray-900">$0.1234</p>
              <p className="text-sm text-green-600">+5.67%</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">₿</div>
              <h3 className="font-medium text-gray-900">Bitcoin</h3>
              <p className="text-2xl font-bold text-gray-900">$43,256</p>
              <p className="text-sm text-red-600">-2.34%</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">Ξ</div>
              <h3 className="font-medium text-gray-900">Ethereum</h3>
              <p className="text-2xl font-bold text-gray-900">$2,678</p>
              <p className="text-sm text-green-600">+1.89%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
