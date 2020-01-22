import React, { useState, useEffect } from 'react'
import { filter } from 'ramda'

import { nestMenu, Order, MenuEntry, Menu, IMenu, IVariant } from 'menuo-shared'

import { useQuery } from '../../utils'
import { Button, Fab } from '@material-ui/core'
import { Header } from '../../components/Header'
import {
  listRestaurantDishes,
  readRestaurantTable,
  createRestaurantOrder,
  summonWaiter,
  payByCard,
  payByCash,
} from './Menu.api'
import { useStyles } from './Menu.styles'
import { MenuSection } from './components/MenuSection'
import { OrderSentDialog } from './components/OrderSentDialog'
import { WaiterSummonDialog } from './components/WaiterSummonDialog'
import { Table } from 'menuo-shared/interfaces/tables'
import { RouteComponentProps } from 'react-router'
import { readSubscription } from '../../notifications'
import { Loading } from '../../components/Loading'
import { Receipt as ReceiptIcon } from '@material-ui/icons'
import { OrderedListDialog } from './components/OrderedListDialog'
import { MenuBasketButton, BasketDialog } from './components/MenuBasket'
import { OrderConfirmationDialog } from './components/OrderConfirmationDialog'

const DEV_REDIRECTS = process.env.REACT_APP_DEV_REDIRECTS

type Basket = { [itemId: string]: number }

const getOrderedEntries = (menu: Menu, basket: Basket) =>
  Object.entries(basket).map(([itemId, count]) => {
    const entry = menu.find(e => e._id === itemId)!

    return [entry, count] as [MenuEntry, number]
  })

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
  const entries = getOrderedEntries(menu, basket)

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
  const [tableName, setTableName] = useState('')

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
  const [ordered, setOrdered] = useState<[MenuEntry, number][]>([])

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
      setMenu(nestMenu(dishes))
      setLoading(false)
    })()
  }, [restaurant, tableName, refetch])

  useEffect(() => {
    setTableName(query.get('table') || '')
    if (!DEV_REDIRECTS) {
      window.history.pushState('', '', location.pathname)
    }

    try {
      navigator.serviceWorker.addEventListener('message', event => {
        setRefetch(event.data.refetch)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  const [basket, setBasket] = useState<Basket>({})
  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showOrderedInfo, setShowOrderedInfo] = useState(false)
  const [showOrderedList, setShowOrderedList] = useState(false)
  const [showBasket, setShowBasket] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const classes = useStyles() as any

  if (!tableName) {
    return (
      <div>
        Zeskanuj kod QR w aparacie bądź innej aplikacji aby zobaczyć menu
      </div>
    )
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
    setShowOrderedInfo(true)
    setOrdered(o => [...o, ...getOrderedEntries(dishes, basket)])
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
  const handlePayCardClick = (table: Table) => async () => {
    await payByCard(restaurant, table)
    setShowSummonDialog(false)
  }
  const handlePayCashClick = (table: Table) => async () => {
    await payByCash(restaurant, table)
    setShowSummonDialog(false)
  }

  const handleToggle = () => (entryId: string, count: number) => () => {
    setBasket(basket =>
      filter(v => v > 0, {
        ...basket,
        [entryId]: count ? 0 : 1,
      }),
    )
  }

  const handleMinus = () => (entryId: string) => () => {
    const id = entryId
    return setBasket((basket: { [x: string]: number }) =>
      filter(v => v > 0, {
        ...basket,
        [id]: basket[id] - 1,
      }),
    )
  }

  const handlePlus = () => (entryId: string) => () => {
    const id = entryId
    return setBasket(basket => ({ ...basket, [id]: basket[id] + 1 }))
  }

  const handleDishClick = () => (variants: IVariant[]) => () => {
    const id = variants[0]._id

    if (variants.some(v => basket[v._id] > 0)) {
      const newBasketPart = Object.fromEntries(
        variants.map(v => [v._id, 0] as [string, number]),
      )
      setBasket(basket =>
        filter((v: number) => v > 0)({
          ...basket,
          ...newBasketPart,
        }),
      )
    } else {
      const count = basket[id]
      setBasket(basket =>
        filter((v: number) => v > 0)({ ...basket, [id]: count ? 0 : 1 }),
      )
    }
  }

  const handleOrderedClick = () => setShowOrderedList(true)
  const handleBasketClick = () => setShowBasket(true)

  // Variables
  const add = (a: number, b: number) => a + b
  const basketItemCount = Object.values(basket)
    .filter(v => !!v)
    .reduce(add, 0)
  const isBasketEmpty = !basketItemCount

  return (
    <div className={classes.root}>
      <Loading loading={loading} />
      <Header>menuo</Header>
      <MenuBasketButton
        className={classes.basketButton}
        count={basketItemCount}
        disabled={!basketItemCount}
        onClick={handleBasketClick}
      />
      <Fab
        disabled={ordered.length === 0}
        onClick={handleOrderedClick}
        color="primary"
        aria-label="logout"
        className={classes.orderedListFab}
      >
        <ReceiptIcon />
      </Fab>

      <div className={classes.menuContent}>
        {menu.map((section, i) => (
          <MenuSection
            {...{
              id: 'section-' + i,
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
          disabled={loading}
          className={classes.buttonLeft}
          variant="outlined"
          color="primary"
          onClick={handleSummonDialogClick}
        >
          Zawołaj kelnera
        </Button>
        <Button
          disabled={isBasketEmpty || loading}
          className={classes.buttonRight}
          variant="contained"
          color="primary"
          onClick={() => setShowConfirmationDialog(true)}
        >
          Zamów
        </Button>
      </div>
      <WaiterSummonDialog
        disabled={loading}
        open={showSummonDialog}
        handleClose={() => setShowSummonDialog(false)}
        handlePayCardClick={handlePayCardClick(table)}
        handlePayCashClick={handlePayCashClick(table)}
        handleSummonClick={handleSummonClick(table)}
      />
      <OrderConfirmationDialog
        disabled={loading}
        open={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        onConfirm={async () => {
          await handleOrderClick({ basket, table, menu: dishes, user: '' })()
          setShowConfirmationDialog(false)
        }}
        onReject={() => setShowConfirmationDialog(false)}
        inBasket={getOrderedEntries(dishes, basket)}
      />
      <OrderSentDialog
        handleClose={() => setShowOrderedInfo(false)}
        handleConfirm={() => {
          setBasket({})
          setShowOrderedInfo(false)
        }}
        showOrderedDialog={showOrderedInfo}
        ordered={getOrderedEntries(dishes, basket)}
      />
      <OrderedListDialog
        open={showOrderedList}
        onClose={() => setShowOrderedList(false)}
        onConfirm={() => setShowOrderedList(false)}
        ordered={ordered}
      />
      <BasketDialog
        open={showBasket}
        onClose={() => setShowBasket(false)}
        onConfirm={() => setShowBasket(false)}
        inBasket={getOrderedEntries(dishes, basket)}
      />
    </div>
  )
}
