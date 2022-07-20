import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "Roboto"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: '0px'
        },
      },
    },
  },
});

export default theme;
