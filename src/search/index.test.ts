import { fetchSearchBlockscout } from './index.js';
import { test, expect } from 'vitest';

test('fetchSearchBlockscout POAP Ethereum', async () => {
  const data = await fetchSearchBlockscout('POAP');
  expect(data.items.length).toBe(50);
  expect(data.items[0]?.token_type).toBe('ERC-721');
}, 20000);

test('fetchSearchBlockscout ENS Ethereum', async () => {
  const data = await fetchSearchBlockscout('ens.eth');
  expect(data.items[0]?.ens_info?.address_hash).toBe(
    '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
  );
}, 20000);

test('fetchSearchBlockscout ENS Optimism', async () => {
  const data = await fetchSearchBlockscout('ens.eth', 20);
  expect(data.items[0]?.ens_info?.address_hash).toBe(
    '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
  );
}, 20000);
