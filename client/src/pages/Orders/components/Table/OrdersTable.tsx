import React from 'react'
import { Fab, Divider, List } from '@material-ui/core'
import { AccessibilityNew, CreditCard, Money } from '@material-ui/icons'
import { H2 } from '../../../../components/H2'
import { TableOrder } from './components/TableOrder'
import { IOrder } from 'menuo-shared'
import { Table } from 'menuo-shared/interfaces/tables'

interface OrdersTableProps {
  orders: IOrder[]
  table: Table
  handleAcceptOrder: (restaurant: string) => () => void
  handleDeleteOrder: (order: string) => () => void
  handleCompleteOrderToggle: (order: string) => () => void
  handleCompleteAction: (order: string) => () => void
}

export const OrdersTable = ({
  orders,
  table,
  handleAcceptOrder,
  handleDeleteOrder,
  handleCompleteOrderToggle,
  handleCompleteAction,
}: OrdersTableProps) => {
  const emptyOrder = orders.find(o => o.status === '')
  console.log(orders, { emptyOrder }, table.status)

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <H2> Stół {table.name} </H2>
        {table.status === 'summon-waiter' && emptyOrder && (
          <Fab
            style={{ position: 'absolute', top: '0', right: '1rem' }}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleCompleteAction(emptyOrder._id)}
          >
            <AccessibilityNew />
          </Fab>
        )}
        {table.status === 'pay-card' && emptyOrder && (
          <Fab
            style={{ position: 'absolute', top: '0', right: '1rem' }}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleCompleteAction(emptyOrder._id)}
          >
            <CreditCard />
          </Fab>
        )}
        {table.status === 'pay-cash' && emptyOrder && (
          <Fab
            style={{ position: 'absolute', top: '0', right: '1rem' }}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleCompleteAction(emptyOrder._id)}
          >
            <Money />
          </Fab>
        )}
      </div>
      <Divider />

      <List>
        {orders.map((order, key) => (
          <TableOrder
            {...{
              order,
              key,
              handleCompleteOrderToggle,
              handleAcceptOrder,
              handleDeleteOrder,
            }}
          />
        ))}
      </List>
    </div>
  )
}
