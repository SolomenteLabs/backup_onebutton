import React from "react";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";

const chains = [
  {
    chain_name: "coreum-testnet",
    chain_id: "coreum-testnet-1",
    apis: {
      rpc: [{ address: "https://full-node.testnet-1.coreum.dev:26657" }],
      rest: [{ address: "https://full-node.testnet-1.coreum.dev:1317" }],
    },
    pretty_name: "Coreum Testnet",
    bech32_prefix: "testcore",
    slip44: 118,
  },
];

export function App() {
  return (
    <ChainProvider
      chains={chains}
      assetLists={[]}
      wallets={wallets}
    >
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Backup OneButton Demo</h1>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow">
            Mint Smart Token
          </button>
        </div>
      </main>
    </ChainProvider>
  );
}
