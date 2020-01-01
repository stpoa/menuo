import { updateOrder } from './pages/Orders/Orders.api'

export const apiSubscribe = (subscription, kind, table) => {
  console.log('Sending subscription to server')
  return fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ subscription, table, kind }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiCreateOrder = ({ basket, userId, tableId }) => {
  console.log('Createing new order')

  return fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ userId, basket, tableId }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiAcceptOrder = ({ orderId, restaurantId }) => {
  return updateOrder(restaurantId, { id: orderId, status: 'accepted' })
}

export const apiCompleteOrder = ({ orderId, status, restaurantId }) => {
  console.log('Completing order')

  return fetch('/api/orders', {
    method: 'PUT',
    body: JSON.stringify({
      id: orderId,
      status: status === 'completed' ? 'accepted' : 'completed',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiDeleteOrder = orderId => {
  console.log('Deleting order')
  return fetch('/api/orders/' + orderId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiSummonWaiter = ({ tableId }) => {
  return fetch('/api/tables', {
    method: 'PUT',
    body: JSON.stringify({ id: tableId, status: 'summon-waiter' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiCompleteTableAction = ({ id }) => {
  return fetch('/api/tables', {
    method: 'PUT',
    body: JSON.stringify({ id, status: 'action-completed' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiPayByCash = ({ tableId }) => {
  return fetch('/api/tables', {
    method: 'PUT',
    body: JSON.stringify({ id: tableId, status: 'pay-cash' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const apiPayByCard = ({ tableId }) => {
  return fetch('/api/tables', {
    method: 'PUT',
    body: JSON.stringify({ id: tableId, status: 'pay-card' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
