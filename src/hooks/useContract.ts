import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
    getErc20Contract,
    getErc721Contract,
} from 'utils/contractHelpers'
import { ethers } from 'ethers'
// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import ERC20_ABI from '../config/abi/erc20.json'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { isAddress } from 'utils'
import { AddressZero } from '@ethersproject/constants'
import { simpleRpcProvider } from '../utils/providers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, signer?: ethers.Signer | ethers.providers.Provider): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, signer ?? simpleRpcProvider)
}

export const useERC20 = (address: string) => {
    const { library } = useActiveWeb3React()
    return useMemo(() => getErc20Contract(address, library.getSigner()), [address, library])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
    const { library } = useActiveWeb3React()
    return useMemo(() => getErc721Contract(address, library.getSigner()), [address, library])
}
// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, withSignerIfPossible ? getProviderOrSigner(library, account) : null)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
