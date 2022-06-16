export type NetworkConfig = {
    name: string;
    privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
    privateJsonRPCWSUrl?: string;
    publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
    publicJsonRPCWSUrl?: string;
    addresses: {
        walletBalanceProvider?: string;
        chainlinkFeedRegistry?: string;
    };
    baseAsset: string;
    baseAssetWrappedAddress?: string;
    explorerLink: string;
    rpcOnly: boolean;
    isTestnet?: boolean;
};

export type Token = {
    chainId: number;
    ticker: string;
    name: string;
    address: string;
    projectLink?: string;
}

export interface TokenList {
    [symbol: string]: Token
}