import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../global/actions'
import {

  toggleTheme,

} from './actions'
import { GAS_PRICE_GWEI } from './hooks/helpers'

const currentTimestamp = () => new Date().getTime()
export interface UserState {

  timestamp: number
  isDark: boolean
  gasPrice: string
}
export const initialState: UserState = {
  timestamp: currentTimestamp(),
  isDark: false,
  gasPrice: GAS_PRICE_GWEI.default,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      // if (typeof state.userSlippageTolerance !== 'number') {
      //   state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      // }

      // // deadline isnt being tracked in local storage, reset to default
      // // noinspection SuspiciousTypeOfGuard
      // if (typeof state.userDeadline !== 'number') {
      //   state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      // }

      // state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark
    })
    
)
