import { getChainProviderBlockscout } from '../utils';

import type {
  TransactionAddressBlockscout,
  TransactionBlockscout,
} from '../transaction';

export type BlockInfoBlockscout = {
  base_fee_per_gas: string;
  blob_gas_price: string | null;
  blob_gas_used: string;
  blob_transaction_count: number;
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
  rewards: [{ reward: string; type: 'Miner Reward' }];
  size: number;
  timestamp: string;
  total_difficulty: string;
  transaction_count: number;
  transaction_fees: string;
  type: 'block';
  uncles_hashes: [];
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
  block: number,
  chainId?: number,
) {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/blocks/${block}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as BlockInfoBlockscout;
  return body;
}

export async function fetchBlockTransactionsBlockscout(
  block: number,
  chainId?: number,
) {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/blocks/${block}/transactions`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as BlockTransactionsBlockscout;
  return body;
}
