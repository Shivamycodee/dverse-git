import '@/styles/globals.css'

import "@rainbow-me/rainbowkit/styles.css";
import Layout from '../components/layout'
import PrimeContextProvider from '../../context/prime'
import MatrixContextProvider from '../../context/matrix'
import KeyHandlerProvider from "../../context/streamHandler";


import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  optimismGoerli,
  bsc,
  dogechain,
  fantom,
  filecoin,
  bscTestnet,
  gnosis,
  sepolia,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [
    mainnet,
    sepolia,
    goerli,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    bsc,
    bscTestnet,
    fantom,
    gnosis,
    dogechain,
    filecoin,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "dChat-app",
  chains,
});

const wagmiClient = createClient({
  logger: {
    warn: (message) => logWarn(message),
  },
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };

export default function App({ Component, pageProps }) {
  return (
    <>
      <PrimeContextProvider>  
        <MatrixContextProvider>
         <KeyHandlerProvider>

        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider modalSize="compact" chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
        
         </KeyHandlerProvider>
        </MatrixContextProvider>
      </PrimeContextProvider>
    </>
  );
}
