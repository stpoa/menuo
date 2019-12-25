import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { registerServiceWorker, waitForDocumentLoad } from './utils'
// import { apiSubscribe } from './api-old'

ReactDOM.render(
  React.createElement(Router, null, React.createElement(App, null)),
  document.getElementById('root'),
)

registerServiceWorker()
  .then(() => console.log('Registered service worker'))
  .catch(console.error)

const run = async () => {
  await waitForDocumentLoad()
  await registerServiceWorker()
  // const isWaiter = window.location.pathname.includes('orders')
  // const subscription = await getSubscription(publicVapidKey)
  // const query = new URLSearchParams(window.location.search)
  // await apiSubscribe(
  //   subscription,
  //   isWaiter ? 'waiter' : 'customer',
  //   query.get('table'),
  // )
}

run()
