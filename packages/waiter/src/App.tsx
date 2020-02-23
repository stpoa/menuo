import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import TagManager from 'react-gtm-module'
import OrdersPage from './pages/Orders/Orders.page'
import ProtectedRoute from './components/ProtectedRoute'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import './App.css'

import { store, history } from './store/store'

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
      <Provider store={store}>
        <Suspense fallback={() => <span>Loading...</span>}>
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/:restaurant/orders"
                  authenticationPath="login"
                  component={OrdersPage}
                />
                <Route exact path="/:restaurant/login" component={LoginPage} />
              </Switch>
            </ConnectedRouter>
          </ThemeProvider>
        </Suspense>
      </Provider>
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
