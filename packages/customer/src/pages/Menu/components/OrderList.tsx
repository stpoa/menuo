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
  Divider,
} from '@material-ui/core'
import { pipe, map, sum } from 'ramda'

type OrderEntry = [MenuEntry, number]
interface OrderedListProps extends WithStyles {
  ordered: OrderEntry[]
}

const calculateEntryPrice = ([entry, count]: OrderEntry) =>
  count * entry.dishVariantPrice

const calculateOrderedPrice = pipe(map(calculateEntryPrice), sum)

export const OrderedList: FC<OrderedListProps> = ({ ordered, classes }) => (
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
          <span>{calculateEntryPrice([entry, count])} zł</span>
        </ListItemIcon>
      </ListItem>
    ))}

    {ordered[0] && (
      <>
        <Divider />
        <ListItem dense disableGutters key="sum">
          <ListItemIcon className={classes.itemIcon}>
            <span>Σ</span>
          </ListItemIcon>

          <ListItemText className={classes.itemText}></ListItemText>

          <ListItemIcon className={classes.itemIcon}>
            <span>{calculateOrderedPrice(ordered)} zł</span>
          </ListItemIcon>
        </ListItem>
      </>
    )}
  </List>
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
