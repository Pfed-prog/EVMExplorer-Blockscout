import type {
  AddressTransactionsBlockscout,
  CountersContractBlockscout,
} from '../address';
import type {
  BlockInfoBlockscout,
  BlockTransactionsBlockscout,
} from '../block';
import type { TokenBlockscout } from '../token';
import type { TransactionBlockscout } from '../transaction';
import type { AddressInfo } from '../types';
import { getChainProviderBlockscout } from '../utils';

export async function fetchContractCounters(
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
  chainId?: number,
): Promise<TransactionBlockscout[]> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/addresses/${address}/transactions`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as AddressTransactionsBlockscout;
  return body.items;
}

export async function fetchAddressInfo(
  address: string,
  chainId?: number,
): Promise<AddressInfo> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/addresses/${address}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as AddressInfo;
  if (!body.hash)
    return {
      hash: address,
    };

  return body;
}

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

export async function fetchTransactionBlockscout(
  hash: string,
  chainId?: number,
): Promise<TransactionBlockscout> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/transactions/${hash}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as TransactionBlockscout;
  return body;
}

export async function fetchBlockInfoBlockscout(
  chainId: number,
  block?: number,
) {
  if (block) {
    const chainProvider: string = getChainProviderBlockscout(chainId);
    const query: string = `https://${chainProvider}/api/v2/blocks/${block}`;

    const response: Response = await fetch(query);
    const body = (await response.json()) as BlockInfoBlockscout;
    return body;
  }
  throw new Error('no block');
}

export async function fetchBlockTransactionsBlockscout(
  chainId: number,
  block?: number,
) {
  if (block) {
    const chainProvider: string = getChainProviderBlockscout(chainId);
    const query: string = `https://${chainProvider}/api/v2/blocks/${block}/transactions`;

    const response: Response = await fetch(query);
    const body = (await response.json()) as BlockTransactionsBlockscout;
    return body;
  }
  throw new Error('no block');
}
