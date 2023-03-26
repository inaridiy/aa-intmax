import { ethers } from "ethers";
import { useRecoilValue } from "recoil";
import { currentConnectingAccountState } from "./atoms";
import { useConnectWithWebmax, useDeployAA } from "./operations";
import {
  currentAAWalletAddressSelector,
  currentAAWalletBalanceSelector,
  currentChainConfigSelector,
  isAAWalletDeployedSelector,
  isMockChainSelector,
} from "./selector";

export const useConnecting = () => {
  const account = useRecoilValue(currentConnectingAccountState);
  const connectWithWebmax = useConnectWithWebmax();

  return {
    account,
    connectWithWebmax,
  };
};

export const useNetwork = () => {
  const chain = useRecoilValue(currentChainConfigSelector);
  const isMockChain = useRecoilValue(isMockChainSelector);

  return {
    ...chain,
    isMockChain,
  };
};

export const useAA = () => {
  const chain = useNetwork();
  const deploy = useDeployAA();
  const aaWalletAddress = useRecoilValue(currentAAWalletAddressSelector);
  const aaWallet = useRecoilValue(currentAAWalletAddressSelector);
  const balanceBigint = useRecoilValue(currentAAWalletBalanceSelector);
  const balance = `${(balanceBigint === null || ethers.formatEther(balanceBigint)).toString()} ${
    chain.mock ? "ETH" : chain.nativeCurrency.symbol
  }`;
  const isDeployed = useRecoilValue(isAAWalletDeployedSelector);

  return {
    deploy,
    aaWalletAddress,
    aaWallet,
    isDeployed,
    balanceBigint,
    balance,
  };
};
