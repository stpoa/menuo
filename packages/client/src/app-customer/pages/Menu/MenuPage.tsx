import React, { useState, useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { nestMenu, Order, MenuEntry, Menu } from '@menuo/shared'

import { useQuery } from '../../../utils'
import {
  Button,
  Fab,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core'
import { Header } from '../../../components/Header'
import {
  createRestaurantOrder,
  summonWaiter,
  payByCard,
  payByCash,
} from '../../store/menu/api'
import MenuSection from './components/MenuSection'
import { OrderSentDialog } from './components/OrderSentDialog'
import WaiterSummonDialog from './components/WaiterSummonDialog'
import { Table } from '@menuo/shared/interfaces/tables'
import { RouteComponentProps } from 'react-router'
import { readSubscription } from '../../../notifications'
import Loading from '../../../components/Loading'
import { Receipt as ReceiptIcon } from '@material-ui/icons'
import { OrderedListDialog } from './components/OrderedListDialog'
import { MenuBasketButton, BasketDialog } from './components/MenuBasket'
import { OrderConfirmationDialog } from './components/OrderConfirmationDialog'
import * as actions from '../../store/actions'
import { RootState } from '../../store/store'

type Basket = BasketEntry[]

export interface BasketEntry {
  dish: string
  variant: string
}

interface MenuPageStateProps {
  dishes: any
  table: Table
  isLoading: boolean
  basket: BasketEntry[]
}
interface MenuPageDispatchProps {
  getDishes: any
  setTable: any
}
interface MenuPageOwnProps {}
interface MenuPageProps
  extends MenuPageStateProps,
    MenuPageDispatchProps,
    MenuPageOwnProps,
    RouteComponentProps,
    WithStyles {}

export const MenuPage: FC<MenuPageProps> = ({
  location,
  match,
  classes,
  dishes,
  getDishes,
  table,
  setTable,
  isLoading,
  basket,
}) => {
  const { restaurant } = match.params as { restaurant: string }
  const { search } = location
  const query = useQuery(search)
  const [refetch, setRefetch] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ordered, setOrdered] = useState<[MenuEntry, number][]>([])

  const menu = nestMenu([...dishes])

  useEffect(() => {
    try {
      navigator.serviceWorker.addEventListener('message', event => {
        setRefetch(event.data.refetch)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    setTable({
      name: query.get('table') || '',
      restaurant,
      _id: '',
      status: 'new',
    })
  }, [])

  useEffect(() => {
    getDishes(restaurant)
  }, [restaurant, refetch])

  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showOrderedInfo, setShowOrderedInfo] = useState(false)
  const [showOrderedList, setShowOrderedList] = useState(false)
  const [showBasket, setShowBasket] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

  if (!table.name) {
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
    await payByCard(restaurant, { ...table, status: 'pay-card' })
    setShowSummonDialog(false)
  }
  const handlePayCashClick = (table: Table) => async () => {
    await payByCash(restaurant, { ...table, status: 'pay-cash' })
    setShowSummonDialog(false)
  }

  const handleOrderedClick = () => setShowOrderedList(true)
  const handleBasketClick = () => setShowBasket(true)

  // Variables
  const basketItemCount = basket.length
  const isBasketEmpty = !basketItemCount

  return (
    <div className={classes.root}>
      <Loading loading={loading || isLoading} />
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
          <MenuSection id={'section-' + i} section={section} key={i} />
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

const getOrderedEntries = (menu: Menu, basket: Basket) =>
  basket.map(basketEntry => {
    const entries = menu.filter(
      e =>
        e.dishName === basketEntry.dish &&
        (!e.dishVariantName === !basketEntry.variant ||
          e.dishVariantName === basketEntry.variant),
    )
    return [entries[0], entries.length] as [MenuEntry, number]
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

const styleComponent = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#f5f5f5',
      flexDirection: 'column',
      padding: '0.75rem 1rem',
      minHeight: '100vh',
    },
    menuContent: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    buttons: {
      display: 'flex',
      position: 'fixed',
      bottom: '0.5rem',
      left: '50%',
      width: '96%',
      marginLeft: '-48%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonLeft: {
      width: '50%',
      marginRight: '0.5rem',
      fontSize: '0.8rem',
      background: 'white',
    },
    buttonRight: {
      width: '50%',
      marginLeft: '0.5rem',
      fontSize: '0.8rem',
    },
    orderedListFab: {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      width: '40px',
      height: '40px',
      zIndex: 100,
    },
    basketButton: {
      position: 'fixed',
      top: '1rem',
      right: '4rem',
      width: '40px',
      height: '40px',
      zIndex: 100,
    },
  }),
)

const connectComponent = connect<
  MenuPageStateProps,
  MenuPageDispatchProps,
  MenuPageOwnProps,
  RootState
>(
  state => ({
    dishes: state.menu.dishes,
    table: state.table,
    isLoading: state.menu.isFetching,
    basket: state.basket,
  }),
  dispatch => ({
    getDishes: (restaurant: string) =>
      dispatch(actions.menuGetRequest(restaurant)),
    setTable: (table: Table) => dispatch(actions.tableSet(table)),
  }),
)

export default connectComponent(styleComponent(MenuPage))
