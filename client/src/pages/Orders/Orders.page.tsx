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

import { getTables, ITable } from './Orders.api'

export const Orders = ({ search, match }: any) => {
  const { restaurantId } = match.params
  const [refetch, setRefetch] = useState()
  const [tables, setTables] = useState<ITable[]>([])

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
    await apiAcceptOrder({ orderId })
    setRefetch(+new Date())
  }

  const handleDeleteOrder = ({ orderId }: any) => async () => {
    await apiDeleteOrder(orderId)
    setRefetch(+new Date())
  }

  const handleCompleteOrderToggle = ({ orderId, status }: any) => async () => {
    await apiCompleteOrder({ orderId, status })
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
