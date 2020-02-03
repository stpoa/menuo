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
import { BasketEntry } from '../MenuPage'

export interface MenuSectionProps extends WithStyles {
  id: string
  section: ISection
  handleDishClick: (entry: BasketEntry) => () => void
  handleToggle: (entry: BasketEntry) => () => void
  basket: any
  handleMinus: (entry: BasketEntry) => () => void
  handlePlus: (entry: BasketEntry) => () => void
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
            <ListItem
              button
              onClick={handleDishClick({ dish: dish.name, variant: '' })}
            >
              <ListItemText primary={dish.name} secondary={dish.description} />
            </ListItem>
            <List component="div" disablePadding>
              {dish.variants.map((variant, variantId) => {
                // const id = variant.entry._id
                const count = basket.filter(
                  (entry: any) =>
                    entry.dish === variant.entry.dishName &&
                    (entry.variant === variant.entry.dishVariantName ||
                      (!entry.variant && !variant.entry.dishVariantName)),
                ).length
                const variantText =
                  (variant.name ? variant.name + ' - ' : '') +
                  variant.price +
                  'zł'
                const basketEntry = {
                  dish: dish.name,
                  variant: variant.name || '',
                }
                return (
                  <ListItem
                    className={classes.dishVariant}
                    key={variantId}
                    button={!count as true}
                    onClick={!count ? handleToggle(basketEntry) : undefined}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        onChange={count ? handleToggle(basketEntry) : undefined}
                        checked={count > 0}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <span className={classes.variantText}>{variantText}</span>
                    </ListItemText>
                    {count > 0 && (
                      <PlusMinus
                        count={count}
                        handleMinusClick={handleMinus(basketEntry)}
                        handlePlusClick={handlePlus(basketEntry)}
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
