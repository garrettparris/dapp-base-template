import React from "react";
import styled from "styled-components";

import { InjectedProps } from "../../contexts/ModalContext/types"
interface Props extends InjectedProps {
    title: string;
    hideCloseButton?: boolean;
    onBack?: () => void;
    bodyPadding?: string;
    children: React.ReactNode;
}

const StyledModal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 32px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: 360px;
    max-width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9eaeb;
  align-items: center;
  padding: 12px 24px;
`;

const ModalTitle = styled.div`
  align-items: center;
  flex: 1;
`;

const Modal: React.FC<Props> = ({
    title,
    onDismiss,
    onBack,
    children,
    hideCloseButton = false,
    bodyPadding = "24px",
}) => (
    <StyledModal>
        <ModalHeader>
            <ModalTitle>
                {onBack && (
                    <div>hiiii</div>
                )}
                <h2>{title}</h2>
            </ModalTitle>
            {!hideCloseButton && (
                <button onClick={onDismiss} aria-label="Close the dialog">
                    close me
                </button>
            )}
        </ModalHeader>
        <div style = {{flexDirection:"column", padding: bodyPadding}} >
            {children}
        </div>
    </StyledModal>
);

export default Modal;