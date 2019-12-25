import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'

interface OrderSentDialogProps {
  showOrderedDialog: any,
  handleClose: any,
  handleConfirm: any,
}

export const OrderSentDialog: FC<OrderSentDialogProps> = ({
  showOrderedDialog,
  handleClose,
  handleConfirm,
}: any) => (
  <Dialog open={showOrderedDialog} onClose={handleClose}>
    <DialogTitle>Zamówienie wysłane!</DialogTitle>
    <DialogContent>
      Twoje zamówienie zostało wysłane i oczekuje na akceptacje przez
      restauracje, otrzymsz powiadomienie inforumujące o zaakceptowaniu
      zamówienia. Jeżeli chcesz coś jeszcze zamówić możesz złożyć kolejne
      zamówienie. Pamiętaj, że w każdej chwili możesz zawołać kelnera klikając
      na przycisk.
    </DialogContent>
    <Button color="primary" onClick={handleConfirm}>
      Ok
    </Button>
  </Dialog>
)
