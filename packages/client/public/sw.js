self.addEventListener('push', event => {
  const data = event.data.json()

  const run = async () => {
    const refetch = +new Date()
    const allClients = await self.clients.matchAll()
    allClients.forEach(client => client.postMessage({ refetch: refetch }))
  }

  run()

  self.registration.showNotification(data.title, {
    body: data.body,
    icon:
      'https://image.shutterstock.com/image-vector/restaurant-cafe-menu-line-icon-260nw-774331507.jpg',
  })
})
