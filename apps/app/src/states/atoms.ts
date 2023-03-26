import { atom } from "recoil";
import { ChainConfig, CHAIN_CONFIGS } from "../constants/config";
import { Account } from "./types";

export const currentChainIdState = atom<number>({
  key: "currentChainIdState",
  default: 80001,
});

export const chainConfigListState = atom<ChainConfig[]>({
  key: "chainConfigListState",
  default: CHAIN_CONFIGS,
});

export const currentConnectingAccountState = atom<Account | null>({
  key: "currentConnectingAccountState",
  default: null,
});

export const updateFlagState = atom<number>({
  key: "updateFlagState",
  default: 0,
});
