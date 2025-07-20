import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChainProvider } from "@cosmos-kit/react";
import { keplrExtensionWallet } from "@cosmos-kit/keplr";

const coreumTestnet = [
  {
    chain_name: "coreum",
    chain_id: "coreum-testnet-1",
    apis: {
      rpc: [
        {
          address: "https://full-node.testnet-1.coreum.dev:26657",
        },
      ],
      rest: [
        {
          address: "https://full-node.testnet-1.coreum.dev:1317",
        },
      ],
    },
    pretty_name: "Coreum Testnet",
    bech32_prefix: "core",
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChainProvider
      chains={coreumTestnet}
      assetLists={[]}
      wallets={[keplrExtensionWallet()]}
    >
      <App />
    </ChainProvider>
  </React.StrictMode>
);

