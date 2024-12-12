import type { TokenBlockscout } from '../token';
import type { TransactionBlockscout, NextPageParams } from '../transaction';

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
