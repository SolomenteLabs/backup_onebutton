import React from "react";
import ReactDOM from "react-dom/client";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { App } from "./App";

// ✅ Coreum testnet chain config manually defined
const coreumTestnet = {
  chain_name: "coreum-testnet",
  chain_id: "coreum-testnet-1",
  rpc: "https://full-node.testnet-coreum.dev:26657",
  rest: "https://full-node.testnet-coreum.dev:1317",
  chain: {
    bech32_prefix: "testcore",
    slip44: 118,
  },
  currencies: [
    {
      coinDenom: "TESTCORE",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "TESTCORE",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: {
    coinDenom: "TESTCORE",
    coinMinimalDenom: "utestcore",
    coinDecimals: 6,
  },
  features: ["stargate", "ibc-transfer"],
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChainProvider
    chains={[coreumTestnet]}
    wallets={wallets}
    walletConnectOptions={{
      signClient: {
        projectId: 'demo', // replace with real ID for WC2
        relayUrl: 'wss://relay.walletconnect.com',
        metadata: {
          name: 'OneButton',
          description: 'Minimal testnet dApp',
          url: 'https://accesslayer.org',
          icons: ['https://accesslayer.org/logo.png'],
        },
      },
    }}
  >
    <App />
  </ChainProvider>
);

// ✅ Defensive safety checks
if (!chains || !Array.isArray(chains)) {
  throw new Error("❌ [Fatal] 'chains' is undefined or not an array. Check your chain-registry import.");
}

console.log("🔍 Chains loaded:", chains?.map(c => c.chain_name));
// ✅ Defensive safety checks
if (!chains || !Array.isArray(chains)) {
  throw new Error("❌ [Fatal] 'chains' is undefined or not an array. Check your chain-registry import.");
}

console.log("🔍 Chains loaded:", chains?.map(c => c.chain_name));
