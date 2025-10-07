import type { SmartContract } from './index.js';
import { fetchSmartContractBlockscout } from './index.js';
import { test, expect } from 'vitest';

test('fetchSmartContractBlockscoutEthereum Ape Coin ERC20', async () => {
  const data: SmartContract = await fetchSmartContractBlockscout(
    '0x4d224452801aced8b2f0aebe155379bb5d594381',
    1,
  );

  expect(data.verified_at).toBe('2023-07-05T12:35:59.959466Z');
}, 20000);

test('fetchSmartContractBlockscoutEthereum Aave Lending Pool V1', async () => {
  const data = await fetchSmartContractBlockscout(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
    1,
  );

  expect(data.verified_at).toBe('2024-01-08T12:26:52.549853Z');
}, 10000);
