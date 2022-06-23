import styled, { DefaultTheme } from "styled-components";
import { space, layout, variant } from "styled-system";
import { scaleVariants, styleVariants } from "./theme";
import { BaseButtonProps } from "./types";
import React, { cloneElement, ElementType, isValidElement } from "react";
import { ButtonProps, scales, variants } from "./types";

interface ThemedButtonProps extends BaseButtonProps {
    theme: DefaultTheme;
}

const getDisabledStyles = ({ isLoading, theme }: ThemedButtonProps) => {
    if (isLoading === true) {
        return `
      &:disabled,
      &.button--disabled {
        cursor: not-allowed;
      }
    `;
    }

    return `
    &:disabled,
    &.button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */
interface TransientButtonProps extends ThemedButtonProps {
    $isLoading?: boolean;
}

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
    return $isLoading ? ".5" : "1";
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  border-radius: 16px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
  }

  ${getDisabledStyles}
  ${variant({
    prop: "scale",
    variants: scaleVariants,
})}
  ${variant({
    variants: styleVariants,
})}
  ${layout}
  ${space}
`;

const getExternalLinkProps = (): { target: string; rel: string } => ({
    target: "_blank",
    rel: "noreferrer noopener",
});

const Button = <E extends ElementType = "button">(props: ButtonProps<E>): JSX.Element => {
    const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props;
    const internalProps = external ? getExternalLinkProps() : {};
    const isDisabled = isLoading || disabled;
    const classNames = className ? [className] : [];

    if (isLoading) {
        classNames.push("button--loading");
    }

    if (isDisabled && !isLoading) {
        classNames.push("button--disabled");
    }

    return (
        <StyledButton
            $isLoading={isLoading}
            className={classNames.join(" ")}
            disabled={isDisabled}
            {...internalProps}
            {...rest}
        >
            <>
                {isValidElement(startIcon) &&
                    cloneElement(startIcon, {
                        mr: "0.5rem",
                    })}
                {children}
                {isValidElement(endIcon) &&
                    cloneElement(endIcon, {
                        ml: "0.5rem",
                    })}
            </>
        </StyledButton>
    );
};

Button.defaultProps = {
    isLoading: false,
    external: false,
    variant: variants.PRIMARY,
    scale: scales.MD,
    disabled: false,
};

export default Button;
