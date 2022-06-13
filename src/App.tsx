import React from 'react';
import logo from './logo.svg';
import './App.css';
import { usePollBlockNumber } from 'state/block/hooks'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet';
import { Web3Provider } from '@ethersproject/providers'
import { ToastListener } from './contexts/ToastsContext'

function App() {
  const { account } = useWeb3React<Web3Provider>()

  usePollBlockNumber()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <ConnectWalletButton />
        {account ? account : 'not connected'}
        <ToastListener />
      </header>
    </div>
  );
}

export default App;
