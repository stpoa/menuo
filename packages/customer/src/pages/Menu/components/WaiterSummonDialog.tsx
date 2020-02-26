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
import { Translate } from 'react-localize-redux'

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
      <DialogTitle><Translate id="callWaiterAim">What you want to call the waiter for?</Translate></DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-pay-cash' }}
          onClick={handlePayCashClick}
          color="primary"
        >
          <Translate id="payByCash">Pay by cash</Translate>
        </Button>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-pay-card' }}
          onClick={handlePayCardClick}
          color="primary"
        >
          <Translate id="payByCard">Pay by card</Translate>
        </Button>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-other' }}
          color="primary"
          onClick={handleSummonClick}
        >
          <Translate id="other">Other</Translate>
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
