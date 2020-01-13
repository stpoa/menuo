import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import './App.css'
import { MenuPage } from './pages/Menu/Menu.page'
import { Orders } from './pages/Orders/Orders.page'
import ProtectedRoute from './components/ProtectedRoute'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { isLoggedIn } from './auth/service'
import { LoginPage } from './pages/Login/Login.page'

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
        {process.env.NODE_ENV === 'development' ? (
          <>
            {'   '}
            <NavLink to="/zalewajka?table=1">• zalewajka</NavLink>{' '}
            <NavLink to="/kolanko?table=1">• kolanko</NavLink>
          </>
        ) : null}
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
