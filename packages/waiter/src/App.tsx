import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import TagManager from 'react-gtm-module'
import AppCustomer from './app-customer/AppCustomer'
import AppWaiter from './app-waiter/AppWaiter'

const App = () => {
  return (
    <div id="app">
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            window.location.href = '/about'
            return null
          }}
        />
        <AppCustomer />
        <AppWaiter />
      </Switch>
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
