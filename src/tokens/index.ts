import { getChainProviderBlockscout } from '../utils';

export type TokenBlockscout = {
  address_hash: string;
  circulating_market_cap: string | null;
  decimals: string | null;
  exchange_rate: string | null;
  holders_count: string;
  icon_url: string | null;
  name: string;
  reputation: string;
  symbol: string;
  total_supply: string | null;
  type: 'ERC-20' | 'ERC-721' | 'ERC-1155';
  volume_24h: string | null;
};

export async function fetchTokenInfo(
  address: string,
  chainId?: number,
): Promise<TokenBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/tokens/${address}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as TokenBlockscout;
  return body;
}

export type NFTIdBlockscout = {
  animation_url: null | string;
  external_app_url: null | string;
  id: string;
  image_url: string;
  is_unique: boolean;
  media_type: null;
  media_url: string;
  metadata: NFTMetadataBlockscout;
  owner: NFTOwnerBlockscout;
  thumbnails: null;
  token: TokenBlockscout;
};

export type NFTOwnerBlockscout = {
  ens_domain_name: null | string;
  hash: string;
  implementations: [];
  is_contract: boolean;
  is_scam: boolean;
  is_verified: boolean;
  metadata: null;
  name: null | string;
  private_tags: [];
  proxy_type: null;
  public_tags: [];
  watchlist_names: [];
};

export type NFTMetadataBlockscout = {
  attributes: { trait_type: string; value: string }[];
  description?: string;
  external_url?: string;
  home_url?: string;
  image?: string;
  image_url?: string;
  name?: string;
  properties?: [];
  tags?: string[];
  year?: number;
};

export async function fetchNFTIdInfo(
  contract: string,
  id: string,
  chainId?: number,
): Promise<NFTIdBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/tokens/${contract}/instances/${id}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as NFTIdBlockscout;
  return body;
}
