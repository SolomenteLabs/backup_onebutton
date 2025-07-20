import React from "react";
import { useChain } from "@cosmos-kit/react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgIssue } from "coreum-js/dist/coreum/token/v1/tx";
import Long from "long";

export default function App() {
  const { isWalletConnected, connect, address, getOfflineSigner } = useChain("coreum");

  const handleMint = async () => {
    if (!isWalletConnected || !address) return;

    const signer = await getOfflineSigner();
    const client = await SigningStargateClient.connectWithSigner(
      "https://full-node.testnet-1.coreum.dev:26657",
      signer
    );

    const now = Math.floor(Date.now() / 1000);
    const expires = now + 30 * 24 * 60 * 60;

    const msg: MsgIssue = {
      issuer: address,
      symbol: "SOLOPASS",
      subunit: "spass",
      precision: 0,
      initialAmount: "1",
      description: "30-day expiring pass",
      features: ["burning", "freezing"],
      burnRate: "0",
      sendCommissionRate: "0",
      uri: "https://accesslayer.org",
      uriHash: "",
      denomUnits: [],
      frozen: true,
      dateExpiry: Long.fromNumber(expires),
    };

    const fee = {
      amount: [{ denom: "utestcore", amount: "5000" }],
      gas: "200000",
    };

    const result = await client.signAndBroadcast(address, [
      {
        typeUrl: "/coreum.token.v1.MsgIssue",
        value: msg,
      },
    ], fee);

    console.log("Mint result:", result);
    alert("Transaction submitted!");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>SoloPass Mint Demo</h1>
      <button
        style={{
          padding: "1rem 2rem",
          backgroundColor: "#1f2937",
          color: "white",
          fontSize: "1.25rem",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
        onClick={isWalletConnected ? handleMint : connect}
      >
        {isWalletConnected ? "Mint SoloPass" : "Connect Wallet"}
      </button>
    </div>
  );
}
O

