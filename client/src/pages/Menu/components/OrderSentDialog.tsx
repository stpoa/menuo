import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from 'menuo-shared'

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
      {ordered.map(([entry, count]) => (
        <li>
          {count}x {entry.dishName} - {entry.dishVariantName} (
          {entry.dishVariantPrice}zł)
        </li>
      ))}

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
