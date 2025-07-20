import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChainProvider } from "@cosmos-kit/react";
import { keplrExtensionWallet } from "@cosmos-kit/keplr";

const chains = [
  {
    chain_name: "coreum-testnet",
    chain_id: "coreum-testnet-1",
    pretty_name: "Coreum Testnet",
    bech32_prefix: "core",
    apis: {
      rpc: [{ address: "https://full-node.testnet-1.coreum.dev:26657" }],
      rest: [{ address: "https://full-node.testnet-1.coreum.dev:1317" }],
    },
    slip44: 118,
    currencies: [
      {
        coinDenom: "TESTCORE",
        coinMinimalDenom: "utestcore",
        coinDecimals: 6,
        coinGeckoId: "",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "TESTCORE",
        coinMinimalDenom: "utestcore",
        coinDecimals: 6,
        coinGeckoId: "",
      },
    ],
    stakeCurrency: {
      coinDenom: "TESTCORE",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
      coinGeckoId: "",
    },
    features: ["ibc-transfer", "wasm"],
  },
];

const wallets = [keplrExtensionWallet()];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChainProvider chains={chains} assetLists={[]} wallets={wallets}>
      <App />
    </ChainProvider>
  </React.StrictMode>
);
