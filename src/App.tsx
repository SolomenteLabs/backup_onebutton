// src/App.tsx
import React, { useEffect, useState } from "react";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { SigningStargateClient } from "@cosmjs/stargate";
import { chains as registryChains } from "chain-registry";
import { assets } from "chain-registry";
import { useChain } from "@cosmos-kit/react";

export const App = () => {
  const coreumTestnet = {
    chain_name: "coreum-testnet",
    chain_id: "coreum-testnet-1",
    apis: {
      rpc: [{ address: "https://full-node.testnet-1.coreum.dev:26657" }],
      rest: [{ address: "https://full-node.testnet-1.coreum.dev:1317" }],
    },
    pretty_name: "Coreum Testnet",
    bech32_prefix: "testcore",
    slip44: 118,
  };

  const { connect, openView, isWalletConnected, address, getOfflineSigner } = useChain("coreum-testnet");

  const handleMint = async () => {
    if (!isWalletConnected) await connect();
    const signer = await getOfflineSigner();
    const client = await SigningStargateClient.connectWithSigner(
      coreumTestnet.apis.rpc[0].address,
      signer
    );

    const tx = {
      typeUrl: "/coreum.asset.ft.v1.MsgIssue",
      value: {
        issuer: address,
        symbol: "DEMO",
        subunit: "demo",
        precision: 6,
        initialAmount: "1000000",
        description: "Demo Token",
        features: ["burning", "minting"],
      },
    };

    const fee = {
      amount: [{ denom: "utestcore", amount: "5000" }],
      gas: "200000",
    };

    const result = await client.signAndBroadcast(address, [tx], fee);
    console.log("✅ Mint result:", result);
  };

  return (
    <ChainProvider
      chains={[coreumTestnet]}
      assetLists={[]}
      wallets={keplrWallets}
      walletConnectOptions={{ signClient: { projectId: "demo" } }}
    >
      <main style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
        <h1>🔨 Coreum Testnet Minter</h1>
        <p>{address ? `Connected: ${address}` : "Not connected"}</p>
        <button onClick={handleMint} style={{ padding: "1rem", fontSize: "1rem" }}>
          🚀 Mint Smart Token
        </button>
      </main>
    </ChainProvider>
  );
};

