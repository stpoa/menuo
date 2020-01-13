import React, { FC } from 'react'
import { useStyles } from '../Menu.styles'
import { DialogTitle, DialogContent, Dialog, Button } from '@material-ui/core'
import { Table } from 'menuo-shared/interfaces/tables'

interface WaiterSummonDialogProps {
  open: boolean
  handleClose: () => void
  handlePayCardClick: () => void
  handlePayCashClick: () => void
  handleSummonClick: () => void
}

export const WaiterSummonDialog: FC<WaiterSummonDialogProps> = ({
  open,
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
        <Button onClick={handlePayCashClick} color="primary">
          Płatność gotówką
        </Button>
        <Button onClick={handlePayCardClick} color="primary">
          Płatność kartą
        </Button>
        <Button color="primary" onClick={handleSummonClick}>
          Inne
        </Button>
      </div>
    </Dialog>
  )
}
