import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import MenuPage from './pages/Menu/Menu.page'
import { Provider } from 'react-redux'
import { store } from './store/store'

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const AppCustomer = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/:restaurant" component={MenuPage} />
        </Switch>
      </ThemeProvider>
    </Provider>
  )
}

export default AppCustomer
