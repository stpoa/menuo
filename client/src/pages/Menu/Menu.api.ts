import { get, put, post } from '../../api'
import {
  ReadRestaurantTable,
  ListRestaurantDishes,
  CreateRestaurantOrder,
  UpdateRestaurantOrder,
} from 'menuo-shared/interfaces/api'
import { Table } from 'menuo-shared/interfaces/tables'
import { readSubscription } from '../../notifications'

export const listRestaurantDishes = ({
  restaurant,
}: ListRestaurantDishes.Params) =>
  get<ListRestaurantDishes.Response>(`/restaurants/${restaurant}/dishes`)

export const readRestaurantTable = ({
  restaurant,
  table,
}: ReadRestaurantTable.Params) =>
  get<ReadRestaurantTable.Response>(
    `/restaurants/${restaurant}/tables/${table}`,
  )

export const createRestaurantOrder = (
  { restaurant }: CreateRestaurantOrder.Params,
  order: CreateRestaurantOrder.Body,
) =>
  post<CreateRestaurantOrder.Response, typeof order>(
    `/restaurants/${restaurant}/orders`,
    order,
  )

export const updateRestaurantOrder = (
  { restaurant, order }: UpdateRestaurantOrder.Params,
  updates: UpdateRestaurantOrder.Body,
) =>
  put<UpdateRestaurantOrder.Response, typeof updates>(
    `/restaurants/${restaurant}/orders/${order}`,
    updates,
  )

// Helpers

export const summonWaiter = async (restaurant: string, table: Table) => {
  await createRestaurantOrder(
    { restaurant },
    {
      customerSub: readSubscription(),
      status: '',
      table: { ...table, status: 'summon-waiter' },
      entries: [],
      customer: '',
      waiter: '',
    },
  )
}
