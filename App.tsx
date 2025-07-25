import React from "react";
import { useChain } from "@cosmos-kit/react";
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { MsgMintSmartToken, SmartTokenProperties } from "coreum-js";
import { Registry } from "@cosmjs/proto-signing";
import Long from "long";

const App = () => {
  const { address, connect, isWalletConnected } = useChain("coreum");

  const handleMint = async () => {
    try {
      const chainId = "coreum-testnet-1";
      const rpcEndpoint = "https://full-node.testnet-1.coreum.dev:26657";
      const denom = "utestcore";
      const fee = {
        amount: [{ denom, amount: "5000" }],
        gas: "200000",
      };

      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      const now = Math.floor(Date.now() / 1000);
      const expires = now + 30 * 24 * 60 * 60;

      const props: SmartTokenProperties = {
        burnable: true,
        frozen: true,
        whitelistedLimit: false,
        userIssuable: false,
        isSoulbound: true,
        dateExpires: {
          seconds: Long.fromNumber(expires),
          nanos: 0,
        },
      };

      const msg: MsgMintSmartToken = {
        sender: accounts[0].address,
        amount: {
          denom: denom,
          amount: "1",
        },
        properties: props,
      };

      const registry = new Registry();
      registry.register("/coreum.token.v1.MsgMintSmartToken", MsgMintSmartToken);

      const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner, {
        registry,
        gasPrice: GasPrice.fromString("0.025utestcore"),
      });

      const result = await client.signAndBroadcast(accounts[0].address, [msg], fee);

      if (result.code === 0) {
        alert("✅ Mint successful! TxHash: " + result.transactionHash);
      } else {
        alert("❌ Mint failed: " + result.rawLog);
      }
    } catch (err: any) {
      console.error(err);
      alert("❌ Error minting: " + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h2>✅ Connect and Mint SoloPass</h2>
      <button
        style={{ fontSize: "1.2rem", padding: "10px 20px", backgroundColor: "#1f2937", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        onClick={isWalletConnected ? handleMint : connect}
      >
        Mint SoloPass
      </button>
    </div>
  );
};

export default App;
