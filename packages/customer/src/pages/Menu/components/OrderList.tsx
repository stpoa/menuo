import React, { FC } from 'react'
import { MenuEntry } from '@menuo/shared'
import { truncate } from '../../../utils/text'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core'

interface OrderedListProps extends WithStyles {
  ordered: [MenuEntry, number][]
}

export const OrderedList: FC<OrderedListProps> = ({ ordered, classes }) => (
  <div>
    <List>
      {ordered.map(([entry, count]) => (
        <ListItem dense disableGutters key={entry.dishName}>
          <ListItemIcon className={classes.itemIcon}>
            <span>{count} x</span>
          </ListItemIcon>

          <ListItemText className={classes.itemText}>
            {truncate(80)(entry.dishName)}
            {entry.dishVariantName
              ? ' - ' + truncate(80)(entry.dishVariantName)
              : ''}
          </ListItemText>

          <ListItemIcon className={classes.itemIcon}>
            <span>{count * entry.dishVariantPrice} zł</span>
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  </div>
)

const styleComponent = withStyles(() =>
  createStyles({
    itemIcon: {
      minWidth: '30px',
    },
    itemText: {
      margin: '0 4px',
    },
  }),
)

export default styleComponent(OrderedList)
