import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(erc721Abi, address, signer)
}