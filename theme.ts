import produce from "immer";
import {theme as defaultTheme, DefaultTheme, ColorHues, VariantColor} from "@chakra-ui/core";

interface Theme extends DefaultTheme {
  colors: DefaultTheme["colors"] & {
    primary: ColorHues;
  };
}

const getTheme = (color?: Exclude<VariantColor, "black" | "white">): Theme | DefaultTheme =>
  color
    ? produce(defaultTheme, (theme: Theme) => {
        theme.colors.primary = defaultTheme.colors[color];

        return theme;
      })
    : defaultTheme;

export default getTheme;
