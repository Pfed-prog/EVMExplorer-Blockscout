import {
  fetchSmartContractBlockscout,
  fetchSmartContractReadMethodsBlockscout,
  fetchSmartContractWriteMethodsBlockscout,
  fetchSmartContractQueryReadBlockscout,
} from './index.js';
import { test, expect } from 'vitest';

test('fetchSmartContractBlockscoutEthereum Ape Coin ERC20', async () => {
  const data = await fetchSmartContractBlockscout(
    '0x4d224452801aced8b2f0aebe155379bb5d594381',
    1,
  );
  expect(data.has_methods_read).toBe(true);
  expect(data.has_methods_write).toBe(true);
  expect(data.verified_at).toBe('2023-07-05T12:35:59.959466Z');
}, 20000);

test('fetchSmartContractBlockscoutEthereum Aave Lending Pool V1', async () => {
  const data = await fetchSmartContractBlockscout(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
    1,
  );
  expect(data.has_methods_read).toBe(false);
  expect(data.has_methods_write).toBe(true);
  expect(data.verified_at).toBe('2024-01-08T12:26:52.549853Z');
}, 10000);

test('fetchSmartContractBlockscoutEthereum Aave Lending Pool V1', async () => {
  const data = await fetchSmartContractReadMethodsBlockscout(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
    1,
  );
  expect(data).toStrictEqual([]);
}, 10000);

test('fetchSmartContractReadMethodsBlockscout Ape Coin', async () => {
  const data = await fetchSmartContractReadMethodsBlockscout(
    '0x4d224452801aced8b2f0aebe155379bb5d594381',
    1,
  );
  expect(data.length).toBe(6);
}, 10000);

test('fetchSmartContractWriteMethodsBlockscout Ape Coin', async () => {
  const data = await fetchSmartContractWriteMethodsBlockscout(
    '0x4d224452801aced8b2f0aebe155379bb5d594381',
    1,
  );
  expect(data.length).toBe(5);
}, 10000);

test('fetchSmartContractWriteMethodsBlockscout Aave Lending Pool v1', async () => {
  const data = await fetchSmartContractWriteMethodsBlockscout(
    '0x398eC7346DcD622eDc5ae82352F02bE94C62d119',
    1,
  );
  expect(data.length).toBe(8);
}, 10000);

test('fetchSmartContractWriteMethodsBlockscout Aave Lending Pool v1', async () => {
  const data = await fetchSmartContractQueryReadBlockscout(
    '0x4d224452801aced8b2f0aebe155379bb5d594381',
    '313ce567',
    [],
    1,
  );
  console.log(data.result);
  expect(data.is_error).toBe(false);
}, 10000);
