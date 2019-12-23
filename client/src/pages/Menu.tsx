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
import { getConfig } from '../env'

const config = getConfig()

const fetchJson: typeof fetch = (input, init) =>
  fetch(input, init).then(res => res.json())

const api = {
  get: (url: string, options?: RequestInit) =>
    fetchJson(config.apiUrl + url, { ...options, method: 'GET' }),
  post: (url: string, options?: RequestInit) =>
    fetchJson(config.apiUrl + url, { ...options, method: 'POST' }),
}

export const Menu = ({ location, match }: any) => {
  const { restaurantId } = match.params
  const { search } = location
  const query = useQuery(search)
  const tableId = query.get('table')

  const [refetch, setRefetch] = useState()
  const [menu, setMenu] = useState([])

  useEffect(() => {
    const doEffect = async () => {
      const restaurant: any = await api.get(`/menus/${restaurantId}`)

      const menu = restaurant.menu || []
      setMenu(menu)
    }

    doEffect()
  }, [refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      setRefetch(event.data.refetch)
    })
  }, [])

  const [basket, setBasket] = useState<any>({}) // { [itemId + ' ' + optionId]: count }
  const [showSummonDialog, setShowSummonDialog] = useState(false)
  const [showOrderedDialog, setShowOrderedDialog] = useState(false)
  const classes = useStyles() as any

  // Handlers
  const handleOrderClick = ({ basket, userId = 0, tableId }: any) => async () => {
    await apiCreateOrder({ userId, tableId, basket })
    setShowOrderedDialog(true)
    setBasket({})
  }

  const handleSummonDialogClick = () => {
    setShowSummonDialog(true)
  }

  const handleSummonClick = ({ tableId }: any) => async () => {
    await apiSummonWaiter({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCardClick = ({ tableId }: any) => async () => {
    await apiPayByCard({ tableId })
    setShowSummonDialog(false)
  }
  const handlePayCashClick = ({ tableId }: any) => async () => {
    await apiPayByCash({ tableId })
    setShowSummonDialog(false)
  }

  const handleToggle = (id: any, count: any) => () =>
    setBasket((basket: any) => ({ ...basket, [id]: count ? 0 : 1 }))

  const handleMinus = (id: any, count: any) => () =>
    setBasket((basket: { [x: string]: number }) => ({ ...basket, [id]: basket[id] - 1 }))

  const handlePlus = (id: any, count:any) => () =>
    setBasket((basket: { [x: string]: number }) => ({ ...basket, [id]: basket[id] + 1 }))

  const handleDishClick = (dishId: string) => () => {
    const id = dishId + ' 0'
    const variantIds = Object.keys(basket).filter(id => id.includes(dishId))
    if (variantIds.some(id => basket[id] > 0)) {
      variantIds.forEach(id => setBasket((basket: any) => ({ ...basket, [id]: 0 })))
    } else {
      const count = basket[id]
      setBasket((basket: any) => ({ ...basket, [id]: count ? 0 : 1 }))
    }
  }

  // Tools
  const isBasketFilled = (basket: { [s: string]: unknown } | ArrayLike<unknown>) =>
    !!Object.values(basket as any).reduce((a: any, b: any) => a + b, 0)

  // Variables
  const isBasketEmpty = !isBasketFilled(basket)

  return (
    <div className={classes.root}>
      <Header>Menu</Header>

      <div className={classes.menuContent}>
        {menu.map((section: any, key) => (
          <div key={key}>
            <H2>{section.name}</H2>
            <Divider />

            <List className={classes.list}>
              {section.dishes.map((dish: { name: React.ReactNode; description: React.ReactNode; variants: any[]; id: string }, id: string | number | undefined) => (
                <div key={id}>
                  <ListItem button onClick={handleDishClick(id! + '')}>
                    <ListItemText
                      primary={dish.name}
                      secondary={dish.description}
                    />
                  </ListItem>
                  <List component="div" disablePadding>
                    {dish.variants.map((variant: any, i) => {
                      const id = dish.id + ' ' + i
                      const count = basket[id]
                      const variantText =
                        (variant.name ? variant.name + ' - ' : '') +
                        variant.price +
                        'zł'
                      return (
                        <ListItem
                          button={!count as any}
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
