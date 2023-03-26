import { useRecoilValue } from "recoil";
import { currentConnectingAccountState } from "./atoms";
import { useConnectWithWebmax } from "./operations";

export const useConnecting = () => {
  const account = useRecoilValue(currentConnectingAccountState);
  const connectWithWebmax = useConnectWithWebmax();

  return {
    account,
    connectWithWebmax,
  };
};
