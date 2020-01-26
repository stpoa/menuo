import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { useStyles } from './Orders.styles'
import { OrdersTable } from './components/Table/OrdersTable'

import {
  getRestaurantOrders,
  deleteRestaurantOrder,
  deleteRestaurantOrders,
  getTables,
  getTablesMine,
  updateTablesMine,
} from './Orders.api'
import { IOrdersTables, nestOrders } from 'menuo-shared'
import { updateRestaurantOrder } from '../Menu/Menu.api'
import { readSubscription } from '../../notifications'
import { Loading } from '../../components/Loading'
import { Fab } from '@material-ui/core'
import {
  ExitToApp as ExitToAppIcon,
  List as ListIcon,
} from '@material-ui/icons'
import { TablesSelectionDialog } from './components/TablesSelectionDialog'

const ORDERS_REFETCH_INTERVAL = +(
  process.env.REACT_APP_ORDERS_REFETCH_INTERVAL || 24 * 60 * 60
)

export const Orders = ({ match, history }: any) => {
  const { restaurant } = match.params
  const [refetch, setRefetch] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showTablesDialog, setShowTablesDialog] = useState(false)

  const [orders, setOrders] = useState<IOrdersTables>({
    restaurant,
    tables: [],
  })
  const [tables, setTables] = useState<string[]>([])
  const [tablesMine, setTablesMine] = useState<string[]>([])

  const [checkedTables, setCheckedTables] = useState<{
    [key: string]: boolean
  }>({})

  const getInitialCheckedTables = () =>
    tablesMine.reduce(
      (acc: { [key: string]: boolean }, t) => ({ ...acc, [t]: true }),
      {},
    )

  useEffect(() => {
    setCheckedTables(getInitialCheckedTables())
  }, [tablesMine])

  useEffect(() => {
    const doEffect = async () => {
      setLoading(true)
      const orders = await getRestaurantOrders({ restaurant })
      setOrders(nestOrders(orders))
      setLoading(false)
    }
    doEffect()
  }, [restaurant, refetch])

  useEffect(() => {
    const doEffect = async () => {
      const tables = await getTables({ restaurant })
      setTables(
        tables.every(v => Number(v) >= 0)
          ? tables.sort((a, b) => +a - +b)
          : tables.sort(),
      )
    }
    doEffect()
  }, [restaurant, refetch])

  useEffect(() => {
    const doEffect = async () => {
      const tablesMine = await getTablesMine({ restaurant })
      setTablesMine(tablesMine)
    }
    doEffect()
  }, [restaurant, refetch])

  useEffect(() => {
    try {
      navigator.serviceWorker.addEventListener('message', event => {
        setRefetch(event.data.refetch)
      })
    } catch (e) {
      console.log(e)
    }

    const interval = setInterval(
      () => setRefetch(+new Date()),
      ORDERS_REFETCH_INTERVAL * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  const classes = useStyles()

  const handleAcceptOrder = (restaurant: string) => (
    order: string,
  ) => async () => {
    setLoading(true)
    await updateRestaurantOrder(
      { order, restaurant },
      { status: 'accepted', waiterSub: readSubscription() },
    )
    setRefetch(+new Date())
    setLoading(false)
  }

  const handleCompleteOrderToggle = (restaurant: string) => (
    order: string,
    status: string,
  ) => async () => {
    setLoading(true)
    await updateRestaurantOrder(
      { order, restaurant },
      { status: status !== 'completed' ? 'completed' : 'accepted' },
    )
    setRefetch(+new Date())
    setLoading(false)
  }

  const handleDeleteOrder = (restaurant: string) => (
    order: string,
  ) => async () => {
    setLoading(true)
    await deleteRestaurantOrder({ restaurant, order })
    setRefetch(+new Date())
    setLoading(false)
  }

  const handleCompleteAction = (restaurant: string) => (
    table: string,
    tableStatus: string,
  ) => async () => {
    setLoading(true)
    await deleteRestaurantOrders({ restaurant, table, tableStatus })
    setRefetch(+new Date())
    setLoading(false)
  }

  const handleLogoutClick = () => {
    localStorage.setItem('jwt', '')
    history.push(`/${restaurant}/orders`)
  }

  const handleTablesFabClick = () => {
    setShowTablesDialog(true)
  }

  return (
    <div className={classes.root}>
      <Loading loading={loading} />
      <Header>menuo</Header>
      <Fab
        onClick={handleLogoutClick}
        color="primary"
        aria-label="logout"
        className={classes.logoutFab}
      >
        <ExitToAppIcon />
      </Fab>

      <Fab
        onClick={handleTablesFabClick}
        color="primary"
        aria-label="tables"
        className={classes.tablesFab}
      >
        <ListIcon />
      </Fab>

      {orders.tables
        .filter(t => tablesMine.includes(t.table.name))
        .map(({ orders, table }) => (
          <OrdersTable
            {...{
              loading,
              key: table._id,
              table,
              orders,
              handleAcceptOrder: handleAcceptOrder(restaurant),
              handleDeleteOrder: handleDeleteOrder(restaurant),
              handleCompleteOrderToggle: handleCompleteOrderToggle(restaurant),
              handleCompleteAction: handleCompleteAction(restaurant),
              handlePriorityChange: order => orderEntry => async e => {
                await updateRestaurantOrder(
                  { restaurant, order: order._id },
                  {
                    entries: order.items.map(i => {
                      const priority =
                        i.entry._id === orderEntry.entry._id
                          ? (e.target.value as number)
                          : i.entry.priority
                      const entry = { ...i.entry, priority }

                      return [entry, i.count]
                    }),
                  },
                )
                setRefetch(+new Date())
              },
            }}
          />
        ))}

      <TablesSelectionDialog
        open={showTablesDialog}
        onCheck={(table: string) => () => {
          setCheckedTables(checked => ({
            ...checked,
            [table]: !checked[table],
          }))
        }}
        onClose={() => {
          setShowTablesDialog(false)
          setCheckedTables(getInitialCheckedTables())
        }}
        onReject={() => {
          setShowTablesDialog(false)
          setCheckedTables(getInitialCheckedTables())
        }}
        onConfirm={async () => {
          await updateTablesMine({
            restaurant,
            tables: Object.entries(checkedTables)
              .filter(([k, v]) => v)
              .map(([k, v]) => k),
          })
          setShowTablesDialog(false)
          setRefetch(+new Date())
        }}
        tables={tables.map(name => {
          return {
            name,
            isMine: tablesMine.includes(name),
          }
        })}
        checkedTables={checkedTables}
      />
    </div>
  )
}
