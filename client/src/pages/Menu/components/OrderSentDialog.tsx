import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from 'menuo-shared'
import { OrderedList } from './OrderList'

interface OrderSentDialogProps {
  showOrderedDialog: any
  handleClose: any
  handleConfirm: any
  ordered: [MenuEntry, number][]
}

export const OrderSentDialog: FC<OrderSentDialogProps> = ({
  showOrderedDialog,
  handleClose,
  handleConfirm,
  ordered,
}: OrderSentDialogProps) => (
  <Dialog open={showOrderedDialog} onClose={handleClose}>
    <DialogTitle>Zamówienie wysłane!</DialogTitle>
    <DialogContent>
      <p>Twoje zamówienie zostało wysłane!</p>
      <OrderedList {...{ ordered }} />
      <p>
        Jeżeli chcesz coś jeszcze zamówić możesz złożyć kolejne zamówienie.
        Pamiętaj, że w każdej chwili możesz zawołać kelnera klikając na
        przycisk.
      </p>
    </DialogContent>
    <Button color="primary" onClick={handleConfirm}>
      Ok
    </Button>
  </Dialog>
)
