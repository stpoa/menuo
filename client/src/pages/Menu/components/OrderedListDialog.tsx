import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from 'menuo-shared'
import { truncate } from '../../../utils/text'

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
      {ordered.map(([entry, count]) => (
        <li>
          {count}x {truncate(80)(entry.dishName)} -{' '}
          {truncate(80)(entry.dishVariantName || '')} ({entry.dishVariantPrice}
          zł)
        </li>
      ))}
    </DialogContent>
    <Button color="primary" onClick={onConfirm}>
      Ok
    </Button>
  </Dialog>
)
