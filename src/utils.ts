export function getChainProviderBlockscout(chainId?: number): string {
  switch (chainId) {
    case 1:
      return 'eth.blockscout.com';
    case 10:
      return 'explorer.optimism.io';
    case 137:
      return 'polygon.blockscout.com';
    case 314:
      return 'filecoin.blockscout.com';
    case 690:
      return 'explorer.redstone.xyz';
    case 8453:
      return 'base.blockscout.com';
    case 34443:
      return 'explorer-mode-mainnet-0.t.conduit.xyz';
    case 42161:
      return 'arbitrum.blockscout.com';
    case 7777777:
      return 'explorer.zora.energy';
  }
  return 'eth.blockscout.com';
}
