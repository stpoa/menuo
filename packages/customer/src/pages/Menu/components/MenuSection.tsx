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

import { ISection, IDish, H2, PlusMinus } from '@menuo/shared'
import { BasketEntry } from '../MenuPage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../../store/store'
import * as actions from '../../../store/actions'

export interface MenuSectionOwnProps {
  id: string
  section: ISection
}

export interface MenuSectionStateProps {
  basket: BasketEntry[]
  isMenuReadOnly: boolean
}

export interface MenuSectionDispatchProps {
  toggleBasketDish: (entry: BasketEntry) => void
  toggleBasketVariant: (entry: BasketEntry) => void
  subFromBasket: (entry: BasketEntry) => void
  addToBasket: (entry: BasketEntry) => void
}

export interface MenuSectionProps
  extends MenuSectionOwnProps,
    MenuSectionStateProps,
    MenuSectionDispatchProps,
    WithStyles {}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const MenuSection: FC<MenuSectionProps> = ({
  id,
  section,
  basket,
  isMenuReadOnly,
  toggleBasketDish,
  toggleBasketVariant,
  subFromBasket,
  addToBasket,
  classes,
}) => {
  return (
    <div id={id} className={classes.root}>
      <div className={classes.head}>
        <H2>{section.name}</H2>
        <Typography>{capitalize(section.description ?? '')}</Typography>
      </div>
      <List>
        {section.dishes.map((dish: IDish, i) => {
          const firstEntryInSection = {
            dish: dish.name,
            variant: dish.variants[0].name || '',
          }

          return (
            <Card className={classes.dish} key={i}>
              <ListItem
                button
                disabled={isMenuReadOnly}
                onClick={() => toggleBasketDish(firstEntryInSection)}
              >
                <ListItemText
                  primary={dish.name}
                  secondary={dish.description}
                />
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
                    ' PLN'
                  const basketEntry = {
                    dish: dish.name,
                    variant: variant.name || '',
                  }
                  return (
                    <ListItem
                      className={classes.dishVariant}
                      key={variantId}
                      button={!count as true}
                      disabled={isMenuReadOnly}
                      onClick={
                        !count
                          ? () => toggleBasketVariant(basketEntry)
                          : undefined
                      }
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          onChange={
                            count
                              ? () => toggleBasketVariant(basketEntry)
                              : undefined
                          }
                          checked={count > 0}
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <span className={classes.variantText}>
                          {variantText}
                        </span>
                      </ListItemText>
                      {count > 0 && (
                        <PlusMinus
                          count={count}
                          handleMinusClick={() => subFromBasket(basketEntry)}
                          handlePlusClick={() => addToBasket(basketEntry)}
                        />
                      )}
                    </ListItem>
                  )
                })}
              </List>
            </Card>
          )
        })}
      </List>
    </div>
  )
}

const styleComponent = withStyles(() =>
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
)

const connectComponent = connect<
  MenuSectionStateProps,
  MenuSectionDispatchProps,
  MenuSectionOwnProps,
  RootState
>(
  (state) => ({
    basket: state.basket,
    isMenuReadOnly: state.config.config.MENU_READ_ONLY,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        toggleBasketDish: actions.basketToggleDish,
        toggleBasketVariant: actions.basketToggleVariant,
        subFromBasket: actions.basketRemove,
        addToBasket: actions.basketAdd,
      },
      dispatch,
    ),
)

export default connectComponent(styleComponent(MenuSection))
