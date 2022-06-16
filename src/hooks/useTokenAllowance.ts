import { useMemo } from 'react'

import { useTokenContract } from './useContract'

function useTokenAllowance(token?: string, owner?: string, spender?: string): string | undefined {
  const contract = useTokenContract(token, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = contract['allowance'](...inputs)

  return useMemo(
    () => (token && allowance ? allowance.toString() : undefined),
    [token, allowance],
  )
}

export default useTokenAllowance
