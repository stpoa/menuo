import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { useStyles } from './Orders.styles'
import { OrdersTable } from './components/Table/OrdersTable'

import {
  getRestaurantOrders,
  deleteRestaurantOrder,
  deleteRestaurantOrders,
} from './Orders.api'
import { IOrdersTables } from 'menuo-shared'
import { nestOrders } from 'menuo-shared/dist/transformations/orders'
import { updateRestaurantOrder } from '../Menu/Menu.api'

export const Orders = ({ match }: any) => {
  const { restaurant } = match.params
  const [refetch, setRefetch] = useState(0)
  const [orders, setOrders] = useState<IOrdersTables>({
    restaurant,
    tables: [],
  })

  useEffect(() => {
    const doEffect = async () => {
      const orders = await getRestaurantOrders({ restaurant })
      setOrders(nestOrders(orders))
    }
    doEffect()
  }, [restaurant, refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      setRefetch(event.data.refetch)
    })
  }, [])

  const classes = useStyles()

  const handleAcceptOrder = (restaurant: string) => (
    order: string,
  ) => async () => {
    await updateRestaurantOrder({ order, restaurant }, { status: 'accepted' })
    setRefetch(+new Date())
  }

  const handleCompleteOrderToggle = (restaurant: string) => (
    order: string,
    status: string,
  ) => async () => {
    await updateRestaurantOrder(
      { order, restaurant },
      { status: status !== 'completed' ? 'completed' : 'accepted' },
    )
    setRefetch(+new Date())
  }

  const handleDeleteOrder = (restaurant: string) => (
    order: string,
  ) => async () => {
    await deleteRestaurantOrder({ restaurant, order })
    setRefetch(+new Date())
  }

  const handleCompleteAction = (restaurant: string) => (
    table: string,
    tableStatus: string,
  ) => async () => {
    await deleteRestaurantOrders({ restaurant, table, tableStatus })
    setRefetch(+new Date())
  }

  return (
    <div className={classes.root}>
      <Header>Zamówienia</Header>

      {orders.tables.map(({ orders, table }) => (
        <OrdersTable
          {...{
            key: table._id,
            table,
            orders,
            handleAcceptOrder: handleAcceptOrder(restaurant),
            handleDeleteOrder: handleDeleteOrder(restaurant),
            handleCompleteOrderToggle: handleCompleteOrderToggle(restaurant),
            handleCompleteAction: handleCompleteAction(restaurant),
          }}
        />
      ))}
    </div>
  )
}
