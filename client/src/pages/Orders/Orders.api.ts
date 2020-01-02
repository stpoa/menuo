import { get, post, put } from '../../api'
import { IOrdersTable, IOrder } from 'menuo-shared'

export const getTables = (restaurantId: string) =>
  get<IOrdersTable[]>(`/orders/${restaurantId}`)

export const createOrder = (restaurantId: string, order: IOrder) =>
  post<IOrdersTable[]>(`/orders/${restaurantId}`, order as any)

export const updateOrder = (restaurantId: string, order: IOrder) =>
  put<IOrdersTable[]>(`/orders/${restaurantId}`, order as any)
