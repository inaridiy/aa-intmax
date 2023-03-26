import { List, Palette, Scan, Wallet } from "lucide-react";
import Link from "next/link";
import { useConnecting } from "../../states/hooks";

export const HomeLayout: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const { account, connectWithWebmax } = useConnecting();
  return (
    <div className="h-screen w-full overflow-hidden bg-base-200 sm:p-4" data-theme="light">
      <div className="h-full w-full max-w-screen-sm mx-auto sm:rounded-lg bg-base-100 sm:border flex flex-col">
        <main className="flex-1">
          {account ? (
            props.children
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {/** TODO Multipart ID Platform */}
              <button className="btn" onClick={connectWithWebmax}>
                Connect ID
              </button>
            </div>
          )}
        </main>
        <nav className="flex overflow-x-auto py-2 sm:px-16 px-8  w-full justify-between">
          <Link href="/chains" className="btn btn-ghost btn-square">
            <List className="w-8 h-8" />
          </Link>
          <Link href="/chains" className="btn btn-ghost btn-square">
            <Scan className="w-8 h-8" />
          </Link>
          <Link href="/wallet" className="btn btn-ghost btn-square">
            <Wallet className="w-8 h-8" />
          </Link>
          <Link href="/" className="btn btn-ghost btn-square">
            <Palette className="w-8 h-8" />
          </Link>
        </nav>
      </div>
    </div>
  );
};
