import React from "react";
import { useChain } from "@cosmos-kit/react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgMint, SmartTokenProperties } from "coreum-js";
import { Registry } from "@cosmjs/proto-signing";
import { EncodeObject } from "@cosmjs/proto-signing";
import logo from "../solopass-logo.png";

const App: React.FC = () => {
  const { connect, isWalletConnected, address, getOfflineSigner, chain } = useChain("coreum");

  const handleMint = async () => {
    try {
      if (!isWalletConnected || !address || !getOfflineSigner) {
        await connect();
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      const expires = now + 30 * 24 * 60 * 60;

      const msg: MsgMint = {
        sender: address,
        recipient: address,
        amount: "1",
        denom: "usolopass",
        subunit: "usolopass",
        decimals: 6,
        features: ["burning", "freezing", "soulbound"],
        properties: {
          burnable: true,
          frozen: true,
          soulbound: true,
          expiry: BigInt(expires),
        } as SmartTokenProperties,
      };

      const registry = new Registry();
      registry.register("/coreum.token.v1.MsgMint", MsgMint);

      const client = await SigningStargateClient.connectWithSigner(
        chain.apis.rpc[0].address,
        await getOfflineSigner(),
        { registry }
      );

      const fee = {
        amount: [{ denom: "utestcore", amount: "5000" }],
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address, [msg as EncodeObject], fee);
      if (result.code === 0) {
        alert("✅ Mint successful!");
      } else {
        alert("⚠️ Mint failed: " + result.rawLog);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error during mint.");
    }
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
    }}>
      <img src={logo} alt="AccessLayer Logo" style={{ width: 100, marginBottom: 20 }} />
      <h1 style={{ fontSize: "1.8rem", margin: 0 }}>AccessLayer</h1>
      <p style={{ fontSize: "1rem", color: "#444", marginBottom: "40px" }}>
        Tokenized Infrastructure. Elegant by Design. Built on Coreum.
      </p>
      <button
        onClick={handleMint}
        style={{
          backgroundColor: "#111827",
          color: "white",
          fontSize: "1rem",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Mint 30 Day SoloPass
      </button>
    </div>
  );
};

export default App;
