import React, { useState, useEffect, FC } from 'react'
import { connect } from 'react-redux'
import { nestMenu, Order, MenuEntry, Menu } from '@menuo/shared'
import { Translate } from 'react-localize-redux'
import {
  Button,
  Fab,
  withStyles,
  WithStyles,
  Divider,
  Link,
  InputBase,
} from '@material-ui/core'

import { Header } from '../../components/Header'
import LanguageToggle from './components/LanguageToggle'
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
import { readSubscription } from '../../notifications'
import Loading from '../../components/Loading'
import { Receipt as ReceiptIcon } from '@material-ui/icons'
import { OrderedListDialog } from './components/OrderedListDialog'
import BasketDialog, { MenuBasketButton } from './components/BasketDialog'
import { SearchButton } from './components/SearchButton'
import { OrderConfirmationDialog } from './components/OrderConfirmationDialog'
import * as actions from '../../store/actions'
import { RootState } from '../../store/store'
import { styles } from './MenuPage.styles'
import { DialogType } from '../../store/ui/dialog/types'
import { getOrderedEntries } from './data'

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
  showBasketDialog: () => void
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
  showBasketDialog,
  filterDishes,
  query,
}) => {
  const [loading, setLoading] = useState(false)
  const [ordered, setOrdered] = useState<[MenuEntry, number][]>([])

  const menu = nestMenu([
    ...dishes.filter(
      dish =>
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
  const [showOrderedInfo, setShowOrderedInfo] = useState(false)
  const [showOrderedList, setShowOrderedList] = useState(false)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)

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
    setOrdered(o => [...o, ...getOrderedEntries(dishes, basket)])
    clearBasket()
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

  return (
    <div className={classes.root}>
      <Loading loading={loading || isLoading} />
      <Header>
        Menuo
        <div className={classes.search}>
          <LanguageToggle
            className={classes.languageButton}
            disabled={!!basket.length}
          />
          <SearchButton
            onClick={() => setShowSearchInput(set => !set)}
            className={classes.searchButton}
          />
        </div>
      </Header>

      {showSearchInput && (
        <Translate>
          {({ translate }) => (
            <InputBase
              autoFocus
              className={classes.searchInput}
              onChange={e => filterDishes(e.target.value)}
              value={query}
              placeholder={translate('searchPlaceholderContent') + ''}
              inputProps={{ 'aria-label': 'search' }}
            />
          )}
        </Translate>
      )}

      <MenuBasketButton
        className={classes.basketButton}
        count={basket.length}
        disabled={!basket.length}
        onClick={showBasketDialog}
      />
      <Fab
        disabled={ordered.length === 0}
        onClick={() => setShowOrderedList(true)}
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
      <BasketDialog />
      <footer>
        <Divider />
        {restaurant !== 'demo' ? (
          <Translate>
            {({ translate }) => (
              <Link href={translate('homePageUrlContent') + ''}>
                <Translate id="aboutUs">About us</Translate>
              </Link>
            )}
          </Translate>
        ) : null}
        <br />
        <br />
        <br />
        <br />
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
  state => ({
    dishes: state.menu.dishes,
    table: state.table,
    isLoading: state.menu.isFetching,
    basket: state.basket,
    restaurant: state.restaurant,
    query: state.menu.query,
    language: state.user.locale.languages.find(l => l.active)?.code || 'en',
  }),
  dispatch => ({
    showBasketDialog: () => dispatch(actions.uiDialogShow(DialogType.BASKET)),
    getDishes: () => dispatch(actions.menuGetRequest()),
    clearBasket: () => dispatch(actions.basketClear()),
    getTable: () => dispatch(actions.tableGet()),
    getRestaurant: () => dispatch(actions.restaurantGet()),
    filterDishes: (query: string) => dispatch(actions.menuFilter(query)),
  }),
)

export default connectComponent(styleComponent(MenuPage))
