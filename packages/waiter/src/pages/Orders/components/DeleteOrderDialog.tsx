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
    <DialogTitle>Do You want to delete Your order?</DialogTitle>
    <DialogActions>
      <Button color="primary" onClick={handleClose}>
        Cancel
      </Button>
      <Button color="primary" onClick={handleConfirm}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)
