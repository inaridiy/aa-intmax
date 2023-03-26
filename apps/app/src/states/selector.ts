import ethers from "ethers";
import { selector } from "recoil";
import { SIMPLE_ACCOUNT_ABI, SIMPLE_FACTORY_ABI } from "../constants/abis";
import { ChainConfig } from "../constants/config";
import { chainConfigListState, currentChainIdState, currentConnectingAccountState } from "./atoms";

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

export const currentProviderSelector = selector<ethers.Provider | null>({
  key: "currentProviderSelector",
  get: ({ get }) => {
    const chainConfig = get(currentChainConfigSelector);
    if (chainConfig.mock) return null;
    return new ethers.JsonRpcProvider(chainConfig.rpcUrl);
  },
});

export const walletFactorySelector = selector<ethers.Contract | null>({
  key: "walletFactorySelector",
  get: ({ get }) => {
    const chainConfig = get(currentChainConfigSelector);
    const provider = get(currentProviderSelector);
    if (chainConfig.mock || !provider) return null;
    return new ethers.Contract(chainConfig.aa.factories[0].address, SIMPLE_FACTORY_ABI, provider);
  },
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
    const address = get(currentAAWalletAddressSelector);
    const provider = get(currentProviderSelector);
    if (!address || !provider) return false;
    const code = await provider.getCode(address);
    return code !== "0x" && Boolean(code);
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
});
