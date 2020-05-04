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

interface WaiterSummonConfirmationProps extends WithStyles {
  open: boolean
  disabled: boolean
  handleClose: () => void
  handleOkClick: () => void
}

export const WaiterSummonConfirmation: FC<WaiterSummonConfirmationProps> = ({
  open,
  disabled,
  handleClose,
  handleOkClick,
  classes,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Translate id="callWaiterConfirmation">
          Waiter has been notified!
        </Translate>
      </DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-confirmation' }}
          onClick={handleOkClick}
          color="primary"
        >
          <p>OK</p>
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

export default withStyles(styles)(WaiterSummonConfirmation)
