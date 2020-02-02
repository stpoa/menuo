import { MenuEntry } from './menu'
import { Table } from './tables'

export interface IOrdersTables {
  restaurant: string
  tables: IOrdersTable[]
}

export interface IOrdersTable {
  orders: IOrder[]
  table: Table
}

export interface IOrder {
  _id: string
  user: string
  items: IOrderItem[]
  status: string
}

export interface IOrderItem {
  dishName: string
  dishVariantPrice: number
  count: number
  entry: MenuEntry
  status: string
}

export type Orders = Order[]

export type NotificationsSubscription = any
export interface Order {
  _id: string
  restaurant: string
  customer: string
  waiter: string
  waiterSub?: NotificationsSubscription[]
  customerSub: NotificationsSubscription[]
  table: Omit<Table, 'status'> & { status?: string }
  status: string
  entries: [MenuEntry, number][]
}
