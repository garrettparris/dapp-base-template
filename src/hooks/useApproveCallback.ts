import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTokenAllowance from './useTokenAllowance'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { useTokenContract } from './useContract'
import { BigNumber } from 'ethers'
import { Token } from '../config/types'
import ethers, { Contract, CallOverrides } from 'ethers'
import { useCallWithGasPrice } from './useCallWithGasPrice'
import useToast from './useToast'
import { calculateGasMargin } from '../utils'

export enum ApprovalState {
    UNKNOWN,
    NOT_APPROVED,
    PENDING,
    APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
    token?: Token,
    spender?: string,
): [ApprovalState, () => Promise<void>] {
    const { account } = useActiveWeb3React()
    const currentAllowance = useTokenAllowance(token.address, account ?? undefined, spender)
    const pendingApproval = useHasPendingApproval(token.address, spender)
    const { callWithGasPrice } = useCallWithGasPrice()
    const { toastError } = useToast()

    // check the current approval status
    const approvalState: ApprovalState = useMemo(() => {
        if (!token.address || !spender) return ApprovalState.UNKNOWN
        // we might not have enough data to know whether or not we need to approve
        if (!currentAllowance) return ApprovalState.UNKNOWN

        // amountToApprove will be defined if currentAllowance is
        return currentAllowance < MaxUint256.toString()
            ? pendingApproval
                ? ApprovalState.PENDING
                : ApprovalState.NOT_APPROVED
            : ApprovalState.APPROVED
    }, [token, currentAllowance, pendingApproval, spender])

    const tokenContract = useTokenContract(token.address)
    const addTransaction = useTransactionAdder()

    const approve = useCallback(async (): Promise<void> => {
        if (approvalState !== ApprovalState.NOT_APPROVED) {
            console.error('approve was called unnecessarily')
            return
        }
        if (!token) {
            console.error('no token')
            return
        }

        if (!tokenContract) {
            console.error('tokenContract is null')
            return
        }

        if (token) {
            console.error('missing amount token for approval')
            return
        }

        if (!spender) {
            console.error('no spender')
            return
        }

        let useExact = false

        const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
            // general fallback for tokens who restrict approval amounts
            useExact = true
            return tokenContract.estimateGas.approve(spender, MaxUint256.toString())
        })

        // eslint-disable-next-line consistent-return
        return callWithGasPrice(
            tokenContract,
            'approve',
            [spender, useExact ? MaxUint256.toString() : MaxUint256],
            {
                gasLimit: calculateGasMargin(estimatedGas),
            },
        )
            .then((response: TransactionResponse) => {
                addTransaction(response, {
                    summary: `Approve ${token.ticker}`,
                    approval: { tokenAddress: token.address, spender },
                })
            })
            .catch((error: Error) => {
                toastError(`Failed to approve ${token.ticker}`)
                console.error('Failed to approve token', error)
                throw error
            })
        }, [approvalState, token, tokenContract, spender, addTransaction, callWithGasPrice])



    return [approvalState, approve]
}

