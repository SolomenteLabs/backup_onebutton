import { useChain } from '@cosmos-kit/react';
import { SigningStargateClient } from '@cosmjs/stargate';
import { useEffect, useState } from 'react';

export function App() {
  const {
    connect,
    disconnect,
    getOfflineSigner,
    address,
    status,
    isWalletConnected,
  } = useChain('coreum-testnet');

  const [txStatus, setTxStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleMint = async () => {
    try {
      setTxStatus('minting');
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
            denom: 'utestcore',
            amount: '1',
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
        setTxHash(result.transactionHash);
        setTxStatus('success');
      } else {
        console.error('Mint error:', result.rawLog);
        setTxStatus('error');
      }
    } catch (err) {
      console.error(err);
      setTxStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <img src="/logo.png" alt="Logo" className="w-20 mb-4" />
      <h1 className="text-3xl font-bold mb-2">OneButton Mint</h1>
      <p className="text-gray-400 mb-6">Mint a Coreum Smart Token (Testnet)</p>

      {isMobile && !isWalletConnected && (
        <p className="text-sm text-yellow-400 mb-4">
          ⚠️ On mobile? Be sure to use WalletConnect or open this in Keplr browser.
        </p>
      )}

      {isWalletConnected ? (
        <>
          <p className="mb-2 text-green-400 text-xs">Connected as:</p>
          <p className="mb-4 text-sm break-all">{address}</p>

          <button
            className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl text-white font-bold disabled:opacity-50"
            onClick={handleMint}
            disabled={txStatus === 'minting'}
          >
            {txStatus === 'minting' ? 'Minting...' : 'Mint Token'}
          </button>

          {txStatus === 'success' && txHash && (
            <p className="mt-4 text-sm text-blue-400">
              ✅ Success:{" "}
              <a
                href={`https://testnet-coreum-explorer.coreum.dev/transactions/${txHash}`}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                View on Explorer
              </a>
            </p>
          )}
          {txStatus === 'error' && (
            <p className="mt-4 text-red-400 text-sm">❌ Transaction failed</p>
          )}

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
