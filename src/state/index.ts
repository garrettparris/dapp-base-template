import { configureStore } from '@reduxjs/toolkit'
import cloneDeep from 'lodash/cloneDeep'
import { save, load } from 'redux-localstorage-simple'
import { updateVersion } from './global/actions'
import { useDispatch } from 'react-redux'
import user, { initialState as userInitialState } from './user/reducer'
import blockReducer from './block'
import transactions, { initialState as transactionsInitialState } from './transactions/reducer'



const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'profile']

const safeCloneDeep = <T>(state: T) => {
  try {
    return JSON.parse(JSON.stringify(state)) as T
  } catch (error) {
    console.error(error)
    return cloneDeep(state)
  }
}

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    user,
    transactions,
    block: blockReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: true }),
    save({ states: PERSISTED_KEYS, debounce: 1000 }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    preloadedState: {
      user: safeCloneDeep(userInitialState),
      transactions: safeCloneDeep(transactionsInitialState),
      // lists: safeCloneDeep(listsInitialState),
      // profile: safeCloneDeep(profileInitialState),
    },
  }),
})

store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
