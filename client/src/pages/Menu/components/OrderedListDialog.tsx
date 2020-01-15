import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from 'menuo-shared'

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
      <p>Twoje zamówienia</p>

      {ordered.map(([entry, count]) => (
        <li>
          {count}x {entry.dishName} - {entry.dishVariantName} (
          {entry.dishVariantPrice}zł)
        </li>
      ))}
    </DialogContent>
    <Button color="primary" onClick={onConfirm}>
      Ok
    </Button>
  </Dialog>
)
