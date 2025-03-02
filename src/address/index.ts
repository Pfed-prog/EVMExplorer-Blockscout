import type { TokenBlockscout } from '../tokens';
import type {
  TransactionBlockscout,
  NextPageParams,
  TransactionAddressBlockscout,
} from '../transaction';

import { getChainProviderBlockscout } from '../utils';

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
  next_page_params: NextPageParams | null;
};

export type CountersContractBlockscout = {
  gas_usage_count: string;
  token_transfers_count: string;
  transactions_count: string;
  validations_count: string;
};

export type InternalTransactionsObject = {
  block_index: number;
  block_number: number;
  created_contract: null;
  error: null;
  from: TransactionAddressBlockscout;
  gas_limit: string;
  index: number;
  success: boolean;
  timestamp: string;
  to: TransactionAddressBlockscout;
  transaction_hash: string;
  transaction_index: number;
  type: 'delegatecall' | 'call';
  value: string;
};

export type NextPageInternalParams = {
  block_number: number;
  index: number;
  items_count: number;
  transaction_index: number;
};

export type InternalTransactionsBlockscout = {
  items: InternalTransactionsObject[];
  next_page_params: NextPageInternalParams;
};

export type TokenTransfersObject = {
  block_hash: string;
  block_number: number;
  from: TransactionAddressBlockscout;
  log_index: number;
  method: string;
  timestamp: string;
  to: TransactionAddressBlockscout;
  token: TokenBlockscout;
  total: {
    decimals: number | null;
    value: string;
  };
  transaction_hash: string;
  type: 'token_transfer' | 'token_transfers' | 'token_minting';
};

export type NextPageTokenTransfersParams = {
  block_number: number;
  index: number;
};

export type TokenTransfersBlockscout = {
  items: TokenTransfersObject[];
  next_page_params: NextPageTokenTransfersParams;
};

export async function fetchAddressCounters(
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
  parameters?: string,
  chainId?: number,
): Promise<AddressTransactionsBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  let query: string = '';
  if (parameters) {
    query = `https://${chainProvider}/api/v2/addresses/${address}/transactions?${parameters}`;
  }
  if (!parameters) {
    query = `https://${chainProvider}/api/v2/addresses/${address}/transactions`;
  }

  const response: Response = await fetch(query);
  const body = (await response.json()) as AddressTransactionsBlockscout;

  if (body) return body;

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

export async function fetchInternalTransactionsBlockscout(
  address: string,
  parameters?: string,
  chainId?: number,
): Promise<InternalTransactionsBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);

  let query: string = '';

  if (parameters) {
    query = `https://${chainProvider}/api/v2/addresses/${address}/internal-transactions?${parameters}`;
  }
  if (!parameters) {
    query = `https://${chainProvider}/api/v2/addresses/${address}/internal-transactions`;
  }

  const response: Response = await fetch(query);
  const body = (await response.json()) as InternalTransactionsBlockscout;
  if (body) return body;

  throw new Error('no transactions');
}

export async function fetchTokenTransfersBlockscout(
  address: string,
  parameters?: string,
  chainId?: number,
): Promise<TokenTransfersBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);

  let query: string = '';
  if (parameters) {
    query = `https://${chainProvider}/api/v2/addresses/${address}/token-transfers?${parameters}`;
  }
  if (!parameters) {
    query = `https://${chainProvider}/api/v2/addresses/${address}/token-transfers`;
  }
  const response: Response = await fetch(query);
  const body = (await response.json()) as TokenTransfersBlockscout;
  if (body) return body;

  throw new Error('no transactions');
}

export type AddressTokens = {
  token: {
    address: string;
    circulating_market_cap: string | null;
    decimals: string | null;
    exchange_rate: string | null;
    holders: string;
    icon_url: string | null;
    name: string;
    symbol: string;
    total_supply: string;
    type: 'ERC-20' | 'ERC-721';
    volume_24h: string | null;
  };
  token_id: null;
  token_instance: null;
  value: string;
};

export async function fetchTokensAddress(
  address: string,
  chainId?: number,
): Promise<AddressTokens[]> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/addresses/${address}/token-balances`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as AddressTokens[];

  if (body) return body;

  throw new Error('no tokens');
}
