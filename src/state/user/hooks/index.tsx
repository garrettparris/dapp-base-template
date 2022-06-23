import { ChainId } from 'config'
import flatMap from 'lodash/flatMap'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../index'
import {
  toggleTheme as toggleThemeAction,
} from '../actions'
import { GAS_PRICE_GWEI } from './helpers'
export function useThemeManager(): [boolean, () => void] {
    const dispatch = useDispatch<AppDispatch>()
    const isDark = useSelector<AppState, AppState['user']['isDark']>((state) => state.user.isDark)
  
    const toggleTheme = useCallback(() => {
      dispatch(toggleThemeAction())
    }, [dispatch])
  
    return [isDark, toggleTheme]
  }
  export function useGasPrice(): string {
    const chainId = process.env.REACT_APP_CHAIN_ID
    const userGas = useSelector<AppState, AppState['user']['gasPrice']>((state) => state.user.gasPrice)
    return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet
  }