import React, { FC } from 'react'
import { withStyles, createStyles, Badge, Theme, Fab } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { MenuEntry } from 'menuo-shared'
import { truncate } from '../../../utils/text'

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

interface BasketDialogProps {
  open: boolean
  onClose: any
  onConfirm: any
  inBasket: [MenuEntry, number][]
}

export const BasketDialog: FC<BasketDialogProps> = ({
  open,
  onClose,
  onConfirm,
  inBasket,
}: BasketDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Aktualnie w koszyku</DialogTitle>
    <DialogContent>
      {inBasket.map(([entry, count]) => (
        <li key={entry._id}>
          {count}x {truncate(80)(entry.dishName)} -{' '}
          {truncate(80)(entry.dishVariantName || '')} ({entry.dishVariantPrice}
          zł)
        </li>
      ))}
    </DialogContent>
    <Button color="primary" onClick={onConfirm}>
      Ok
    </Button>
  </Dialog>
)
