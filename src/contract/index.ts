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
  is_self_destructed: boolean;
  file_path: string;
  source_code: string;
  deployed_bytecode: string;
  optimization_enabled: boolean;
  verified_twin_address_hash: string | null;
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
  decoded_constructor_args: Array<[string, Object]> | null;
  compiler_version: string;
  verified_at: string;
  is_verified_via_verifier_alliance: boolean;
  implementations: Array<{ address: string; name: string }>;
  proxy_type: null | 'eip1967';
  external_libraries: [];
  status: 'success';
  creation_bytecode: string;
  name: string;
  is_blueprint: boolean;
  license_type: string;
  is_fully_verified: boolean;
  is_verified_via_eth_bytecode_db: boolean;
  language: 'solidity';
  evm_version: 'istanbul' | 'default';
  can_be_visualized_via_sol2uml: boolean;
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
