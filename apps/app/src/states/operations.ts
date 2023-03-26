import { useRecoilCallback } from "recoil";
import { IntmaxWalletSigner } from "webmax";
import { currentConnectingAccountState } from "./atoms";

export const useConnectWithWebmax = () => {
  const connectWithWebmax = useRecoilCallback(({ set }) => async () => {
    const signer = new IntmaxWalletSigner();
    const account = await signer.connectToAccount();
    set(currentConnectingAccountState, account);
  });
  return connectWithWebmax;
};
