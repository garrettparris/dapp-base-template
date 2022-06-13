import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { useThemeManager } from 'state/user/hooks'
import { getLibrary } from 'utils/web3React'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { dark, light } from 'ui-kit/theme'
import store from 'state'
import ModalProvider from 'contexts/ModalContext/Provider'
import { ToastsProvider } from 'contexts/ToastsContext'
const ThemeProviderWrapper = (props) => {
  const [isDark] = useThemeManager()
  return <ThemeProvider theme={isDark ? dark : light} {...props} />
}
interface Props {
  children: React.ReactNode;
}
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <ThemeProviderWrapper>
            <RefreshContextProvider>
              <ModalProvider>{children}</ModalProvider>
            </RefreshContextProvider>
          </ThemeProviderWrapper>
        </ToastsProvider>

      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
