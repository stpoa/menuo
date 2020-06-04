var request = require('request')

interface Waiter {
  username: string
  password: string
  restaurant: string
}

const createWaiter = (waiter: Waiter) => {
  const { restaurant, ...waiterBody } = waiter
  const tables = require('../../public/data/' + restaurant + '/tables.json')
  const apiUrl = process.env.REACT_APP_API_URL
  console.log('Api url: ', apiUrl)

  const url = apiUrl + '/restaurants/' + restaurant + '/register'

  const options = {
    method: 'POST',
    url,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      ...waiterBody,
      tables,
      deviceId: '-',
      roles: ['waiter'],
    }),
  }

  console.log({ options })

  request(options, function (error: string, response: { body: any }) {
    if (error) throw new Error(error)
    console.log(response.body)
  })
}

const waiters = require('./waiters.json')
waiters.forEach(createWaiter)
