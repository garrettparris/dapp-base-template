import React from 'react'
import useAuth from 'hooks/useAuth'
import useWalletModal from 'hooks/useWalletModal'
import Button from 'ui-kit/components/Button'
import { variants } from 'ui-kit/components/Button/types'
const ConnectWalletButton = (props) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={()=> onPresentConnectModal()} variant={variants.SECONDARY}>Connect Wallet</Button>
  )
}

export default ConnectWalletButton
