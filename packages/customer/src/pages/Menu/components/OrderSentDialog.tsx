import React, { FC } from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from '@menuo/shared'
import OrderedList from './OrderList'
import { Translate } from 'react-localize-redux'
import { RestaurantConfig } from '@menuo/shared'

interface OrderSentDialogProps {
  showOrderedDialog: any
  handleClose: any
  handleConfirm: () => void
  ordered: [MenuEntry, number][]
  config: RestaurantConfig
}

export const OrderSentDialog: FC<OrderSentDialogProps> = ({
  showOrderedDialog,
  handleClose,
  handleConfirm,
  ordered,
  config,
}: OrderSentDialogProps) => {
  const isButtonAskForContact = config.CHANGE_CALL_WAITER_TO_CONTACT !== false
  return (
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
          <Translate
            id={
              isButtonAskForContact ? 'orderSentContentWz' : 'orderSentContent'
            }
          />
        </p>
      </DialogContent>
      <Button color="primary" onClick={handleConfirm}>
        Ok
      </Button>
    </Dialog>
  )
}
