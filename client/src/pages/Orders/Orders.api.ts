import { get } from '../../api'

export const getTables = (restaurantId: string) =>
  get<ITable[]>(`/tables/${restaurantId}`)

export interface ITable {
  id: number
  status: string
  orders: IOrder[]
}

export interface IOrder {
  id: number
  tableId: number
  userId: 0
  items: IItem[]
  status: string
}

export interface IItem {
  dish: IDish
  variant: IVariant
  count: 1
  itemId: 0
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
