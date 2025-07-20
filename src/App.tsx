import React, { useState } from "react";
import { useChain } from "@cosmos-kit/react";
import {
  SigningStargateClient,
  GasPrice,
} from "@cosmjs/stargate";
import { coins } from "@cosmjs/proto-signing";

const denom = "utestcore";
const recipient = "core1v0zpgk2v0zzsewxyx2dtkz9r3g9w58xn32jch3"; // <-- Change if needed

const App = () => {
  const { connect, disconnect, isWalletConnected, address, getOfflineSigner, chain } =
    useChain("coreum");

  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setError(null);
    setTxHash(null);
    setLoading(true);

    try {
      await connect();
      const signer = await getOfflineSigner();

      const client = await SigningStargateClient.connectWithSigner(
        "https://full-node.testnet-1.coreum.dev:26657",
        signer,
        {
          gasPrice: GasPrice.fromString("0.075utestcore"),
        }
      );

      const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

      const msgAny = {
        typeUrl: "/coreum.asset.ft.v1.MsgMint",
        value: {
          sender: address,
          coin: {
            denom: "mytoken", // Replace with actual smart token denom if needed
            amount: "1",
          },
          recipient,
        },
      };

      const fee = {
        amount: coins(1000, denom),
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address, [msgAny], fee);

      if (result.code === 0) {
        setTxHash(result.transactionHash);
      } else {
        setError(`Transaction failed: ${result.rawLog}`);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🧪 Coreum Testnet Mint Demo</h1>
      <button onClick={handleMint} disabled={loading}>
        {loading ? "Minting..." : "Mint Smart Token (30d Expiration)"}
      </button>

      {txHash && (
        <p>
          ✅ Success! Tx Hash:{" "}
          <a
            href={`https://www.mintscan.io/coreum-testnet/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash}
          </a>
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          ❌ {error}
        </p>
      )}

      <p style={{ marginTop: "1rem" }}>
        {isWalletConnected ? `🔗 Connected: ${address}` : "❌ Not connected"}
      </p>
    </div>
  );
};

export default App;

