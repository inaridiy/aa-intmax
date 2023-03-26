import { AppProps } from "next/app";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { NoSSR } from "../components/NoSSR";
import "../main.css";

const App = ({ Component, pageProps }: AppProps) => (
  <NoSSR>
    <RecoilRoot>
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center" data-theme="light">
            <button className=" btn loading btn-lg btn-ghost"></button>
          </div>
        }
      >
        <Component {...pageProps} />
      </Suspense>
    </RecoilRoot>
  </NoSSR>
);

export default App;
