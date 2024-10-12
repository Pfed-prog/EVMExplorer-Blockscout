import type { TokenBlockscout } from '../token';

type Fee = {
  type: string;
  value: string;
};

type DecodedInput = {
  method_call: string;
  method_id: string;
  parameters: TransactionParameter[];
};

type TransactionParameter = {
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
  implementation_name: string | null;
  is_contract: boolean;
  is_verified: boolean;
  metadata: string;
  name: string | null;
};

export type TransactionBlockscout = {
  base_fee_per_gas: string;
  block: number | null;
  confirmations: number;
  confirmation_duration: number[];
  decoded_input: DecodedInput;
  exchange_rate: string;
  fee: Fee;
  hash: string;
  timestamp: string;
  from: TransactionAddressBlockscout;
  to: TransactionAddressBlockscout | null;
  value: string;
  gas_limit: string;
  gas_price: string;
  gas_used: string;
  method: string;
  token_transfers: null | TokenTransferBlockscout[];
  tx_types: string[];
  status: 'ok' | 'error';
  result: string;
};
