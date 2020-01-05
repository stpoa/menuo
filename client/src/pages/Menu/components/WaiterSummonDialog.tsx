import React, { FC } from 'react'
import { useStyles } from '../Menu.styles'
import { DialogTitle, DialogContent, Dialog, Button } from '@material-ui/core'
import { Table } from 'menuo-shared/interfaces/tables'

interface WaiterSummonDialogProps {
  open: boolean
  handleClose: () => void
  handlePayCardClick: (tableId: string) => () => void
  handlePayCashClick: (tableId: string) => () => void
  handleSummonClick: () => void
  table: Table
}

export const WaiterSummonDialog: FC<WaiterSummonDialogProps> = ({
  open,
  handleClose,
  handlePayCardClick,
  handlePayCashClick,
  handleSummonClick,
  table,
}) => {
  const classes = useStyles()
  const tableId = table._id

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>W jakim celu chcesz zawołać kelnera?</DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button onClick={handlePayCashClick(tableId)} color="primary">
          Płatność gotówką
        </Button>
        <Button onClick={handlePayCardClick(tableId)} color="primary">
          Płatność kartą
        </Button>
        <Button color="primary" onClick={handleSummonClick}>
          Inne
        </Button>
      </div>
    </Dialog>
  )
}
