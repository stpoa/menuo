import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { store, history, RootState } from './store/store'
import TagManager from 'react-gtm-module'
import './App.css'
import { LocalizeProvider } from 'react-localize-redux'

const MenuPage = React.lazy(() => import('./pages/Menu/MenuPage'))

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    // secondary: green,
  },
})

const App = () => (
  <div id="app">
    <Provider store={store}>
      <LocalizeProvider
        store={store}
        getState={(state: RootState) => state.user.locale}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
              <Switch>
                <Route exact path="/:restaurant" component={MenuPage} />
              </Switch>
            </ThemeProvider>
          </ConnectedRouter>
        </Suspense>
      </LocalizeProvider>
    </Provider>
  </div>
)

// Setup google tag manager
const GTM_ID = process.env.REACT_APP_GTM_ID
if (GTM_ID) {
  TagManager.initialize({
    gtmId: GTM_ID,
  })
}

export default App
