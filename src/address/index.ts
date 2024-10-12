import type { TokenBlockscout } from '../token';
import type { TransactionBlockscout } from '../transaction';

export type CountersContractBlockscout = {
  gas_usage_count: string;
  token_transfers_count: string;
  transactions_count: string;
  validations_count: string;
};

export type AddressInfoBlockscout = {
  block_number_balance_updated_at: number;
  coin_balance: string;
  creation_tx_hash: string | null;
  creator_address_hash: string | null;
  ens_domain_name: string | null;
  exchange_rate: string;
  has_beacon_chain_withdrawals: boolean;
  has_custom_methods_read: boolean;
  has_custom_methods_write: boolean;
  has_decompiled_code: boolean;
  has_logs: boolean;
  has_methods_read: boolean;
  has_methods_read_proxy: boolean;
  has_methods_write: boolean;
  has_methods_write_proxy: boolean;
  has_token_transfers: boolean;
  has_tokens: boolean;
  has_validated_blocks: boolean;
  hash: string;
  implementation_address: string | null;
  implementation_name: string | null;
  is_contract: boolean;
  is_verified: boolean | null;
  metadata: null;
  name: string;
  private_tags: [];
  public_tags: [];
  token: TokenBlockscout | null;
  watchlist_address_id: null;
  watchlist_names: [];
};

export type AddressTransactionsBlockscout = {
  items: TransactionBlockscout[];
  next_page_params: {
    block_number: number;
    fee: string;
    hash: string;
    index: number;
    inserted_at: string;
    items_count: number;
    value: string;
  };
};
