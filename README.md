# EVMExplorer-Blockscout

[EVM Explorer](https://evmexplorer.com) TypeScript Blockscout v2 sdk.

## 📚 Install

```bash
npm install @evmexplorer/blockscout
```

or

```bash
yarn add @evmexplorer/blockscout
```

## Using EVMExplorer-Blockscout SDK

### Fetching a Transaction

To fetch a transaction on Ethereum mainnet as demonstrated on [Ethereum Stack Oveflow answer](https://ethereum.stackexchange.com/a/167002/79075):

```ts
import type { TransactionBlockscout } from '@evmexplorer/blockscout';
import { fetchTransactionBlockscout } from '@evmexplorer/blockscout';

const data: TransactionBlockscout = await fetchTransactionBlockscout(
  '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
);

console.log(data);
```

### Output

The `fetchTransactionBlockscout` function returns an object with the following properties:

```yaml
{
  priority_fee: '70439166556560',
  tx_burnt_fee: '676806248593230',
  raw_input: '0xa22cb4650000000000000000000000001e0049783f008a0085193e00003d00cd54003c710000000000000000000000000000000000000000000000000000000000000001',
  result: 'success',
  hash: '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
  max_fee_per_gas: '15917702655',
  revert_reason: null,
  confirmation_duration: [0, 12000],
  type: 2,
  token_transfers_overflow: false,
  confirmations: 47513,
  position: 72,
  max_priority_fee_per_gas: '1267119384',
  transaction_tag: null,
  created_contract: null,
  value: '0',
  tx_types: ['contract_call'],
  from:
    {
      ens_domain_name: null,
      hash: '0xA3b711752f08980F4a71777217FA81304aEB8ee7',
      implementations: [],
      is_contract: false,
      is_scam: false,
      is_verified: false,
      metadata: null,
      name: null,
      private_tags: [],
      proxy_type: null,
      public_tags: [],
      watchlist_names: [],
    },
  gas_used: '55590',
  status: 'ok',
  to:
    {
      ens_domain_name: null,
      hash: '0x22C1f6050E56d2876009903609a2cC3fEf83B415',
      implementations: [[Object]],
      is_contract: true,
      is_scam: false,
      is_verified: true,
      metadata: { tags: [Array] },
      name: 'AdminUpgradeabilityProxy',
      private_tags: [],
      proxy_type: 'eip1967',
      public_tags: [],
      watchlist_names: [],
    },
  authorization_list: [],
  method: 'setApprovalForAll',
  fee: { type: 'actual', value: '747245415149790' },
  tx_tag: null,
  actions: [],
  gas_limit: '73310',
  gas_price: '13442083381',
  decoded_input:
    {
      method_call: 'setApprovalForAll(address to, bool approved)',
      method_id: 'a22cb465',
      parameters: [[Object], [Object]],
    },
  has_error_in_internal_txs: false,
  token_transfers: [],
  base_fee_per_gas: '12174963997',
  timestamp: '2024-12-08T17:44:23.000000Z',
  nonce: 464,
  block: 21359346,
  transaction_types: ['contract_call'],
  exchange_rate: '3859.75',
  block_number: 21359346,
  has_error_in_internal_transactions: false,
}
```

You can also go over the transaction visually at [EVM Explorer transaction page](https://evmexplorer.com/transactions/mainnet/0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086).

### Fetching Vitalik's Address Tokens

You can also query the blockchain address token balances as demonstrated on [Stack Overflow](https://stackoverflow.com/a/79314959/13943679). For example, let's query [Vitalik's balances](https://evmexplorer.com/contracts/mainnet/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045):

```js
export type { AddressTokens } from "@evmexplorer/blockscout";
export { fetchTokensAddress } from "@evmexplorer/blockscout";

const data: AddressTokens = await fetchTokensAddress(
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
);
console.log(data.length)
console.log(data[0])
```

### Address Tokens Output

```yaml
6081
{
  token: {
    address: '0x28561B8A2360F463011c16b6Cc0B0cbEF8dbBcad',
    circulating_market_cap: '75858317.61202328',
    decimals: '9',
    exchange_rate: '0.00017784',
    holders: '14334',
    icon_url: 'https://assets.coingecko.com/coins/images/50348/small/1000000612.jpg?1727248974',
    name: 'MOO DENG',
    symbol: 'MOODENG',
    total_supply: '420690000000000000000',
    type: 'ERC-20',
    volume_24h: '10219755.637613483'
  },
  token_id: null,
  token_instance: null,
  value: '30000105889157756560'
}
```

Vitalik has 6081 tokens. The first token in the array of all 6081 tokens is [Moo Deng token](https://evmexplorer.com/contracts/mainnet/0x28561B8A2360F463011c16b6Cc0B0cbEF8dbBcad).

## Fetching Latest Block Transactions

You can also query the latest block transactions with `Ethers` provider as demonstrated on [Stack Overflow](https://stackoverflow.com/a/79361865/13943679).

```js
import { fetchBlockTransactionsBlockscout } from '@evmexplorer/blockscout';
const block = await provider.getBlock();
const data = await fetchBlockTransactionsBlockscout(block, 1);
```

## More information

[EVM Explorer - Tracking Smart Contract Transaction Data](https://dspyt.com/evmexplorer)

[Blockscout - Ethereum API documentation](https://eth.blockscout.com/api-docs)

[Blockscout - REST API Endpoints](https://docs.blockscout.com/devs/apis/rest)
