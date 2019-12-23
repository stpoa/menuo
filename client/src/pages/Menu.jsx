import React, { useState, useEffect } from 'react'
import {
  apiPayByCash,
  apiPayByCard,
  apiSummonWaiter,
  apiCreateOrder,
} from '../api'
import { useQuery } from '../utils'
import {
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import { Header } from '../components/Header'
import { H2 } from '../components/H2'
import { makeStyles, createStyles } from '@material-ui/styles'
import { PlusMinus } from '../components/PlusMinus'

const API_URL = process.env.REACT_APP_API_URL
console.log({ API_URL })

export const Menu = ({ location, match }) => {
  const { restaurantId } = match.params
  const { search } = location
  const query = useQuery(search)
  const tableId = query.get('table')

  const [refetch, setRefetch] = useState()
  const [menu, setMenu] = useState([])

  useEffect(() => {
    const doEffect = async () => {
      const restaurant = await window.fetch(API_URL + '/menus/' + restaurantId).then(res => res.json())
      const menu = restaurant.menu || []
      setMenu(menu)
    }

    doEffect()
  }, [refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      console.log(event.data.refetch)
      setRefetch(event.data.refetch)
    })
  }, [])

  const [basket, setBasket] = useState({}) // { [itemId + ' ' + optionId]: count }
  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showOrderedDialog, setShowOrderedDialog] = useState(false)
  const classes = useStyles()

  // Handlers
  const handleOrderClick = ({ basket, userId = 0, tableId }) => async () => {
    await apiCreateOrder({ userId, tableId, basket })
    setShowOrderedDialog(true)
    setBasket({})
  }

  const handleSummonDialogClick = () => {
    setShowSummonDialog(true)
  }

  const handleSummonClick = ({ tableId }) => async () => {
    await apiSummonWaiter({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCardClick = ({ tableId }) => async () => {
    await apiPayByCard({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCashClick = ({ tableId }) => async () => {
    await apiPayByCash({ tableId })
    setShowSummonDialog(false)
  }

  const handleToggle = (id, count) => () =>
    setBasket(basket => ({ ...basket, [id]: count ? 0 : 1 }))

  const handleMinus = (id, count) => () =>
    setBasket(basket => ({ ...basket, [id]: basket[id] - 1 }))

  const handlePlus = (id, count) => () =>
    setBasket(basket => ({ ...basket, [id]: basket[id] + 1 }))

  const handleDishClick = dishId => () => {
    const id = dishId + ' 0'
    const variantIds = Object.keys(basket).filter(id => id.includes(dishId))
    if (variantIds.some(id => basket[id] > 0)) {
      variantIds.forEach(id => setBasket(basket => ({ ...basket, [id]: 0 })))
    } else {
      const count = basket[id]
      setBasket(basket => ({ ...basket, [id]: count ? 0 : 1 }))
    }
  }

  // Tools
  const isBasketFilled = basket =>
    !!Object.values(basket).reduce((a, b) => a + b, 0)

  // Variables
  const isBasketEmpty = !isBasketFilled(basket)

  return (
    <div className={classes.root}>
      <Header>Menu</Header>

      <div className={classes.menuContent}>
        {menu.map((section, key) => (
          <div key={key}>
            <H2>{section.name}</H2>
            <Divider />

            <List className={classes.list}>
              {section.dishes.map((dish, id) => (
                <div key={id}>
                  <ListItem button onClick={handleDishClick(id)}>
                    <ListItemText
                      primary={dish.name}
                      secondary={dish.description}
                    />
                  </ListItem>
                  <List component="div" disablePadding>
                    {dish.variants.map((variant, i) => {
                      const id = dish.id + ' ' + i
                      const count = basket[id]
                      const variantText =
                        (variant.name ? variant.name + ' - ' : '') +
                        variant.price +
                        'zł'
                      return (
                        <ListItem
                          button={!count}
                          onClick={!count ? handleToggle(id, count) : undefined}
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              onChange={handleToggle(id, count)}
                              checked={basket[id] > 0}
                            />
                          </ListItemIcon>
                          <ListItemText primary={variantText} />
                          {count > 0 && (
                            <PlusMinus
                              count={count}
                              handleMinusClick={handleMinus(id, count)}
                              handlePlusClick={handlePlus(id, count)}
                            />
                          )}
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              ))}
            </List>
          </div>
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
          onClick={handleOrderClick({ basket, tableId })}
        >
          Zamów
        </Button>
      </div>

      <Dialog
        open={showSummonDialog}
        onClose={() => setShowSummonDialog(false)}
      >
        <DialogTitle>W jakim celu chcesz zawołać kelnera?</DialogTitle>
        <DialogContent></DialogContent>
        <div className={classes.dialogButtons}>
          <Button onClick={handlePayCashClick({ tableId })} color="primary">
            Płatność gotówką
          </Button>
          <Button onClick={handlePayCardClick({ tableId })} color="primary">
            Płatność kartą
          </Button>
          <Button color="primary" onClick={handleSummonClick({ tableId })}>
            Inne
          </Button>
        </div>
      </Dialog>

      <Dialog
        open={showOrderedDialog}
        onClose={() => setShowOrderedDialog(false)}
      >
        <DialogTitle>Zamówienie wysłane!</DialogTitle>
        <DialogContent>
          Twoje zamówienie zostało wysłane i oczekuje na akceptacje przez
          restauracje, otrzymsz powiadomienie inforumujące o zaakceptowaniu
          zamówienia. Jeżeli chcesz coś jeszcze zamówić możesz złożyć kolejne
          zamówienie. Pamiętaj, że w każdej chwili możesz zawołać kelnera
          klikając na przycisk.
        </DialogContent>
        <Button color="primary" onClick={() => setShowOrderedDialog(false)}>
          Ok
        </Button>
      </Dialog>
    </div>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexDirection: 'column',
      padding: '1rem',
    },
    menuContent: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonLeft: {
      width: '50%',
      marginRight: '0.5rem',
    },
    buttonRight: {
      width: '50%',
      marginLeft: '0.5rem',
    },
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
)
