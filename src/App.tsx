// ~/backup-onebutton/src/App.tsx

import { useEffect, useState } from "react";
import { ChainProvider, WalletSection, useManager } from "@cosmos-kit/react";
import { wallets } from "@cosmos-kit/keplr";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { chains as defaultChains } from "chain-registry";

const coreumTestnet = {
  chain_name: "coreum-testnet",
  chain_id: "coreum-testnet-1",
  apis: {
    rpc: [{ address: "https://full-node.testnet-1.coreum.dev:26657" }],
    rest: [{ address: "https://full-node.testnet-1.coreum.dev:1317" }],
  },
  pretty_name: "Coreum Testnet",
  bech32_prefix: "testcore",
  slip44: 118,
};

const AppInner = () => {
  const { getWalletRepo } = useManager();
  const [status, setStatus] = useState("");

  const mint = async () => {
    try {
      setStatus("🔄 Connecting to wallet...");
      const wallet = await getWalletRepo("keplr").getWallet();
      await wallet?.connect();

      const signer = await wallet?.getOfflineSigner();
      const address = (await signer?.getAccounts())?.[0]?.address;
      if (!address) throw new Error("No address found");

      const client = await SigningStargateClient.connectWithSigner(
        coreumTestnet.apis.rpc[0].address,
        signer!,
        {
          gasPrice: GasPrice.fromString("0.0625utestcore"),
        }
      );

      const msg = {
        typeUrl: "/coreum.asset.ft.v1.MsgIssue",
        value: {
          issuer: address,
          symbol: "DEMOTOKEN",
          subunit: "demo",
          precision: 6,
          initialAmount: "1",
          description: "Demo token with 30-day expiry",
          features: ["burning", "minting", "freezing"],
          burnRate: "0.0",
          sendCommissionRate: "0.0",
          uri: "",
          uriHash: "",
        },
      };

      const fee = {
        amount: [{ denom: "utestcore", amount: "2500" }],
        gas: "500000",
      };

      const result = await client.signAndBroadcast(address, [msg], fee);
      if (result.code === 0) {
        setStatus("✅ Token minted! Expires in 30 days.");
      } else {
        throw new Error(result.rawLog);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Mint failed: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: "10vh" }}>
      <h1>🚀 OneButton Demo</h1>
      <p>Click to mint a demo token to your Keplr wallet.</p>
      <button
        onClick={mint}
        style={{
          fontSize: "1.2rem",
          padding: "0.8rem 2rem",
          borderRadius: "12px",
          border: "none",
          background: "#4b7bec",
          color: "white",
          cursor: "pointer",
        }}
      >
        Mint Token
      </button>
      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
};

export const App = () => {
  return (
    <ChainProvider
      chains={[coreumTestnet]}
      assetLists={[]}
      wallets={wallets}
      wrappedWithChakraProvider={false}
    >
      <AppInner />
    </ChainProvider>
  );
};

