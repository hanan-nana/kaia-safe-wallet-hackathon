export interface ConnectionInfo {
  address: string;
  status: "Connected" | "Disconnected" | "Connecting";
  chain: string;
}

export interface NetworkInfo {
  name: string;
  type: "Mainnet" | "Testnet";
}

export interface ServerInfoData {
  connection: ConnectionInfo;
  network: NetworkInfo;
}

export const mockServerInfo: ServerInfoData = {
  connection: {
    address: "kairos:0x4C3d...0F30",
    status: "Connected",
    chain: "KAIA",
  },
  network: {
    name: "KAIROS",
    type: "Mainnet",
  },
};
