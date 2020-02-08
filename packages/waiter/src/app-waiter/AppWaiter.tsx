import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import OrdersPage from './pages/Orders/Orders.page'
import ProtectedRoute from '../components/ProtectedRoute'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
const LoginPage = React.lazy(() => import('./pages/Login/Login.page'))

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const App = () => {
  return (
    <Suspense fallback={() => <span>Loading...</span>}>
      <ThemeProvider theme={theme}>
        <Switch>
          <ProtectedRoute
            exact
            path="/:restaurant/orders"
            authenticationPath="login"
            component={OrdersPage}
          />
          <Route exact path="/:restaurant/login" component={LoginPage} />
        </Switch>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
