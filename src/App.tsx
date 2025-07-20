import React from "react";
import { useChain } from "@cosmos-kit/react";

export default function App() {
  const { address, connect, status } = useChain("coreum");

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚀 Coreum Mint Demo</h1>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Wallet:</strong> {address || "Not connected"}</p>
      <button onClick={connect}>🔗 Connect Wallet</button>
    </div>
  );
}
