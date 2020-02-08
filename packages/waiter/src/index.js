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
  try {
    await waitForDocumentLoad()
    await registerServiceWorker()
    const subscription = await getSubscription(publicVapidKey)
    localStorage.setItem('subscription', JSON.stringify(subscription))
  } catch (e) {
    console.log(e)
  }
}

try {
  run()
} catch (e) {
  console.log(e)
}
