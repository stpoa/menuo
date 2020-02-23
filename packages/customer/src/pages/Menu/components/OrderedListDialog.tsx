import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from '@menuo/shared'
import { OrderedList } from './OrderList'

interface OrderedListDialogProps {
  open: boolean
  onClose: any
  onConfirm: any
  ordered: [MenuEntry, number][]
}

export const OrderedListDialog: FC<OrderedListDialogProps> = ({
  open,
  onClose,
  onConfirm,
  ordered,
}: OrderedListDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Lista twoich zamówień</DialogTitle>
    <DialogContent>
      <OrderedList ordered={ordered} />
    </DialogContent>
    <Button
      {...{ 'data-cy': 'ordered-list-dialog-ok' }}
      color="primary"
      onClick={onConfirm}
    >
      Ok
    </Button>
  </Dialog>
)
