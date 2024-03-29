import React, { useState } from 'react'
import {
  Fab,
  ListItem,
  List,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  Card,
} from '@material-ui/core'
import { Check, DeleteForever } from '@material-ui/icons'
import { IOrder, IOrderItem } from '@menuo/shared'
import { SelectInputProps } from '@material-ui/core/Select/SelectInput'

import { DeleteOrderDialog } from '../../DeleteOrderDialog'
import { PrioritySelect } from '../../Priority'

interface TabbleOrderProps {
  order: IOrder
  handleCompleteOrderToggle: (order: string, status: string) => () => void
  handleAcceptOrder: any
  handleDeleteOrder: (order: string) => () => void
  handlePriorityChange: (
    order: IOrder,
  ) => (item: IOrderItem) => SelectInputProps['onChange']
  loading: boolean
}

export const TableOrder = ({
  order,
  handleCompleteOrderToggle,
  handleAcceptOrder,
  handleDeleteOrder,
  handlePriorityChange,
  loading,
}: TabbleOrderProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return order.status === '' ? null : (
    <Card style={{ margin: '1rem 0', paddingBottom: '1rem' }}>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            disabled={order.status === 'new'}
            edge="start"
            onChange={handleCompleteOrderToggle(order._id, order.status)}
            checked={order.status === 'completed'}
          />
        </ListItemIcon>
        <ListItemText
          primary={'Order - ' + order._id.slice(-3)}
          // secondary={dish.description}
        />
        <ListItemSecondaryAction>
          {order.status === 'new' && (
            <Fab
              size="small"
              variant="extended"
              color="primary"
              onClick={handleAcceptOrder(order._id)}
            >
              <Check />
            </Fab>
          )}
          <Fab
            style={{ marginLeft: '1rem' }}
            size="small"
            variant="extended"
            color="primary"
            onClick={() => setShowDeleteDialog(true)}
          >
            <DeleteForever />
          </Fab>
        </ListItemSecondaryAction>
      </ListItem>
      <List component="div" disablePadding>
        {order.items.map((item: IOrderItem, i) => {
          const priority: number = item.entry.priority || 1
          const variantText =
            `${item.dishName}` +
            (item.entry.dishVariantName
              ? `- ${item.entry.dishVariantName}`
              : '') +
            ` x ${item.count}`

          return (
            <ListItem
              key={i}
              onClick={order.status === 'new' ? undefined : () => {}}
            >
              <PrioritySelect
                disabled={loading}
                value={priority}
                onChange={handlePriorityChange(order)(item)}
                style={{ marginRight: '1rem' }}
              />
              <ListItemText>{variantText}</ListItemText>
            </ListItem>
          )
        })}
      </List>

      <DeleteOrderDialog
        handleClose={() => setShowDeleteDialog(false)}
        handleConfirm={() => {
          handleDeleteOrder(order._id)()
          setShowDeleteDialog(false)
        }}
        open={showDeleteDialog}
      />
    </Card>
  )
}
