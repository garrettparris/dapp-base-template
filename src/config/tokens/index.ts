import { ChainId } from "config";
import { TokenList } from "config/types";

export const mainnetTokens: TokenList = {

}

export const testnetTokens: TokenList = {
}

export const tokens = (): TokenList => {
    const chainId: string = process.env.REACT_APP_CHAIN_ID

    // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
    if (Number(chainId) === ChainId.TESTNET) {
        return testnetTokens
    }
    return mainnetTokens
}

