import React from "react";
import useModal from "./useModal";
import { Login } from "./types";
import ConnectModal from "../components/ConnectWalletModal"
interface ReturnType {
  onPresentConnectModal: () => void;
//   onPresentAccountModal: () => void;
}

const useWalletModal = (login: Login, logout: () => void, account?: string): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} />);
//   const [onPresentAccountModal] = useModal(<AccountModal account={account || ""} logout={logout} />);
  return { onPresentConnectModal };
};

export default useWalletModal;