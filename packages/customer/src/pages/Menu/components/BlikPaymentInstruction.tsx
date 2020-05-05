import React, { FC } from 'react'
import { MenuEntry } from '@menuo/shared'
import { truncate } from '../../../utils/text'
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
        Jeśli Twój bank obsługuje płatności BLIK na numer telefonu wyślij kwotę
        xx PLN na numer XXX XXX XXX a następnie poinformuj o tym kelnera. Tytuł
        przelewu: "Stolik XX". Tylko i wyłącznie po potwierdzeniu kelnera możesz
        opuścić restauracje. Lista banków obsługujących tego typu płatności w
        swojej aplikacji mobilnej: Alior Bank, Bank Millennium, Santander Bank
        Polska, ING Bank Śląski, Inteligo, mBank, PKO Bank Polski.
      </DialogContent>
      <div className={classes.dialogButtons}>
        <Button
          {...{ disabled, 'data-cy': 'blik-payment-instruction' }}
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
