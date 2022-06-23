import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
  children: React.ReactNode

}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children }) => {
  const { chainId } = useActiveWeb3React()

  return (
    <>
      {typeof children === 'string' ? <p>{children}</p> : children}
      {txHash && (
        <div>link to tx here</div>
      )}
    </>
  )
}

export default DescriptionWithTx
