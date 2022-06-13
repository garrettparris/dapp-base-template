import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorsByName, ConnectorNames, connectorLocalStorageKey } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import useToast from './useToast'
import { useAppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { chainId, activate, deactivate } = useWeb3React()
  const { toastError } = useToast()

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            } else{
                toastError('Wrong Network', 'Please connect to correct network')
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError) {
              toastError('Provider Error', 'No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              toastError('Authorization Error', 'Please authorize to access your account')
            } else {
              toastError(error.name, error.message)
            }
          }
        })
      } else {
        toastError('Unable to find connector', 'The connector config is wrong')
      }
    },
    [activate, toastError],
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }))
    }
  }, [deactivate, dispatch, chainId])

  return { login, logout }
}

export default useAuth
