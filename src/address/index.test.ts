import { test, expect } from 'vitest';

import {
  fetchAddressTransactions,
  fetchAddressInfo,
  fetchInternalTransactionsBlockscout,
  fetchAddressCounters,
  fetchTokenTransfersBlockscout,
  fetchTokensAddress,
} from './index.js';

test('fetchAddressTransactions Empty Address', async () => {
  const data = await fetchAddressTransactions(
    '0x908aC6F78E62383f3349691aaCCa297b02F02B11',
  );

  expect(data.next_page_params).toBe(null);
}, 20000);

test('fetchAddressTransactions Ethereum', async () => {
  const transactions = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
  );

  expect(transactions?.items?.length).toBe(50);
}, 200000);

test('fetchAddressTransactions second page Ethereum', async () => {
  const transactions = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
  );

  expect(transactions?.items?.length).toBe(50);

  const array1: string[] = [];
  const map1 = transactions?.items?.map((x) => {
    array1.push(x.hash);
  });
  expect([...new Set(array1)].length).toBe(50);

  const transactionsSecondPage = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
    `block_number=${transactions?.next_page_params?.block_number}&index=${transactions?.next_page_params?.index}&items_count=${transactions?.next_page_params?.items_count}`,
  );
  expect(transactionsSecondPage?.items?.length).toBe(50);

  const array2: string[] = [];
  const map2 = transactionsSecondPage?.items?.map((x) => {
    array2.push(x.hash);
  });

  expect([...new Set(array2)].length).toBe(50);

  expect([...new Set(array1.concat(array2))].length).toBe(100);
}, 40000);

test('fetchAddressTransactions Base', async () => {
  const transactions = await fetchAddressTransactions(
    '0x227f65131A261548b057215bB1D5Ab2997964C7d',
    '',
    8453,
  );

  expect(transactions?.items?.length).toBe(50);
}, 200000);

test('fetchAddressInfo Base', async () => {
  const addressData = await fetchAddressInfo(
    '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    8453,
  );

  expect(addressData.hash).toBe('0x940181a94A35A4569E4529A3CDfB74e38FD98631');
}, 20000);

test('fetchAddressInfo Mode', async () => {
  const addressData = await fetchAddressInfo(
    '0xDfc7C877a950e49D2610114102175A06C2e3167a',
    34443,
  );

  expect(addressData.hash).toBe('0xDfc7C877a950e49D2610114102175A06C2e3167a');
}, 20000);

test('fetchInternalTransactionBlockscout Ethereum', async () => {
  const data = await fetchInternalTransactionsBlockscout(
    '0x22C1f6050E56d2876009903609a2cC3fEf83B415',
  );
  expect(data.items.length).toBe(50);

  const dataSecondPage = await fetchInternalTransactionsBlockscout(
    '0x22C1f6050E56d2876009903609a2cC3fEf83B415',
    `block_number=${data?.next_page_params?.block_number}&index=${data?.next_page_params?.index}&items_count=${data?.next_page_params?.items_count}&transaction_index=${data?.next_page_params?.transaction_index}`,
  );
  expect(dataSecondPage.items.length).toBe(50);
}, 20000);

test('fetch user address counters Ethereum', async () => {
  const data = await fetchAddressCounters(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data.validations_count).toBe('0');
  expect(Number(data.token_transfers_count)).toBeGreaterThanOrEqual(9);
  expect(Number(data.transactions_count)).toBeGreaterThanOrEqual(5);
}, 10000);

test('fetchInternalTransactionBlockscout Address Ethereum', async () => {
  const data = await fetchInternalTransactionsBlockscout(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data.items.length).toBeGreaterThanOrEqual(2);
}, 10000);

test('fetchAddressTransactions Address Ethereum', async () => {
  const data = await fetchAddressTransactions(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data?.items?.length).toBeGreaterThanOrEqual(4);
}, 20000);

test('fetchTokenTransfers Address Ethereum', async () => {
  const data = await fetchTokenTransfersBlockscout(
    '0x62F71A87C6c70ac6144faCb7F7ebd721472005E9',
  );
  expect(data.items.length).toBeGreaterThanOrEqual(9);
}, 10000);

test('fetchTokensAddress Address Ethereum', async () => {
  const data = await fetchTokensAddress(
    '0xaD851ef1AD2cCf8F87413e6c274BccBeC37469d2',
  );
  expect(data.length).toBeGreaterThan(5);
}, 20000);

test('fetchTokensAddress Vitalik Ethereum', async () => {
  const data = await fetchTokensAddress(
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  );
  expect(data.length).toBeGreaterThan(6080);
}, 30000);

test('fetchTokenTransfers Address Ethereum', async () => {
  const data = await fetchTokenTransfersBlockscout(
    '0x531b6A4b3F962208EA8Ed5268C642c84BB29be0b',
  );
  expect(data.items.length).toBe(50);
}, 10000);

test('fetchTokenTransfersBlockscout second page Ethereum', async () => {
  const transactions = await fetchTokenTransfersBlockscout(
    '0x57e114B691Db790C35207b2e685D4A43181e6061',
  );

  expect(transactions?.items?.length).toBe(50);

  const array1: string[] = [];
  const map1 = transactions?.items?.map((x) => {
    array1.push(x.transaction_hash + x.log_index);
  });
  expect([...new Set(array1)].length).toBe(50);

  const transactionsSecondPage = await fetchTokenTransfersBlockscout(
    '0x57e114B691Db790C35207b2e685D4A43181e6061',
    `block_number=${transactions?.next_page_params?.block_number}&index=${transactions?.next_page_params?.index}`,
  );
  expect(transactionsSecondPage?.items?.length).toBe(50);

  const array2: string[] = [];
  const map2 = transactionsSecondPage?.items?.map((x) => {
    array2.push(x.transaction_hash + x.log_index);
  });

  expect([...new Set(array2)].length).toBe(50);

  expect([...new Set(array1.concat(array2))].length).toBe(100);
}, 20000);
