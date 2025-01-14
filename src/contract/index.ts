import { getChainProviderBlockscout } from '../utils';

export type ABIInputsOutputs = {
  internalType: string;
  name: string;
  type: string;
};

export type ABIJsonObject = {
  constant?: boolean;
  anonymous?: boolean;
  inputs: Array<ABIInputsOutputs>;
  name?: string;
  outputs?: Array<ABIInputsOutputs>;
  payable?: boolean;
  stateMutability?: 'payable' | 'nonpayable';
  type: 'function' | 'fallback' | 'event';
};

export type ABIJsonObjectReads = {
  inputs: Array<ABIInputsOutputs>;
  method_id: string;
  name: string;
  names?: Array<string>;
  outputs: Array<ABIInputsOutputs>;
  stateMutability: 'view';
  type: 'function';
};

export type ABIJsonObjectWrites = {
  inputs: Array<ABIInputsOutputs>;
  method_id: string;
  name: string;
  names?: Array<string>;
  outputs: Array<ABIInputsOutputs>;
  stateMutability: 'nonpayable';
  type: 'function';
};

export type SmartContract = {
  has_methods_read: boolean;
  is_self_destructed: boolean;
  has_custom_methods_write: boolean;
  file_path: string;
  source_code: string;
  deployed_bytecode: string;
  optimization_enabled: boolean;
  verified_twin_address_hash: string | null;
  is_verified: boolean;
  compiler_settings: {
    libraries: Object | { [key: string]: Object };
    metadata: {
      bytecodeHash: string;
    };
    optimizer: {
      enabled: boolean;
      runs: number;
    };
    outputSelection?: { [key: string]: Object };
    remappings?: [];
  };
  optimizations_runs: number;
  sourcify_repo_url: string | null;
  decoded_constructor_args: Array<string | Object> | null;
  has_methods_write: boolean;
  compiler_version: string;
  is_verified_via_verifier_alliance: boolean;
  verified_at: string;
  implementations: Array<{ address: string; name: string }>;
  proxy_type: null | 'eip1967';
  external_libraries: [];
  creation_bytecode: string;
  name: string;
  is_blueprint: boolean;
  license_type: string;
  is_fully_verified: boolean;
  has_methods_read_proxy: boolean;
  is_vyper_contract: boolean;
  is_verified_via_eth_bytecode_db: boolean;
  language: 'solidity';
  evm_version: 'istanbul';
  can_be_visualized_via_sol2uml: boolean;
  has_methods_write_proxy: boolean;
  has_custom_methods_read: boolean;
  is_verified_via_sourcify: boolean;
  additional_sources: [];
  certified: boolean;
  abi: Array<ABIJsonObject>;
  is_changed_bytecode: boolean;
  is_partially_verified: boolean;
  constructor_args: string | null;
};

export type ContractReadQuery = {
  result: {
    output: Array<{ type: string; value: string }>;
    names: Array<string>;
  };
  is_error: boolean;
};

export async function fetchSmartContractBlockscout(
  address: string,
  chainId?: number,
): Promise<SmartContract> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/smart-contracts/${address}`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as SmartContract;
  return body;
}

export async function fetchSmartContractReadMethodsBlockscout(
  address: string,
  chainId?: number,
): Promise<Array<ABIJsonObjectReads>> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/smart-contracts/${address}/methods-read`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as Array<ABIJsonObjectReads>;
  return body;
}

export async function fetchSmartContractWriteMethodsBlockscout(
  address: string,
  chainId?: number,
): Promise<Array<ABIJsonObjectWrites>> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/smart-contracts/${address}/methods-write`;

  const response: Response = await fetch(query);
  const body = (await response.json()) as Array<ABIJsonObjectWrites>;
  return body;
}

export async function fetchSmartContractQueryReadBlockscout(
  address: string,
  method_id: string,
  args: Array<string> = [],
  chainId?: number,
): Promise<ContractReadQuery> {
  const chainProvider: string = getChainProviderBlockscout(chainId);
  const query: string = `https://${chainProvider}/api/v2/smart-contracts/${address}/query-read-method`;

  const response: Response = await fetch(query, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      args: args,
      method_id: method_id,
      contract_type: 'regular',
    }),
  });
  const body = (await response.json()) as ContractReadQuery;
  return body;
}
