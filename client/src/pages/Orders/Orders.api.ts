import { get, post, put } from '../../api'
import {
  CreateRestaurantOrder,
  ListRestaurantOrders,
} from 'menuo-shared/interfaces/api'
import { IOrdersTable, IOrder } from 'menuo-shared'

export const getRestaurantOrders = ({
  restaurant,
}: ListRestaurantOrders.Params) =>
  get<ListRestaurantOrders.Response>(`/restaurants/${restaurant}/orders`)

export const createRestaurantOrder = (
  { restaurant }: CreateRestaurantOrder.Params,
  order: CreateRestaurantOrder.Body,
) =>
  post<CreateRestaurantOrder.Response, typeof order>(
    `/restaurants/${restaurant}/orders`,
    order,
  )

export const updateOrder = (restaurantId: string, order: IOrder) =>
  put<IOrdersTable[]>(`/orders/${restaurantId}`, order as any)
