import type { TokenBlockscout } from './token';

export type AddressInfo = {
  block_number_balance_updated_at?: number;
  coin_balance?: string;
  ens_domain_name?: string;
  exchange_rate?: string;
  hash: string;
  implementation_name?: string;
  is_contract?: boolean;
  name?: string;
  token?: TokenBlockscout;
};
