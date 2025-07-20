import { SigningStargateClient } from "@cosmjs/stargate";
import { createDefaultRegistry } from "coreum-js";
import { GasPrice } from "@cosmjs/stargate";

const handleMint = async () => {
  try {
    const chainId = "coreum-testnet-1";
    const rpc = "https://full-node.testnet-1.coreum.dev:26657";

    // Ensure Keplr extension is available
    if (!window.keplr) {
      alert("Keplr extension not found.");
      return;
    }

    // Enable the chain in Keplr (this triggers the popup)
    await window.keplr.enable(chainId);

    // Get signer from Keplr
    const offlineSigner = window.getOfflineSigner!(chainId);
    const accounts = await offlineSigner.getAccounts();
    const address = accounts[0].address;

    // Create protobuf-compatible client
    const registry = createDefaultRegistry();
    const gasPrice = GasPrice.fromString("0.05utestcore");

    const client = await SigningStargateClient.connectWithSigner(rpc, offlineSigner, {
      registry,
      gasPrice,
    });

    // Compose message
    const msg = {
      typeUrl: "/coreum.asset.ft.v1.MsgMint",
      value: {
        sender: address,
        recipient: address,
        coin: {
          denom: "usolopass", // replace this with your token denom
          amount: "1", // Mint 1 unit
        },
      },
    };

    const fee = {
      amount: [{ denom: "utestcore", amount: "2500" }],
      gas: "200000",
    };

    // Sign & broadcast
    const result = await client.signAndBroadcast(address, [msg], fee);

    if (result.code === 0) {
      alert("✅ Mint successful!");
    } else {
      console.error(result);
      alert(`❌ Transaction failed: ${result.rawLog}`);
    }
  } catch (error) {
    console.error("Minting failed", error);
    alert("⚠️ Error during mint.");
  }
};


export default App;
