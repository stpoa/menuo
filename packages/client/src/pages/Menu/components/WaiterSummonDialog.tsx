import React, { FC } from 'react'
import { useStyles } from '../Menu.styles'
import { DialogTitle, DialogContent, Dialog, Button } from '@material-ui/core'

interface WaiterSummonDialogProps {
  open: boolean
  disabled: boolean
  handleClose: () => void
  handlePayCardClick: () => void
  handlePayCashClick: () => void
  handleSummonClick: () => void
}

export const WaiterSummonDialog: FC<WaiterSummonDialogProps> = ({
  open,
  disabled,
  handleClose,
  handlePayCardClick,
  handlePayCashClick,
  handleSummonClick,
}) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>W jakim celu chcesz zawołać kelnera?</DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button {...{ disabled }} onClick={handlePayCashClick} color="primary">
          Płatność gotówką
        </Button>
        <Button {...{ disabled }} onClick={handlePayCardClick} color="primary">
          Płatność kartą
        </Button>
        <Button {...{ disabled }} color="primary" onClick={handleSummonClick}>
          Inne
        </Button>
      </div>
    </Dialog>
  )
}
