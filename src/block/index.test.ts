import {
  fetchBlockInfoBlockscout,
  fetchBlockTransactionsBlockscout,
} from './index.js';
import { test, expect } from 'vitest';

test('fetchSearchBlockscout Ethereum', async () => {
  const data = await fetchBlockInfoBlockscout(21598737, 1);
  expect(data.gas_used).toBe('4314996');
}, 10000);

test('fetchBlockTransactionsBlockscout', async () => {
  const data = await fetchBlockTransactionsBlockscout(21598737, 1);
  expect(data.items.length).toBe(50);
}, 10000);
