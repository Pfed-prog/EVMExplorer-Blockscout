import { getChainProviderBlockscout } from './utils.js';
import { test, expect } from 'vitest';

test('getChainProviderBlockscout', () => {
  expect(getChainProviderBlockscout()).toBe('eth.blockscout.com');
});

test('getChainProviderBlockscout Base', () => {
  expect(getChainProviderBlockscout(8453)).toBe('base.blockscout.com');
});
