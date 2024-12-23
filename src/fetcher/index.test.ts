import {
  fetchAddressTransactions,
  fetchAddressInfo,
  fetchTransactionBlockscout,
} from './index.js';
import { test, expect } from 'vitest';

test('fetchAddressTransactions Empty Address', async () => {
  await expect(
    fetchAddressTransactions('0x793e271B7630b1655b28BE2ab4BE93D05cf1c98e'),
  ).rejects.toThrow('no transactions');
});

test('fetchAddressTransactions Ethereum', async () => {
  const transactions = await fetchAddressTransactions(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
  );

  expect(transactions.length).toBe(50);
}, 10000);

test('fetchAddressTransactions Base', async () => {
  const transactions = await fetchAddressTransactions(
    '0x227f65131A261548b057215bB1D5Ab2997964C7d',
    8453,
  );

  expect(transactions.length).toBe(50);
}, 20000);

test('fetchAddressInfo Base', async () => {
  const address = await fetchAddressInfo(
    '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    8453,
  );

  expect(address.hash).toBe('0x940181a94A35A4569E4529A3CDfB74e38FD98631');
}, 10000);

test('fetchTransactionBlockscout Ethereum', async () => {
  const data = await fetchTransactionBlockscout(
    '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
  );
  expect(data.hash).toBe(
    '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
  );
}, 10000);
