import clsx from "clsx";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { currentChainIdState } from "../states";

import { CHAIN_CONFIGS } from "../constants/config";

export default function Web() {
  const [chainId, setChainId] = useRecoilState(currentChainIdState);
  console.log(chainId);
  return (
    <HomeLayout>
      <div className="flex flex-col p-4 gap-2">
        {CHAIN_CONFIGS.map((chain) => (
          <button
            key={chain.id}
            onClick={() => setChainId(chain.id)}
            className={clsx(
              "flex py-2 px-4 rounded-lg gap-2 cursor-pointer items-center",
              {
                "hover:bg-base-200 bg-base-100": chain.id !== chainId,
                "bg-neutral text-neutral-content hover:bg-neutral-focus":
                  chain.id === chainId,
              }
            )}
          >
            <div className="w-12 h-12">
              <Image
                alt={chain.name}
                src={chain.icon}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold">{chain.name}</div>
            </div>
          </button>
        ))}
      </div>
    </HomeLayout>
  );
}
