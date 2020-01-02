import React, { useState, useEffect } from 'react'

import { IRestaurant, ISection, nestMenu, IOrder } from 'menuo-shared'

import { useQuery } from '../../utils'
import { Button } from '@material-ui/core'
import { Header } from '../../components/Header'
import { getRestaurant } from './Menu.api'
import { useStyles } from './Menu.styles'
import { MenuSection } from './components/MenuSection'
import { OrderSentDialog } from './components/OrderSentDialog'
import { WaiterSummonDialog } from './components/WaiterSummonDialog'
import { createOrder } from '../Orders/Orders.api'

type Basket = { [itemPlusOption: string]: number }
const makeInBasketId = (sectionId: number) => (dishId: number) => (
  variantId: number,
) => sectionId + ' ' + dishId + ' ' + variantId

const decodeInBasketId = (id: string) => {
  const [sectionId, dishId, variantId] = id.split(' ')
  return { sectionId, dishId, variantId }
}

const apiCreateOrder = ({
  userId,
  tableId,
  restaurantId,
  basket,
  menu,
}: {
  userId: number
  tableId: number
  restaurantId: string
  basket: Basket
  menu: ISection[]
}) => {
  const items = Object.entries(basket).map(
    ([itemId, count]) => {
      const { sectionId, dishId, variantId } = decodeInBasketId(itemId)
      const dishes = menu.flatMap(s => s.dishes)
      const dish = dishes[+dishId]
      const variant = dish.variants[+variantId]

      return { count, dish, variant, isDone: false, itemId: +itemId }
    },
  )
  const order: IOrder = { id: 0, status: 'new', tableId, userId, items }
  return createOrder(restaurantId, order)
}

export const MenuPage = ({ location, match }: any) => {
  const { restaurantId } = match.params
  const { search } = location
  const query = useQuery(search)
  const tableId = +(query.get('table') || '0')

  const [refetch, setRefetch] = useState(0)
  const [restaurant, setRestaurant] = useState<IRestaurant>({
    menu: [],
    restaurant: restaurantId,
  })

  useEffect(() => {
    ;(async () => {
      const restaurant = await getRestaurant(restaurantId)
      setRestaurant({ restaurant: restaurantId, menu: nestMenu(restaurant) })
    })()
  }, [restaurantId, refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      setRefetch(event.data.refetch)
    })
  }, [])

  const [basket, setBasket] = useState<Basket>({})
  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showOrderedDialog, setShowOrderedDialog] = useState(false)
  const classes = useStyles() as any

  // Handlers
  const handleOrderClick = ({
    basket,
    userId = 0,
    tableId,
    menu,
  }: any) => async () => {
    await apiCreateOrder({ userId, tableId, basket, menu, restaurantId })
    setShowOrderedDialog(true)
    setBasket({})
  }

  const handleSummonDialogClick = () => {
    setShowSummonDialog(true)
  }

  const handleSummonClick = ({ tableId }: any) => async () => {
    // await apiSummonWaiter({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCardClick = ({ tableId }: any) => async () => {
    // await apiPayByCard({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCashClick = ({ tableId }: any) => async () => {
    // await apiPayByCash({ tableId })
    setShowSummonDialog(false)
  }

  const handleToggle = (sectionId: number) => (
    dishId: number,
    variantId: number,
    count: number,
  ) => () => {
    setBasket(basket => ({
      ...basket,
      [makeInBasketId(sectionId)(dishId)(variantId)]: count ? 0 : 1,
    }))
  }

  const handleMinus = (sectionId: number) => (
    dishId: number,
    variantId: number,
    count: number,
  ) => () => {
    const id = makeInBasketId(sectionId)(dishId)(variantId)
    return setBasket((basket: { [x: string]: number }) => ({
      ...basket,
      [id]: basket[id] - 1,
    }))
  }

  const handlePlus = (sectionId: number) => (
    dishId: number,
    variantId: number,
    count: number,
  ) => () => {
    const id = makeInBasketId(sectionId)(dishId)(variantId)
    return setBasket(basket => ({ ...basket, [id]: basket[id] + 1 }))
  }

  const handleDishClick = (sectionId: number) => (dishId: number) => () => {
    const id = makeInBasketId(sectionId)(dishId)(0)
    const variantIds = Object.keys(basket)
      .map(id => {
        const [sId, dId, vId] = id.split(' ')
        return [+sId, +dId, +vId]
      })
      .filter(([sId, dId]) => sId === sectionId && dId === dishId)
      .map(([sId, dId, vId]) => makeInBasketId(sId)(dId)(vId))

    if (variantIds.some(id => basket[id] > 0)) {
      variantIds.forEach(id => setBasket(basket => ({ ...basket, [id]: 0 })))
    } else {
      const count = basket[id]
      setBasket(basket => ({ ...basket, [id]: count ? 0 : 1 }))
    }
  }

  // Tools
  const isBasketFilled = (
    basket: { [s: string]: unknown } | ArrayLike<unknown>,
  ) => !!Object.values(basket as any).reduce((a: any, b: any) => a + b, 0)

  // Variables
  const isBasketEmpty = !isBasketFilled(basket)

  return (
    <div className={classes.root}>
      <Header>Menu</Header>

      <div className={classes.menuContent}>
        {restaurant.menu.map((section, sectionId) => (
          <MenuSection
            {...{
              section,
              key: sectionId,
              handleDishClick: handleDishClick(sectionId),
              basket,
              handleToggle: handleToggle(sectionId),
              handleMinus: handleMinus(sectionId),
              handlePlus: handlePlus(sectionId),
              makeInBasketId: makeInBasketId(sectionId),
            }}
          />
        ))}
      </div>

      <div className={classes.buttons}>
        <Button
          className={classes.buttonLeft}
          variant="outlined"
          color="primary"
          onClick={handleSummonDialogClick}
        >
          Zawołaj kelnera
        </Button>
        <Button
          disabled={isBasketEmpty}
          className={classes.buttonRight}
          variant="contained"
          color="primary"
          onClick={handleOrderClick({ basket, tableId, menu: restaurant.menu })}
        >
          Zamów
        </Button>
      </div>

      <WaiterSummonDialog
        open={showSummonDialog}
        handleClose={() => setShowSummonDialog(false)}
        handlePayCardClick={handlePayCardClick}
        handlePayCashClick={handlePayCashClick}
        handleSummonClick={handleSummonClick}
        tableId={tableId}
      />

      <OrderSentDialog
        handleClose={() => setShowOrderedDialog(false)}
        handleConfirm={() => setShowOrderedDialog(false)}
        showOrderedDialog={showOrderedDialog}
      />
    </div>
  )
}
