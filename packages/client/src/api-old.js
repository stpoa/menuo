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
