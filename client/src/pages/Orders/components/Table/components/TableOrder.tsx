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

interface TabbleOrderProps {
  order: any
  handleCompleteOrderToggle: any
  handleAcceptOrder: any
  handleDeleteOrder: any
}

export const TableOrder = ({
  order,
  handleCompleteOrderToggle,
  handleAcceptOrder,
  handleDeleteOrder,
}: TabbleOrderProps) => (
  <div>
    <ListItem>
      <ListItemIcon>
        <Checkbox
          disabled={order.status === 'new'}
          edge="start"
          onChange={handleCompleteOrderToggle({
            orderId: order.id,
            status: order.status,
          })}
          checked={order.status === 'completed'}
        />
      </ListItemIcon>
      <ListItemText
        primary={'Zamówienie ' + order.id}
        // secondary={dish.description}
      />
      <ListItemSecondaryAction>
        {order.status === 'new' && (
          <Fab
            size="small"
            variant="extended"
            color="primary"
            onClick={handleAcceptOrder({ orderId: order.id })}
          >
            <Check />
          </Fab>
        )}
        <Fab
          style={{ marginLeft: '1rem' }}
          size="small"
          variant="extended"
          color="primary"
          onClick={handleDeleteOrder({ orderId: order.id })}
        >
          <DeleteForever />
        </Fab>
      </ListItemSecondaryAction>
    </ListItem>
    <List component="div" disablePadding>
      {order.items.map(({ dish, variant, count, isDone, itemId }: any) => {
        const variantText =
          `${count} x ${dish.name}` + (variant.name ? `- ${variant.name}` : '')

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
