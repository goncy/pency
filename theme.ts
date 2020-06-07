import produce from "immer";
import {theme as defaultTheme, DefaultTheme, ColorHues, VariantColor} from "@chakra-ui/core";
interface Theme extends DefaultTheme {
  colors: DefaultTheme["colors"] & {
    primary: ColorHues;
  };
}

const getTheme = (color?: Exclude<VariantColor, "black" | "white">): Theme | DefaultTheme =>
  produce<DefaultTheme, Theme>(defaultTheme, (theme) => {
    theme.colors.primary = defaultTheme.colors[color || "cyan"];
  });

export default getTheme;
