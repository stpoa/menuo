import React, { FC } from 'react'
import {
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core'

interface WaiterSummonDialogProps extends WithStyles {
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
  classes,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>W jakim celu chcesz zawołać kelnera?</DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-pay-cash' }}
          onClick={handlePayCashClick}
          color="primary"
        >
          Płatność gotówką
        </Button>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-pay-card' }}
          onClick={handlePayCardClick}
          color="primary"
        >
          Płatność kartą
        </Button>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-other' }}
          color="primary"
          onClick={handleSummonClick}
        >
          Inne
        </Button>
      </div>
    </Dialog>
  )
}

const styles = () =>
  createStyles({
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
    },
  })

export default withStyles(styles)(WaiterSummonDialog)
