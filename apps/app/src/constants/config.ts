import EthereumLogo from "../assets/ethereum.svg";
import PolygonLogo from "../assets/polygon.svg";

export interface ChainMockConfig {
  id: number;
  name: string;
  icon: string;
  mock: true;
}

export interface ChainDataConfig {
  id: number;
  name: string;
  icon: string;
  mock: false;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  aa: {
    bundlerRpcUrl: string;
    entryPoint: string;
    factories: {
      address: string;
    }[];
  };
}

export type ChainConfig = ChainMockConfig | ChainDataConfig;

export const CHAIN_CONFIGS = [
  {
    id: 1,
    name: "Mainnet(Mock)",
    icon: EthereumLogo,
    mock: true,
  },
  {
    id: 80001,
    name: "Mumbai",
    icon: PolygonLogo,
    mock: false,
    rpcUrl: "https://polygon-mumbai.infura.io/v3/ddac2247725f422196229bfba8ac3877",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    aa: {
      bundlerRpcUrl:
        "https://node.stackup.sh/v1/rpc/ba2b5cd0e9690b7af5d28f56aa5f8d4827f5f5199c2c32d0e4f4bb05268c53c2",
      entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factories: [
        {
          address: "0x0d51172a67536ae2d1Ee881596F2A6AcDfF57D49",
        },
      ],
    },
  },
] satisfies ChainConfig[];
