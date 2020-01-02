export interface IOrdersTables {
  restaurantId: string
  tables: IOrdersTable[]
}

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

interface IItem {
  dish: IDish
  variant: IVariant
  count: number
  itemId: number
  isDone: boolean
}

interface IDish {
  name: string
  description?: string
  variants: IVariant[]
}

interface IVariant {
  price: number
  name?: string
  description?: string
}
