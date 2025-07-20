import React from "react";
import { useChain } from "@cosmos-kit/react-lite";

export const App = () => {
  const { connect, isWalletConnected, address } = useChain("coreum-testnet");

  return (
    <div style={{
      fontFamily: "sans-serif",
      textAlign: "center",
      paddingTop: "10vh",
    }}>
      <h1>🪐 Backup OneButton</h1>
      <p>Simple Coreum testnet smart token minter</p>

      <button onClick={() => connect()} style={{ margin: "20px", padding: "10px 20px" }}>
        {isWalletConnected ? "✅ Wallet Connected" : "🔌 Connect Keplr"}
      </button>

      {isWalletConnected && (
        <div style={{ marginTop: "30px" }}>
          {/* 🔁 Existing Minting UI Goes Here */}
          {/* Feel free to edit below as needed */}

          {/* EXAMPLE: Replace or un-comment your mint logic here */}
          {/* <button onClick={yourMintFunction}>Mint</button> */}
          <p>Connected Wallet: {address}</p>
        </div>
      )}
    </div>
  );
};
