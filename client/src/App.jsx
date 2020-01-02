import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import './App.css'
import { MenuPage } from './pages/Menu/Menu.page'
import { Orders } from './pages/Orders/Orders.page'

import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'

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
        {'   '}
        <NavLink to="/zalewajka">• zalewajka</NavLink>
        {' '}
        <NavLink to="/kolanko">• kolanko</NavLink>
        <Switch>
          <Route exact path="/:restaurantId" component={MenuPage} />
          <Route exact path="/:restaurantId/orders" component={Orders} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App
