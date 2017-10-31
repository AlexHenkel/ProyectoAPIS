import React from 'react'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import createStore from './Data/Redux'
import { styles, theme } from './Theme'

import Layout from './Containers/Layout'
import TeacherDashboard from './Containers/TeacherDashboard/Dashboard'
import StudentDashboard from './Containers/StudentDashboard/Dashboard'
import Resources from './Containers/Resources/Resources'

// Build layout components for router
const TeacherDashboardRoute = () => <Layout slot={<TeacherDashboard />} />
const StudentDashboardRoute = () => <Layout slot={<StudentDashboard />} />
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
          <Route exact path="/" component={TeacherDashboardRoute} />
          <Route exact path="/estudiante" component={StudentDashboardRoute} />
          <Route exact path="/recursos" component={ResourcesRoute} />
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
)

export default withStyles(styles)(App)
