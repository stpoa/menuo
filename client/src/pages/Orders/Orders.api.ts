import { get, put, del } from '../../api'
import {
  ListRestaurantOrders,
  DeleteRestaurantOrder,
  DeleteRestaurantOrders,
} from 'menuo-shared/interfaces/api'
import { IOrdersTable, IOrder } from 'menuo-shared'

export const getRestaurantOrders = ({
  restaurant,
}: ListRestaurantOrders.Params) =>
  get<ListRestaurantOrders.Response>(`/restaurants/${restaurant}/orders`)

export const updateOrder = (restaurantId: string, order: IOrder) =>
  put<IOrdersTable[]>(`/orders/${restaurantId}`, order as any)

export const deleteRestaurantOrder = ({
  restaurant,
  order,
}: DeleteRestaurantOrder.Params) =>
  del(`/restaurants/${restaurant}/orders/${order}`)

export const deleteRestaurantOrders = ({
  restaurant,
  table,
  tableStatus,
}: DeleteRestaurantOrders.Params & DeleteRestaurantOrders.QueryParams) =>
  del(
    `/restaurants/${restaurant}/orders/?table=${table}&tablestatus=${tableStatus}`,
  )
