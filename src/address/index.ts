import type { TokenBlockscout } from '../token';
import type { TransactionBlockscout, NextPageParams } from '../transaction';

import { getChainProviderBlockscout } from '../utils';

export type CountersContractBlockscout = {
  gas_usage_count: string;
  token_transfers_count: string;
  transactions_count: string;
  validations_count: string;
};

export type AddressInfoBlockscout = {
  block_number_balance_updated_at: number;
  coin_balance: string;
  creation_transaction_hash: string | null;
  creator_address_hash: string | null;
  ens_domain_name: string | null;
  exchange_rate: string;
  has_beacon_chain_withdrawals: boolean;
  has_decompiled_code: boolean;
  has_logs: boolean;
  has_token_transfers: boolean;
  has_tokens: boolean;
  has_validated_blocks: boolean;
  hash: string;
  implementations: [];
  is_contract: boolean;
  is_scam: boolean;
  is_verified: boolean | null;
  metadata: null;
  name: string;
  private_tags: [];
  proxy_type: null;
  public_tags: [];
  token: TokenBlockscout | null;
  watchlist_address_id: null;
  watchlist_names: [];
};

export type AddressTransactionsBlockscout = {
  items: TransactionBlockscout[];
  next_page_params: NextPageParams;
};

export async function fetchContractCounters(
  address: string,
  chainId?: number,
): Promise<CountersContractBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/addresses/${address}/counters`;

  const response: Response = await fetch(query);
  if (response.status === 200) {
    const body = (await response.json()) as CountersContractBlockscout;
    if (
      body.gas_usage_count === '0' &&
      body.token_transfers_count === '0' &&
      body.transactions_count === '0' &&
      body.validations_count === '0'
    ) {
      throw new Error('BlockScout Contract Counters response empty');
    }
    if (body.transactions_count !== '0' && body.gas_usage_count === '0') {
      throw new Error('BlockScout Contract Counters response faulty');
    }
    if (body.gas_usage_count === '0' && body.token_transfers_count !== '0') {
      throw new Error('BlockScout Contract Counters response faulty');
    }
    return body;
  }
  throw new Error('BlockScout Contract Counters response undefined');
}

export async function fetchAddressTransactions(
  address: string,
  chainId?: number,
): Promise<TransactionBlockscout[]> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/addresses/${address}/transactions`;

  const response: Response = await fetch(query, { mode: 'cors' });
  const body = (await response.json()) as AddressTransactionsBlockscout;

  if (body && body.items) return body.items;

  throw new Error('no transactions');
}

export async function fetchAddressInfo(
  address: string,
  chainId?: number,
): Promise<AddressInfoBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/addresses/${address}`;

  const response: Response = await fetch(query, { mode: 'cors' });
  const body = (await response.json()) as AddressInfoBlockscout;

  if (!body.hash) throw new Error('no address info data');

  return body;
}
