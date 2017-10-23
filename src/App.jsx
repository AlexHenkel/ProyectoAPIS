import React from 'react'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'

import { styles, theme } from './Theme'

import Layout from './Containers/Layout'

// Build layout components for router
const DashboardRoute = () => <Layout slot={<h1>Hola</h1>} />

// Create a browser history, and it's middleware
const history = createHistory()
const historyMiddleware = routerMiddleware(history)

// TODO: Change this to use custom store
const store = createStore(() => null, applyMiddleware(historyMiddleware))

const App = () => (
  <Provider store={store}>
    <div>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Route exact path="/" component={DashboardRoute} />
        </MuiThemeProvider>
      </ConnectedRouter>
    </div>
  </Provider>
)

export default withStyles(styles)(App)
