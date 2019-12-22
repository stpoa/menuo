import React, { useEffect, useState } from 'react'
import {
  apiAcceptOrder,
  apiCompleteOrder,
  apiDeleteOrder,
  apiCompleteTableAction,
} from '../api'
import { Header } from '../components/Header'
import {
  Fab,
  Divider,
  ListItem,
  List,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import {
  Check,
  DeleteForever,
  AccessibilityNew,
  ArrowForwardIos,
  CreditCard,
  Money,
} from '@material-ui/icons'
import { H2 } from '../components/H2'
import { makeStyles, createStyles } from '@material-ui/styles'

export const Orders = ({ search }) => {
  const [refetch, setRefetch] = useState()
  const [tables, setTables] = useState([])

  useEffect(() => {
    const doEffect = async () => {
      const tables = await window.fetch('/api/tables').then(res => res.json())
      setTables(tables)
    }
    doEffect()
  }, [refetch])

  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      setRefetch(event.data.refetch)
    })
  }, [])

  const classes = useStyles()

  const handleAcceptOrder = ({ orderId }) => async () => {
    await apiAcceptOrder({ orderId })
    setRefetch(+new Date())
  }

  const handleDeleteOrder = ({ orderId }) => async () => {
    await apiDeleteOrder(orderId)
    setRefetch(+new Date())
  }

  const handleCompleteOrderToggle = ({ orderId, status }) => async () => {
    await apiCompleteOrder({ orderId, status })
    setRefetch(+new Date())
  }

  const handleCompleteAction = ({ id }) => async () => {
    await apiCompleteTableAction({ id })
    setRefetch(+new Date())
  }

  console.log({ tables })

  return (
    <div className={classes.root}>
      <Header>Zamówienia</Header>

      {tables.map(({ id, status, orders }) => (
        <div key={id}>
          <div style={{ position: 'relative' }}>
            <H2> Stół {id} </H2>
            {status === 'summon-waiter' && (
              <Fab
                style={{ position: 'absolute', top: '0', right: '1rem' }}
                size="small"
                variant="extended"
                color="secondary"
                onClick={handleCompleteAction({ id })}
              >
                <AccessibilityNew />
              </Fab>
            )}
            {status === 'pay-card' && (
              <Fab
                style={{ position: 'absolute', top: '0', right: '1rem' }}
                size="small"
                variant="extended"
                color="secondary"
                onClick={handleCompleteAction({ id })}
              >
                <CreditCard />
              </Fab>
            )}
            {status === 'pay-cash' && (
              <Fab
                style={{ position: 'absolute', top: '0', right: '1rem' }}
                size="small"
                variant="extended"
                color="secondary"
                onClick={handleCompleteAction({ id })}
              >
                <Money />
              </Fab>
            )}
          </div>
          <Divider />

          <List className={classes.list}>
            {orders.map((order, key) => (
              <div key={key}>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      disabled={order.status === 'new'}
                      edge="start"
                      onChange={handleCompleteOrderToggle({
                        orderId: order.id,
                        status: order.status,
                      })}
                      checked={order.status === 'completed'}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={'Zamówienie ' + order.id}
                    // secondary={dish.description}
                  />
                  <ListItemSecondaryAction>
                    {order.status === 'new' && (
                      <Fab
                        size="small"
                        variant="extended"
                        color="primary"
                        onClick={handleAcceptOrder({ orderId: order.id })}
                      >
                        <Check />
                      </Fab>
                    )}
                    <Fab
                      style={{ marginLeft: '1rem' }}
                      size="small"
                      variant="extended"
                      color="primary"
                      onClick={handleDeleteOrder({ orderId: order.id })}
                    >
                      <DeleteForever />
                    </Fab>
                  </ListItemSecondaryAction>
                </ListItem>
                <List component="div" disablePadding>
                  {order.items.map(
                    ({ dish, variant, count, isDone, itemId }) => {
                      const variantText =
                        `${count} x ${dish.name}` +
                        (variant.name ? `- ${variant.name}` : '')

                      return (
                        <ListItem
                          button={order.status !== 'new'}
                          onClick={
                            order.status === 'new' ? undefined : () => {}
                          }
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <ArrowForwardIos />
                          </ListItemIcon>
                          <ListItemText>{variantText}</ListItemText>
                        </ListItem>
                      )
                    },
                  )}
                </List>
              </div>
            ))}
          </List>
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexDirection: 'column',
      padding: '1rem',
    },
  }),
)
