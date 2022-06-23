import { HTMLAttributes } from "react";
import { SpaceProps } from "styled-system";

export type CardTheme = {
  background: string;
  boxShadow: string;
  cardHeaderBackground: string;
  dropShadow: string;
};

export interface CardProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean;
}