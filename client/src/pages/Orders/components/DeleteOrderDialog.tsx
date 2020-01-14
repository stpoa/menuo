import React, { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from '@material-ui/core'

interface OrderSentDialogProps {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
}

export const DeleteOrderDialog: FC<OrderSentDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
}: any) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Czy napewno chcesz usunąć zamówienie?</DialogTitle>
    <DialogContent>
      zamówienie. Pamiętaj, że w każdej chwili możesz zawołać kelnera klikając
      na przycisk.
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={handleClose}>
        Anuluj
      </Button>
      <Button color="primary" onClick={handleConfirm}>
        Usuń
      </Button>
    </DialogActions>
  </Dialog>
)
