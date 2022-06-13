import React from 'react'
import useAuth from 'hooks/useAuth'
import useWalletModal from 'hooks/useWalletModal'
const ConnectWalletButton = (props) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <button onClick={onPresentConnectModal}>
      {'Connect Wallet'}
    </button>
  )
}

export default ConnectWalletButton
