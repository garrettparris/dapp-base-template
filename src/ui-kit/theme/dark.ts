
import { DefaultTheme } from "styled-components";
// import { dark as darkCard } from "./components/Card/theme";
import { dark as darkToggle } from "../components/Toggle/theme";
import {dark as darkCard } from "../components/Card/theme"
import base from "./base";
import { darkColors } from "./colors";

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  colors: darkColors,
  // card: darkCard,
  toggle: darkToggle,
  card: darkCard
};

export default darkTheme;