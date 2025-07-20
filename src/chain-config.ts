export const coreumTestnet = {
  chainId: "coreum-testnet-1",
  chainName: "Coreum Testnet",
  rpc: "https://full-node.testnet-1.coreum.dev:26657",
  rest: "https://lcd-coreum-testnet.quickapi.com",
  bip44: { coinType: 990 },
  bech32Config: {
    bech32PrefixAccAddr: "testcore",
    bech32PrefixAccPub: "testcorepub",
    bech32PrefixValAddr: "testcorevaloper",
    bech32PrefixValPub: "testcorevaloperpub",
    bech32PrefixConsAddr: "testcorevalcons",
    bech32PrefixConsPub: "testcorevalconspub",
  },
  currencies: [
    {
      coinDenom: "CORE",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "CORE",
      coinMinimalDenom: "utestcore",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: {
    coinDenom: "CORE",
    coinMinimalDenom: "utestcore",
    coinDecimals: 6,
  },
  gasPriceStep: {
    low: 0.025,
    average: 0.03,
    high: 0.04,
  },
};

