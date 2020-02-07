import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { store, history } from './store/store'
const MenuPage = React.lazy(() => import('./pages/Menu/MenuPage'))

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const LazyMenuPage = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <MenuPage {...props} />
  </Suspense>
)

const AppCustomer = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/:restaurant" component={LazyMenuPage} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default AppCustomer
