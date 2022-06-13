
import { DefaultTheme } from "styled-components";
// import { dark as darkCard } from "../components/Card/theme";
// import { dark as darkToggle } from "../components/Toggle/theme";
import base from "./base";
import { darkColors } from "./colors";

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  colors: darkColors,
//   card: darkCard,
//   toggle: darkToggle,
};

export default darkTheme;