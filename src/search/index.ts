import { getChainProviderBlockscout } from '../utils';

export type SearchItemsBlockscout = {
  address: string;
  address_url?: string;
  certified: boolean;
  ens_info?: ENSInfo;
  circulating_market_cap?: string | null;
  exchange_rate?: string | null;
  icon_url?: string | null;
  is_smart_contract_verified: boolean;
  is_verified_via_admin_panel?: boolean;
  name: string | null;
  priority: 0 | 2;
  symbol?: string;
  token_type?: 'ERC-20' | 'ERC-721' | 'ERC-1155';
  token_url?: string;
  total_supply?: string;
  type: 'token' | 'ens_domain';
  url: string;
};

export type ENSInfo = {
  name: string;
  address_hash: string;
  expiry_data: null;
  names_count: number;
};

export type NextPageSearch = {
  address_hash: string;
  block_hash: string | null;
  holder_count: number;
  inserted_at: string;
  item_type: string;
  items_count: number;
  name: string;
  q: string;
  transaction_hash: string | null;
};

export type SearchBlockscout = {
  items: SearchItemsBlockscout[] | [];
  next_page_params: NextPageSearch | null;
};

export async function fetchSearchBlockscout(
  search: string,
  chainId?: number,
): Promise<SearchBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/search?q=${search}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as SearchBlockscout;
  return body;
}
