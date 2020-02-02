import React, { FC } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Card,
  Typography,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core'

import { ISection, IDish, IVariant } from '@menuo/shared'
import { H2 } from '../../../../components/H2'
import PlusMinus from '../../../../components/PlusMinus'

export interface MenuSectionProps extends WithStyles {
  id: string
  section: ISection
  handleDishClick: (varaints: IVariant[]) => () => void
  handleToggle: (entryId: string, count: number) => () => void
  basket: any
  handleMinus: (entryId: string) => () => void
  handlePlus: (entryId: string) => () => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const MenuSection: FC<MenuSectionProps> = ({
  id,
  section,
  handleDishClick,
  basket,
  handleToggle,
  handleMinus,
  handlePlus,
  classes,
}) => {
  return (
    <div id={id} className={classes.root}>
      <div className={classes.head}>
        <H2>{section.name}</H2>
        <Typography>{capitalize(section.description ?? '')}</Typography>
      </div>
      <List>
        {section.dishes.map((dish: IDish, i) => (
          <Card className={classes.dish} key={i}>
            <ListItem button onClick={handleDishClick(dish.variants)}>
              <ListItemText primary={dish.name} secondary={dish.description} />
            </ListItem>
            <List component="div" disablePadding>
              {dish.variants.map((variant, variantId) => {
                const id = variant.entry._id
                const count = basket[id]
                const variantText =
                  (variant.name ? variant.name + ' - ' : '') +
                  variant.price +
                  'zł'
                return (
                  <ListItem
                    className={classes.dishVariant}
                    key={variantId}
                    button={!count as true}
                    onClick={!count ? handleToggle(id, count) : undefined}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        onChange={handleToggle(id, count)}
                        checked={count > 0}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <span className={classes.variantText}>{variantText}</span>
                    </ListItemText>
                    {count > 0 && (
                      <PlusMinus
                        count={count}
                        handleMinusClick={handleMinus(id)}
                        handlePlusClick={handlePlus(id)}
                      />
                    )}
                  </ListItem>
                )
              })}
            </List>
          </Card>
        ))}
      </List>
    </div>
  )
}

export default withStyles(_ =>
  createStyles({
    root: {},
    head: {
      color: '#777',
      padding: '0 1rem',
      marginTop: '3rem',
    },
    dish: {
      color: '#444444',
      margin: '1rem 0',
    },
    dishVariant: {
      padding: '0 1rem',
      fontSize: '0.8rem',
      borderTop: '1px solid #ccc',
    },
    variantText: {
      fontSize: '0.8rem',
    },
  }),
)(MenuSection)
