import { useChain } from '@cosmos-kit/react';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { MsgMintSmartToken } from 'coreum-js/wallet-coreum-coreum.types'; // double check this import if error
import { useEffect } from 'react';

export function App() {
  const {
    connect,
    disconnect,
    getOfflineSigner,
    address,
    status,
    isWalletConnected,
  } = useChain('coreum-testnet');

  const handleMint = async () => {
    try {
      const signer = await getOfflineSigner();
      const client = await SigningStargateClient.connectWithSigner(
        'https://full-node.testnet-coreum.dev:26657',
        signer
      );

      const msg = {
        typeUrl: '/coreum.asset.ft.v1.MsgMint',
        value: {
          sender: address,
          amount: {
            denom: 'utestcore', // Coreum Testnet native denom
            amount: '1',        // 1 utestcore
          },
          coin: {
            denom: 'utestcore',
            amount: '1',
          },
          recipient: address,
        },
      };

      const fee = {
        amount: [{ denom: 'utestcore', amount: '5000' }],
        gas: '200000',
      };

      const result = await client.signAndBroadcast(address, [msg], fee);
      if (result.code === 0) {
        alert('✅ Token Minted!');
      } else {
        alert(`❌ Mint failed: ${result.rawLog}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Transaction failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <img src="/logo.png" alt="Logo" className="w-20 mb-4" />
      <h1 className="text-3xl font-bold mb-2">OneButton Mint</h1>
      <p className="text-gray-400 mb-6">Mint a Coreum Smart Token (Testnet)</p>

      {isWalletConnected ? (
        <>
          <p className="mb-2">Wallet:</p>
          <p className="mb-4 text-sm text-green-400">{address}</p>
          <button
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl text-white font-bold"
            onClick={handleMint}
          >
            Mint Token
          </button>
          <button
            className="mt-4 text-sm underline text-gray-400"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl text-white font-bold"
          onClick={connect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
