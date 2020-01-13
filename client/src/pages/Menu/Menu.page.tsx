import React, { useState, useEffect } from 'react'

import { nestMenu, Order, MenuEntry, Menu, IMenu } from 'menuo-shared'

import { useQuery, wait } from '../../utils'
import { Button } from '@material-ui/core'
import { Header } from '../../components/Header'
import {
  listRestaurantDishes,
  readRestaurantTable,
  createRestaurantOrder,
  summonWaiter,
} from './Menu.api'
import { useStyles } from './Menu.styles'
import { MenuSection } from './components/MenuSection'
import { OrderSentDialog } from './components/OrderSentDialog'
import { WaiterSummonDialog } from './components/WaiterSummonDialog'
import { Table } from 'menuo-shared/interfaces/tables'
import { RouteComponentProps } from 'react-router'
import { readSubscription } from '../../notifications'
import { Loading } from '../../components/Loading'

type Basket = { [itemId: string]: number }

const apiCreateOrder = ({
  customer,
  waiter,
  table,
  restaurant,
  basket,
  menu,
}: {
  customer: string
  waiter: string
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
    {
      status: 'new',
      table,
      customer,
      entries,
      waiter,
      customerSub: readSubscription(),
    },
  )
}

export const MenuPage = ({ location, match }: RouteComponentProps) => {
  const { restaurant } = match.params as { restaurant: string }
  const { search } = location
  const query = useQuery(search)
  const tableName = query.get('table')

  const [refetch, setRefetch] = useState(0)
  const [loading, setLoading] = useState(true)
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
      setLoading(true)
      const [dishes, table] = await Promise.all([
        listRestaurantDishes({ restaurant }),
        readRestaurantTable({
          restaurant,
          table: tableName ?? '',
        }),
      ])
      setTable(table)
      setDishes(dishes)
      setLoading(false)
    })()
  }, [restaurant, tableName, refetch])

  useEffect(() => {
    const doOptimizeMenuRenderingEffect = async () => {
      for (let i = 0; i < dishes.length; i += 30) {
        setMenu(nestMenu(dishes.slice(0, i + 1)))
        await wait(0)
      }
    }
    doOptimizeMenuRenderingEffect()
  }, [dishes])

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
    user: customer,
    table,
    menu,
  }: {
    basket: Basket
    user: string
    table: Table
    menu: Menu
  }) => async () => {
    setLoading(true)
    await apiCreateOrder({
      customer,
      waiter: '',
      table,
      basket,
      menu,
      restaurant: restaurant,
    })
    setShowOrderedDialog(true)
    setBasket({})
    setLoading(false)
  }

  const handleSummonDialogClick = () => {
    setShowSummonDialog(true)
  }

  const handleSummonClick = (table: Table) => async () => {
    setLoading(true)
    await summonWaiter(restaurant, table)
    setShowSummonDialog(false)
    setLoading(false)
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
      <Loading loading={loading} />
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
