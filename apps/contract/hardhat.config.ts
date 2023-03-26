import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

import dotenv from "dotenv";

dotenv.config();

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY is not defined");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    polygon: {
      url: "https://polygon-mainnet.infura.io/v3/ddac2247725f422196229bfba8ac3877",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
