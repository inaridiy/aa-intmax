import clsx from "clsx";
import { ArrowLeftRight, Forward, PlusCircle } from "lucide-react";
import { useState } from "react";
import { HomeLayout } from "../components/Layout/HomeLayout";
import { SendModal } from "../components/Wallet/SendModal";
import { usePromiseLoading } from "../hooks/usePromiseLoading";
import { useAA } from "../states/hooks";
import { copy } from "../utils/copy";
import { shortAddress } from "../utils/shortAddress";

export default function Web() {
  const { setPromise, loading, error } = usePromiseLoading();
  const { aaWalletAddress, isDeployed, balance, deploy } = useAA();
  const [modal, setModal] = useState<"send" | "buy" | "swap" | null>(null);

  return (
    <>
      <SendModal isOpen={modal === "send"} onClose={() => setModal(null)} />
      <HomeLayout>
        <div className="flex items-center flex-col mt-16 gap-12 px-4">
          <div className="flex flex-col items-center">
            <button
              className="text-xl font-bold btn btn-ghost btm-sm"
              onClick={() => copy(aaWalletAddress || "")}
            >
              {shortAddress(aaWalletAddress)}
            </button>
            <div className="text-4xl font-bold">{balance}</div>
          </div>
          {isDeployed || (
            <div className="flex flex-col gap-2 text-lg font-bold text-center">
              You need to deploy AA account to use this Wallet.
              {error && <div className="text-error">{error}</div>}
              <button
                disabled={loading}
                className={clsx("btn normal-case", loading && "loading")}
                onClick={() => setPromise(deploy())}
              >
                Deploy AA Account
              </button>
            </div>
          )}
          {isDeployed && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 items-center">
                  <button disabled className="btn btn-circle p-2">
                    <PlusCircle className="w-full h-full" />
                  </button>
                  <div className="text-sm font-bold">Buy</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <button className="btn btn-circle p-2" onClick={() => setModal("send")}>
                    <Forward className="w-full h-full" />
                  </button>
                  <div className="text-sm font-bold">Send</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <button disabled className="btn btn-circle p-2">
                    <ArrowLeftRight className="w-full h-full" />
                  </button>
                  <div className="text-sm font-bold">Swap</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </HomeLayout>
    </>
  );
}
