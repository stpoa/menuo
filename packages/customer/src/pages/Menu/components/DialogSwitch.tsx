import * as React from 'react'
import { BasketDialog } from './MenuBasket'
import { OrderConfirmationDialog } from './OrderConfirmationDialog'
import { OrderedListDialog } from './OrderedListDialog'
import { OrderSentDialog } from './OrderSentDialog'
import { WaiterSummonDialog } from './WaiterSummonDialog'

// const dialogs = {
//   [DialogType.BASKET]: BasketDialog,
//   [DialogType.ORDER_CONFIRMATION]: OrderConfirmationDialog,
//   [DialogType.ORDERED_LIST]: OrderedListDialog,
//   [DialogType.ORDER_SENT]: OrderSentDialog,
//   [DialogType.WAITER_SUMMON]: WaiterSummonDialog,
// }

// export const DialogSwitch: React.FC<any> = ({
//   dialog,
//   ...props
// }: {
//   dialog: DialogType | undefined
// }) => {
//   if (!dialog) {
//     return null
//   }

//   const Dialog = dialogs[dialog]

//   return <Dialog {...(props as any)} />
// }
