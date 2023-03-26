import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../main.css";

const App = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default App;
