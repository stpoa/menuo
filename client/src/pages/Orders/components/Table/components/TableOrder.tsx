import React from 'react'
import {
  Fab,
  ListItem,
  List,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Check, DeleteForever, ArrowForwardIos } from '@material-ui/icons'
import { IOrder } from 'menuo-shared'

interface TabbleOrderProps {
  order: IOrder
  handleCompleteOrderToggle: any
  handleAcceptOrder: any
  handleDeleteOrder: (order: string) => () => void
}

export const TableOrder = ({
  order,
  handleCompleteOrderToggle,
  handleAcceptOrder,
  handleDeleteOrder,
}: TabbleOrderProps) =>
  order.status === '' ? null : (
    <div>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            disabled={order.status === 'new'}
            edge="start"
            onChange={handleCompleteOrderToggle({
              orderId: order._id,
              status: order.status,
            })}
            checked={order.status === 'completed'}
          />
        </ListItemIcon>
        <ListItemText
          primary={'Zamówienie - ' + order._id.slice(-3)}
          // secondary={dish.description}
        />
        <ListItemSecondaryAction>
          {order.status === 'new' && (
            <Fab
              size="small"
              variant="extended"
              color="primary"
              onClick={handleAcceptOrder({ orderId: order._id })}
            >
              <Check />
            </Fab>
          )}
          <Fab
            style={{ marginLeft: '1rem' }}
            size="small"
            variant="extended"
            color="primary"
            onClick={handleDeleteOrder(order._id)}
          >
            <DeleteForever />
          </Fab>
        </ListItemSecondaryAction>
      </ListItem>
      <List component="div" disablePadding>
        {order.items.map(item => {
          const variantText =
            `${item.count} x ${item.dishName}` +
            (item.entry.dishVariantName
              ? `- ${item.entry.dishVariantName}`
              : '')

          return (
            <ListItem
              button={(order.status !== 'new') as true}
              onClick={order.status === 'new' ? undefined : () => {}}
            >
              <ListItemIcon>
                <ArrowForwardIos />
              </ListItemIcon>
              <ListItemText>{variantText}</ListItemText>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
