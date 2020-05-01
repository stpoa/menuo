import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LanguageToggle from './LanguageToggle'
import { SearchButton } from './SearchButton'
import { HeaderLogo } from '../../../components/HeaderLogo'
import { MenuBasketButton } from './BasketDialog'
import { Fab, WithStyles, InputBase } from '@material-ui/core'
import { connect } from 'react-redux'
import { BasketEntry } from '../MenuPage'
import { MenuEntry } from '@menuo/shared'
import { Receipt as ReceiptIcon } from '@material-ui/icons'
import { Translate } from 'react-localize-redux'
import { RootState } from '../../../store/store'
import * as actions from '../../../store/actions'
import { DialogType } from '../../../store/ui/dialog/types'

interface HeaderStateProps {
  basket: BasketEntry[]
  query: string
}
interface HeaderDispatchProps {
  getDishes: () => void
  getTable: () => void
  getRestaurant: () => void
  clearBasket: () => void
  showBasketDialog: () => void
  filterDishes: (query: string) => void
}
interface HeaderOwnProps {
  ordered: [MenuEntry, number][]
  setShowOrderedList: (value: boolean) => void
}
interface HeaderProps
  extends HeaderStateProps,
    HeaderDispatchProps,
    HeaderOwnProps,
    WithStyles<typeof styles> {}

const HeaderRaw = ({
  classes,
  basket,
  showBasketDialog,
  ordered,
  setShowOrderedList,
  filterDishes,
  query,
}: HeaderProps) => {
  const [showSearchInput, setShowSearchInput] = useState(false)

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid #ccc',
        background: 'whitesmoke',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '88px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          className={classes.search}
        >
          <LanguageToggle
            className={classes.languageButton}
            disabled={!!basket.length}
          />
          <SearchButton
            onClick={() => setShowSearchInput((set) => !set)}
            className={classes.searchButton}
          />
        </div>

        <HeaderLogo>Menuo</HeaderLogo>

        <div
          style={{
            width: '88px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          className={classes.search}
        >
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
        </div>
      </div>

      {showSearchInput && (
        <Translate>
          {({ translate }) => (
            <InputBase
              autoFocus
              className={classes.searchInput}
              onChange={(e) => filterDishes(e.target.value)}
              value={query}
              placeholder={translate('searchPlaceholderContent') + ''}
              inputProps={{ 'aria-label': 'search' }}
            />
          )}
        </Translate>
      )}
    </div>
  )
}

const styles = {
  orderedListFab: {
    width: '40px',
    height: '40px',
    zIndex: 100,
  },
  basketButton: {
    width: '40px',
    height: '40px',
    zIndex: 100,
  },
  searchButton: {
    width: '40px',
    height: '40px',
  },
  languageButton: {
    width: '40px',
    height: '40px',
  },
  searchInput: {
    width: '100%',
    fontSize: '1rem',
  },
  search: {
    display: 'flex',
  },
}

const styleComponent = withStyles(() => styles)

const connectComponent = connect<
  HeaderStateProps,
  HeaderDispatchProps,
  HeaderOwnProps,
  RootState
>(
  (state) => ({
    basket: state.basket,
    query: state.menu.query,
  }),
  (dispatch) => ({
    showBasketDialog: () => dispatch(actions.uiDialogShow(DialogType.BASKET)),
    getDishes: () => dispatch(actions.menuGetRequest()),
    clearBasket: () => dispatch(actions.basketClear()),
    getTable: () => dispatch(actions.tableGet()),
    getRestaurant: () => dispatch(actions.restaurantGet()),
    filterDishes: (query: string) => dispatch(actions.menuFilter(query)),
  }),
)

export const Header = connectComponent(styleComponent(HeaderRaw))
