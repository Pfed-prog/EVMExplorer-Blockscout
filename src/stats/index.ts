import { getChainProviderBlockscout } from '../utils';

export type StatsBlockscout = {
  average_block_time: number;
  coin_image: string;
  coin_price: string;
  coin_price_change_percentage: number;
  gas_price_updated_at: string;
  gas_prices: {
    average: number;
    fast: number;
    slow: number;
  };
  gas_prices_update_in: number;
  gas_used_today: string;
  market_cap: string;
  network_utilization_percentage: number;
  secondary_coin_image: null;
  secondary_coin_price: null;
  static_gas_price: null | string;
  total_addresses: string;
  total_blocks: string;
  total_gas_used: string;
  total_transactions: string;
  transactions_today: string;
  tvl: null;
};

export async function fetchStatsBlockscout(
  chainId?: number,
): Promise<StatsBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/stats`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as StatsBlockscout;
  return body;
}
