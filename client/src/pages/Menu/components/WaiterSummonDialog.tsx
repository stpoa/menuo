import React, { FC } from 'react'
import { useStyles } from '../Menu.styles'
import { DialogTitle, DialogContent, Dialog, Button } from '@material-ui/core'

interface WaiterSummonDialogProps {
  open: boolean
  handleClose: any
  handlePayCardClick: any
  handlePayCashClick: any
  handleSummonClick: any
  tableId:string 
}

export const WaiterSummonDialog: FC<WaiterSummonDialogProps> = ({
  open,
  handleClose,
  handlePayCardClick,
  handlePayCashClick,
  handleSummonClick,
  tableId,
}) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>W jakim celu chcesz zawołać kelnera?</DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button onClick={handlePayCashClick({ tableId })} color="primary">
          Płatność gotówką
        </Button>
        <Button onClick={handlePayCardClick({ tableId })} color="primary">
          Płatność kartą
        </Button>
        <Button color="primary" onClick={handleSummonClick({ tableId })}>
          Inne
        </Button>
      </div>
    </Dialog>
  )
}
