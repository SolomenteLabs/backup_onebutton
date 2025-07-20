import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { chains } from "chain-registry";

const coreumTestnet = chains.find((c) => c.chain_name === "coreum-testnet");
const coreumAssets = assets.find((a) => a.chain_name === "coreum-testnet");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChainProvider
    chains={[coreumTestnet!]}
    wallets={wallets}
    walletConnectOptions={{
      signClient: {
        projectId: 'CHANGE_THIS',
        relayUrl: 'wss://relay.walletconnect.com',
        metadata: {
          name: 'OneButton Demo',
          description: 'Mint Coreum Smart Token on Testnet',
          url: 'https://accesslayer.org',
          icons: ['https://accesslayer.org/logo.png'],
        },
      },
    }}
  >
    <App />
  </ChainProvider>
);
