import { getChainProviderBlockscout } from '../utils';

export type TokenBlockscout = {
  address: string;
  circulating_market_cap: string | null;
  decimals: string | null;
  exchange_rate: string | null;
  holders: string;
  icon_url: string;
  name: string;
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
