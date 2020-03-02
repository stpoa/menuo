import React, { FC } from 'react'
import { Dialog, DialogTitle, Button, DialogActions } from '@material-ui/core'

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
    <DialogTitle>Czy na pewno chcesz usunąć zamówienie?</DialogTitle>
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
