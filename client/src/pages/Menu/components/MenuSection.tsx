import React from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core'

import { ISection, IDish } from 'menuo-shared'

import { H2 } from '../../../components/H2'
import { PlusMinus } from '../../../components/PlusMinus'

export interface MenuSectionProps {
  section: ISection
  handleDishClick: (entryId: string) => () => void
  handleToggle: (entryId: string, count: number) => () => void
  basket: any
  handleMinus: (entryId: string) => () => void
  handlePlus: (entryId: string) => () => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const MenuSection = ({
  section,
  handleDishClick,
  basket,
  handleToggle,
  handleMinus,
  handlePlus,
}: MenuSectionProps) => {
  return (
    <div>
      <H2>{section.name}</H2>
      {capitalize(section.description ?? '')}
      <Divider />

      <List>
        {section.dishes.map((dish: IDish, i) => (
          <div key={i}>
            <ListItem
              button
              onClick={handleDishClick(dish.variants[0].entry._id)}
            >
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
                    key={variantId}
                    button={!count as true}
                    onClick={
                      !count
                        ? handleToggle(id, count)
                        : undefined
                    }
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        onChange={handleToggle(id, count)}
                        checked={count > 0}
                      />
                    </ListItemIcon>
                    <ListItemText primary={variantText} />
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
          </div>
        ))}
      </List>
    </div>
  )
}
