# EVMExplorer-Blockscout

[EVMExplorer](evmexplorer.com) typescript blockscout v2 sdk.

## 📚 Install

```bash
npm install @evmexplorer/blockscout
```

or

```bash
yarn add @evmexplorer/blockscout
```

## Example usage

To fetch a transaction on Ethereum mainnet as demonstrated on [Ethereum Stack Oveflow answer](https://ethereum.stackexchange.com/a/167002/79075):

```ts
import type { TransactionBlockscout } from '@evmexplorer/blockscout';
import { fetchTransactionBlockscout } from '@evmexplorer/blockscout';

async function fetchData() {
  const data: TransactionBlockscout =
    await evmexplorer.fetchTransactionBlockscout(
      '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
    );
  return data;
}

fetchData();
```

You can also go over the transaction visually at [EVM Explorer transaction page](https://evmexplorer.com/transactions/mainnet/0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086).

## More information

[EVM Explorer - Tracking Smart Contract Transaction Data](https://dspyt.com/evmexplorer)
