import { MenuEntry } from './menu'

// Client
export interface IOrdersTables {
  restaurant: string
  tables: IOrdersTable[]
}

export interface IOrdersTable {
  name: string
  status: string
  orders: IOrder[]
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
  itemId: string 
  status: string 
}

// DB
export type Orders = Order[]

export interface Order {
  _id: string
  restaurant: string
  user: string 
  table: string
  status: string
  entries: [MenuEntry, number][]
}
