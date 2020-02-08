import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { store, history } from './store/store'
import TagManager from 'react-gtm-module'
import './App.css'

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

const App = () => {
  return (
    <div id="app">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/:restaurant" component={LazyMenuPage} />
            </Switch>
          </ThemeProvider>
        </ConnectedRouter>
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
