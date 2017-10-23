import { createMuiTheme } from 'material-ui/styles'
import teal from 'material-ui/colors/teal'
import deepOrange from 'material-ui/colors/deepOrange'
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
    primary: teal,
    secondary: deepOrange,
    error: red,
  },
})
