import React, { useEffect, useState } from 'react'
import {
  apiAcceptOrder,
  apiCompleteOrder,
  apiDeleteOrder,
  apiCompleteTableAction,
} from '../../api-old'
import { Header } from '../../components/Header'
import { useStyles } from './Orders.styles'
import { OrdersTable } from './components/Table/OrdersTable'

import { getTables } from './Orders.api'
import { IOrdersTable } from 'menuo-shared'

export const Orders = ({ search, match }: any) => {
  const { restaurantId } = match.params
  const [refetch, setRefetch] = useState()
  const [tables, setTables] = useState<IOrdersTable[]>([])

  useEffect(() => {
    const doEffect = async () => {
      const tables = await getTables(restaurantId)
      setTables(tables)
    }
    doEffect()
  }, [refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      setRefetch(event.data.refetch)
    })
  }, [])

  const classes = useStyles()

  const handleAcceptOrder = ({ orderId }: any) => async () => {
    await apiAcceptOrder({ restaurantId, orderId })
    setRefetch(+new Date())
  }

  const handleDeleteOrder = ({ orderId }: any) => async () => {
    await apiDeleteOrder(orderId)
    setRefetch(+new Date())
  }

  const handleCompleteOrderToggle = ({ orderId, status }: any) => async () => {
    await apiCompleteOrder({ restaurantId, orderId, status })
    setRefetch(+new Date())
  }

  const handleCompleteAction = ({ id }: any) => async () => {
    await apiCompleteTableAction({ id })
    setRefetch(+new Date())
  }

  return (
    <div className={classes.root}>
      <Header>Zamówienia</Header>

      {tables.map(({ id, status, orders }) => (
        <OrdersTable
          {...{
            id,
            status,
            orders,
            handleAcceptOrder,
            handleDeleteOrder,
            handleCompleteOrderToggle,
            handleCompleteAction,
          }}
        />
      ))}
    </div>
  )
}
