import React from "react";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { useChain } from "@cosmos-kit/react";

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
      walletConnectOptions={{
        signClient: {
          projectId: "demo",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "OneButton Mint",
            description: "Simple Coreum testnet mint",
            url: "https://backup-onebutton.vercel.app",
            icons: [],
          },
        },
      }}
    >
      <main style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <h1>🚀 OneButton Mint</h1>
        <p>🔗 Connect your Keplr wallet and mint a smart token on Coreum Testnet.</p>
      </main>
    </ChainProvider>
  );
}
