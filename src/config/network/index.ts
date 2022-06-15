import { NetworkConfig } from "../types";
import { ChainId } from "../chains"
export const networkConfigs: Record<string, NetworkConfig> = {
    [ChainId.MAINNET]: {
        name: 'Fuji',
        publicJsonRPCUrl: ['https://api.avax-test.network/ext/bc/C/rpc'],
        publicJsonRPCWSUrl: 'wss://api.avax-test.network/ext/bc/C/rpc',
        addresses: {
            walletBalanceProvider: '0x3f5A507B33260a3869878B31FB90F04F451d28e3',
        },
        baseAsset: 'AVAX',
        baseAssetWrappedAddress: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
        // incentives hardcoded information
        explorerLink: 'https://cchain.explorer.avax-test.network',
        rpcOnly: true,
        isTestnet: true,
    },
    [ChainId.TESTNET]: {
        name: 'Avalanche',
        publicJsonRPCUrl: ['https://api.avax.network/ext/bc/C/rpc'],
        publicJsonRPCWSUrl: 'wss://api.avax.network/ext/bc/C/rpc',
        addresses: {
            walletBalanceProvider: '0x73e4898a1Bfa9f710B6A6AB516403A6299e01fc6',
        },
        baseAsset: 'AVAX',
        baseAssetWrappedAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        // incentives hardcoded information
        explorerLink: 'https://cchain.explorer.avax.network',
        rpcOnly: false,
    },
} as const;
