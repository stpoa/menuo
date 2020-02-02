import React from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Card,
  Typography,
} from '@material-ui/core'

import { ISection, IDish, IVariant } from '@menuo/shared'

import { H2 } from '../../../components/H2'
import { PlusMinus } from '../../../components/PlusMinus'
import { useStyles } from './MenuSection.styles'

export interface MenuSectionProps {
  id: string
  section: ISection
  handleDishClick: (varaints: IVariant[]) => () => void
  handleToggle: (entryId: string, count: number) => () => void
  basket: any
  handleMinus: (entryId: string) => () => void
  handlePlus: (entryId: string) => () => void
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const MenuSection = ({
  id,
  section,
  handleDishClick,
  basket,
  handleToggle,
  handleMinus,
  handlePlus,
}: MenuSectionProps) => {
  const classes = useStyles()

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
