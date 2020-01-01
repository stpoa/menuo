import { get, post, put } from '../../api'

export const getTables = (restaurantId: string) =>
  get<IOrdersTable[]>(`/orders/${restaurantId}`)

export const createOrder = (restaurantId: string, order: IOrder) =>
  post<IOrdersTable[]>(`/orders/${restaurantId}`, order as any)

export const updateOrder = (restaurantId: string, order: IOrder) =>
  put<IOrdersTable[]>(`/orders/${restaurantId}`, order as any)

export interface IOrdersTable {
  id: number
  status: string
  orders: IOrder[]
}

export interface IOrder {
  id: number
  tableId: number
  userId: number
  items: IItem[]
  status: string
}

export interface IItem {
  dish: IDish
  variant: IVariant
  count: number
  itemId: number
  isDone: boolean
}

export interface IDish {
  name: string
  description?: string
  variants: IVariant[]
}

export interface IVariant {
  price: number
  name?: string
  description?: string
}
