import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#FD841F",
      dark: "#E14D2A",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: "#CD104D",
      dark: "#9C2C77",
      contrastText: "#ffcc00",
    },
    neutral: {
      light: "#fff",
      main: "#ddd",
      dark: "#000",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral?: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}
