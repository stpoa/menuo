import React from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core'
import { H2 } from '../../../components/H2'
import { PlusMinus } from '../../../components/PlusMinus'

import { ISection, IDish } from '../RestaurantPage.api'

export interface MenuSectionProps {
  section: ISection
  handleDishClick: any
  handleToggle: any
  basket: any
  handleMinus: any
  handlePlus: any
  makeInBasketId: any
}

export const MenuSection = ({
  section,
  handleDishClick,
  basket,
  handleToggle,
  handleMinus,
  handlePlus,
  makeInBasketId,
}: MenuSectionProps) => {
  return (
    <div>
      <H2>{section.name}</H2>
      <Divider />

      <List>
        {section.dishes.map((dish: IDish, dishId) => (
          <div key={dishId}>
            <ListItem button onClick={handleDishClick(dishId)}>
              <ListItemText primary={dish.name} secondary={dish.description} />
            </ListItem>
            <List component="div" disablePadding>
              {dish.variants.map((variant, variantId) => {
                const count = basket[makeInBasketId(dishId)(variantId)]
                const variantText =
                  (variant.name ? variant.name + ' - ' : '') +
                  variant.price +
                  'zł'
                return (
                  <ListItem
                    key={variantId}
                    button={!count as true}
                    onClick={
                      !count
                        ? handleToggle(dishId, variantId, count)
                        : undefined
                    }
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        onChange={handleToggle(dishId, variantId, count)}
                        checked={count > 0}
                      />
                    </ListItemIcon>
                    <ListItemText primary={variantText} />
                    {count > 0 && (
                      <PlusMinus
                        count={count}
                        handleMinusClick={handleMinus(dishId, variantId, count)}
                        handlePlusClick={handlePlus(dishId, variantId, count)}
                      />
                    )}
                  </ListItem>
                )
              })}
            </List>
          </div>
        ))}
      </List>
    </div>
  )
}
