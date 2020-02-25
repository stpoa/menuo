import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from '@menuo/shared'
import { OrderedList } from './OrderList'
import { Translate } from 'react-localize-redux'

interface OrderSentDialogProps {
  showOrderedDialog: any
  handleClose: any
  handleConfirm: () => void
  ordered: [MenuEntry, number][]
}

export const OrderSentDialog: FC<OrderSentDialogProps> = ({
  showOrderedDialog,
  handleClose,
  handleConfirm,
  ordered,
}: OrderSentDialogProps) => (
  <Dialog open={showOrderedDialog} onClose={handleClose}>
    <DialogTitle>
      <Translate id="orderSentTitleContent" />
    </DialogTitle>
    <DialogContent>
      <p>
        <Translate id="orderSentSubTitleContent" />
      </p>
      <OrderedList {...{ ordered }} />
      <p>
        <Translate id="orderSentContent" />
      </p>
    </DialogContent>
    <Button color="primary" onClick={handleConfirm}>
      Ok
    </Button>
  </Dialog>
)
