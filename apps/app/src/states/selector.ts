import { ethers } from "ethers";
import { selector } from "recoil";
import { SIMPLE_ACCOUNT_ABI, SIMPLE_FACTORY_ABI } from "../constants/abis";
import { ChainConfig } from "../constants/config";
import {
  chainConfigListState,
  currentChainIdState,
  currentConnectingAccountState,
  updateFlagState,
} from "./atoms";

export const currentChainConfigSelector = selector<ChainConfig>({
  key: "currentChainConfigSelector",
  get: ({ get }) => {
    const chainId = get(currentChainIdState);
    const chainConfigList = get(chainConfigListState);
    const config = chainConfigList.find((chainConfig) => chainConfig.id === chainId);
    if (!config) throw new Error("Chain config not found");
    return config;
  },
});

export const isMockChainSelector = selector<boolean>({
  key: "isMockChainSelector",
  get: ({ get }) => {
    const chainConfig = get(currentChainConfigSelector);
    return chainConfig.mock;
  },
});

export const currentProviderSelector = selector<ethers.JsonRpcProvider | null>({
  key: "currentProviderSelector",
  get: ({ get }) => {
    const chainConfig = get(currentChainConfigSelector);
    if (chainConfig.mock) return null;
    return new ethers.JsonRpcProvider(chainConfig.rpcUrl);
  },
  dangerouslyAllowMutability: true,
});

export const walletFactorySelector = selector<ethers.Contract | null>({
  key: "walletFactorySelector",
  get: ({ get }) => {
    const chainConfig = get(currentChainConfigSelector);
    const provider = get(currentProviderSelector);
    if (chainConfig.mock || !provider) return null;
    const factory = new ethers.Contract(chainConfig.aa.factories[0].address, SIMPLE_FACTORY_ABI, {
      provider,
    });
    return factory;
  },
  dangerouslyAllowMutability: true,
});

export const currentAAWalletAddressSelector = selector<string | null>({
  key: "currentAAWalletAddressSelector",
  get: async ({ get }) => {
    const connecting = get(currentConnectingAccountState);
    const factory = get(walletFactorySelector);

    if (!factory || !connecting) return null;
    //TODO Saltを動的に取得する
    const address = await factory["getAddress(address,uint256)"](connecting.address, 1);
    return address;
  },
});

export const isAAWalletDeployedSelector = selector<boolean>({
  key: "isAAWalletDeployedSelector",
  get: async ({ get }) => {
    get(updateFlagState);
    const address = get(currentAAWalletAddressSelector);
    const provider = get(currentProviderSelector);
    if (!address || !provider) return false;
    try {
      const code = await provider.getCode(address);

      return code !== "0x" && Boolean(code);
    } catch (e) {
      return false;
    }
  },
});

export const currentAAWalletSelector = selector<ethers.Contract | null>({
  key: "currentAAWalletSelector",
  get: ({ get }) => {
    const address = get(currentAAWalletAddressSelector);
    const provider = get(currentProviderSelector);
    const isDeployed = get(isAAWalletDeployedSelector);

    if (!address || !provider || !isDeployed) return null;

    return new ethers.Contract(address, SIMPLE_ACCOUNT_ABI, provider);
  },
  dangerouslyAllowMutability: true,
});

export const currentAAWalletBalanceSelector = selector<bigint | null>({
  key: "currentAAWalletBalanceSelector",
  get: async ({ get }) => {
    const provider = get(currentProviderSelector);
    const walletAddress = get(currentAAWalletAddressSelector);
    if (!walletAddress || !provider) return null;
    const balance = await provider.getBalance(walletAddress);
    return BigInt(balance.toString());
  },
});
