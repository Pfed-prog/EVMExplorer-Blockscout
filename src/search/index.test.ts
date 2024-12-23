import { fetchSearchBlockscout } from './index.js';
import { test, expect } from 'vitest';

test('fetchSearchBlockscout POAP Ethereum', async () => {
  const data = await fetchSearchBlockscout('POAP');
  expect(data.items.length).toBe(50);
  expect(data.items[0]?.token_type).toBe('ERC-721');
}, 10000);
