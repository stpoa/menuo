import React, { FC } from 'react'
import { withStyles, createStyles, Badge, Theme, Fab } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from '@menuo/shared'
import OrderedList from './OrderList'
import { connect } from 'react-redux'
import { RootState } from '../../../store/store'
import * as actions from '../../../store/actions'
import { DialogType } from '../../../store/ui/dialog/types'
import { getOrderedEntries } from '../data'
import { Translate } from 'react-localize-redux'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge)

interface MenuBasketIconProps {
  count: number
  disabled: boolean
  className: string
  onClick: () => void
}

export const MenuBasketButton: FC<MenuBasketIconProps> = ({
  count,
  disabled,
  className,
  onClick,
}) => (
  <Fab {...{ disabled, className, onClick }} aria-label="cart">
    <StyledBadge badgeContent={count} color="secondary">
      <ShoppingCartIcon />
    </StyledBadge>
  </Fab>
)

interface BasketDialogStateProps {
  open: boolean
  inBasket: [MenuEntry, number][]
}

interface BasketDialogOwnProps {}

interface BasketDialogDispatchProps {
  onClose: any
  onConfirm: any
}

interface BasketDialogProps
  extends BasketDialogStateProps,
    BasketDialogDispatchProps,
    BasketDialogOwnProps {}

export const BasketDialog: FC<BasketDialogProps> = ({
  open,
  onClose,
  onConfirm,
  inBasket,
}: BasketDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <Translate id="currentlyInBasket" />
    </DialogTitle>
    <DialogContent>
      <OrderedList ordered={inBasket} />
    </DialogContent>
    <Button
      {...{ 'data-cy': 'basket-dialog-ok' }}
      color="primary"
      onClick={onConfirm}
    >
      Ok
    </Button>
  </Dialog>
)

const connectComponent = connect<
  BasketDialogStateProps,
  BasketDialogDispatchProps,
  BasketDialogOwnProps,
  RootState
>(
  state => ({
    open: state.ui.dialog === DialogType.BASKET,
    inBasket: getOrderedEntries(state.menu.dishes, state.basket),
  }),
  dispatch => ({
    onClose: () => dispatch(actions.uiDialogHide()),
    onConfirm: () => dispatch(actions.uiDialogHide()),
  }),
)

export default connectComponent(BasketDialog)
