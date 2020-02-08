import React from 'react'
import { Fab, List } from '@material-ui/core'
import { AccessibilityNew, CreditCard, Money } from '@material-ui/icons'
import { H2 } from '../../../../components/H2'
import { TableOrder } from './components/TableOrder'
import { IOrder, IOrderItem } from '@menuo/shared'
import { Table } from '@menuo/shared/interfaces/tables'
import { SelectInputProps } from '@material-ui/core/Select/SelectInput'

interface OrdersTableProps {
  orders: IOrder[]
  table: Table
  handleAcceptOrder: (restaurant: string) => () => void
  handleDeleteOrder: (order: string) => () => void
  handleCompleteOrderToggle: (order: string, status: string) => () => void
  handleCompleteAction: () => void
  handlePriorityChange: (
    order: IOrder,
  ) => (item: IOrderItem) => SelectInputProps['onChange']
  loading: boolean
}

export const OrdersTable = ({
  orders,
  table,
  handleAcceptOrder,
  handleDeleteOrder,
  handleCompleteOrderToggle,
  handleCompleteAction,
  handlePriorityChange,
  loading,
}: OrdersTableProps) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ position: 'relative' }}>
        <H2> Stół {table.name} </H2>
        {table.status === 'summon-waiter' && (
          <Fab
            style={{ position: 'absolute', top: '0', right: '1rem' }}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleCompleteAction}
          >
            <AccessibilityNew />
          </Fab>
        )}
        {table.status === 'pay-card' && (
          <Fab
            style={{ position: 'absolute', top: '0', right: '1rem' }}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleCompleteAction}
          >
            <CreditCard />
          </Fab>
        )}
        {table.status === 'pay-cash' && (
          <Fab
            style={{ position: 'absolute', top: '0', right: '1rem' }}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleCompleteAction}
          >
            <Money />
          </Fab>
        )}
      </div>

      <List>
        {orders.map((order, key) => (
          <TableOrder
            {...{
              loading,
              order,
              key,
              handleCompleteOrderToggle,
              handlePriorityChange,
              handleAcceptOrder,
              handleDeleteOrder,
            }}
          />
        ))}
      </List>
    </div>
  )
}
