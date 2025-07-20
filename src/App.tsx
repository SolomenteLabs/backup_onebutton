import React from "react";
import { useChain } from "@cosmos-kit/react";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgIssue } from "coreum-js/dist/coreum/token/v1/tx";

export default function App() {
  const { connect, connected, address, getOfflineSigner, chain } = useChain("coreum");

  const handleMint = async () => {
    try {
      if (!connected) await connect();

      const signer = await getOfflineSigner();
      const client = await SigningStargateClient.connectWithSigner(chain.rpc, signer);

      const now = Math.floor(Date.now() / 1000);
      const expires = now + 30 * 24 * 60 * 60;

      const msg: MsgIssue = {
        issuer: address!,
        symbol: "SOLOPASS",
        subunit: "usolopass",
        precision: 6,
        initialAmount: "1",
        description: "30 Day SoloPass Token",
        features: ["burning", "freezing", "soulbound", "expiry"],
        burnRate: "0.0",
        sendCommissionRate: "0.0",
        uri: "",
        uriHash: "",
        frozen: true,
        soulbound: true,
        whitelistedLimit: [],
        subunitToUnitConversion: 1_000_000,
        dateExpiry: BigInt(expires),
      };

      const fee = {
        amount: [{ denom: "utestcore", amount: "5000" }],
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address!, [
        {
          typeUrl: "/coreum.token.v1.MsgIssue",
          value: msg,
        },
      ], fee);

      if (result.code === 0) {
        alert("✅ Token minted successfully!");
      } else {
        console.error(result);
        alert("❌ Mint failed.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error during mint.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <button
        onClick={handleMint}
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          padding: "16px 32px",
          fontSize: "18px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Mint 30 Day SoloPass
      </button>
    </div>
  );
}

