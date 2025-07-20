import { useChain } from '@cosmos-kit/react';

const App = () => {
  const { connect, openView, status, address, disconnect } = useChain('coreum-testnet');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white text-center">
      <img src="/logo.png" className="w-24 mb-4" />
      <h1 className="text-3xl font-bold">OneButton Mint</h1>
      <p className="mb-6 text-gray-400">Mint a Smart Token on Coreum Testnet</p>

      {status === 'Connected' ? (
        <>
          <p className="mb-2">Wallet: {address}</p>
          <button
            className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold"
            onClick={() => {/* TODO: Add mint logic */}}
          >
            Mint Token
          </button>
        </>
      ) : (
        <button
          className="bg-blue-600 px-6 py-2 rounded-xl text-white font-bold"
          onClick={connect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

