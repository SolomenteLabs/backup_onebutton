import { Chain } from "@cosmos-kit/core";

export const coreumChain: Chain = {
  chain_name: "coreum",
  status: "live",
  chain_id: "coreum-testnet-1",
  pretty_name: "Coreum Testnet",
  bech32_prefix: "core",
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "utestcore",
        fixed_min_gas_price: 0.025,
        low_gas_price: 0.025,
        average_gas_price: 0.03,
        high_gas_price: 0.05,
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: "https://full-node.testnet-1.coreum.dev:26657",
        provider: "coreum"
      }
    ],
    rest: [
      {
        address: "https://rest.testnet-1.coreum.dev",
        provider: "coreum"
      }
    ]
  },
  currencies: [
    {
      coin_denom: "TESTCORE",
      coin_minimal_denom: "utestcore",
      coin_decimals: 6,
      coin_gecko_id: "coreum",
    }
  ],
  stake_currency: {
    coin_denom: "TESTCORE",
    coin_minimal_denom: "utestcore",
    coin_decimals: 6,
    coin_gecko_id: "coreum",
  },
  gas_price_step: {
    low: 0.025,
    average: 0.03,
    high: 0.05,
  },
};
