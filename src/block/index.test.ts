import { fetchBlockInfoBlockscout } from './index.js';
import { test, expect } from 'vitest';

test('fetchSearchBlockscout POAP Ethereum', async () => {
  const data = await fetchBlockInfoBlockscout(1, 21598737);
  expect(data.gas_used).toBe('4314996');
}, 10000);
