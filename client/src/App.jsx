import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import { MenuPage } from './pages/Menu/Menu.page'
import { Orders } from './pages/Orders/Orders.page'
import Button from '@material-ui/core/Button'

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

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
          <Route exact path="/:restaurantId" component={MenuPage} />
          <Route exact path="/:restaurantId/orders" component={Orders} />
        </Switch>
      </ThemeProvider>
    </div>
  )
}

export default App