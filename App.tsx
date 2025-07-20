import React from "react";
import { useWallet } from "@cosmos-kit/react";
import { MsgIssue } from "coreum-js";
import { SigningStargateClient } from "@cosmjs/stargate";

const App: React.FC = () => {
  const { connect, disconnect, isConnected, address, getOfflineSigner } = useWallet();

  const handleMint = async () => {
    try {
      const signer = await getOfflineSigner();
      const client = await SigningStargateClient.connectWithSigner(
        "https://full-node.testnet-1.coreum.dev:26657",
        signer
      );

      const msg = {
        typeUrl: "/coreum.asset.ft.v1.MsgIssue",
        value: MsgIssue.fromPartial({
          issuer: address!,
          symbol: "HACK",
          subunit: "uhack",
          precision: 6,
          initialAmount: "1000000",
          features: ["burn", "minting", "soulbound"],
          description: "Hack Demo Token",
        }),
      };

      const fee = {
        amount: [{ denom: "ucore", amount: "5000" }],
        gas: "250000",
      };

      const result = await client.signAndBroadcast(address!, [msg], fee);
      console.log("Mint TX:", result);
      alert(`Success! TX Hash: ${result.transactionHash}`);
    } catch (err) {
      console.error("Mint failed:", err);
      alert("Mint failed — check console for error.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {isConnected ? (
        <>
          <p>Connected as {address}</p>
          <button onClick={handleMint}>Mint Smart Token</button>
          <br />
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect Keplr</button>
      )}
    </div>
  );
};

export default App;
