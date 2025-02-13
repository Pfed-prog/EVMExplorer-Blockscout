import {
  fetchTokenInfo,
  fetchNFTIdInfo,
  type TokenBlockscout,
  type NFTIdBlockscout,
} from '.';
import { test, expect } from 'vitest';

test('USDT', async () => {
  const data: TokenBlockscout = await fetchTokenInfo(
    '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  );
  expect(data.address).toBe('0xdAC17F958D2ee523a2206206994597C13D831ec7');
  expect(data.decimals).toBe('6');
  expect(data.name).toBe('Tether');
  expect(data.symbol).toBe('USDT');
  expect(data.type).toBe('ERC-20');
});

test('', async () => {
  const data: NFTIdBlockscout = await fetchNFTIdInfo(
    '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    '1',
  );
  expect(data.token.name).toBe('BoredApeYachtClub');
  expect(data.token.symbol).toBe('BAYC');
  expect(data.token.total_supply).toBe('10000');
});

test('USDT', async () => {
  const data: NFTIdBlockscout = await fetchNFTIdInfo(
    '0x22C1f6050E56d2876009903609a2cC3fEf83B415',
    '1',
  );
  expect(data.token.name).toBe('POAP');
  expect(data.token.symbol).toBe('The Proof of Attendance Protocol');
});
