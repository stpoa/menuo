import React from 'react'
import './App.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import TagManager from 'react-gtm-module'
import AppCustomer from './app-customer/AppCustomer'
import AppWaiter from './app-waiter/AppWaiter'

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
    <div id="app">
      <AppCustomer />
      <AppWaiter />
    </div>
  )
}

export default App
