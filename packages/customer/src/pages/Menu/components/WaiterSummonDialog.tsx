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
import { RestaurantConfig } from '@menuo/shared'

interface WaiterSummonDialogProps extends WithStyles {
  open: boolean
  disabled: boolean
  handleClose: () => void
  handlePayCardClick: () => void
  handlePayCashClick: () => void
  handleSummonClick: () => void
  config: RestaurantConfig
}

export const WaiterSummonDialog: FC<WaiterSummonDialogProps> = ({
  open,
  disabled,
  handleClose,
  handlePayCardClick,
  handlePayCashClick,
  handleSummonClick,
  config,
  classes,
}) => {
  const isButtonAskForContact = config.CHANGE_CALL_WAITER_TO_CONTACT !== false
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Translate id={isButtonAskForContact ? 'contactWay' : 'callWaiterAim'}>
          {isButtonAskForContact
            ? 'How should we contact You?'
            : 'What do You want to call the waiter for?'}
        </Translate>
      </DialogTitle>
      <DialogContent></DialogContent>
      <div className={classes.dialogButtons}>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-pay-cash' }}
          onClick={handlePayCashClick}
          color="primary"
        >
          <Translate id={isButtonAskForContact ? 'mobile' : 'payInCash'}>
            {isButtonAskForContact ? 'Mobile' : 'Pay in cash'}
          </Translate>
        </Button>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-pay-card' }}
          onClick={handlePayCardClick}
          color="primary"
        >
          <Translate id={isButtonAskForContact ? 'email' : 'payByCard'}>
            {isButtonAskForContact ? 'E-mail' : 'Pay by card'}
          </Translate>
        </Button>
        <Button
          {...{ disabled, 'data-cy': 'summon-waiter-other' }}
          color="primary"
          onClick={handleSummonClick}
        >
          <Translate id={isButtonAskForContact ? 'whatsApp' : 'other'}>
            {isButtonAskForContact ? 'WhatsApp' : 'Other'}
          </Translate>
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
