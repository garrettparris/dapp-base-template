import { Colors, Breakpoints, MediaQueries, Spacing} from "./types";
import { ToggleTheme } from "../components/Toggle/types";
import { CardTheme } from "ui-kit/components/Card/types";

export interface PancakeTheme {
  siteWidth: number;
  isDark: boolean;
  colors: Colors;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: Spacing;
  toggle: ToggleTheme;
  card: CardTheme
}

export { default as dark } from "./dark";
export { default as light } from "./light";

export { lightColors } from "./colors";
export { darkColors } from "./colors";