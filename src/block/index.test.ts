import {
  fetchBlockInfoBlockscout,
  fetchBlockTransactionsBlockscout,
} from './index.js';
import { test, expect } from 'vitest';

test('fetchSearchBlockscout Ethereum', async () => {
  const data = await fetchBlockInfoBlockscout(21598737);
  expect(data.gas_used).toBe('4314996');
}, 20000);

test('fetchBlockTransactionsBlockscout', async () => {
  const data = await fetchBlockTransactionsBlockscout(21598737);
  expect(data.items.length).toBe(50);
}, 20000);
