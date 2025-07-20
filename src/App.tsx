import React from "react";
import {
  ChainProvider,
  WalletSection,
  useWallet,
} from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { SigningStargateClient } from "@cosmjs/stargate";
import { GasPrice } from "@cosmjs/stargate";

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

const AppInner = () => {
  const { address, getOfflineSigner, connect, isWalletConnected } = useWallet();

  const mintToken = async () => {
    if (!address) {
      alert("Connect wallet first");
      return;
    }

    const rpc = chains[0].apis.rpc[0].address;
    const signer = await getOfflineSigner();
    const client = await SigningStargateClient.connectWithSigner(rpc, signer, {
      gasPrice: GasPrice.fromString("0.0625utestcore"),
    });

    const msg = {
      typeUrl: "/coreum.asset.ft.v1.MsgIssue",
      value: {
        issuer: address,
        symbol: "DEMOTKN",
        subunit: "udemotkn",
        precision: 6,
        initialAmount: "1000000",
        description: "Demo token from onebutton",
        features: ["burning", "freezing"],
      },
    };

    const fee = {
      amount: [{ denom: "utestcore", amount: "5000" }],
      gas: "200000",
    };

    const result = await client.signAndBroadcast(address, [msg], fee);
    alert(`✅ Mint tx hash: ${result.transactionHash}`);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>🚀 OneButton Demo</h1>
      <p>Mint a test smart token on Coreum testnet</p>
      <WalletSection />
      <button
        onClick={mintToken}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        🪙 Mint Token
      </button>
    </div>
  );
};

export const App = () => (
  <ChainProvider
    chains={chains}
    assetLists={[]}
    wallets={keplrWallets}
    signerOptions={{
      signingStargate: () => ({
        gasPrice: GasPrice.fromString("0.0625utestcore"),
      }),
    }}
    wrappedWithChakraProvider={false}
  >
    <AppInner />
  </ChainProvider>
);
