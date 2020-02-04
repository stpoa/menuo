import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import MenuPage from './pages/Menu/MenuPage'
import { store, history } from './store/store'

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const AppCustomer = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/:restaurant" component={MenuPage} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default AppCustomer
