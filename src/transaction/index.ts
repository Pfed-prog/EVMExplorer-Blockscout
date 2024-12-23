import type { TokenBlockscout } from '../token';

export type Fee = {
  type: string;
  value: string;
};

export type DecodedInput = {
  method_call: string;
  method_id: string;
  parameters: TransactionParameter[];
};

export type TransactionParameter = {
  name: string;
  type: string;
  value: string;
};

export type TokenTransferBlockscout = {
  block_hash: string;
  from: TransactionAddressBlockscout;
  to: TransactionAddressBlockscout;
  log_index: string;
  method: null;
  timestamp: null;
  token: TokenBlockscout;
  total: { token_id: string; decimals?: string | null; value?: string };
  tx_hash: string;
  type: string;
};

export type TransactionAddressBlockscout = {
  ens_domain_name: string | null;
  hash: string;
  implementations: [];
  is_contract: boolean;
  is_scam?: boolean;
  is_verified: boolean;
  metadata: Object | null;
  name: string | null;
  private_tags: [];
  proxy_type: string | null;
  public_tags: [];
  watchlist_names: [];
};

export type TransactionBlockscout = {
  priority_fee: string | null;
  tx_burnt_fee: string | null;
  raw_input: string;
  result: 'success' | 'Reverted';
  hash: string;
  max_fee_per_gas: string;
  revert_reason: Object | null;
  confirmation_duration: number[];
  type: number;
  token_transfers_overflow: null;
  confirmations: number;
  position: number;
  max_priority_fee_per_gas: string;
  transaction_tag: null;
  created_contract: null | TransactionAddressBlockscout;
  value: string;
  tx_types: string[];
  from: TransactionAddressBlockscout;
  gas_used: string;
  status: 'ok' | 'error';
  to: TransactionAddressBlockscout | null;
  authorization_list: [];
  method: string | null;
  fee: Fee;
  tx_tag: null;
  actions: [];
  gas_limit: string;
  gas_price: string;
  decoded_input: DecodedInput | null;
  has_error_in_internal_txs?: boolean;
  token_transfers: null | TokenTransferBlockscout[];
  base_fee_per_gas: string;
  timestamp: string;
  nonce: number;
  block?: number | null;
  transaction_types: string[];
  exchange_rate: string;
  block_number: number;
  has_error_in_internal_transactions: boolean;
};

export type NextPageParams = {
  block_number: number;
  fee: string;
  hash: string;
  index: number;
  inserted_at: string;
  items_count: number;
  value: string;
};
