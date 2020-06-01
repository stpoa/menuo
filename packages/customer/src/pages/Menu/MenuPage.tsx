import React, { useState, useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { Translate } from 'react-localize-redux'
import { Button, withStyles, WithStyles, Link } from '@material-ui/core'

import { nestMenu, Order, MenuEntry, Menu, Loading } from '@menuo/shared'
import { Table } from '@menuo/shared/interfaces/tables'

import {
  createRestaurantOrder,
  summonWaiter,
  payByCard,
  payByCash,
} from '../../store/menu/api'
import MenuSection from './components/MenuSection'
import { OrderSentDialog } from './components/OrderSentDialog'
import WaiterSummonDialog from './components/WaiterSummonDialog'
import WaiterSummonConfirmation from './components/WaiterSummonConfirmation'
import { readSubscription } from '../../notifications'
import { OrderedListDialog } from './components/OrderedListDialog'
import BasketDialog from './components/BasketDialog'
import { OrderConfirmationDialog } from './components/OrderConfirmationDialog'
import * as actions from '../../store/actions'
import { RootState } from '../../store/store'
import { styles } from './MenuPage.styles'
import { getOrderedEntries } from './data'
import { Header } from './components/Header'

type Basket = BasketEntry[]

export interface BasketEntry {
  dish: string
  variant: string
}

interface MenuPageStateProps {
  dishes: MenuEntry[]
  table: Table
  restaurant: string
  isLoading: boolean
  basket: BasketEntry[]
  query: string
  language: string
}
interface MenuPageDispatchProps {
  getDishes: () => void
  getTable: () => void
  getRestaurant: () => void
  clearBasket: () => void
  filterDishes: (query: string) => void
}
interface MenuPageOwnProps {}
interface MenuPageProps
  extends MenuPageStateProps,
    MenuPageDispatchProps,
    MenuPageOwnProps,
    WithStyles {}

export const MenuPage: FC<MenuPageProps> = ({
  classes,
  dishes,
  getDishes,
  table,
  getTable,
  restaurant,
  getRestaurant,
  isLoading,
  basket,
  clearBasket,
  query,
}) => {
  const [loading, setLoading] = useState(false)
  const [ordered, setOrdered] = useState<[MenuEntry, number][]>([])

  const menu = nestMenu([
    ...dishes.filter(
      (dish) =>
        dish.section.toLowerCase().includes(query.toLowerCase()) ||
        dish.dishVariantName?.toLowerCase().includes(query.toLowerCase()) ||
        dish.dishName.toLowerCase().includes(query.toLowerCase()),
    ),
  ])

  useEffect(() => {
    getRestaurant()
    getTable()
    getDishes()
  }, [getRestaurant, getTable, getDishes])

  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showSummonConfirmation, setShowSummonConfirmation] = useState(false)
  const [showOrderedInfo, setShowOrderedInfo] = useState(false)
  const [showOrderedList, setShowOrderedList] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [reason, setReason] = useState('')

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
      restaurant,
    })
    setShowOrderedInfo(true)
    setOrdered((o) => [...o, ...getOrderedEntries(dishes, basket)])
    clearBasket()
    setLoading(false)
  }

  const handleSummonDialogClick = () => {
    setShowSummonDialog(true)
  }

  const handleSummonClick = (table: Table, reason: string) => async () => {
    setLoading(true)
    await summonWaiter(restaurant, table)
    setShowSummonDialog(false)
    setLoading(false)
    setShowSummonConfirmation(true)
    setReason('anotherNeed')
  }
  const handlePayCardClick = (table: Table, reason: string) => async () => {
    await payByCard(restaurant, { ...table, status: 'pay-card' })
    setShowSummonDialog(false)
    setShowSummonConfirmation(true)
    setReason('cardPayment')
  }
  const handlePayCashClick = (table: Table, reason: string) => async () => {
    await payByCash(restaurant, { ...table, status: 'pay-cash' })
    setShowSummonDialog(false)
    setShowSummonConfirmation(true)
    setReason('cashPayment')
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading || isLoading} />

      <Header ordered={ordered} setShowOrderedList={setShowOrderedList} />

      <div className={[classes.content, classes.menuContent].join(' ')}>
        {menu.map((section, i) => (
          <MenuSection id={'section-' + i} section={section} key={i} />
        ))}
      </div>

      <WaiterSummonDialog
        disabled={loading}
        open={showSummonDialog}
        handleClose={() => setShowSummonDialog(false)}
        handlePayCardClick={handlePayCardClick(table, 'cardPayment')}
        handlePayCashClick={handlePayCashClick(table, 'cashPayment')}
        handleSummonClick={handleSummonClick(table, 'anotherNeed')}
      />
      <WaiterSummonConfirmation
        disabled={loading}
        open={showSummonConfirmation}
        reason={reason}
        handleClose={() => setShowSummonConfirmation(false)}
        handleOkClick={() => setShowSummonConfirmation(false)}
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
        ordered={[]}
      />
      <OrderedListDialog
        open={showOrderedList}
        onClose={() => setShowOrderedList(false)}
        onConfirm={() => setShowOrderedList(false)}
        ordered={ordered}
      />
      <BasketDialog />
      <footer>
        {restaurant !== 'demo' ? (
          <Translate>
            {({ translate }) => (
              <div style={{ marginLeft: '1rem' }}>
                <Link href={translate('homePageUrlContent') + ''}>
                  <Translate id="aboutUs">About us</Translate>
                </Link>
              </div>
            )}
          </Translate>
        ) : null}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div>
          <div className={classes.buttons}>
            <Button
              {...{ 'data-cy': 'open-summon-waiter-modal' }}
              disabled={loading}
              className={classes.buttonLeft}
              variant="outlined"
              color="primary"
              onClick={handleSummonDialogClick}
            >
              <Translate id="callWaiter">Call a waiter</Translate>
            </Button>
            <Button
              {...{ 'data-cy': 'open-order-modal' }}
              disabled={!basket.length || loading}
              className={classes.buttonRight}
              variant="contained"
              color="primary"
              onClick={() => setShowConfirmationDialog(true)}
            >
              <Translate id="order">Order</Translate>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

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

const styleComponent = withStyles(styles)

const connectComponent = connect<
  MenuPageStateProps,
  MenuPageDispatchProps,
  MenuPageOwnProps,
  RootState
>(
  (state) => ({
    dishes: state.menu.dishes,
    table: state.table,
    isLoading: state.menu.isFetching,
    basket: state.basket,
    restaurant: state.restaurant,
    query: state.menu.query,
    language: state.user.locale.languages.find((l) => l.active)?.code || 'en',
  }),
  (dispatch) => ({
    getDishes: () => dispatch(actions.menuGetRequest()),
    clearBasket: () => dispatch(actions.basketClear()),
    getTable: () => dispatch(actions.tableGet()),
    getRestaurant: () => dispatch(actions.restaurantGet()),
    filterDishes: (query: string) => dispatch(actions.menuFilter(query)),
  }),
)

export default connectComponent(styleComponent(MenuPage))
