import { useChain } from "@cosmos-kit/react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgMint } from "coreum-js/pkg/coreum/asset/ft/v1/tx";
import { coins } from "@cosmjs/stargate";
import React from "react";

const App = () => {
  const { connect, disconnect, openView, isWalletConnected, address, getOfflineSigner } = useChain("coreum");

  const handleMint = async () => {
    if (!address) return alert("Wallet not connected.");

    const signer = await getOfflineSigner();
    const client = await SigningStargateClient.connectWithSigner(
      "https://full-node.testnet-1.coreum.dev:26657",
      signer
    );

    const msg: MsgMint = {
      sender: address,
      amount: {
        denom: "utestcore", // change if minting a custom smart token
        amount: "1000000", // 1 token = 1000000 u (6 decimals)
      },
    };

    try {
      const fee = {
        amount: coins(25000, "utestcore"),
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address, [
        {
          typeUrl: "/coreum.asset.ft.v1.MsgMint",
          value: msg,
        },
      ], fee);

      console.log("Mint Tx result:", result);
      alert("Mint transaction sent!");
    } catch (err) {
      console.error("Mint error:", err);
      alert("Mint failed. See console.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Coreum Mint Demo</h1>
      {!isWalletConnected ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
          <br /><br />
          <button onClick={handleMint}>Mint Token</button>
        </>
      )}
    </div>
  );
};

export default App;

