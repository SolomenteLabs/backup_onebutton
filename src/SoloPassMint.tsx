import React from "react";
import { useChain } from "@cosmos-kit/react";

export default function SoloPassMint() {
  const { isWalletConnected, connect, signAndBroadcast, address } = useChain("coreum");

  const handleMint = async () => {
    if (!isWalletConnected) {
      await connect();
      return;
    }

    try {
      const now = Math.floor(Date.now() / 1000);
      const expires = now + 30 * 24 * 60 * 60;

      const msg = {
        typeUrl: "/coreum.asset.ft.v1.MsgMint",
        value: {
          sender: address,
          amount: {
            denom: "usolopass",
            amount: "1",
          },
          recipient: address,
          smartProperties: {
            expiry: { value: expires.toString() },
            burnable: true,
            frozen: true,
          },
        },
      };

      const fee = {
        amount: [{ amount: "5000", denom: "utestcore" }],
        gas: "200000",
      };

      const result = await signAndBroadcast([msg], fee, "Minting SoloPass...");
      console.log("✅ Minted:", result);
    } catch (err) {
      console.error("⚠️ Error during mint:", err);
    }
  };

  return (
    <button
      onClick={isWalletConnected ? handleMint : connect}
      className="rounded-xl bg-black px-6 py-3 font-medium text-white shadow hover:bg-gray-800"
    >
      Mint 30 Day SoloPass
    </button>
  );
}
