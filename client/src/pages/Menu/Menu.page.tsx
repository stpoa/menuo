import React, { useState, useEffect } from 'react'

import { nestMenu, Order, MenuEntry, Menu, IMenu } from 'menuo-shared'

import { useQuery } from '../../utils'
import { Button } from '@material-ui/core'
import { Header } from '../../components/Header'
import {
  listRestaurantDishes,
  readRestaurantTable,
  createRestaurantOrder,
  summonWaiter
} from './Menu.api'
import { useStyles } from './Menu.styles'
import { MenuSection } from './components/MenuSection'
import { OrderSentDialog } from './components/OrderSentDialog'
import { WaiterSummonDialog } from './components/WaiterSummonDialog'
import { Table } from 'menuo-shared/interfaces/tables'

type Basket = { [itemId: string]: number }

const apiCreateOrder = ({
  user,
  table,
  restaurant,
  basket,
  menu,
}: {
  user: string
  table: Order['table']
  restaurant: string
  basket: Basket
  menu: Menu
}) => {
  const entries: [MenuEntry, number][] = Object.entries(basket).map(
    ([itemId, count]) => {
      const entry = menu.find(e => e._id === itemId)!

      return [entry, count]
    },
  )

  return createRestaurantOrder(
    { restaurant },
    { status: 'new', table, user, entries },
  )
}

export const MenuPage = ({ location, match }: any) => {
  const { restaurant } = match.params as { restaurant: string }
  const { search } = location
  const query = useQuery(search)
  const tableName = query.get('table')

  const [refetch, setRefetch] = useState(0)
  const [menu, setMenu] = useState<IMenu>([])
  const [dishes, setDishes] = useState<Menu>([])
  const [table, setTable] = useState<Table>({
    name: '',
    status: '',
    _id: '',
    restaurant: '',
  })

  useEffect(() => {
    ;(async () => {
      const dishes = await listRestaurantDishes({ restaurant })
      setDishes(dishes)
      setMenu(nestMenu(dishes))
    })()
  }, [restaurant, refetch])

  useEffect(() => {
    ;(async () => {
      const table = await readRestaurantTable({
        restaurant,
        table: tableName ?? '',
      })
      setTable(table)
    })()
  }, [restaurant, refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      setRefetch(event.data.refetch)
    })
  }, [])

  const [basket, setBasket] = useState<Basket>({})
  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showOrderedDialog, setShowOrderedDialog] = useState(false)
  const classes = useStyles() as any

  if (!tableName) {
    return <div>Error, no table param</div>
  }

  // Handlers
  const handleOrderClick = ({
    basket,
    user,
    table,
    menu,
  }: {
    basket: Basket
    user: string
    table: Table
    menu: Menu
  }) => async () => {
    await apiCreateOrder({ user, table, basket, menu, restaurant: restaurant })
    setShowOrderedDialog(true)
    setBasket({})
  }

  const handleSummonDialogClick = () => {
    setShowSummonDialog(true)
  }

  const handleSummonClick = (table: Table) => async () => {
    await summonWaiter(restaurant, table)
    setShowSummonDialog(false)
  }
  const handlePayCardClick = (tableId: string) => async () => {
    // await apiPayByCard({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCashClick = (tableId: string) => async () => {
    // await apiPayByCash({ tableId })
    setShowSummonDialog(false)
  }

  const handleToggle = () => (entryId: string, count: number) => () => {
    setBasket(basket => ({
      ...basket,
      [entryId]: count ? 0 : 1,
    }))
  }

  const handleMinus = () => (entryId: string) => () => {
    const id = entryId
    return setBasket((basket: { [x: string]: number }) => ({
      ...basket,
      [id]: basket[id] - 1,
    }))
  }

  const handlePlus = () => (entryId: string) => () => {
    const id = entryId
    return setBasket(basket => ({ ...basket, [id]: basket[id] + 1 }))
  }

  const handleDishClick = () => (entryId: string) => () => {
    const id = entryId
    const variantIds = Object.keys(basket)
    // FIXME: Something is missing here, filter

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
        {menu.map((section, i) => (
          <MenuSection
            {...{
              section,
              key: i,
              handleDishClick: handleDishClick(),
              basket,
              handleToggle: handleToggle(),
              handleMinus: handleMinus(),
              handlePlus: handlePlus(),
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
          onClick={handleOrderClick({ basket, table, menu: dishes, user: '' })}
        >
          Zamów
        </Button>
      </div>

      <WaiterSummonDialog
        open={showSummonDialog}
        handleClose={() => setShowSummonDialog(false)}
        handlePayCardClick={handlePayCardClick}
        handlePayCashClick={handlePayCashClick}
        handleSummonClick={handleSummonClick(table)}
        table={table}
      />

      <OrderSentDialog
        handleClose={() => setShowOrderedDialog(false)}
        handleConfirm={() => setShowOrderedDialog(false)}
        showOrderedDialog={showOrderedDialog}
      />
    </div>
  )
}
