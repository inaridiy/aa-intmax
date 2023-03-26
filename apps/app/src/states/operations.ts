import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { IntmaxWalletSigner } from "webmax";
import { currentChainIdState, currentConnectingAccountState, updateFlagState } from "./atoms";
import {
  currentAAWalletSelector,
  currentChainConfigSelector,
  currentProviderSelector,
  walletFactorySelector,
} from "./selector";

export const useUpdate = () => {
  const update = useRecoilCallback(({ set }) => async () => {
    set(updateFlagState, (old) => old + 1);
  });
  return update;
};

export const useConnectWithWebmax = () => {
  const connectWithWebmax = useRecoilCallback(({ set }) => async () => {
    const signer = new IntmaxWalletSigner();
    const account = await signer.connectToAccount();
    set(currentConnectingAccountState, account);
  });
  return connectWithWebmax;
};

export const useDeployAA = () => {
  const update = useUpdate();
  const connecting = useRecoilValue(currentConnectingAccountState);
  const chainId = useRecoilValue(currentChainIdState);
  const factory = useRecoilValue(walletFactorySelector);
  const deployAA = useRecoilCallback(() => async () => {
    if (!factory || !connecting) throw new Error("Factory not found");
    if (chainId !== connecting.chainId) throw new Error("ChainId is not match");
    //TODO Wrap IntmaxWalletSigner to ethers.Signer
    const signer = new IntmaxWalletSigner();
    // await signer.switchChain(chainId);
    const recept = await signer.sendTransaction({
      // chainId,
      to: await factory.getAddress(),
      value: 0,
      //TODO Saltを動的に取得する
      data: factory.interface.encodeFunctionData("createAccount", [connecting.address, 1]),
    });
    console.log(recept);
    update();
  });
  return deployAA;
};

export interface SendFTProps {
  to: string;
  amount: number;
  address?: string | "native";
  decimals?: number;
}

export const useSendFT = () => {
  const provider = useRecoilValue(currentProviderSelector);
  const connecting = useRecoilValue(currentConnectingAccountState);
  const aaWallet = useRecoilValue(currentAAWalletSelector);
  const chain = useRecoilValue(currentChainConfigSelector);

  const sentFT = useRecoilCallback(({ set }) => async (props: SendFTProps) => {
    if (!aaWallet || !provider || chain.mock) throw new Error("AA Wallet not found");
    const { to, amount, address = "native", decimals = 18 } = props;
    if (address === "native") {
      const api = new SimpleAccountAPI({
        provider: provider as any,
        entryPointAddress: chain.aa.entryPoint,
        accountAddress: await aaWallet.getAddress(),
        owner: ethers.Signer(),
      });
    } else {
    }
  });
};
