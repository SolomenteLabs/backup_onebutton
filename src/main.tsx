import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";

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

async function suggestCoreumTestnet() {
  if (window.keplr) {
    await window.keplr.experimentalSuggestChain({
      chainId: "coreum-testnet-1",
      chainName: "Coreum Testnet",
      rpc: "https://full-node.testnet-1.coreum.dev:26657",
      rest: "https://full-node.testnet-1.coreum.dev:1317",
      bip44: { coinType: 990 },
      bech32Config: {
        bech32PrefixAccAddr: "core",
        bech32PrefixAccPub: "corepub",
        bech32PrefixValAddr: "corevaloper",
        bech32PrefixValPub: "corevaloperpub",
        bech32PrefixConsAddr: "corevalcons",
        bech32PrefixConsPub: "corevalconspub",
      },
      currencies: [{ coinDenom: "CORE", coinMinimalDenom: "ucore", decimals: 6 }],
      feeCurrencies: [{ coinDenom: "CORE", coinMinimalDenom: "ucore", decimals: 6 }],
      stakeCurrency: { coinDenom: "CORE", coinMinimalDenom: "ucore", decimals: 6 },
      coinType: 990,
      features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
    });
  }
}

suggestCoreumTestnet();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChainProvider chains={coreumTestnet} assetLists={[]} wallets={wallets}>
      <App />
    </ChainProvider>
  </React.StrictMode>
);
// ⏱ force rebuild
