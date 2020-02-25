import React, { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core'
import { MenuEntry } from '@menuo/shared'
import { OrderedList } from './OrderList'
import { Translate } from 'react-localize-redux'

interface OrderConfirmationDialogProps {
  open: boolean
  disabled: boolean
  onClose: any
  onConfirm: any
  onReject: any
  inBasket: [MenuEntry, number][]
}

export const OrderConfirmationDialog: FC<OrderConfirmationDialogProps> = ({
  open,
  disabled,
  onClose,
  onConfirm,
  onReject,
  inBasket,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <Translate id="orderConfirmContent">
        Do you want to order entries below?
      </Translate>
    </DialogTitle>
    <DialogContent>
      <OrderedList ordered={inBasket} />
    </DialogContent>

    <DialogActions>
      <Button
        {...{ 'data-cy': 'close-order-confirmation-dialog' }}
        disabled={disabled}
        color="primary"
        onClick={onReject}
      >
        <Translate id="back">Back</Translate>
      </Button>
      <Button
        {...{ 'data-cy': 'confirm-dish-order' }}
        disabled={disabled}
        color="primary"
        onClick={onConfirm}
      >
        <Translate id="order">Order</Translate>
      </Button>
    </DialogActions>
  </Dialog>
)
