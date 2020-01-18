import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import './App.css'
import { MenuPage } from './pages/Menu/Menu.page'
import { Orders } from './pages/Orders/Orders.page'
import ProtectedRoute from './components/ProtectedRoute'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { LoginPage } from './pages/Login/Login.page'

import TagManager from 'react-gtm-module'

// Setup google tag manager
const GTM_ID = process.env.REACT_APP_GTM_ID
if (GTM_ID) {
  TagManager.initialize({
    gtmId: GTM_ID,
  })
}

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/:restaurant" component={MenuPage} />
          <ProtectedRoute
            exact
            path="/:restaurant/orders"
            authenticationPath="login"
            component={Orders}
          />
          <Route exact path="/:restaurant/login" component={LoginPage} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
