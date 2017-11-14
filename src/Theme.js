import { createMuiTheme } from 'material-ui/styles'
import deepPurple from 'material-ui/colors/deepPurple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

export const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
})

export const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: {
      ...green,
      A100: '#80CBC4',
      A200: '#009688',
      A400: '#00796B',
      A700: '#004D40',
    },
    error: red,
  },
})
