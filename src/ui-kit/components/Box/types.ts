import { HTMLAttributes } from "react";
import { BackgroundProps, BorderProps, LayoutProps, PositionProps, SpaceProps } from "styled-system";

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    HTMLAttributes<HTMLDivElement> {}

