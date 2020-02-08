import React, { Suspense } from 'react'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import TagManager from 'react-gtm-module'
import OrdersPage from './pages/Orders/Orders.page'
import ProtectedRoute from './components/ProtectedRoute'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.css'

const LoginPage = React.lazy(() => import('./pages/Login/Login.page'))

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const App = () => {
  return (
    <div id="app">
      <Suspense fallback={() => <span>Loading...</span>}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <ProtectedRoute
                exact
                path="/:restaurant/orders"
                authenticationPath="login"
                component={OrdersPage}
              />
              <Route exact path="/:restaurant/login" component={LoginPage} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Suspense>
    </div>
  )
}

// Setup google tag manager
const GTM_ID = process.env.REACT_APP_GTM_ID
if (GTM_ID) {
  TagManager.initialize({
    gtmId: GTM_ID,
  })
}

export default App
