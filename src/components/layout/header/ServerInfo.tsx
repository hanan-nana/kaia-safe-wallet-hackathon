import React from "react";
import { Settings } from "lucide-react";
import { mockServerInfo } from "../../../data/mockServerInfo";

const ServerInfo: React.FC = () => {
  const { connection, network } = mockServerInfo;
  return (
    <div className="space-y-3">
      {/* Connection Status */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {connection.address}
            </div>
            <div className="text-xs text-gray-500">{connection.status}</div>
          </div>
          <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded font-medium">
            {connection.chain}
          </span>
        </div>
      </div>

      {/* Network Status */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {network.name}
            </div>
            <div className="text-xs text-gray-500">{network.type}</div>
          </div>
          <button className="text-gray-400 text-xs hover:text-gray-600">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
