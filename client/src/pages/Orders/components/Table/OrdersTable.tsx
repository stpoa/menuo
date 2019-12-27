import React from 'react'
import { Fab, Divider, List } from '@material-ui/core'
import { AccessibilityNew, CreditCard, Money } from '@material-ui/icons'
import { H2 } from '../../../../components/H2'
import { TableOrder } from './components/TableOrder'

interface OrdersTableProps {
  id: number
  status: string
  orders: any[]
  handleAcceptOrder: any
  handleDeleteOrder: any
  handleCompleteOrderToggle: any
  handleCompleteAction: any
}

export const OrdersTable = ({
  id,
  status,
  orders,
  handleAcceptOrder,
  handleDeleteOrder,
  handleCompleteOrderToggle,
  handleCompleteAction,
}: OrdersTableProps) => (
  <div>
    <div style={{ position: 'relative' }}>
      <H2> Stół {id} </H2>
      {status === 'summon-waiter' && (
        <Fab
          style={{ position: 'absolute', top: '0', right: '1rem' }}
          size="small"
          variant="extended"
          color="secondary"
          onClick={handleCompleteAction({ id })}
        >
          <AccessibilityNew />
        </Fab>
      )}
      {status === 'pay-card' && (
        <Fab
          style={{ position: 'absolute', top: '0', right: '1rem' }}
          size="small"
          variant="extended"
          color="secondary"
          onClick={handleCompleteAction({ id })}
        >
          <CreditCard />
        </Fab>
      )}
      {status === 'pay-cash' && (
        <Fab
          style={{ position: 'absolute', top: '0', right: '1rem' }}
          size="small"
          variant="extended"
          color="secondary"
          onClick={handleCompleteAction({ id })}
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
