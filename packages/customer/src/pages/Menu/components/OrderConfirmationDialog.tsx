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
    <DialogTitle>Czy chcesz zamówić poniższe?</DialogTitle>
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
        Powrót
      </Button>
      <Button
        {...{ 'data-cy': 'confirm-dish-order' }}
        disabled={disabled}
        color="primary"
        onClick={onConfirm}
      >
        Zamawiam
      </Button>
    </DialogActions>
  </Dialog>
)
