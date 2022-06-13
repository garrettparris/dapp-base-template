import Modal from "components/Modal";
import React from "react";
import styled from "styled-components";
import { connectorLocalStorageKey, ConnectorNames } from "utils/web3React";
import { Login } from "../../hooks/types";
interface Props {
    login: Login;
    onDismiss?: () => void;
}


const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => (
    <Modal title="Connect to a wallet" onDismiss={onDismiss}>
        helloooo

        <button onClick={() => {
            login(ConnectorNames.Injected)
            window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected);
            onDismiss();
        }}>
            connect metamask
        </button>
        {/* {config.map((entry, index) => (
      <WalletCard
        key={entry.title}
        login={login}
        walletConfig={entry}
        onDismiss={onDismiss}
        mb={index < config.length - 1 ? "8px" : "0"}
      />
    ))}
    <HelpLink
      href="https://docs.pancakeswap.finance/guides/faq#how-do-i-set-up-my-wallet-on-binance-smart-chain"
      external
    >
      <HelpIcon color="primary" mr="6px" />
      Learn how to connect
    </HelpLink> */}
    </Modal>
);

export default ConnectModal;