import { createTheme } from "@mui/material";
import { blueGrey, lightBlue, lightGreen, red } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: lightBlue[200],
    },
    secondary: {
      main: lightGreen[200],
    },
    error: {
      main: red.A400,
      
    },
    background: {
      default: blueGrey.A100,
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
  },
});