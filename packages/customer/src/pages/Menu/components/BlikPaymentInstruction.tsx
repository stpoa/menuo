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

interface BlikPaymentInstructionProps extends WithStyles {
  open: boolean
  disabled: boolean
  handleClose: () => void
  handleOkClick: () => void
}

export const BlikPaymentInstruction: FC<BlikPaymentInstructionProps> = ({
  open,
  disabled,
  handleClose,
  handleOkClick,
  classes,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Translate id="blikPaymentConfirmationTitle"></Translate>
      </DialogTitle>
      <DialogContent>
        Możesz zapłacić BLIKiem lub wezwać kelnera. Jeśli Twój bank obsługuje
        płatności BLIK na numer telefonu wyślij kwotę xx PLN na numer 517 254
        583 a następnie poinformuj o tym kelnera. Tytuł przelewu: "Stolik X".
        Tylko i wyłącznie po potwierdzeniu kelnera możesz opuścić restauracje.
        Lista banków obsługujących tego typu płatności w swojej aplikacji
        mobilnej: Alior Bank, Bank Millennium, Santander Bank Polska, ING Bank
        Śląski, Inteligo, mBank, PKO Bank Polski.
      </DialogContent>
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

export default withStyles(styles)(BlikPaymentInstruction)
