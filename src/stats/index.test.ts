import type { StatsBlockscout } from './index.js';
import { fetchStatsBlockscout } from './index.js';
import { test, expect } from 'vitest';

test('fetchStatsBlockscout Ethereum', async () => {
  const data: StatsBlockscout = await fetchStatsBlockscout();
  expect(Number(data.transactions_today)).toBeGreaterThan(Number('10000'));
}, 10000);
