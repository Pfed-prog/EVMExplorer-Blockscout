import { test, expect } from 'vitest';

import {
  fetchAddressTransactions,
  fetchAddressInfo,
  fetchInternalTransactionsBlockscout,
  fetchAddressCounters,
  fetchTokenTransfersBlockscout,
  fetchTokensAddress,
} from './index.js';
import type { AddressTransactionsBlockscout } from '../../dist/index.cjs';

test('fetchAddressTransactions Empty Address', async () => {
  const data: AddressTransactionsBlockscout = await fetchAddressTransactions(
    '0x793e271B7630b1655b28BE2ab4BE93D05cf1c98e',
  );
  expect(data?.message).toBe('Not found');
});

test('fetchAddressTransactions Ethereum', async () => {
  const transactions = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
  );

  expect(transactions?.items?.length).toBe(50);
}, 10000);

test('fetchAddressTransactions second page Ethereum', async () => {
  const transactions = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
  );

  expect(transactions?.items?.length).toBe(50);

  const transactionsSecondPage = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
    `?block_number=${transactions?.next_page_params?.block_number}&index=${transactions?.next_page_params?.index}&items_count=${transactions?.next_page_params?.items_count}`,
  );
  expect(transactionsSecondPage?.items?.length).toBe(50);
}, 10000);

test('fetchAddressTransactions Base', async () => {
  const transactions = await fetchAddressTransactions(
    '0x227f65131A261548b057215bB1D5Ab2997964C7d',
    '',
    8453,
  );

  expect(transactions?.items?.length).toBe(50);
}, 20000);

test('fetchAddressInfo Base', async () => {
  const address = await fetchAddressInfo(
    '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    8453,
  );

  expect(address.hash).toBe('0x940181a94A35A4569E4529A3CDfB74e38FD98631');
}, 10000);

test('fetchInternalTransactionBlockscout Ethereum', async () => {
  const data = await fetchInternalTransactionsBlockscout(
    '0x22C1f6050E56d2876009903609a2cC3fEf83B415',
  );
  expect(data.items.length).toBe(50);
}, 10000);

test('fetch user address counters Ethereum', async () => {
  const data = await fetchAddressCounters(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data.validations_count).toBe('0');
  expect(data.token_transfers_count).toBe('9');
  expect(data.transactions_count).toBe('4');
}, 10000);

test('fetchInternalTransactionBlockscout Address Ethereum', async () => {
  const data = await fetchInternalTransactionsBlockscout(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data.items.length).toBe(1);
}, 10000);

test('fetchAddressTransactions Address Ethereum', async () => {
  const data = await fetchAddressTransactions(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data?.items?.length).toBe(4);
}, 10000);

test('fetchTokenTransfers Address Ethereum', async () => {
  const data = await fetchTokenTransfersBlockscout(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data.items.length).toBe(9);
}, 10000);

test('fetchTokensAddress Address Ethereum', async () => {
  const data = await fetchTokensAddress(
    '0xaD851ef1AD2cCf8F87413e6c274BccBeC37469d2',
  );
  expect(data.length).toBe(12);
}, 10000);

test('fetchTokensAddress Vitalik Ethereum', async () => {
  const data = await fetchTokensAddress(
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  );
  expect(data.length).toBeGreaterThan(6080);
}, 10000);
