import React from 'react'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import createStore from './Data/Redux'
import { styles, theme } from './Theme'

import Layout from './Containers/Layout'
import Dashboard from './Containers/Dashboard/Dashboard'
import Resources from './Containers/Resources/Resources'

// Build layout components for router
const DashboardRoute = () => <Layout slot={<Dashboard />} />
const ResourcesRoute = () => <Layout slot={<Resources />} />

// Create a browser history, and it's middleware
const history = createHistory()
const historyMiddleware = routerMiddleware(history)

// create our store, with middlewares
const store = createStore([historyMiddleware])

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={DashboardRoute} />
          <Route exact path="/recursos" component={ResourcesRoute} />
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
)

export default withStyles(styles)(App)
