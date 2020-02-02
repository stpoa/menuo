import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OrdersPage from './pages/Orders/Orders.page'
import ProtectedRoute from '../components/ProtectedRoute'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { LoginPage } from './pages/Login/Login.page'

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const App = () => {
  return (
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
  )
}

export default App
