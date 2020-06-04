var request = require('request')

console.log(process.argv)

const getArg = (args: string[], parameter: string) =>
  args[[...args].findIndex((v) => v === '--' + parameter) + 1]

const restaurant = getArg(process.argv, 'restaurant')
const count = +getArg(process.argv, 'count')

const generateWaiters = (restaurant: string, count: number) =>
  [...Array(count)].map((_, i) => ({
    username: restaurant + '-kelner-' + (i + 1),
    password: Math.random().toString(36).slice(-8),
    restaurant,
  }))

console.log({ restaurant, count })

interface Waiter {
  username: string
  password: string
  restaurant: string
}

const createWaiter = (waiter: Waiter) => {
  const { restaurant, ...waiterBody } = waiter
  const { username, password } = waiter

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
      deviceId: '000',
      roles: ['waiter'],
    }),
  }

  console.log({ options })

  request(options, function (error: string, response: { body: any }) {
    if (error) throw new Error(error)
    console.log({ username, password })
    console.log(response.body)
  })
}

generateWaiters(restaurant, count).forEach(createWaiter)
