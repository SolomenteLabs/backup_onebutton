import { ChainProvider, useWallet, ConnectWalletButton } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { chains } from "chain-registry";
import { assets } from "chain-registry";
import { useEffect, useState } from "react";

const demoChain = chains.find((c) => c.chain_name === "coreum-testnet");
const demoAsset = assets.find((c) => c.chain_name === "coreum-testnet");

if (!demoChain || !demoAsset) {
  throw new Error("❌ Chain or asset not found for coreum-testnet");
}

function MintButton() {
  const { address, getOfflineSigner, isConnected } = useWallet();
  const [status, setStatus] = useState("");

  const handleMint = async () => {
    if (!isConnected || !address) {
      setStatus("❌ Wallet not connected");
      return;
    }

    try {
      const rpc = demoChain.apis?.rpc?.[0]?.address;
      const denom = demoAsset.assets?.[0]?.base;
      const signer = await getOfflineSigner();
      const client = await SigningStargateClient.connectWithSigner(rpc, signer, {
        gasPrice: GasPrice.fromString("0.05utestcore"),
      });

      const msg = {
        fromAddress: address,
        toAddress: address,
        amount: [{ denom, amount: "1" }],
      };

      const fee = {
        amount: [{ denom, amount: "1000" }],
        gas: "200000",
      };

      const result = await client.sendTokens(address, address, msg.amount, fee, "Minting 1 token to self");
      setStatus(`✅ Minted! TxHash: ${result.transactionHash}`);
    } catch (err: any) {
      setStatus(`❌ Mint failed: ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <button onClick={handleMint}>🔥 Mint 1 Token</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default function App() {
  return (
    <ChainProvider
      chains={[demoChain]}
      assetLists={[demoAsset]}
      wallets={keplrWallets}
      walletConnectOptions={{
        signClient: {
          projectId: "coreum-demo",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "OneButton",
            description: "Demo App",
            url: "https://onebutton.vercel.app",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        },
      }}
    >
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h1>🟣 Coreum Smart Token Demo</h1>
        <ConnectWalletButton />
        <MintButton />
      </div>
    </ChainProvider>
  );
}
