import { getChainProviderBlockscout } from '../utils';

import type {
  TransactionAddressBlockscout,
  TransactionBlockscout,
} from '../transaction';

export type BlockInfoBlockscout = {
  base_fee_per_gas: string;
  blob_gas_price: null;
  blob_gas_used: string;
  blob_tx_count: number;
  burnt_blob_fees: string;
  burnt_fees: string;
  burnt_fees_percentage: number;
  difficulty: string;
  excess_blob_gas: string;
  gas_limit: string;
  gas_target_percentage: number;
  gas_used: string;
  gas_used_percentage: number;
  hash: string;
  height: number;
  miner: TransactionAddressBlockscout;
  nonce: string;
  parent_hash: string;
  priority_fee: string;
  rewards: Array<object>;
  size: number;
  timestamp: string;
  total_difficulty: string;
  tx_count: number;
  tx_fees: string;
  type: string;
  uncles_hashes: Array<any>;
  withdrawals_count: number;
};

export type BlockTransactionsBlockscout = {
  items: TransactionBlockscout[];
  next_page_params: {
    block_number: number;
    index: number;
    items_count: number;
  };
};

export async function fetchBlockInfoBlockscout(
  chainId: number,
  block?: number,
) {
  if (block) {
    const chainProvider: string = getChainProviderBlockscout(chainId);
    const query: string = `https://${chainProvider}/api/v2/blocks/${block}`;

    const response: Response = await fetch(query);
    const body = (await response.json()) as BlockInfoBlockscout;
    return body;
  }
  throw new Error('no block');
}

export async function fetchBlockTransactionsBlockscout(
  chainId: number,
  block?: number,
) {
  if (block) {
    const chainProvider: string = getChainProviderBlockscout(chainId);
    const query: string = `https://${chainProvider}/api/v2/blocks/${block}/transactions`;

    const response: Response = await fetch(query);
    const body = (await response.json()) as BlockTransactionsBlockscout;
    return body;
  }
  throw new Error('no block');
}
