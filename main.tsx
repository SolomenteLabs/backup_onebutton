// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChainProvider } from '@cosmos-kit/react';
import { wallets as keplrExtensionWallets } from '@cosmos-kit/keplr-extension';
import { wallets as keplrMobileWallets } from '@cosmos-kit/keplr-walletconnect';
import { chains, assets } from 'chain-registry';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChainProvider
    chains={chains}
    assetLists={assets}
    wallets={[...keplrExtensionWallets, ...keplrMobileWallets]}
    walletConnectOptions={{
      signClient: {
        projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
        relayUrl: 'wss://relay.walletconnect.com',
        metadata: {
          name: 'OneButton Demo',
          description: 'Minimal smart token demo',
          url: 'https://accesslayer.org',
          icons: ['https://accesslayer.org/logo.png']
        }
      }
    }}
  >
    <App />
  </ChainProvider>
);

