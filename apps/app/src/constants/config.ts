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
    id: 137,
    name: "Polygon",
    icon: PolygonLogo,
    mock: false,
    rpcUrl: "https://polygon-mainnet.infura.io/v3/ddac2247725f422196229bfba8ac3877",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    aa: {
      bundlerRpcUrl:
        "https://node.stackup.sh/v1/rpc/96be9a579f73c00442d468e018c8207762401f03f21347c3bb6b1c256e9c8f1f",
      entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factories: [
        {
          address: "0xe50AF2D0b335410e50f7f3fd15e64D0547575F1B",
        },
      ],
    },
  },
] satisfies ChainConfig[];
