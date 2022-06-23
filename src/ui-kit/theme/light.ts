import { DefaultTheme } from "styled-components";
// import { light as lightCard } from "../components/Card/theme";
import { light as lightToggle } from "../components/Toggle/theme";
import {light as lightCard } from "../components/Card/theme"
import base from "./base";
import { lightColors } from "./colors";

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  colors: lightColors,
//   card: lightCard,
  toggle: lightToggle,
  card: lightCard
};

export default lightTheme;