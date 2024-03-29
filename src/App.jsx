import React from 'react'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import styled from 'styled-components'
import createStore from './Data/Redux'
import { styles, theme } from './Theme'

import Layout from './Containers/Layout'
import Dashboard from './Containers/DashboardManager'
import Resources from './Containers/Resources/Resources'
import Resource from './Containers/Exam/Resource'
import Questions from './Containers/Exam/Questions'
import Login from './Containers/Login/Login'

const Container = styled.div`
  padding: 15px;
`

// Create a browser history, and it's middleware
const history = createHistory()
const historyMiddleware = routerMiddleware(history)

// create our store, with middlewares
const store = createStore([historyMiddleware])

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div>
        <Layout />
        <ConnectedRouter history={history}>
          <Container>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/recursos" component={Resources} />
            <Route exact path="/recurso/:id" component={Resource} />
            <Route exact path="/examen/:id" component={Questions} />
          </Container>
        </ConnectedRouter>
      </div>
    </MuiThemeProvider>
  </Provider>
)

export default withStyles(styles)(App)
