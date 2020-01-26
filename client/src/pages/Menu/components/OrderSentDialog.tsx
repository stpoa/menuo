import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from 'menuo-shared'
import { OrderedList } from './OrderList'

interface OrderSentDialogProps {
  showOrderedDialog: any
  handleClose: any
  handleConfirm: () => void
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
        Pamiętaj, że w każdej chwili możesz złożyć kolejne zamówienie lub
        zawołać kelnera. Zamówione wcześniej dania możesz sprawdzić klikając
        ikonke w prawym, górnym rogu.
      </p>
    </DialogContent>
    <Button color="primary" onClick={handleConfirm}>
      Ok
    </Button>
  </Dialog>
)
