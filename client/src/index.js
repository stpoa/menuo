import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import {
  registerServiceWorker,
  waitForDocumentLoad,
  getSubscription,
  publicVapidKey,
} from './utils'
// import { apiSubscribe } from './api-old'

ReactDOM.render(
  React.createElement(Router, null, React.createElement(App, null)),
  document.getElementById('root'),
)

const run = async () => {
  await waitForDocumentLoad()
  await registerServiceWorker()
  // const isWaiter = window.location.pathname.includes('orders')
  const subscription = await getSubscription(publicVapidKey)
  localStorage.setItem('subscription', JSON.stringify(subscription))
  // console.log(localStorage.getItem('subscription'))
  // const query = new URLSearchParams(window.location.search)
  // await apiSubscribe(
  //   subscription,
  //   isWaiter ? 'waiter' : 'customer',
  //   query.get('table'),
  // )
}

try {
  run()
} catch (e) {
  console.log(e)
}
