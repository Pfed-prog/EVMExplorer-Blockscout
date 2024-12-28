import { test, expect } from 'vitest';

import { fetchTransactionBlockscout } from './index.js';

test('fetchTransactionBlockscout Ethereum', async () => {
  const data = await fetchTransactionBlockscout(
    '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
  );
  expect(data.hash).toBe(
    '0xdc7ddf3d0e53532eeeda7a7a99c88255ccee5a3b4404441278cbbd79b4c85086',
  );
}, 10000);
