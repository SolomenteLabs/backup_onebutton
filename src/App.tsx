import React from "react"
import { useChain } from "@cosmos-kit/react"
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate"
import { MsgMintSmartToken, SmartTokenProperties } from "coreum-js/dist/coreum/token/v1/tx"
import { Registry } from "@cosmjs/proto-signing"
import Long from "long"

const App = () => {
  const { address, connect, isWalletConnected } = useChain("coreum")

  const handleMint = async () => {
    try {
      const chainId = "coreum-testnet-1"
      const rpcEndpoint = "https://full-node.testnet-1.coreum.dev:26657"
      const denom = "utestcore"
      const fee = {
        amount: [{ denom, amount: "5000" }],
        gas: "200000",
      }

      const offlineSigner = window.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()

      const now = Math.floor(Date.now() / 1000)
      const expires = now + 30 * 24 * 60 * 60

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
      }

      const msg: MsgMintSmartToken = {
        sender: accounts[0].address,
        amount: {
          denom: denom,
          amount: "1",
        },
        properties: props,
      }

      const registry = new Registry()
      registry.register("/coreum.token.v1.MsgMintSmartToken", MsgMintSmartToken)

      const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, offlineSigner, {
        registry,
        gasPrice: GasPrice.fromString("0.025utestcore"),
      })

      const result = await client.signAndBroadcast(accounts[0].address, [msg], fee)

      if (result.code === 0) {
        alert("✅ Mint successful! TxHash: " + result.transactionHash)
      } else {
        alert("❌ Mint failed: " + result.rawLog)
      }
    } catch (err) {
      console.error(err)
      alert("❌ Error minting: " + err.message)
    }
  }

  return (
    <div className="App">
      <h1>✅ Connect and Mint SoloPass</h1>
      <button onClick={isWalletConnected ? handleMint : connect}>Mint SoloPass</button>
    </div>
  )
}

export default App
